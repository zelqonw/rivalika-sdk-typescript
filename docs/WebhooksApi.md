# WebhooksApi

All URIs are relative to *https://api.rivalika.md*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createWebhookEndpoint**](WebhooksApi.md#createwebhookendpointoperation) | **POST** /api/v1/webhook-endpoints | Create a webhook endpoint |
| [**deleteWebhookEndpoint**](WebhooksApi.md#deletewebhookendpoint) | **DELETE** /api/v1/webhook-endpoints/{endpoint_id} | Delete a webhook endpoint |
| [**getWebhookDelivery**](WebhooksApi.md#getwebhookdelivery) | **GET** /api/v1/webhook-deliveries/{delivery_id} | Get a webhook delivery |
| [**getWebhookEndpoint**](WebhooksApi.md#getwebhookendpoint) | **GET** /api/v1/webhook-endpoints/{endpoint_id} | Get a webhook endpoint |
| [**listWebhookDeliveries**](WebhooksApi.md#listwebhookdeliveries) | **GET** /api/v1/webhook-deliveries | List webhook deliveries |
| [**listWebhookEndpoints**](WebhooksApi.md#listwebhookendpoints) | **GET** /api/v1/webhook-endpoints | List webhook endpoints |
| [**replayWebhookDelivery**](WebhooksApi.md#replaywebhookdelivery) | **POST** /api/v1/webhook-deliveries/{delivery_id}/replay | Replay a webhook delivery |
| [**rotateWebhookSigningSecret**](WebhooksApi.md#rotatewebhooksigningsecret) | **POST** /api/v1/webhook-endpoints/{endpoint_id}/rotate-secret | Rotate a webhook signing secret |
| [**testWebhookEndpoint**](WebhooksApi.md#testwebhookendpoint) | **POST** /api/v1/webhook-endpoints/{endpoint_id}/test | Send a signed test event |
| [**updateWebhookEndpoint**](WebhooksApi.md#updatewebhookendpoint) | **PATCH** /api/v1/webhook-endpoints/{endpoint_id} | Update a webhook endpoint |



## createWebhookEndpoint

> DataEnvelope createWebhookEndpoint(idempotencyKey, createWebhookEndpointRequest)

Create a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { CreateWebhookEndpointOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateWebhookEndpointRequest
    createWebhookEndpointRequest: ...,
  } satisfies CreateWebhookEndpointOperationRequest;

  try {
    const data = await api.createWebhookEndpoint(body);
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
| **createWebhookEndpointRequest** | [CreateWebhookEndpointRequest](CreateWebhookEndpointRequest.md) |  | |

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


## deleteWebhookEndpoint

> DataEnvelope deleteWebhookEndpoint(idempotencyKey, endpointId)

Delete a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { DeleteWebhookEndpointRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    endpointId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteWebhookEndpointRequest;

  try {
    const data = await api.deleteWebhookEndpoint(body);
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
| **endpointId** | `string` |  | [Defaults to `undefined`] |

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


## getWebhookDelivery

> DataEnvelope getWebhookDelivery(deliveryId)

Get a webhook delivery

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { GetWebhookDeliveryRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string
    deliveryId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetWebhookDeliveryRequest;

  try {
    const data = await api.getWebhookDelivery(body);
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
| **deliveryId** | `string` |  | [Defaults to `undefined`] |

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


## getWebhookEndpoint

> DataEnvelope getWebhookEndpoint(endpointId)

Get a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { GetWebhookEndpointRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string
    endpointId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetWebhookEndpointRequest;

  try {
    const data = await api.getWebhookEndpoint(body);
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
| **endpointId** | `string` |  | [Defaults to `undefined`] |

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


## listWebhookDeliveries

> ListEnvelope listWebhookDeliveries(endpointId)

List webhook deliveries

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { ListWebhookDeliveriesRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string (optional)
    endpointId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ListWebhookDeliveriesRequest;

  try {
    const data = await api.listWebhookDeliveries(body);
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
| **endpointId** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## listWebhookEndpoints

> ListEnvelope listWebhookEndpoints()

List webhook endpoints

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { ListWebhookEndpointsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  try {
    const data = await api.listWebhookEndpoints();
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


## replayWebhookDelivery

> AcceptedEnvelope replayWebhookDelivery(idempotencyKey, deliveryId)

Replay a webhook delivery

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { ReplayWebhookDeliveryRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    deliveryId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ReplayWebhookDeliveryRequest;

  try {
    const data = await api.replayWebhookDelivery(body);
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
| **deliveryId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**AcceptedEnvelope**](AcceptedEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: Not defined
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


## rotateWebhookSigningSecret

> DataEnvelope rotateWebhookSigningSecret(idempotencyKey, endpointId)

Rotate a webhook signing secret

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { RotateWebhookSigningSecretRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    endpointId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RotateWebhookSigningSecretRequest;

  try {
    const data = await api.rotateWebhookSigningSecret(body);
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
| **endpointId** | `string` |  | [Defaults to `undefined`] |

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


## testWebhookEndpoint

> AcceptedEnvelope testWebhookEndpoint(idempotencyKey, endpointId)

Send a signed test event

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { TestWebhookEndpointRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    endpointId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies TestWebhookEndpointRequest;

  try {
    const data = await api.testWebhookEndpoint(body);
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
| **endpointId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**AcceptedEnvelope**](AcceptedEnvelope.md)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: Not defined
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


## updateWebhookEndpoint

> DataEnvelope updateWebhookEndpoint(idempotencyKey, endpointId, createWebhookEndpointRequest)

Update a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@rivalika/sdk';
import type { UpdateWebhookEndpointRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    endpointId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreateWebhookEndpointRequest
    createWebhookEndpointRequest: ...,
  } satisfies UpdateWebhookEndpointRequest;

  try {
    const data = await api.updateWebhookEndpoint(body);
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
| **endpointId** | `string` |  | [Defaults to `undefined`] |
| **createWebhookEndpointRequest** | [CreateWebhookEndpointRequest](CreateWebhookEndpointRequest.md) |  | |

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

