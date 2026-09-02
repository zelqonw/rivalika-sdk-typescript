# CommercialImportsApi

All URIs are relative to *https://api.rivalika.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelCommercialImport**](CommercialImportsApi.md#cancelcommercialimport) | **POST** /api/v1/commercial/imports/{import_id}/cancel | Cancel a commercial import |
| [**createCommercialImport**](CommercialImportsApi.md#createcommercialimportoperation) | **POST** /api/v1/commercial/imports | Create a commercial import |
| [**getCommercialImport**](CommercialImportsApi.md#getcommercialimport) | **GET** /api/v1/commercial/imports/{importId} | Get a commercial import |
| [**listCommercialImports**](CommercialImportsApi.md#listcommercialimports) | **GET** /api/v1/commercial/imports | List commercial imports |
| [**prepareCommercialImportUpload**](CommercialImportsApi.md#preparecommercialimportuploadoperation) | **POST** /api/v1/commercial/imports/prepare-upload | Prepare a commercial import upload |



## cancelCommercialImport

> DataEnvelope cancelCommercialImport(idempotencyKey, importId)

Cancel a commercial import

### Example

```ts
import {
  Configuration,
  CommercialImportsApi,
} from '@rivalika/sdk';
import type { CancelCommercialImportRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialImportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    importId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CancelCommercialImportRequest;

  try {
    const data = await api.cancelCommercialImport(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idempotencyKey** | `string` | Unique key retained for 24 hours. Reusing a key with another payload returns 409. | [Defaults to `undefined`] |
| **importId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**DataEnvelope**](DataEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCommercialImport

> AcceptedEnvelope createCommercialImport(idempotencyKey, createCommercialImportRequest)

Create a commercial import

### Example

```ts
import {
  Configuration,
  CommercialImportsApi,
} from '@rivalika/sdk';
import type { CreateCommercialImportOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialImportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateCommercialImportRequest
    createCommercialImportRequest: ...,
  } satisfies CreateCommercialImportOperationRequest;

  try {
    const data = await api.createCommercialImport(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idempotencyKey** | `string` | Unique key retained for 24 hours. Reusing a key with another payload returns 409. | [Defaults to `undefined`] |
| **createCommercialImportRequest** | [CreateCommercialImportRequest](CreateCommercialImportRequest.md) |  | |

### Return type

[**AcceptedEnvelope**](AcceptedEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Accepted |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCommercialImport

> CommercialImportDetailEnvelope getCommercialImport(importId)

Get a commercial import

### Example

```ts
import {
  Configuration,
  CommercialImportsApi,
} from '@rivalika/sdk';
import type { GetCommercialImportRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialImportsApi(config);

  const body = {
    // string
    importId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetCommercialImportRequest;

  try {
    const data = await api.getCommercialImport(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **importId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**CommercialImportDetailEnvelope**](CommercialImportDetailEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **404** | Resource not found |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCommercialImports

> ListEnvelope listCommercialImports(page, size, search, kind, status, dryRun, sortBy, sortDirection)

List commercial imports

### Example

```ts
import {
  Configuration,
  CommercialImportsApi,
} from '@rivalika/sdk';
import type { ListCommercialImportsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialImportsApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    search: search_example,
    // string (optional)
    kind: kind_example,
    // string (optional)
    status: status_example,
    // boolean (optional)
    dryRun: true,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortDirection: sortDirection_example,
  } satisfies ListCommercialImportsRequest;

  try {
    const data = await api.listCommercialImports(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **size** | `number` |  | [Optional] [Defaults to `undefined`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **kind** | `string` |  | [Optional] [Defaults to `undefined`] |
| **status** | `string` |  | [Optional] [Defaults to `undefined`] |
| **dryRun** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **sortBy** | `string` |  | [Optional] [Defaults to `undefined`] |
| **sortDirection** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ListEnvelope**](ListEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## prepareCommercialImportUpload

> CommercialImportPreparedUploadEnvelope prepareCommercialImportUpload(idempotencyKey, prepareCommercialImportUploadRequest)

Prepare a commercial import upload

### Example

```ts
import {
  Configuration,
  CommercialImportsApi,
} from '@rivalika/sdk';
import type { PrepareCommercialImportUploadOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialImportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // PrepareCommercialImportUploadRequest
    prepareCommercialImportUploadRequest: ...,
  } satisfies PrepareCommercialImportUploadOperationRequest;

  try {
    const data = await api.prepareCommercialImportUpload(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idempotencyKey** | `string` | Unique key retained for 24 hours. Reusing a key with another payload returns 409. | [Defaults to `undefined`] |
| **prepareCommercialImportUploadRequest** | [PrepareCommercialImportUploadRequest](PrepareCommercialImportUploadRequest.md) |  | |

### Return type

[**CommercialImportPreparedUploadEnvelope**](CommercialImportPreparedUploadEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

