import { describe, expect, it, vi } from 'vitest'
import { IntegrationClient, IntegrationError, readIntegrationExport } from '../src/integration'
import { zipSync, strToU8 } from 'fflate'

const organizationId = '11111111-1111-4111-8111-111111111111'
const create = (fetcher: typeof fetch) => new IntegrationClient({ apiKey: 'test', organizationId, fetch: fetcher, sleep: async () => {} })

describe('official integration helpers', () => {
  it('paginates with counts and rejects repeated rows', async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify({ data: [{ id: 'same' }], page: { total: 3, has_more: true } })))
    const client = create(fetcher)
    await expect((async () => { for await (const row of client.pages('/api/v1/commercial/products')) { void row } })()).rejects.toThrow('Repeated')
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
  it('retries idempotent requests but never leaks authorization to another origin', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(new Response('', { status: 503 })).mockResolvedValueOnce(new Response('{}'))
    const client = create(fetcher)
    await client.request('POST', '/api/v1/reports', { name: 'one' }, 'stable')
    expect(fetcher).toHaveBeenCalledTimes(2)
    await expect(client.request('GET', 'https://elsewhere.example/')).rejects.toThrow(IntegrationError)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
  it('decodes exact amounts and validates export organization and count', () => {
    const row = { price: '9999999999.1234', internal_sku: '001', name: 'line\nwith a comma, and "quotes"' }
    const csv = 'record_json\r\n"' + JSON.stringify(row).replace(/"/g, '""') + '"\r\n'
    const bytes = zipSync({ 'metadata.json': strToU8(JSON.stringify({ organization_id: organizationId, profile: 'integration_v1', row_count: 1 })), 'integration.csv': strToU8(csv) })
    expect(readIntegrationExport(bytes, organizationId).rows).toEqual([row])
    expect(() => readIntegrationExport(bytes, 'other')).toThrow(IntegrationError)
  })
  it('resumes an import using its durable ID', async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify({ data: { status: 'completed', total_rows: 1, imported_rows: 1, rejected_rows: 0 } })))
    const client = create(fetcher)
    const { createHash } = await import('node:crypto')
    const content = new TextEncoder().encode('name\na\n')
    await client.importCsv('products', content, { expectedRows: 1, dryRun: false, idempotencyKey: 'x', state: { sha256: createHash('sha256').update(content).digest('hex'), dryRun: false, importId: organizationId } })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})

it('renews an expired upload and carries dry-run dependencies without storage credentials', async () => {
  let uploads = 0
  const writes: Record<string, unknown>[] = []
  const progress: unknown[] = []
  const fetcher = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input)
    if (url.startsWith('https://storage.example/')) {
      uploads++
      expect(new Headers(init?.headers).has('Authorization')).toBe(false)
      return new Response('', { status: uploads === 1 ? 403 : 200 })
    }
    if (url.endsWith('/prepare-upload')) return new Response(JSON.stringify({ data: { upload_url: 'https://storage.example/upload', storage_key: 'staging-file', upload_headers: { 'Content-Type': 'text/csv' } } }))
    if (init?.method === 'POST') {
      writes.push(JSON.parse(String(init.body)))
      return new Response(JSON.stringify({ data: { id: organizationId } }))
    }
    return new Response(JSON.stringify({ data: { id: organizationId, status: 'completed', total_rows: 1, imported_rows: 1, rejected_rows: 0 } }))
  })
  await create(fetcher).importCsv('supplier_offers', strToU8('name\nexample\n'), {
    expectedRows: 1, dryRun: true, idempotencyKey: 'dry-run', validationImportIds: [organizationId],
    progress: async state => { progress.push(state) },
  })
  expect(uploads).toBe(2)
  expect(writes).toHaveLength(1)
  expect(writes[0].validationImportIds).toEqual([organizationId])
  expect(progress).toHaveLength(3)
})
