import { readFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { notifications, validateOutcome, trustedOutcomeRun } from './notification-policy.mjs'
import { deliver } from './discord-delivery.mjs'
const config = JSON.parse(readFileSync(new URL('./config.json', import.meta.url)))
const env = process.env
const event = JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, 'utf8'))
const context = {
  notificationIdentity: `run ${env.GITHUB_RUN_ID} · attempt ${env.GITHUB_RUN_ATTEMPT}`,
}
async function request(path) {
  const response = await fetch(`https://api.github.com/repos/${config.repository}/${path}`, {
    headers: {
      Authorization: `Bearer ${env.GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`GitHub metadata request failed (${response.status})`)
  return response
}
async function api(path) {
  return (await request(path)).json()
}
async function apiBytes(path) {
  return Buffer.from(await (await request(path)).arrayBuffer())
}
async function pages(path, key) {
  const all = []
  for (let page = 1; page <= 10; page++) {
    const data = await api(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`)
    const rows = key ? data[key] : data
    all.push(...rows)
    if (rows.length < 100) break
  }
  return all
}
async function main() {
  if (
    env.GITHUB_REPOSITORY !== config.repository ||
    event.repository?.full_name !== config.repository
  )
    throw new Error('Unexpected repository')
  const run = event.workflow_run
  if (env.GITHUB_EVENT_NAME === 'workflow_run') {
    if (!config.workflows[run?.name]) return
    // Fork metadata is read only; no fork code, caches or artifacts are used.
    let prs = run.pull_requests || []
    for (const item of prs) {
      const pr = await api(`pulls/${item.number}`)
      if (pr.head.sha !== run.head_sha || pr.state !== 'open') context.stale = true
    }
    if (run.event === 'pull_request' && !prs.length) {
      const associated = await api(`commits/${run.head_sha}/pulls`)
      prs = associated.filter((pr) => pr.state === 'open' && pr.head.sha === run.head_sha)
      if (!prs.length) context.stale = true
    }
    if (context.stale) return
    const jobs = await pages(`actions/runs/${run.id}/attempts/${run.run_attempt}/jobs`, 'jobs')
    context.deliveryExpected = jobs.some(
      (job) =>
        /Resolve qualified release|Apply (dev|staging|prod) release|Restore .+ release/.test(
          job.name,
        ) && job.conclusion !== 'skipped',
    )
    context.failedJobs = jobs.filter((job) => ['failure', 'timed_out'].includes(job.conclusion))
    const history = await pages(
      `actions/workflows/${run.workflow_id}/runs?branch=${encodeURIComponent(run.head_branch || '')}`,
      'workflow_runs',
    )
    const sameScope = (previous) =>
      previous.head_repository?.full_name === run.head_repository?.full_name &&
      previous.event === run.event &&
      (run.event !== 'pull_request' ||
        previous.pull_requests?.some((p) => prs.some((current) => current.number === p.number)))
    let previous = history
      .filter(
        (r) =>
          r.id !== run.id &&
          r.run_number < run.run_number &&
          r.status === 'completed' &&
          !['cancelled', 'skipped', 'neutral'].includes(r.conclusion) &&
          sameScope(r),
      )
      .sort((a, b) => b.run_number - a.run_number)[0]
    for (let attempt = run.run_attempt - 1; attempt > 0; attempt--) {
      const candidate = await api(`actions/runs/${run.id}/attempts/${attempt}`)
      if (!['cancelled', 'skipped', 'neutral'].includes(candidate.conclusion)) {
        previous = candidate
        break
      }
    }
    context.previousConclusion = previous?.conclusion
    context.outcomes = []
    const trusted = trustedOutcomeRun(config, event)
    if (trusted) {
      const artifacts = await pages(`actions/runs/${run.id}/artifacts`, 'artifacts')
      for (const artifact of artifacts.filter(
        (a) => a.name.startsWith(`notification-outcome-${run.run_attempt}-`) && !a.expired,
      )) {
        if (artifact.size_in_bytes > 65536) throw new Error('Outcome artifact too large')
        const directory = mkdtempSync(join(tmpdir(), 'notification-'))
        try {
          // Read exactly one data file; never extract an archive into the checkout.
          const archive = await apiBytes(`actions/artifacts/${artifact.id}/zip`)
          const zip = join(directory, 'outcome.zip')
          writeFileSync(zip, archive)
          const raw = execFileSync('unzip', ['-p', zip, 'outcome.json'], {
            maxBuffer: 16384,
            stdio: ['ignore', 'pipe', 'pipe'],
          })
          context.outcomes.push(validateOutcome(JSON.parse(raw), run, config.repository))
        } catch {
          throw new Error('Invalid or unavailable notification outcome artifact')
        } finally {
          rmSync(directory, { recursive: true, force: true })
        }
      }
    }
  }
  const items = notifications(config, env.GITHUB_EVENT_NAME, event, context)
  for (const item of items) await deliver(env[config.secrets[item.route]], item.body)
  process.stdout.write(`Notification policy selected ${items.length} message(s).\n`)
}
main().catch((error) => {
  process.stderr.write(
    `${error.message.startsWith('Discord') || error.message.startsWith('GitHub metadata') ? error.message : 'Notification failed; inspect sanitized outcome and configuration checks'}\n`,
  )
  process.exitCode = 1
})
