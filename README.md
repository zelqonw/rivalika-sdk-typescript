# Rivalika TypeScript SDK

Official TypeScript client for Rivalika's `/api/v1` public API, generated from
the committed OpenAPI 3.1 contract with OpenAPI Generator 7.22.0. The package
also includes maintained helpers for verifying signed webhook deliveries.

The beta package name is `@rivalika/sdk` and its first approved release will be
`1.0.0-beta.3`. Registry publication is a separate release approval; until that
tag is published, clone this repository and run `npm ci && npm run build`.

## API client

API keys are server credentials. Keep them outside browser bundles and source
control. Every mutation requires an `Idempotency-Key` through the generated
`idempotencyKey` operation argument.

```ts
import { AlertsApi, Configuration } from "@rivalika/sdk";

const alerts = new AlertsApi(
  new Configuration({ accessToken: process.env.RIVALIKA_API_KEY }),
);

const rule = await alerts.createAlertRule({
  idempotencyKey: crypto.randomUUID(),
  createAlertRuleRequest: {
    condition: "dropsBelow",
    thresholdPrice: 999,
  },
});
```

Generated endpoint references live in [`docs/`](docs/) and the exact generation
input is [`openapi/rivalika-public-api.json`](openapi/rivalika-public-api.json).

## Verify webhooks

Verify the exact raw request body before parsing it. The helper performs a
constant-time signature comparison and rejects timestamps older than five
minutes by default.

```ts
import { parseAndVerifyWebhook } from "@rivalika/sdk";

const event = parseAndVerifyWebhook({
  secret: process.env.RIVALIKA_WEBHOOK_SECRET!,
  payload: rawBody,
  headers: {
    "webhook-id": request.headers["webhook-id"],
    "webhook-timestamp": request.headers["webhook-timestamp"],
    "webhook-signature": request.headers["webhook-signature"],
  },
});
```

Consumers must also deduplicate `webhook-id` values for their business replay
window.

## Development

```bash
npm ci
npm run check
docker run --rm -w /local -v "$PWD:/local" \
  openapitools/openapi-generator-cli:v7.22.0 \
  generate -c openapi-generator-config.json
git diff --exit-code
```

Generated API and model files are not hand-edited. See [CONTRIBUTING](CONTRIBUTING.md)
and [SECURITY](SECURITY.md) for contribution and vulnerability-reporting rules.

## Maintained integration helpers (beta 3)

`IntegrationClient` complements the generated clients with bounded pagination,
organization attestation, safe retries, import polling and restart recovery,
authenticated downloads and lossless `integration_v1` exports.

```ts
import { IntegrationClient } from '@rivalika/sdk'
const sdk = new IntegrationClient({ apiKey, organizationId })
await sdk.attest(['repricing:apply'])
for await (const product of sdk.pages('/api/v1/commercial/products')) {
  // Persist application-specific mapping here.
}
const result = await sdk.importCsv('products', csvBytes, {
  expectedRows: 100, dryRun: true, idempotencyKey: 'snapshot-products-chunk-1',
  state: previousProgress, progress: saveProgress,
})
```

The default host is `https://api.rivalika.md`. Import chunks are limited to 5,000 rows
and 25 MiB. Supply `validationImportIds` for successful product/partner dry runs to
validate a fresh catalog's dependency chain without commercial writes. Persist each
progress callback, use different keys for dry-run and apply, and resume the same
content with the same state. Rejected or missing rows fail explicitly. Upload URL
renewal never forwards API credentials to storage.

`export(request, idempotencyKey)` validates archive bounds, organization, dataset,
export ID and expected row count. Decimal amounts stay strings.
`download(endpoint)` only accepts an authenticated API-origin descriptor. Copy
reports to application storage before Rivalika's 14-day source expiry when longer
retention is required. `verifyWebhookEnvelope` checks signed event identity, version
and organization; durable deduplication remains the caller's responsibility.

Beta publication uses `npm publish --tag beta`. Release gates include tests,
generation drift, package inspection and clean CommonJS/ES-module consumer installs.
