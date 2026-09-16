import { createHash, randomUUID } from 'node:crypto'
import { unzipSync, strFromU8 } from 'fflate'

export class IntegrationError extends Error {}
export interface IntegrationOptions {
  apiKey: string
  organizationId: string
  baseUrl?: string
  fetch?: typeof fetch
  sleep?: (milliseconds: number) => Promise<void>
}
export type IntegrationRecord = Record<string, unknown>
export interface ImportProgress {
  sha256: string
  dryRun: boolean
  validationImportIds?: string[]
  request?: IntegrationRecord
  importId?: string
  result?: IntegrationRecord
}

/** Bounded integration helpers alongside the generated operation clients. */
export class IntegrationClient {
  private readonly base: string
  private readonly fetcher: typeof fetch
  private readonly sleep: (milliseconds: number) => Promise<void>
  constructor(private readonly options: IntegrationOptions) {
    this.base = options.baseUrl ?? 'https://api.rivalika.md'
    this.fetcher = options.fetch ?? fetch
    this.sleep = options.sleep ?? (milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds)))
  }
  async request(method: string, path: string, input?: IntegrationRecord, key?: string): Promise<Response> {
    const url = new URL(path, this.base)
    if (url.origin !== new URL(this.base).origin) throw new IntegrationError('Authenticated request origin mismatch')
    const retryable = method === 'GET' || key !== undefined
    for (let attempt = 0; attempt < 4; attempt++) {
      let response: Response
      try {
        response = await this.fetcher(url, { method, redirect: 'manual', signal: AbortSignal.timeout(30000),
          headers: { Authorization: `Bearer ${this.options.apiKey}`, 'X-Organization-Id': this.options.organizationId,
            ...(input ? { 'Content-Type': 'application/json' } : {}), ...(key ? { 'Idempotency-Key': key } : {}) },
          ...(input ? { body: JSON.stringify(input) } : {}) })
      } catch (error) {
        if (!retryable || attempt === 3) throw error
        await this.sleep(Math.min(2 ** attempt * 1000, 30000))
        continue
      }
      if (response.ok) return response
      if (!retryable || ![429, 502, 503, 504].includes(response.status) || attempt === 3) {
        throw new IntegrationError(`Rivalika request failed (${response.status})`)
      }
      const retry = response.headers.get('Retry-After')
      await response.body?.cancel()
      await this.sleep(retry && /^\d+$/.test(retry) ? Math.min(Number(retry) * 1000, 60000) : 2 ** attempt * 1000)
    }
    throw new IntegrationError('Request attempts exhausted')
  }
  async data(method: string, path: string, body?: IntegrationRecord, key?: string): Promise<IntegrationRecord> {
    const result = await (await this.request(method, path, body, key)).json()
    if (!result.data || typeof result.data !== 'object' || Array.isArray(result.data)) throw new IntegrationError('Invalid data envelope')
    return result.data
  }
  async attest(forbiddenScopes: string[] = []): Promise<IntegrationRecord> {
    const context = await this.data('GET', '/api/v1/context')
    if (context.organization_id !== this.options.organizationId) throw new IntegrationError('Organization mismatch')
    if (Array.isArray(context.scopes) && context.scopes.some(scope => forbiddenScopes.includes(scope))) throw new IntegrationError('Forbidden credential scope')
    return context
  }
  async *pages(path: string, params: Record<string, string> = {}, cursor = false): AsyncGenerator<IntegrationRecord> {
    const seen = new Set<string>()
    let expected: number | undefined
    let received = 0
    let nextCursor: string | undefined
    for (let number = 1; number <= 10000; number++) {
      const url = new URL(path, this.base)
      for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)
      url.searchParams.set(cursor ? 'limit' : 'size', '100')
      if (cursor && nextCursor) url.searchParams.set('cursor', nextCursor)
      if (!cursor) url.searchParams.set('page', String(number))
      const result = await (await this.request('GET', url.toString())).json()
      const rows = result.data
      const page = result.page
      if (!Array.isArray(rows) || !page || typeof page.has_more !== 'boolean' || !Number.isSafeInteger(page.total) || page.total < 0) throw new IntegrationError('Invalid pagination envelope')
      expected ??= page.total
      if (page.total !== expected) throw new IntegrationError('Collection changed during capture')
      for (const row of rows) {
        const identity = String(row.id ?? JSON.stringify(row))
        if (seen.has(identity)) throw new IntegrationError('Repeated pagination row')
        seen.add(identity)
        received++
        yield row
      }
      if (!page.has_more) {
        if (received !== expected) throw new IntegrationError('Collection count mismatch')
        return
      }
      if (!rows.length) throw new IntegrationError('Empty page claims more results')
      if (cursor) {
        if (!page.next_cursor || page.next_cursor === nextCursor) throw new IntegrationError('Missing or repeated cursor')
        nextCursor = page.next_cursor
      }
    }
    throw new IntegrationError('Pagination limit exceeded')
  }
  async poll(path: string, timeoutMs = 1800000): Promise<IntegrationRecord> {
    const deadline = Date.now() + timeoutMs
    for (;;) {
      const value = await this.data('GET', path)
      if (['completed', 'succeeded', 'ready', 'failed', 'cancelled', 'expired'].includes(String(value.status))) return value
      if (Date.now() >= deadline) throw new IntegrationError('Operation still running; resume with persisted ID')
      await this.sleep(2000)
    }
  }
  async importCsv(kind: string, content: Uint8Array, options: {
    expectedRows: number; dryRun: boolean; idempotencyKey: string; state?: ImportProgress;
    validationImportIds?: string[];
    progress?: (state: ImportProgress) => Promise<void>
  }): Promise<IntegrationRecord> {
    if (!Number.isInteger(options.expectedRows) || options.expectedRows < 1 || options.expectedRows > 5000 || !content.byteLength || content.byteLength > 25 * 1024 * 1024) throw new IntegrationError('Import exceeds limits')
    if (options.validationImportIds?.length && !options.dryRun) throw new IntegrationError('Validation dependencies require dryRun')
    const dependencies = options.validationImportIds ?? []
    const sha256 = createHash('sha256').update(content).digest('hex')
    const state: ImportProgress = options.state ? { ...options.state } : { sha256, dryRun: options.dryRun }
    if (options.state && (state.sha256 !== sha256 || state.dryRun !== options.dryRun || JSON.stringify(state.validationImportIds ?? []) !== JSON.stringify(dependencies))) throw new IntegrationError('Import resume identity mismatch')
    state.validationImportIds = dependencies
    const save = async () => options.progress?.({ ...state })
    if (!state.importId) {
      if (!state.request) {
        const fileName = `${kind}-${sha256}.csv`
        let upload: IntegrationRecord
        for (let attempt = 0; attempt < 2; attempt++) {
          upload = await this.data('POST', '/api/v1/commercial/imports/prepare-upload',
            { fileName, contentSha256: sha256, sizeBytes: content.byteLength }, `${options.idempotencyKey}-upload-${randomUUID()}`)
          const url = new URL(String(upload.upload_url))
          if (url.protocol !== 'https:' || url.username || url.password) throw new IntegrationError('Invalid storage URL')
          const response = await this.fetcher(url, { method: 'PUT', body: content as BodyInit, headers: upload.upload_headers as Record<string, string>, redirect: 'manual', signal: AbortSignal.timeout(120000) })
          if ([401, 403].includes(response.status) && attempt === 0) continue
          if (!response.ok) throw new IntegrationError(`Upload failed (${response.status})`)
          break
        }
        state.request = { kind, fileName, contentSha256: sha256, sizeBytes: content.byteLength, storageKey: upload!.storage_key, dryRun: options.dryRun, autoMatchEnabled: false, validationImportIds: dependencies }
        await save()
      }
      state.importId = String((await this.data('POST', '/api/v1/commercial/imports', state.request, options.idempotencyKey)).id)
      await save()
    }
    const detail = await this.poll(`/api/v1/commercial/imports/${encodeURIComponent(state.importId)}`)
    state.result = detail
    await save()
    if (detail.status !== 'completed' || detail.rejected_rows !== 0 || detail.imported_rows !== options.expectedRows || detail.total_rows !== options.expectedRows) throw new IntegrationError('Import rejected or missing rows; inspect persisted results')
    return detail
  }
  async export(request: IntegrationRecord, idempotencyKey: string): Promise<{ metadata: IntegrationRecord; rows: IntegrationRecord[] }> {
    const accepted = await this.data('POST', '/api/v1/exports', { ...request, profile: 'integration_v1', format: 'csvZip' }, idempotencyKey)
    const id = String(accepted.id)
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw new IntegrationError('Invalid export identity')
    const detail = await this.poll(`/api/v1/exports/${id}`)
    if (detail.status !== 'ready') throw new IntegrationError('Export did not complete')
    const result = readIntegrationExport(await this.download(`/api/v1/exports/${id}/download`), this.options.organizationId)
    if (result.metadata.export_id !== id || result.metadata.dataset !== request.dataset) throw new IntegrationError('Export identity mismatch')
    return result
  }
  async download(endpoint: string, maxBytes = 100 * 1024 * 1024): Promise<Uint8Array> {
    const descriptor = await this.data('GET', endpoint)
    const url = new URL(String(descriptor.download_url), this.base)
    if (url.origin !== new URL(this.base).origin) throw new IntegrationError('Download origin mismatch')
    const response = await this.request('GET', url.toString())
    const reader = response.body?.getReader()
    if (!reader) throw new IntegrationError('Missing download body')
    const chunks: Uint8Array[] = []
    let size = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.length
      if (size > maxBytes) { await reader.cancel(); throw new IntegrationError('Download limit exceeded') }
      chunks.push(value)
    }
    const output = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length }
    return output
  }
}

