# RepricingApi

All URIs are relative to *https://api.rivalika.md*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**applyRepricerRecommendation**](RepricingApi.md#applyrepricerrecommendationoperation) | **POST** /api/v1/repricer/recommendations/{recommendation_id}/apply | Apply a repricer recommendation |
| [**createRepricerExclusion**](RepricingApi.md#createrepricerexclusionoperation) | **POST** /api/v1/repricer/exclusions | Create a repricer exclusion |
| [**createRepricerPolicy**](RepricingApi.md#createrepricerpolicyoperation) | **POST** /api/v1/repricer/policies | Create a repricer policy |
| [**createRepricerRun**](RepricingApi.md#createrepricerrun) | **POST** /api/v1/repricer/runs | Create a repricer run |
| [**deleteRepricerExclusion**](RepricingApi.md#deleterepricerexclusion) | **DELETE** /api/v1/repricer/exclusions/{exclusion_id} | Delete a repricer exclusion |
| [**deleteRepricerPolicy**](RepricingApi.md#deleterepricerpolicy) | **DELETE** /api/v1/repricer/policies/{policy_id} | Delete a repricer policy |
| [**getRepricerAnalytics**](RepricingApi.md#getrepriceranalytics) | **GET** /api/v1/repricer/analytics | Get repricer analytics |
| [**getRepricerSettings**](RepricingApi.md#getrepricersettings) | **GET** /api/v1/repricer/settings | Get repricer settings |
| [**listRepricerApplications**](RepricingApi.md#listrepricerapplications) | **GET** /api/v1/repricer/applications | List repricer applications |
| [**listRepricerExclusions**](RepricingApi.md#listrepricerexclusions) | **GET** /api/v1/repricer/exclusions | List repricer exclusions |
| [**listRepricerPolicies**](RepricingApi.md#listrepricerpolicies) | **GET** /api/v1/repricer/policies | List repricer policies |
| [**listRepricerRecommendations**](RepricingApi.md#listrepricerrecommendations) | **GET** /api/v1/repricer/recommendations | List repricer recommendations |
| [**listRepricerRuns**](RepricingApi.md#listrepricerruns) | **GET** /api/v1/repricer/runs | List repricer runs |
| [**rollbackRepricerApplication**](RepricingApi.md#rollbackrepricerapplication) | **POST** /api/v1/repricer/applications/{application_id}/rollback | Rollback a repricer application |
| [**updateRepricerExclusion**](RepricingApi.md#updaterepricerexclusion) | **PATCH** /api/v1/repricer/exclusions/{exclusion_id} | Update a repricer exclusion |
| [**updateRepricerPolicy**](RepricingApi.md#updaterepricerpolicy) | **PATCH** /api/v1/repricer/policies/{policy_id} | Update a repricer policy |
| [**updateRepricerSettings**](RepricingApi.md#updaterepricersettingsoperation) | **PUT** /api/v1/repricer/settings | Update repricer settings |



## applyRepricerRecommendation

> DataEnvelope applyRepricerRecommendation(idempotencyKey, recommendationId, applyRepricerRecommendationRequest)

Apply a repricer recommendation

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { ApplyRepricerRecommendationOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    recommendationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // ApplyRepricerRecommendationRequest
    applyRepricerRecommendationRequest: ...,
  } satisfies ApplyRepricerRecommendationOperationRequest;

  try {
    const data = await api.applyRepricerRecommendation(body);
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
| **recommendationId** | `string` |  | [Defaults to `undefined`] |
| **applyRepricerRecommendationRequest** | [ApplyRepricerRecommendationRequest](ApplyRepricerRecommendationRequest.md) |  | |

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


## createRepricerExclusion

> DataEnvelope createRepricerExclusion(idempotencyKey, createRepricerExclusionRequest)

Create a repricer exclusion

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { CreateRepricerExclusionOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateRepricerExclusionRequest
    createRepricerExclusionRequest: ...,
  } satisfies CreateRepricerExclusionOperationRequest;

  try {
    const data = await api.createRepricerExclusion(body);
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
| **createRepricerExclusionRequest** | [CreateRepricerExclusionRequest](CreateRepricerExclusionRequest.md) |  | |

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


## createRepricerPolicy

> DataEnvelope createRepricerPolicy(idempotencyKey, createRepricerPolicyRequest)

Create a repricer policy

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { CreateRepricerPolicyOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // CreateRepricerPolicyRequest
    createRepricerPolicyRequest: ...,
  } satisfies CreateRepricerPolicyOperationRequest;

  try {
    const data = await api.createRepricerPolicy(body);
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
| **createRepricerPolicyRequest** | [CreateRepricerPolicyRequest](CreateRepricerPolicyRequest.md) |  | |

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


## createRepricerRun

> AcceptedEnvelope createRepricerRun(idempotencyKey)

Create a repricer run

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { CreateRepricerRunRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
  } satisfies CreateRepricerRunRequest;

  try {
    const data = await api.createRepricerRun(body);
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


## deleteRepricerExclusion

> DataEnvelope deleteRepricerExclusion(idempotencyKey, exclusionId)

Delete a repricer exclusion

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { DeleteRepricerExclusionRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    exclusionId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteRepricerExclusionRequest;

  try {
    const data = await api.deleteRepricerExclusion(body);
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
| **exclusionId** | `string` |  | [Defaults to `undefined`] |

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


## deleteRepricerPolicy

> DataEnvelope deleteRepricerPolicy(idempotencyKey, policyId)

Delete a repricer policy

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { DeleteRepricerPolicyRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    policyId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteRepricerPolicyRequest;

  try {
    const data = await api.deleteRepricerPolicy(body);
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
| **policyId** | `string` |  | [Defaults to `undefined`] |

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


## getRepricerAnalytics

> DataEnvelope getRepricerAnalytics(currency, period, policyId, priceBookId)

Get repricer analytics

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { GetRepricerAnalyticsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string
    currency: currency_example,
    // string
    period: period_example,
    // string (optional)
    policyId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    priceBookId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetRepricerAnalyticsRequest;

  try {
    const data = await api.getRepricerAnalytics(body);
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
| **currency** | `string` |  | [Defaults to `undefined`] |
| **period** | `string` |  | [Defaults to `undefined`] |
| **policyId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **priceBookId** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## getRepricerSettings

> DataEnvelope getRepricerSettings()

Get repricer settings

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { GetRepricerSettingsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  try {
    const data = await api.getRepricerSettings();
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


## listRepricerApplications

> ListEnvelope listRepricerApplications()

List repricer applications

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { ListRepricerApplicationsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  try {
    const data = await api.listRepricerApplications();
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


## listRepricerExclusions

> ListEnvelope listRepricerExclusions(page, size, q, enabled, scopeType, scopeTargetIds, expiryState, createdFrom, createdTo, sort, direction)

List repricer exclusions

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { ListRepricerExclusionsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    q: q_example,
    // boolean (optional)
    enabled: true,
    // string (optional)
    scopeType: scopeType_example,
    // Array<string> (optional)
    scopeTargetIds: ...,
    // string (optional)
    expiryState: expiryState_example,
    // Date (optional)
    createdFrom: 2013-10-20,
    // Date (optional)
    createdTo: 2013-10-20,
    // string (optional)
    sort: sort_example,
    // string (optional)
    direction: direction_example,
  } satisfies ListRepricerExclusionsRequest;

  try {
    const data = await api.listRepricerExclusions(body);
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
| **q** | `string` |  | [Optional] [Defaults to `undefined`] |
| **enabled** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **scopeType** | `string` |  | [Optional] [Defaults to `undefined`] |
| **scopeTargetIds** | `Array<string>` |  | [Optional] |
| **expiryState** | `string` |  | [Optional] [Defaults to `undefined`] |
| **createdFrom** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **createdTo** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **sort** | `string` |  | [Optional] [Defaults to `undefined`] |
| **direction** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## listRepricerPolicies

> ListEnvelope listRepricerPolicies(page, size, q, enabled, strategies, scopeType, scopeTargetIds, priorityMin, priorityMax, guardrailState, sort, direction)

List repricer policies

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { ListRepricerPoliciesRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    q: q_example,
    // boolean (optional)
    enabled: true,
    // Array<string> (optional)
    strategies: ...,
    // string (optional)
    scopeType: scopeType_example,
    // Array<string> (optional)
    scopeTargetIds: ...,
    // number (optional)
    priorityMin: 56,
    // number (optional)
    priorityMax: 56,
    // string (optional)
    guardrailState: guardrailState_example,
    // string (optional)
    sort: sort_example,
    // string (optional)
    direction: direction_example,
  } satisfies ListRepricerPoliciesRequest;

  try {
    const data = await api.listRepricerPolicies(body);
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
| **q** | `string` |  | [Optional] [Defaults to `undefined`] |
| **enabled** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **strategies** | `Array<string>` |  | [Optional] |
| **scopeType** | `string` |  | [Optional] [Defaults to `undefined`] |
| **scopeTargetIds** | `Array<string>` |  | [Optional] |
| **priorityMin** | `number` |  | [Optional] [Defaults to `undefined`] |
| **priorityMax** | `number` |  | [Optional] [Defaults to `undefined`] |
| **guardrailState** | `string` |  | [Optional] [Defaults to `undefined`] |
| **sort** | `string` |  | [Optional] [Defaults to `undefined`] |
| **direction** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## listRepricerRecommendations

> ListEnvelope listRepricerRecommendations(page, size, q, status, productIds, policyIds, priceBookIds, currencies, movement, movePercentMin, movePercentMax, amountField, amountMin, amountMax, evidenceMin, evidenceMax, createdFrom, createdTo, smartFilters, sort, direction)

List repricer recommendations

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { ListRepricerRecommendationsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    q: q_example,
    // string (optional)
    status: status_example,
    // Array<string> | Commercial product IDs, not shared market product IDs (optional)
    productIds: ...,
    // Array<string> (optional)
    policyIds: ...,
    // Array<string> (optional)
    priceBookIds: ...,
    // Array<string> (optional)
    currencies: ...,
    // string (optional)
    movement: movement_example,
    // number (optional)
    movePercentMin: 8.14,
    // number (optional)
    movePercentMax: 8.14,
    // string (optional)
    amountField: amountField_example,
    // number (optional)
    amountMin: 8.14,
    // number (optional)
    amountMax: 8.14,
    // number (optional)
    evidenceMin: 56,
    // number (optional)
    evidenceMax: 56,
    // Date (optional)
    createdFrom: 2013-10-20,
    // Date (optional)
    createdTo: 2013-10-20,
    // Array<string> (optional)
    smartFilters: ...,
    // string (optional)
    sort: sort_example,
    // string (optional)
    direction: direction_example,
  } satisfies ListRepricerRecommendationsRequest;

  try {
    const data = await api.listRepricerRecommendations(body);
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
| **q** | `string` |  | [Optional] [Defaults to `undefined`] |
| **status** | `string` |  | [Optional] [Defaults to `undefined`] |
| **productIds** | `Array<string>` | Commercial product IDs, not shared market product IDs | [Optional] |
| **policyIds** | `Array<string>` |  | [Optional] |
| **priceBookIds** | `Array<string>` |  | [Optional] |
| **currencies** | `Array<string>` |  | [Optional] |
| **movement** | `string` |  | [Optional] [Defaults to `undefined`] |
| **movePercentMin** | `number` |  | [Optional] [Defaults to `undefined`] |
| **movePercentMax** | `number` |  | [Optional] [Defaults to `undefined`] |
| **amountField** | `string` |  | [Optional] [Defaults to `undefined`] |
| **amountMin** | `number` |  | [Optional] [Defaults to `undefined`] |
| **amountMax** | `number` |  | [Optional] [Defaults to `undefined`] |
| **evidenceMin** | `number` |  | [Optional] [Defaults to `undefined`] |
| **evidenceMax** | `number` |  | [Optional] [Defaults to `undefined`] |
| **createdFrom** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **createdTo** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **smartFilters** | `Array<string>` |  | [Optional] |
| **sort** | `string` |  | [Optional] [Defaults to `undefined`] |
| **direction** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## listRepricerRuns

> ListEnvelope listRepricerRuns(page, size, q, status, trigger, requestedFrom, requestedTo, outcome, sort, direction)

List repricer runs

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { ListRepricerRunsRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    size: 56,
    // string (optional)
    q: q_example,
    // string (optional)
    status: status_example,
    // string (optional)
    trigger: trigger_example,
    // Date (optional)
    requestedFrom: 2013-10-20,
    // Date (optional)
    requestedTo: 2013-10-20,
    // string (optional)
    outcome: outcome_example,
    // string (optional)
    sort: sort_example,
    // string (optional)
    direction: direction_example,
  } satisfies ListRepricerRunsRequest;

  try {
    const data = await api.listRepricerRuns(body);
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
| **q** | `string` |  | [Optional] [Defaults to `undefined`] |
| **status** | `string` |  | [Optional] [Defaults to `undefined`] |
| **trigger** | `string` |  | [Optional] [Defaults to `undefined`] |
| **requestedFrom** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **requestedTo** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **outcome** | `string` |  | [Optional] [Defaults to `undefined`] |
| **sort** | `string` |  | [Optional] [Defaults to `undefined`] |
| **direction** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## rollbackRepricerApplication

> DataEnvelope rollbackRepricerApplication(idempotencyKey, applicationId)

Rollback a repricer application

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { RollbackRepricerApplicationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    applicationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RollbackRepricerApplicationRequest;

  try {
    const data = await api.rollbackRepricerApplication(body);
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
| **applicationId** | `string` |  | [Defaults to `undefined`] |

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


## updateRepricerExclusion

> DataEnvelope updateRepricerExclusion(idempotencyKey, exclusionId, createRepricerExclusionRequest)

Update a repricer exclusion

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { UpdateRepricerExclusionRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    exclusionId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreateRepricerExclusionRequest
    createRepricerExclusionRequest: ...,
  } satisfies UpdateRepricerExclusionRequest;

  try {
    const data = await api.updateRepricerExclusion(body);
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
| **exclusionId** | `string` |  | [Defaults to `undefined`] |
| **createRepricerExclusionRequest** | [CreateRepricerExclusionRequest](CreateRepricerExclusionRequest.md) |  | |

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


## updateRepricerPolicy

> DataEnvelope updateRepricerPolicy(idempotencyKey, policyId, createRepricerPolicyRequest)

Update a repricer policy

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { UpdateRepricerPolicyRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // string
    policyId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreateRepricerPolicyRequest
    createRepricerPolicyRequest: ...,
  } satisfies UpdateRepricerPolicyRequest;

  try {
    const data = await api.updateRepricerPolicy(body);
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
| **policyId** | `string` |  | [Defaults to `undefined`] |
| **createRepricerPolicyRequest** | [CreateRepricerPolicyRequest](CreateRepricerPolicyRequest.md) |  | |

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


## updateRepricerSettings

> DataEnvelope updateRepricerSettings(idempotencyKey, updateRepricerSettingsRequest)

Update repricer settings

### Example

```ts
import {
  Configuration,
  RepricingApi,
} from '@rivalika/sdk';
import type { UpdateRepricerSettingsOperationRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RepricingApi(config);

  const body = {
    // string | Unique key retained for 24 hours. Reusing a key with another payload returns 409.
    idempotencyKey: idempotencyKey_example,
    // UpdateRepricerSettingsRequest
    updateRepricerSettingsRequest: ...,
  } satisfies UpdateRepricerSettingsOperationRequest;

  try {
    const data = await api.updateRepricerSettings(body);
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
| **updateRepricerSettingsRequest** | [UpdateRepricerSettingsRequest](UpdateRepricerSettingsRequest.md) |  | |

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

