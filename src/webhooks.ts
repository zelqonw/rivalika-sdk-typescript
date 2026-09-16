import { createHmac, timingSafeEqual } from 'node:crypto'

export interface RivalikaWebhookHeaders {
  readonly 'webhook-id': string
  readonly 'webhook-timestamp': string
  readonly 'webhook-signature': string
}

export interface VerifyWebhookOptions {
  readonly secret: string
  readonly payload: string
  readonly headers: RivalikaWebhookHeaders
  readonly toleranceSeconds?: number
  readonly now?: Date
}

export class WebhookVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WebhookVerificationError'
  }
}

const signingKey = (secret: string): Buffer => {
  if (!secret.startsWith('whsec_')) {
    throw new WebhookVerificationError('Invalid Rivalika webhook signing secret')
  }
  return Buffer.from(secret.slice('whsec_'.length), 'base64url')
}

export function verifyWebhookSignature({
  secret,
  payload,
  headers,
  toleranceSeconds = 300,
  now = new Date(),
}: VerifyWebhookOptions): void {
  const timestamp = Number(headers['webhook-timestamp'])
  if (!Number.isSafeInteger(timestamp)) {
    throw new WebhookVerificationError('Invalid webhook timestamp')
  }
  if (Math.abs(Math.floor(now.getTime() / 1_000) - timestamp) > toleranceSeconds) {
    throw new WebhookVerificationError('Webhook timestamp is outside the replay tolerance')
  }
  const expected = createHmac('sha256', signingKey(secret))
    .update(`${headers['webhook-id']}.${timestamp}.${payload}`)
    .digest()
  const valid = headers['webhook-signature'].split(' ').some((candidate) => {
    const [version, encoded] = candidate.split(',', 2)
    if (version !== 'v1' || encoded === undefined) return false
    const received = Buffer.from(encoded, 'base64')
    return received.byteLength === expected.byteLength && timingSafeEqual(received, expected)
  })
  if (!valid) throw new WebhookVerificationError('Invalid webhook signature')
}

export function parseAndVerifyWebhook<T = unknown>(options: VerifyWebhookOptions): T {
  verifyWebhookSignature(options)
  return JSON.parse(options.payload) as T
}


export function verifyWebhookEnvelope(options: VerifyWebhookOptions & {
  organizationId: string; eventTypes: readonly string[]
}): Record<string, unknown> {
  const event = parseAndVerifyWebhook<Record<string, unknown>>(options)
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!event || event.api_version !== 'v1' || !uuid.test(String(event.id)) || !uuid.test(String(event.organization_id))) throw new WebhookVerificationError('Invalid webhook envelope identity or version')
  if (event.id !== options.headers['webhook-id'] || event.organization_id !== options.organizationId) throw new WebhookVerificationError('Webhook organization or event identity mismatch')
  if (!options.eventTypes.includes(String(event.type)) || !event.data || typeof event.data !== 'object' || Array.isArray(event.data)) throw new WebhookVerificationError('Unsupported webhook event')
  return event
}
