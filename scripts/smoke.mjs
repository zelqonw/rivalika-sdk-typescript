// Live check that this SDK still talks to a running Rivalika API.
//
//   npm run build
//   RIVALIKA_BASE_URL=http://localhost:3000 RIVALIKA_API_KEY=... node scripts/smoke.mjs
//
// Read-only: it lists and reads, it never creates anything. Not part of CI,
// because it needs a real API key.
import { createRequire } from 'node:module'

const sdk = createRequire(import.meta.url)('../dist/index.js')
const basePath = (process.env.RIVALIKA_BASE_URL ?? 'https://api.rivalika.md').replace(/\/$/, '')
const apiKey = process.env.RIVALIKA_API_KEY
if (!apiKey) throw new Error('RIVALIKA_API_KEY is required')
const configuration = new sdk.Configuration({ basePath, accessToken: apiKey })

const checks = [
  ['context', () => new sdk.ContextApi(configuration).getContext()],
  ['stores', () => new sdk.StoresApi(configuration).listStores({ size: 5 })],
  ['products', () => new sdk.CatalogApi(configuration).listProducts({ size: 5 })],
  ['exports', () => new sdk.ExportsApi(configuration).listExports({ limit: 5 })],
  ['alert rules', () => new sdk.AlertsApi(configuration).listAlertRules({ size: 5 })],
  ['reports', () => new sdk.ReportsApi(configuration).listReports({ size: 5 })],
  ['webhook endpoints', () => new sdk.WebhooksApi(configuration).listWebhookEndpoints()],
  [
    'commercial import detail',
    // A typed detail model, not a list of plain records: catches a changed
    // required field or format that list envelopes would let through.
    async () => {
      const imports = new sdk.CommercialImportsApi(configuration)
      const [first] = (await imports.listCommercialImports({ size: 1 })).data
      return first ? imports.getCommercialImport({ importId: first.id }) : { data: {} }
    },
  ],
]
// Operations newer than some generated trees: checked when present.
if (typeof sdk.ExportsApi.prototype.listExportSchedules === 'function')
  checks.push(['export schedules', () => new sdk.ExportsApi(configuration).listExportSchedules()])

let failed = 0
for (const [name, call] of checks) {
  try {
    const result = await call()
    const data = result?.data
    if (data === undefined || data === null) throw new Error('response has no data envelope')
    const detail = Array.isArray(data) ? `${data.length} item(s)` : `${Object.keys(data).length} field(s)`
    console.log(`ok    ${name}: ${detail}`)
  } catch (error) {
    failed++
    const status = error?.response?.status
    console.log(`FAIL  ${name}: ${status ? `HTTP ${status}` : (error?.message ?? error)}`)
  }
}
console.log(
  failed
    ? `${failed} of ${checks.length} checks failed against ${basePath}`
    : `all ${checks.length} checks passed against ${basePath}`,
)
process.exitCode = failed ? 1 : 0
