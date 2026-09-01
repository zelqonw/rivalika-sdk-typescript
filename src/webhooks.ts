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
