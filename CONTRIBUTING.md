# Contributing

The API client is generated from `openapi/rivalika-public-api.json` with OpenAPI Generator
7.22.0. Do not hand-edit generated API or model files. Contributions to authentication,
webhook verification, tests, and documentation are welcome through a pull request.

Run `npm ci && npm run check` before submitting a change. Use Conventional Commits.

## Spec sync

The Rivalika monorepo owns the OpenAPI contract. After a qualified `main` build
whose public spec differs from the one committed here (and from any pending
`bot/openapi-sync` branch), its `Sync SDKs` workflow sends an `openapi-updated`
dispatch and waits for `.github/workflows/sync-openapi.yml` to finish; a failed
sync fails that run and reaches the Rivalika ops channel.

`sync-openapi.yml` fetches the spec at the dispatched commit, regenerates with
the pinned generator and opens or updates the single `bot/openapi-sync` pull
request, then starts Verify on it (pull requests opened with `GITHUB_TOKEN` do
not trigger workflows on their own). Maintained helpers, entry points and tests are not
regenerated: when the contract changes their shape, add that change to the bot
pull request before merging.

Self-hosted runners keep their workspaces between jobs, so containers that
write into the checkout run as the runner user (`--user "$(id -u):$(id -g)"`);
with rootless Podman also pass `--userns=keep-id`.

## Live check

`npm run build && node scripts/smoke.mjs` calls read-only endpoints through the generated
client against a running API (`RIVALIKA_BASE_URL`, default production, and
`RIVALIKA_API_KEY`). Run it against a local Rivalika stack before merging a
sync that changes shapes.

## Releases (written for beta.3)

The API and npm package version is `1.0.0-beta.3`. Generate using the pinned
OpenAPI Generator 7.22.0 configuration, then verify a second generation leaves both
tracked and newly generated files unchanged. Integration/webhook helpers and package
entry points are maintained and intentionally excluded from regeneration.

Run `npm ci`, `npm run check`, `npm audit` and `npm pack`. Install the tarball in a
clean consumer and check CJS and ESM root imports plus actual REST responses through
both generated API classes and `IntegrationClient`. Record the OpenAPI hash
and tarball integrity alongside the matching Python wheel and validated API release.

Publish with tag `v1.0.0-beta.3` through `.github/workflows/publish.yml`, GitHub
environment `npm`. npm's distribution tag must remain `beta`; this release must not
move `latest`. Initial package creation is complete as of beta.2. Prefer the configured
trusted publisher; the bootstrap token is an owner-managed fallback while that
relationship is completed. Never put a registry token in repository files or logs.
Verify registry version/integrity and install the registry package in a clean consumer
before downstream production deployment. Local build success is not publication.
