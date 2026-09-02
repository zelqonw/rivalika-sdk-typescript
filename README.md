# Rivalika TypeScript SDK

Official TypeScript client for Rivalika's `/api/v1` public API, generated from
the committed OpenAPI 3.1 contract with OpenAPI Generator 7.22.0. The package
also includes maintained helpers for verifying signed webhook deliveries.

The beta package name is `@rivalika/sdk` and its first approved release will be
`1.0.0-beta.2`. Registry publication is a separate release approval; until that
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
