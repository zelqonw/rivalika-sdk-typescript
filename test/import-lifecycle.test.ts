import { describe, expect, it } from 'vitest'
import {
  CommercialCatalogApi,
  CommercialImportDetailEnvelopeFromJSON,
  CommercialImportDetailEnvelopeToJSON,
  CommercialImportPreparedUploadEnvelopeFromJSON,
  CommercialImportPreparedUploadEnvelopeToJSON,
  CommercialImportsApi,
  CommercialProductLifecycleEnvelopeFromJSON,
  CommercialProductLifecycleEnvelopeToJSON,
  Configuration,
} from '../src'

const apiKey = 'rk_live_test'
const idempotencyKey = 'sync-snapshot-42'
const productId = '11111111-1111-4111-8111-111111111111'
const importId = '22222222-2222-4222-8222-222222222222'

const configuration = new Configuration({ accessToken: apiKey })

describe('commercial import upload and detail contracts', () => {
  it('serializes a prepare-upload request with authentication and idempotency', async () => {
    const request = await new CommercialImportsApi(configuration).prepareCommercialImportUploadRequestOpts({
      idempotencyKey,
      prepareCommercialImportUploadRequest: {
        fileName: 'products.csv',
        contentSha256: 'a'.repeat(64),
        sizeBytes: 128,
      },
    })

    expect(request).toEqual({
      path: '/api/v1/commercial/imports/prepare-upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
        Authorization: `Bearer ${apiKey}`,
      },
      query: {},
      body: {
        fileName: 'products.csv',
        contentSha256: 'a'.repeat(64),
        sizeBytes: 128,
      },
    })
  })

  it('serializes an authenticated import-detail request', async () => {
    const request = await new CommercialImportsApi(configuration).getCommercialImportRequestOpts({ importId })

    expect(request).toEqual({
      path: `/api/v1/commercial/imports/${importId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
      query: {},
    })
  })

  it('round-trips the prepare-upload response wire format', () => {
    const wire = {
      data: {
        storage_key: 'organizations/org_1/imports/upload.csv',
        upload_url: 'https://uploads.example.test/object',
        upload_headers: {
          'Content-Type': 'text/csv',
          'x-amz-checksum-sha256': 'checksum',
        },
        expires_in_seconds: 300,
      },
    }

    expect(
      CommercialImportPreparedUploadEnvelopeToJSON(CommercialImportPreparedUploadEnvelopeFromJSON(wire)),
    ).toEqual(wire)
  })

  it('round-trips the bounded import-detail response wire format', () => {
    const wire = {
      data: {
        id: importId,
        kind: 'products',
        status: 'failed',
        file_name: 'products.csv',
        dry_run: true,
        sheet_name: null,
        total_rows: 2,
        imported_rows: 1,
        rejected_rows: 1,
        last_processed_row: 2,
        has_error_report: true,
        failure_summary: 'One row needs attention',
        row_errors: [{ row_number: 2, message: 'Missing SKU' }],
        row_errors_truncated: false,
        started_at: '2026-09-02T12:00:00.000Z',
        completed_at: '2026-09-02T12:01:00.000Z',
        created_at: '2026-09-02T11:59:00.000Z',
        updated_at: '2026-09-02T12:01:00.000Z',
      },
    }

    expect(CommercialImportDetailEnvelopeToJSON(CommercialImportDetailEnvelopeFromJSON(wire))).toEqual(wire)
  })
})

describe('commercial product lifecycle contracts', () => {
  it.each([
    ['archiveCommercialProductRequestOpts', 'archive'],
    ['restoreCommercialProductRequestOpts', 'restore'],
  ] as const)('serializes %s with authentication and idempotency', async (methodName, action) => {
    const api = new CommercialCatalogApi(configuration)
    const request = await api[methodName]({ idempotencyKey, productId })

    expect(request).toEqual({
      path: `/api/v1/commercial/products/${productId}/${action}`,
      method: 'POST',
      headers: {
        'Idempotency-Key': idempotencyKey,
        Authorization: `Bearer ${apiKey}`,
      },
      query: {},
    })
  })

  it('round-trips the lifecycle response wire format', () => {
    const wire = { data: { product_id: productId, status: 'archived' } }

    expect(CommercialProductLifecycleEnvelopeToJSON(CommercialProductLifecycleEnvelopeFromJSON(wire))).toEqual(wire)
  })
})
