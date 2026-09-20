import test from 'node:test'
import assert from 'node:assert/strict'
import { deliver, payload } from './discord-delivery.mjs'
import { notifications, validateOutcome, trustedOutcomeRun } from './notification-policy.mjs'
const config = {
  repository: 'owner/project',
  workflows: {
    Verify: 'verify',
    CI: 'delivery',
    Release: 'publish',
    'Sync OpenAPI': 'sync',
    Rollback: 'delivery',
  },
  pullRequestActions: ['opened', 'ready_for_review', 'reopened', 'review_requested'],
  issueActions: ['labeled', 'reopened', 'closed'],
  issueLabel: 'notify:discord',
}
const repository = { full_name: config.repository }
const run = {
  id: 42,
  run_attempt: 1,
  name: 'Verify',
  conclusion: 'failure',
  head_sha: 'abc',
  html_url: 'https://github.com/owner/project/actions/runs/42',
}
const event = { repository, action: 'completed', workflow_run: run }
test('one aggregate failure, recovery only after failure, quiet ordinary success and cancelled runs', () => {
  assert.equal(notifications(config, 'workflow_run', event).length, 1)
  assert.equal(notifications(config, 'workflow_run', event, { stale: true }).length, 0)
  for (const conclusion of ['success', 'cancelled', 'skipped'])
    assert.equal(
      notifications(config, 'workflow_run', { ...event, workflow_run: { ...run, conclusion } })
        .length,
      0,
    )
  assert.equal(
    notifications(
      config,
      'workflow_run',
      { ...event, workflow_run: { ...run, conclusion: 'success' } },
      { previousConclusion: 'failure' },
    ).length,
    1,
  )
})
test('draft, unsupported events and unmarked issues stay quiet; metadata excludes bodies', () => {
  const pr = {
    repository,
    action: 'opened',
    pull_request: {
      title: 'Review me',
      body: 'PRIVATE',
      number: 1,
      state: 'open',
      user: { login: 'author' },
      html_url: 'https://github.com/owner/project/pull/1',
    },
  }
  assert.equal(notifications(config, 'pull_request_target', pr).length, 1)
  assert.equal(
    notifications(config, 'pull_request_target', {
      ...pr,
      pull_request: { ...pr.pull_request, draft: true },
    }).length,
    0,
  )
  const issue = {
    repository,
    action: 'labeled',
    label: { name: 'notify:discord' },
    issue: { title: 'Attention', body: 'PRIVATE', labels: [{ name: 'notify:discord' }] },
  }
  assert.equal(notifications(config, 'issues', issue).length, 1)
  assert.equal(
    notifications(config, 'issues', { ...issue, label: { name: 'documentation' } }).length,
    0,
  )
  assert.equal(
    notifications(config, 'issues', { ...issue, issue: { ...issue.issue, labels: [] } }).length,
    0,
  )
  assert.ok(!JSON.stringify(notifications(config, 'issues', issue)).includes('PRIVATE'))
})
test('applied, superseded, failure and unknown publication evidence remain distinct', () => {
  const delivery = { ...event, workflow_run: { ...run, name: 'CI', conclusion: 'success' } }
  const superseded = notifications(config, 'workflow_run', delivery, {
    outcomes: [{ kind: 'deploy', outcome: 'not-applied', stage: 'superseded' }],
  })
  assert.equal(superseded.length, 1)
  assert.match(superseded[0].body.embeds[0].title, /not applied/)
  assert.match(superseded[0].body.embeds[0].description, /superseded/)
  assert.doesNotMatch(superseded[0].body.embeds[0].title, /completed|success/)

  assert.equal(
    notifications(config, 'workflow_run', delivery, {
      outcomes: [{ kind: 'deploy', outcome: 'applied', environment: 'dev' }],
    }).length,
    1,
  )
  const unknown = notifications(config, 'workflow_run', {
    ...event,
    workflow_run: { ...run, name: 'Release', conclusion: 'success' },
  })
  assert.match(unknown[0].body.embeds[0].title, /unknown/)
  assert.match(
    notifications(config, 'workflow_run', {
      ...event,
      workflow_run: { ...run, name: 'Rollback' },
    })[0].body.embeds[0].title,
    /failed/,
  )
  assert.equal(
    notifications(
      config,
      'workflow_run',
      { ...event, workflow_run: { ...run, name: 'Sync OpenAPI', conclusion: 'success' } },
      { outcomes: [{ kind: 'sync', outcome: 'review-ready', pr: 9, source: 'abc' }] },
    )[0].route,
    'git',
  )
})
test('outcome identity, values and lengths are validated', () => {
  const value = {
    schema: 1,
    repository: config.repository,
    runId: 42,
    attempt: 1,
    kind: 'deploy',
    outcome: 'applied',
    environment: 'dev',
  }
  assert.equal(validateOutcome(value, run, config.repository).outcome, 'applied')
  for (const patch of [
    { runId: 1 },
    { attempt: 2 },
    { environment: 'elsewhere' },
    { outcome: 'success' },
    { release: 'x'.repeat(300) },
    { pr: -1 },
  ])
    assert.throws(() => validateOutcome({ ...value, ...patch }, run, config.repository))
})
test('automation routes to automation, unknown repositories and workflows are ignored', () => {
  assert.equal(
    notifications({ ...config, automation: true }, 'workflow_run', event)[0].route,
    'automation',
  )
  assert.equal(
    notifications(config, 'workflow_run', { ...event, repository: { full_name: 'untrusted/repo' } })
      .length,
    0,
  )
  assert.equal(
    notifications(config, 'workflow_run', {
      ...event,
      workflow_run: { ...run, name: 'Discord notifications' },
    }).length,
    0,
  )
})
test('bounded payload, safe mentions and webhook redaction', () => {
  const body = payload(
    '@everyone ' + 'x'.repeat(300),
    ['<@123> `$(touch /tmp/no)`', 'x'.repeat(9000), 'https://discord.com/api/webhooks/123/SECRET'],
    'identity',
    'javascript:alert(1)',
  )
  assert.deepEqual(body.allowed_mentions, { parse: [] })
  assert.ok(body.embeds[0].title.length <= 256)
  assert.ok(body.embeds[0].description.length <= 4096)
  assert.ok(!JSON.stringify(body).includes('SECRET'))
  assert.equal(body.embeds[0].url, undefined)
})
const hook = 'https://discord.com/api/webhooks/123/fake'
test('rate limits, transient failures and maximum attempts', async () => {
  let calls = 0,
    time = 0
  const sleeps = []
  await deliver(
    hook,
    {},
    {
      now: () => time,
      sleep: async (delay) => {
        sleeps.push(delay)
        time += delay
      },
      fetcher: async () => {
        calls++
        return new Response(calls === 1 ? '{"retry_after":2}' : '{}', {
          status: calls === 1 ? 429 : 200,
        })
      },
    },
  )
  assert.deepEqual(sleeps, [2000])
  calls = 0
  await assert.rejects(
    deliver(
      hook,
      {},
      {
        sleep: async () => {},
        fetcher: async () => {
          calls++
          return new Response('', { status: 500 })
        },
      },
    ),
    /exhausted/,
  )
  assert.equal(calls, 4)
})
test('permanent errors do not retry, large Retry-After cannot exceed deadline, errors redact URLs', async () => {
  for (const status of [400, 401, 403, 404]) {
    let calls = 0
    await assert.rejects(
      deliver(
        hook,
        {},
        {
          fetcher: async () => {
            calls++
            return new Response('SECRET', { status })
          },
        },
      ),
      new RegExp(`HTTP ${status}`),
    )
    assert.equal(calls, 1)
  }
  await assert.rejects(
    deliver(
      hook,
      {},
      {
        sleep: async () => assert.fail('deadline exceeded'),
        fetcher: async () => new Response('{"retry_after":999}', { status: 429 }),
      },
    ),
    /429/,
  )
  await assert.rejects(
    deliver(
      hook,
      {},
      {
        sleep: async () => {},
        fetcher: async () => {
          throw new Error(hook)
        },
      },
    ),
    (error) => !error.message.includes('webhooks'),
  )
})

