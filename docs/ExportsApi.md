# ExportsApi

All URIs are relative to *https://api.rivalika.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelExport**](ExportsApi.md#cancelexport) | **POST** /api/v1/exports/{export_id}/cancel | Cancel an export |
| [**createExport**](ExportsApi.md#createexportoperation) | **POST** /api/v1/exports | Create an export |
| [**downloadExport**](ExportsApi.md#downloadexport) | **GET** /api/v1/exports/{export_id}/download | Download a completed export |
| [**estimateExport**](ExportsApi.md#estimateexportoperation) | **POST** /api/v1/exports/estimate | Estimate an export |
| [**getExport**](ExportsApi.md#getexport) | **GET** /api/v1/exports/{export_id} | Get an export |
| [**listExports**](ExportsApi.md#listexports) | **GET** /api/v1/exports | List exports |
| [**retryExport**](ExportsApi.md#retryexport) | **POST** /api/v1/exports/{export_id}/retry | Retry an export |



## cancelExport

> DataEnvelope cancelExport(idempotencyKey, exportId)

Cancel an export

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { CancelExportRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    exportId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CancelExportRequest;

  try {
    const data = await api.cancelExport(body);
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
| **exportId** | `string` |  | [Defaults to `undefined`] |

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


## createExport

> AcceptedEnvelope createExport(idempotencyKey, createExportRequest)

Create an export

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { CreateExportOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateExportRequest
    createExportRequest: ...,
  } satisfies CreateExportOperationRequest;

  try {
    const data = await api.createExport(body);
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
| **createExportRequest** | [CreateExportRequest](CreateExportRequest.md) |  | |

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


## downloadExport

> DataEnvelope downloadExport(exportId)

Download a completed export

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { DownloadExportRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string
    exportId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DownloadExportRequest;

  try {
    const data = await api.downloadExport(body);
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
| **exportId** | `string` |  | [Defaults to `undefined`] |

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


## estimateExport

> DataEnvelope estimateExport(idempotencyKey, estimateExportRequest)

Estimate an export

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { EstimateExportOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // EstimateExportRequest
    estimateExportRequest: ...,
  } satisfies EstimateExportOperationRequest;

  try {
    const data = await api.estimateExport(body);
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
| **estimateExportRequest** | [EstimateExportRequest](EstimateExportRequest.md) |  | |

### Return type

[**DataEnvelope**](DataEnvelope.md)

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


## getExport

> DataEnvelope getExport(exportId)

Get an export

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { GetExportRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string
    exportId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetExportRequest;

  try {
    const data = await api.getExport(body);
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
| **exportId** | `string` |  | [Defaults to `undefined`] |

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


## listExports

> ListEnvelope listExports(cursor, limit, scope, search, status, dataset, format, createdFrom, createdTo)

List exports

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { ListExportsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string (optional)
    cursor: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number (optional)
    limit: 56,
    // string (optional)
    scope: scope_example,
    // string (optional)
    search: search_example,
    // string (optional)
    status: status_example,
    // string (optional)
    dataset: dataset_example,
    // string (optional)
    format: format_example,
    // Date (optional)
    createdFrom: 2013-10-20T19:20:30+01:00,
    // Date (optional)
    createdTo: 2013-10-20T19:20:30+01:00,
  } satisfies ListExportsRequest;

  try {
    const data = await api.listExports(body);
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
| **cursor** | `string` |  | [Optional] [Defaults to `undefined`] |
| **limit** | `number` |  | [Optional] [Defaults to `undefined`] |
| **scope** | `string` |  | [Optional] [Defaults to `undefined`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **status** | `string` |  | [Optional] [Defaults to `undefined`] |
| **dataset** | `string` |  | [Optional] [Defaults to `undefined`] |
| **format** | `string` |  | [Optional] [Defaults to `undefined`] |
| **createdFrom** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **createdTo** | `Date` |  | [Optional] [Defaults to `undefined`] |

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


## retryExport

> DataEnvelope retryExport(idempotencyKey, exportId)

Retry an export

### Example

```ts
import {
  Configuration,
  ExportsApi,
} from '@rivalika/sdk';
import type { RetryExportRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExportsApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    exportId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RetryExportRequest;

  try {
    const data = await api.retryExport(body);
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
| **exportId** | `string` |  | [Defaults to `undefined`] |

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

