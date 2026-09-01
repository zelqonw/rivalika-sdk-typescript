# CommercialCatalogApi

All URIs are relative to *https://api.rivalika.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCommercialPartner**](CommercialCatalogApi.md#createcommercialpartneroperation) | **POST** /api/v1/commercial/partners | Create a commercial partner |
| [**createCommercialProduct**](CommercialCatalogApi.md#createcommercialproductoperation) | **POST** /api/v1/commercial/products | Create a commercial product |
| [**deleteCommercialProduct**](CommercialCatalogApi.md#deletecommercialproductoperation) | **DELETE** /api/v1/commercial/products/{commercial_product_id} | Delete a commercial product |
| [**deleteMarketLink**](CommercialCatalogApi.md#deletemarketlink) | **DELETE** /api/v1/commercial/products/{commercial_product_id}/market-link | Remove a market link |
| [**getCommercialPartner**](CommercialCatalogApi.md#getcommercialpartner) | **GET** /api/v1/commercial/partners/{partner_id} | Get a commercial partner |
| [**getCommercialProduct**](CommercialCatalogApi.md#getcommercialproduct) | **GET** /api/v1/commercial/products/{commercial_product_id} | Get a commercial product |
| [**getMarketLink**](CommercialCatalogApi.md#getmarketlink) | **GET** /api/v1/commercial/products/{commercial_product_id}/market-link | Get a market link |
| [**listCommercialPartners**](CommercialCatalogApi.md#listcommercialpartners) | **GET** /api/v1/commercial/partners | List commercial partners |
| [**listCommercialProducts**](CommercialCatalogApi.md#listcommercialproducts) | **GET** /api/v1/commercial/products | List commercial products |
| [**setMarketLink**](CommercialCatalogApi.md#setmarketlinkoperation) | **PUT** /api/v1/commercial/products/{commercial_product_id}/market-link | Set a market link |
| [**updateCommercialPartner**](CommercialCatalogApi.md#updatecommercialpartneroperation) | **PATCH** /api/v1/commercial/partners/{partner_id} | Update a commercial partner |
| [**updateCommercialProduct**](CommercialCatalogApi.md#updatecommercialproductoperation) | **PATCH** /api/v1/commercial/products/{commercial_product_id} | Update a commercial product |



## createCommercialPartner

> DataEnvelope createCommercialPartner(idempotencyKey, createCommercialPartnerRequest)

Create a commercial partner

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { CreateCommercialPartnerOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateCommercialPartnerRequest
    createCommercialPartnerRequest: ...,
  } satisfies CreateCommercialPartnerOperationRequest;

  try {
    const data = await api.createCommercialPartner(body);
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
| **createCommercialPartnerRequest** | [CreateCommercialPartnerRequest](CreateCommercialPartnerRequest.md) |  | |

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
| **201** | Success |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCommercialProduct

> DataEnvelope createCommercialProduct(idempotencyKey, createCommercialProductRequest)

Create a commercial product

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { CreateCommercialProductOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateCommercialProductRequest
    createCommercialProductRequest: ...,
  } satisfies CreateCommercialProductOperationRequest;

  try {
    const data = await api.createCommercialProduct(body);
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
| **createCommercialProductRequest** | [CreateCommercialProductRequest](CreateCommercialProductRequest.md) |  | |

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
| **201** | Success |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid or expired API key |  -  |
| **403** | Missing required scope |  -  |
| **409** | Conflict or idempotency mismatch |  -  |
| **429** | Rate or concurrency limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCommercialProduct

> DataEnvelope deleteCommercialProduct(idempotencyKey, commercialProductId, deleteCommercialProductRequest)

Delete a commercial product

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { DeleteCommercialProductOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    commercialProductId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // DeleteCommercialProductRequest
    deleteCommercialProductRequest: ...,
  } satisfies DeleteCommercialProductOperationRequest;

  try {
    const data = await api.deleteCommercialProduct(body);
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
| **commercialProductId** | `string` |  | [Defaults to `undefined`] |
| **deleteCommercialProductRequest** | [DeleteCommercialProductRequest](DeleteCommercialProductRequest.md) |  | |

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


## deleteMarketLink

> DataEnvelope deleteMarketLink(idempotencyKey, commercialProductId)

Remove a market link

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { DeleteMarketLinkRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    commercialProductId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteMarketLinkRequest;

  try {
    const data = await api.deleteMarketLink(body);
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
| **commercialProductId** | `string` |  | [Defaults to `undefined`] |

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


## getCommercialPartner

> DataEnvelope getCommercialPartner(partnerId)

Get a commercial partner

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { GetCommercialPartnerRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string
    partnerId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetCommercialPartnerRequest;

  try {
    const data = await api.getCommercialPartner(body);
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
| **partnerId** | `string` |  | [Defaults to `undefined`] |

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


## getCommercialProduct

> DataEnvelope getCommercialProduct(commercialProductId)

Get a commercial product

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { GetCommercialProductRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string
    commercialProductId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetCommercialProductRequest;

  try {
    const data = await api.getCommercialProduct(body);
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
| **commercialProductId** | `string` |  | [Defaults to `undefined`] |

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


## getMarketLink

> DataEnvelope getMarketLink(commercialProductId)

Get a market link

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { GetMarketLinkRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string
    commercialProductId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetMarketLinkRequest;

  try {
    const data = await api.getMarketLink(body);
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
| **commercialProductId** | `string` |  | [Defaults to `undefined`] |

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


## listCommercialPartners

> ListEnvelope listCommercialPartners(page, size, search, role, active, sortBy, sortDirection)

List commercial partners

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { ListCommercialPartnersRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    search: search_example,
    // string (optional)
    role: role_example,
    // boolean (optional)
    active: true,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortDirection: sortDirection_example,
  } satisfies ListCommercialPartnersRequest;

  try {
    const data = await api.listCommercialPartners(body);
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
| **role** | `string` |  | [Optional] [Defaults to `undefined`] |
| **active** | `boolean` |  | [Optional] [Defaults to `undefined`] |
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


## listCommercialProducts

> ListEnvelope listCommercialProducts(page, size, search, status, matchState, brands, categories, stockMin, stockMax, moneyField, moneyMin, moneyMax, moneyCurrency, smartFilters, sortBy, sortDirection)

List commercial products

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { ListCommercialProductsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    search: search_example,
    // string (optional)
    status: status_example,
    // string (optional)
    matchState: matchState_example,
    // Array<string> (optional)
    brands: ...,
    // Array<string> (optional)
    categories: ...,
    // number (optional)
    stockMin: 56,
    // number (optional)
    stockMax: 56,
    // string (optional)
    moneyField: moneyField_example,
    // number (optional)
    moneyMin: 8.14,
    // number (optional)
    moneyMax: 8.14,
    // string (optional)
    moneyCurrency: moneyCurrency_example,
    // Array<string> (optional)
    smartFilters: ...,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortDirection: sortDirection_example,
  } satisfies ListCommercialProductsRequest;

  try {
    const data = await api.listCommercialProducts(body);
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
| **status** | `string` |  | [Optional] [Defaults to `undefined`] |
| **matchState** | `string` |  | [Optional] [Defaults to `undefined`] |
| **brands** | `Array<string>` |  | [Optional] |
| **categories** | `Array<string>` |  | [Optional] |
| **stockMin** | `number` |  | [Optional] [Defaults to `undefined`] |
| **stockMax** | `number` |  | [Optional] [Defaults to `undefined`] |
| **moneyField** | `string` |  | [Optional] [Defaults to `undefined`] |
| **moneyMin** | `number` |  | [Optional] [Defaults to `undefined`] |
| **moneyMax** | `number` |  | [Optional] [Defaults to `undefined`] |
| **moneyCurrency** | `string` |  | [Optional] [Defaults to `undefined`] |
| **smartFilters** | `Array<string>` |  | [Optional] |
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


## setMarketLink

> DataEnvelope setMarketLink(idempotencyKey, commercialProductId, setMarketLinkRequest)

Set a market link

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { SetMarketLinkOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    commercialProductId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // SetMarketLinkRequest
    setMarketLinkRequest: ...,
  } satisfies SetMarketLinkOperationRequest;

  try {
    const data = await api.setMarketLink(body);
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
| **commercialProductId** | `string` |  | [Defaults to `undefined`] |
| **setMarketLinkRequest** | [SetMarketLinkRequest](SetMarketLinkRequest.md) |  | |

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


## updateCommercialPartner

> DataEnvelope updateCommercialPartner(idempotencyKey, partnerId, updateCommercialPartnerRequest)

Update a commercial partner

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { UpdateCommercialPartnerOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    partnerId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateCommercialPartnerRequest
    updateCommercialPartnerRequest: ...,
  } satisfies UpdateCommercialPartnerOperationRequest;

  try {
    const data = await api.updateCommercialPartner(body);
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
| **partnerId** | `string` |  | [Defaults to `undefined`] |
| **updateCommercialPartnerRequest** | [UpdateCommercialPartnerRequest](UpdateCommercialPartnerRequest.md) |  | |

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


## updateCommercialProduct

> DataEnvelope updateCommercialProduct(idempotencyKey, commercialProductId, updateCommercialProductRequest)

Update a commercial product

### Example

```ts
import {
  Configuration,
  CommercialCatalogApi,
} from '@rivalika/sdk';
import type { UpdateCommercialProductOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommercialCatalogApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    commercialProductId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateCommercialProductRequest
    updateCommercialProductRequest: ...,
  } satisfies UpdateCommercialProductOperationRequest;

  try {
    const data = await api.updateCommercialProduct(body);
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
| **commercialProductId** | `string` |  | [Defaults to `undefined`] |
| **updateCommercialProductRequest** | [UpdateCommercialProductRequest](UpdateCommercialProductRequest.md) |  | |

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

