# PricingApi

All URIs are relative to *https://api.rivalika.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getProductPriceHistory**](PricingApi.md#getproductpricehistory) | **GET** /api/v1/products/{product_id}/price-history | Get product price history |



## getProductPriceHistory

> DataEnvelope getProductPriceHistory(productId)

Get product price history

### Example

```ts
import {
  Configuration,
  PricingApi,
} from '@rivalika/sdk';
import type { GetProductPriceHistoryRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PricingApi(config);

  const body = {
    // string
    productId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetProductPriceHistoryRequest;

  try {
    const data = await api.getProductPriceHistory(body);
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

