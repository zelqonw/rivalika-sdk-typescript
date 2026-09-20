import { mkdirSync, writeFileSync } from 'node:fs'
import { validateOutcome } from './notification-policy.mjs'
const env = process.env
const value = {
  schema: 1,
  repository: env.GITHUB_REPOSITORY,
  runId: env.GITHUB_RUN_ID,
  attempt: Number(env.GITHUB_RUN_ATTEMPT),
  kind: env.NOTIFY_KIND,
  outcome: env.NOTIFY_OUTCOME || 'unknown',
  environment: env.NOTIFY_ENVIRONMENT || '',
  requested: env.NOTIFY_REQUESTED || '',
  release: env.NOTIFY_RELEASE || '',
  stage: env.NOTIFY_STAGE || '',
  version: env.NOTIFY_VERSION || '',
  source: env.NOTIFY_SOURCE || '',
}
if (env.NOTIFY_PR) value.pr = Number(env.NOTIFY_PR)
validateOutcome(
  value,
  { id: env.GITHUB_RUN_ID, run_attempt: env.GITHUB_RUN_ATTEMPT },
  env.GITHUB_REPOSITORY,
)
mkdirSync('output/notifications', { recursive: true })
writeFileSync('output/notifications/outcome.json', JSON.stringify(value))
