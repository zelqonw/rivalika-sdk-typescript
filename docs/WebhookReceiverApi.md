# WebhookReceiverApi

All URIs are relative to *https://api.rivalika.md*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**receiveRivalikaWebhook**](WebhookReceiverApi.md#receiverivalikawebhook) | **POST** /event | Receive a signed Rivalika webhook event |



## receiveRivalikaWebhook

> receiveRivalikaWebhook(webhookId, webhookTimestamp, webhookSignature, receiveRivalikaWebhookRequest)

Receive a signed Rivalika webhook event

### Example

```ts
import {
  Configuration,
  WebhookReceiverApi,
} from '@rivalika/sdk';
import type { ReceiveRivalikaWebhookRequest } from '@rivalika/sdk';

async function example() {
  console.log("🚀 Testing @rivalika/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: RivalikaApiKey
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhookReceiverApi(config);

  const body = {
    // string
    webhookId: webhookId_example,
    // string
    webhookTimestamp: webhookTimestamp_example,
    // string
    webhookSignature: webhookSignature_example,
    // ReceiveRivalikaWebhookRequest
    receiveRivalikaWebhookRequest: ...,
  } satisfies ReceiveRivalikaWebhookRequest;

  try {
    const data = await api.receiveRivalikaWebhook(body);
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
| **webhookId** | `string` |  | [Defaults to `undefined`] |
| **webhookTimestamp** | `string` |  | [Defaults to `undefined`] |
| **webhookSignature** | `string` |  | [Defaults to `undefined`] |
| **receiveRivalikaWebhookRequest** | [ReceiveRivalikaWebhookRequest](ReceiveRivalikaWebhookRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[RivalikaApiKey](../README.md#RivalikaApiKey)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Event accepted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

