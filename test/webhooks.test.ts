import { createHmac } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { parseAndVerifyWebhook, verifyWebhookSignature } from '../src/webhooks'

const secret = `whsec_${Buffer.from('01234567890123456789012345678901').toString('base64url')}`
const payload = '{"id":"evt_1","type":"endpoint.test.v1"}'
const timestamp = 1_788_192_000
const headers = {
  'webhook-id': 'evt_1',
  'webhook-timestamp': timestamp.toString(),
  'webhook-signature': `v1,${createHmac('sha256', Buffer.from(secret.slice(6), 'base64url')).update(`evt_1.${timestamp}.${payload}`).digest('base64')}`,
}

describe('Rivalika webhook verification', () => {
  it('verifies and parses an authentic event', () => {
    expect(parseAndVerifyWebhook({ secret, payload, headers, now: new Date(timestamp * 1_000) })).toEqual({
      id: 'evt_1',
      type: 'endpoint.test.v1',
    })
  })

  it('rejects payload tampering', () => {
    expect(() => verifyWebhookSignature({ secret, payload: `${payload} `, headers, now: new Date(timestamp * 1_000) })).toThrow('Invalid webhook signature')
  })

  it('rejects replayed events outside the default five-minute tolerance', () => {
    expect(() => verifyWebhookSignature({ secret, payload, headers, now: new Date((timestamp + 301) * 1_000) })).toThrow('outside the replay tolerance')
  })
})
