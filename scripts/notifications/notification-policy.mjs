import { payload, safeText } from './discord-delivery.mjs'
const failed = (value) =>
  ['failure', 'timed_out', 'action_required', 'startup_failure'].includes(value)
export function validateOutcome(value, run, repo) {
  if (
    !value ||
    value.schema !== 1 ||
    value.repository !== repo ||
    String(value.runId) !== String(run.id) ||
    Number(value.attempt) !== Number(run.run_attempt)
  )
    throw new Error('Outcome identity mismatch')
  const outcomesByKind = {
    deploy: ['applied', 'not-applied', 'failed', 'unknown'],
    rollback: ['applied', 'not-applied', 'failed', 'unknown'],
    publish: ['published', 'failed', 'unknown'],
    sync: ['review-ready', 'unchanged', 'failed', 'unknown'],
  }
  if (
    !Object.hasOwn(outcomesByKind, value.kind) ||
    !outcomesByKind[value.kind].includes(value.outcome)
  )
    throw new Error('Invalid outcome')
  if (value.environment && !['dev', 'staging', 'prod', 'release'].includes(value.environment))
    throw new Error('Invalid environment')
  const result = { kind: value.kind, outcome: value.outcome }
  for (const key of ['environment', 'requested', 'release', 'stage', 'version', 'source']) {
    if (value[key] !== undefined && (typeof value[key] !== 'string' || value[key].length > 256))
      throw new Error('Invalid outcome field')
    result[key] = safeText(value[key], 256)
  }
  if (value.pr !== undefined) {
    if (!Number.isSafeInteger(value.pr) || value.pr <= 0)
      throw new Error('Invalid pull request number')
    result.pr = value.pr
  }
  return result
}
export function trustedOutcomeRun(config, event) {
  const run = event.workflow_run
  return (
    run?.head_repository?.full_name === config.repository &&
    ['push', 'workflow_dispatch', 'repository_dispatch', 'workflow_run'].includes(run.event) &&
    (run.head_branch === event.repository.default_branch ||
      config.workflows[run.name] === 'publish')
  )
}
export function notifications(config, eventName, event, context = {}) {
  if (event.repository?.full_name !== config.repository) return []
  const automation = config.automation
  const make = (route, title, lines, identity, url) => ({
    route: automation ? 'automation' : route,
    body: payload(title, lines, identity, url),
  })
  if (eventName === 'pull_request_target') {
    const pr = event.pull_request
    if (
      automation ||
      !config.pullRequestActions.includes(event.action) ||
      !pr ||
      pr.draft ||
      pr.state !== 'open'
    )
      return []
    return [
      make(
        'git',
        `Review: ${pr.title}`,
        [
          config.repository,
          `Author: ${pr.user?.login}`,
          ...(event.requested_reviewer ? [`Reviewer: ${event.requested_reviewer.login}`] : []),
          ...(event.requested_team ? [`Team: ${event.requested_team.name}`] : []),
        ],
        `PR #${pr.number} · ${event.action}`,
        pr.html_url,
      ),
    ]
  }
  if (eventName === 'issues') {
    const issue = event.issue
    if (
      automation ||
      !issue ||
      !config.issueActions.includes(event.action) ||
      !issue.labels?.some((x) => x.name === config.issueLabel) ||
      (event.action === 'labeled' && event.label?.name !== config.issueLabel)
    )
      return []
    return [
      make(
        'git',
        `Issue ${event.action}: ${issue.title}`,
        [config.repository],
        `Issue #${issue.number}`,
        issue.html_url,
      ),
    ]
  }
  if (eventName !== 'workflow_run') return []
  const run = event.workflow_run
  const kind = config.workflows[run?.name]
  if (
    !kind ||
    !run ||
    event.action !== 'completed' ||
    context.stale ||
    ['cancelled', 'skipped', 'neutral'].includes(run.conclusion)
  )
    return []
  const identity = `${config.repository} · run ${run.id} · attempt ${run.run_attempt}`
  const lines = [
    config.repository,
    `Workflow: ${run.name}`,
    `Revision: ${run.head_sha}`,
    ...(context.failedJobs || []).slice(0, 5).map((job) => `Failed: ${job.name} — ${job.html_url}`),
  ]
  const outcomes = context.outcomes || []
  for (const item of outcomes)
    lines.push(
      `${item.kind}: ${item.outcome}${item.environment ? ` · ${item.environment}` : ''}${item.release ? ` · ${item.release}` : ''}${item.requested ? ` · requested ${item.requested}` : ''}${item.version ? ` · ${item.version}` : ''}${item.stage ? ` · stage ${item.stage}` : ''}${item.source ? ` · source ${item.source}` : ''}`,
    )
  const messages = []
  if (failed(run.conclusion))
    messages.push(make('cicd', `${run.name} failed`, lines, identity, run.html_url))
  else if (run.conclusion === 'success') {
    if (outcomes.some((x) => ['applied', 'published'].includes(x.outcome)))
      messages.push(make('cicd', `${run.name} completed`, lines, identity, run.html_url))
    else if (
      (kind === 'delivery' &&
        (run.name !== 'CI' || context.deliveryExpected) &&
        !outcomes.some((x) => x.outcome === 'not-applied')) ||
      kind === 'publish'
    )
      messages.push(make('cicd', `${run.name}: outcome unknown`, lines, identity, run.html_url))
    else if (failed(context.previousConclusion))
      messages.push(make('cicd', `${run.name} recovered`, lines, identity, run.html_url))
    for (const item of outcomes.filter(
      (x) => x.kind === 'sync' && x.outcome === 'review-ready' && x.pr,
    ))
      messages.push(
        make(
          'git',
          'SDK update ready for review',
          [config.repository, `Source: ${item.source}`],
          identity,
          `https://github.com/${config.repository}/pull/${item.pr}`,
        ),
      )
  }
  return messages
}
