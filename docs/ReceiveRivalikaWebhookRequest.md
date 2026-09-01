
# ReceiveRivalikaWebhookRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`createdAt` | Date
`organizationId` | string
`data` | { [key: string]: any; }

## Example

```typescript
import type { ReceiveRivalikaWebhookRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "createdAt": null,
  "organizationId": null,
  "data": null,
} satisfies ReceiveRivalikaWebhookRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReceiveRivalikaWebhookRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


