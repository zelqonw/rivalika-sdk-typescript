// Public-safe, dependency-free transport. No server inventory belongs here.
export function safeText(value, limit = 1000) {
  return String(value ?? '')
    .replace(/https?:\/\/[^\s]*discord(?:app)?\.com\/api\/webhooks\/[^\s]+/gi, '[redacted webhook]')
    .split('')
    .map((character) =>
      character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 ? ' ' : character,
    )
    .join('')
    .replace(/@/g, '@\u200b')
    .slice(0, limit)
}
export function payload(title, lines, identity, url) {
  const result = {
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: safeText(title, 256),
        description: safeText(lines.join('\n'), 3900),
        footer: { text: safeText(identity, 500) },
      },
    ],
  }
  // Preserve deliberate formatting newlines, but never take a raw embed from an event.
  result.embeds[0].description = lines
    .map((line) => safeText(line, 1000))
    .join('\n')
    .slice(0, 3900)
  if (/^https:\/\/github\.com\//.test(url || '')) result.embeds[0].url = url
  return result
}
export async function deliver(
  webhook,
  body,
  { fetcher = fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)), now = Date.now } = {},
) {
  if (!webhook) throw new Error('Required Discord destination secret is missing')
  let target
  try {
    target = new URL(webhook)
  } catch {
    throw new Error('Invalid Discord destination')
  }
  if (
    target.protocol !== 'https:' ||
    target.hostname !== 'discord.com' ||
    !/^\/api\/webhooks\/\d+\/[\w-]+$/.test(target.pathname)
  )
    throw new Error('Invalid Discord destination')
  target.searchParams.set('wait', 'true')
  if (JSON.stringify(body).length > 30000)
    throw new Error('Notification payload exceeds delivery limit')
  body.allowed_mentions = { parse: [] }
  const deadline = now() + 120000
  let status = 'network failure'
  for (let attempt = 0; attempt < 4 && now() < deadline; attempt++) {
    let delay = 1000 * 2 ** attempt
    try {
      const response = await fetcher(target, {
        method: 'POST',
        redirect: 'error',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(Math.max(1, Math.min(15000, deadline - now()))),
      })
      status = `HTTP ${response.status}`
      if (response.ok) return
      if (response.status === 429) {
        const detail = await response.json().catch(() => ({}))
        const retry = Number(response.headers.get('retry-after') ?? detail.retry_after)
        if (Number.isFinite(retry) && retry >= 0) delay = Math.max(1000, retry * 1000)
      } else if (response.status < 500) break
    } catch {
      status = 'network failure'
    }
    if (attempt === 3 || now() + delay >= deadline) break
    await sleep(delay)
  }
  throw new Error(`Discord delivery exhausted: ${status}`)
}