test('artifacts from PRs, forks and non-main branches are never trusted', () => {
  const candidate = {
    repository: { ...repository, default_branch: 'main' },
    workflow_run: { ...run, event: 'push', head_branch: 'main', head_repository: repository },
  }
  assert.equal(trustedOutcomeRun(config, candidate), true)
  for (const patch of [
    { event: 'pull_request' },
    { head_branch: 'feature' },
    { head_repository: { full_name: 'fork/project' } },
  ])
    assert.equal(
      trustedOutcomeRun(config, {
        ...candidate,
        workflow_run: { ...candidate.workflow_run, ...patch },
      }),
      false,
    )
})
test('missing deployment evidence is unknown even when the parent CI run passes', () => {
  const result = notifications(
    config,
    'workflow_run',
    { ...event, workflow_run: { ...run, name: 'CI', conclusion: 'success' } },
    { deliveryExpected: true },
  )
  assert.match(result[0].body.embeds[0].title, /unknown/)
})
test('outcome kind cannot falsely claim a different operation succeeded', () => {
  assert.throws(() =>
    validateOutcome(
      {
        schema: 1,
        repository: config.repository,
        runId: 42,
        attempt: 1,
        kind: 'deploy',
        outcome: 'published',
      },
      run,
      config.repository,
    ),
  )
})
test('metadata messages include their sending run identity', () => {
  const event = {
    repository: { full_name: config.repository },
    action: 'opened',
    pull_request: {
      number: 7,
      title: 'Review',
      state: 'open',
      draft: false,
      user: { login: 'author' },
      html_url: `https://github.com/${config.repository}/pull/7`,
    },
  }
  const messages = notifications(config, 'pull_request_target', event, {
    notificationIdentity: 'run 123 · attempt 2',
  })
  assert.match(messages[0].body.embeds[0].footer.text, /run 123 · attempt 2/)
})