/** Decode the lossless CSV JSON column; no numeric coercion or locale parsing. */
export function readIntegrationExport(content: Uint8Array, organizationId: string): { metadata: IntegrationRecord; rows: IntegrationRecord[] } {
  let total = 0
  let entries = 0
  const files = unzipSync(content, { filter: entry => {
    entries += 1
    total += entry.originalSize
    if (total > 512 * 1024 * 1024 || !['metadata.json', 'integration.csv'].includes(entry.name)) throw new IntegrationError('Invalid export archive')
    return true
  } })
  if (entries !== 2 || Object.keys(files).length !== 2) throw new IntegrationError('Missing export entries')
  const metadata = JSON.parse(strFromU8(files['metadata.json']))
  if (metadata.profile !== 'integration_v1' || metadata.organization_id !== organizationId) throw new IntegrationError('Export profile or organization mismatch')
  const lines = strFromU8(files['integration.csv']).trimEnd().split(/\r?\n/)
  if (lines.shift() !== 'record_json') throw new IntegrationError('Invalid export header')
  const rows = lines.map(line => JSON.parse(line.startsWith('"') ? line.slice(1, -1).replace(/""/g, '"') : line))
  if (rows.some(row => row === null || typeof row !== 'object' || Array.isArray(row)) || rows.length !== metadata.row_count) throw new IntegrationError('Export row count mismatch')
  return { metadata, rows }
}
