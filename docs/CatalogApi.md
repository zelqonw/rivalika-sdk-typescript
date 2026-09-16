# CatalogApi

All URIs are relative to *https://api.rivalika.md*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getProduct**](CatalogApi.md#getproduct) | **GET** /api/v1/products/{product_id} | Get a published product |
| [**getProductFacets**](CatalogApi.md#getproductfacets) | **GET** /api/v1/products/facets | Get product facets |
| [**listProductListings**](CatalogApi.md#listproductlistings) | **GET** /api/v1/products/{product_id}/listings | List product store offers |
| [**listProducts**](CatalogApi.md#listproducts) | **GET** /api/v1/products | List published products |



## getProduct

> DataEnvelope getProduct(productId)

Get a published product

### Example

```ts
import {
  Configuration,
  CatalogApi,
} from '@rivalika/sdk';
import type { GetProductRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CatalogApi(config);

  const body = {
    // string
    productId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetProductRequest;

  try {
    const data = await api.getProduct(body);
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
| **productId** | `string` |  | [Defaults to `undefined`] |

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


## getProductFacets

> DataEnvelope getProductFacets()

Get product facets

### Example

```ts
import {
  Configuration,
  CatalogApi,
} from '@rivalika/sdk';
import type { GetProductFacetsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CatalogApi(config);

  try {
    const data = await api.getProductFacets();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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


## listProductListings

> DataEnvelope listProductListings(productId)

List product store offers

### Example

```ts
import {
  Configuration,
  CatalogApi,
} from '@rivalika/sdk';
import type { ListProductListingsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CatalogApi(config);

  const body = {
    // string
    productId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ListProductListingsRequest;

  try {
    const data = await api.listProductListings(body);
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
| **productId** | `string` |  | [Defaults to `undefined`] |

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


## listProducts

> ListEnvelope listProducts(page, size, search, storeIds, categoryIds, brandIds, changeType, timeRange, discounted, includeOffers, locale)

List published products

### Example

```ts
import {
  Configuration,
  CatalogApi,
} from '@rivalika/sdk';
import type { ListProductsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CatalogApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    search: search_example,
    // Array<string> (optional)
    storeIds: ...,
    // Array<string> (optional)
    categoryIds: ...,
    // Array<string> (optional)
    brandIds: ...,
    // string (optional)
    changeType: changeType_example,
    // string (optional)
    timeRange: timeRange_example,
    // boolean (optional)
    discounted: true,
    // boolean (optional)
    includeOffers: true,
    // string (optional)
    locale: locale_example,
  } satisfies ListProductsRequest;

  try {
    const data = await api.listProducts(body);
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
| **storeIds** | `Array<string>` |  | [Optional] |
| **categoryIds** | `Array<string>` |  | [Optional] |
| **brandIds** | `Array<string>` |  | [Optional] |
| **changeType** | `string` |  | [Optional] [Defaults to `undefined`] |
| **timeRange** | `string` |  | [Optional] [Defaults to `undefined`] |
| **discounted** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **includeOffers** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **locale** | `string` |  | [Optional] [Defaults to `undefined`] |

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