// Exercise API orchestration too: every HTTP request is replaced before the
// sender is imported, and unknown requests fail closed instead of using a network.
async function runCli(t, stale) {
  const { mkdtemp, writeFile, readFile, copyFile, rm } = await import('node:fs/promises')
  const { tmpdir } = await import('node:os')
  const { join } = await import('node:path')
  const { execFile } = await import('node:child_process')
  const { promisify } = await import('node:util')
  const dir = await mkdtemp(join(tmpdir(), 'notification-cli-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  for (const file of ['notify.mjs', 'notification-policy.mjs', 'discord-delivery.mjs'])
    await copyFile(new URL(file, import.meta.url), join(dir, file))
  await writeFile(
    join(dir, 'config.json'),
    JSON.stringify({ ...config, secrets: { cicd: 'TEST_WEBHOOK' } }),
  )
  const workflowRun = {
    ...run,
    event: 'pull_request',
    conclusion: 'success',
    workflow_id: 5,
    run_number: 20,
    run_attempt: 3,
    head_branch: 'feature',
    head_repository: { full_name: 'contributor/fork' },
    pull_requests: [{ number: 7 }],
  }
  await writeFile(join(dir, 'event.json'), JSON.stringify({ ...event, workflow_run: workflowRun }))
  await writeFile(
    join(dir, 'mock.mjs'),
    `
    import { appendFileSync } from 'node:fs';
    globalThis.fetch = async (input, options) => {
      const url = new URL(input);
      if (url.hostname === 'discord.com') {
        appendFileSync(process.env.CAPTURE, options.body + '\\n');
        return new Response('{}', {status: 200});
      }
      let value;
      if (url.pathname.endsWith('/pulls/7')) value = {state:'open', head:{sha:${JSON.stringify(stale ? 'newer' : 'abc')}}};
      else if (url.pathname.endsWith('/attempts/3/jobs')) value = {jobs:[]};
      else if (url.pathname.endsWith('/workflows/5/runs')) value = {workflow_runs:[]};
      else if (url.pathname.endsWith('/attempts/2')) value = {conclusion:'cancelled'};
      else if (url.pathname.endsWith('/attempts/1')) value = {conclusion:'failure'};
      else throw new Error('Unexpected offline request');
      return new Response(JSON.stringify(value), {status:200});
    };
  `,
  )
  await promisify(execFile)(
    process.execPath,
    ['--import', join(dir, 'mock.mjs'), join(dir, 'notify.mjs')],
    {
      env: {
        ...process.env,
        GITHUB_REPOSITORY: config.repository,
        GITHUB_EVENT_PATH: join(dir, 'event.json'),
        GITHUB_EVENT_NAME: 'workflow_run',
        GITHUB_RUN_ID: '99',
        GITHUB_RUN_ATTEMPT: '1',
        GH_TOKEN: 'offline',
        TEST_WEBHOOK: 'https://discord.com/api/webhooks/1/offline',
        CAPTURE: join(dir, 'messages'),
      },
    },
  )
  const raw = await readFile(join(dir, 'messages'), 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return ''
    throw error
  })
  return raw
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}
test('CLI suppresses a completed check after the PR head changes', async (t) => {
  assert.deepEqual(await runCli(t, true), [])
})
test('CLI reports recovery after a cancelled rerun between failure and success', async (t) => {
  const messages = await runCli(t, false)
  assert.equal(messages.length, 1)
  assert.match(messages[0].embeds[0].title, /recovered/)
  assert.match(messages[0].embeds[0].footer.text, /run 42 · attempt 3/)
})
