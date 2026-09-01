
# CreateWebhookEndpointRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`url` | string
`description` | string
`subscriptions` | [Array&lt;CreateWebhookEndpointRequestSubscriptionsInner&gt;](CreateWebhookEndpointRequestSubscriptionsInner.md)

## Example

```typescript
import type { CreateWebhookEndpointRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "url": null,
  "description": null,
  "subscriptions": null,
} satisfies CreateWebhookEndpointRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateWebhookEndpointRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


