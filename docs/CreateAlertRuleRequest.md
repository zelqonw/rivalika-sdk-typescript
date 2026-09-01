
# CreateAlertRuleRequest


## Properties

Name | Type
------------ | -------------
`condition` | string
`productId` | string
`productName` | string
`storeIds` | Array&lt;string&gt;
`brandIds` | Array&lt;string&gt;
`categoryIds` | Array&lt;string&gt;
`thresholdPrice` | number
`thresholdPercent` | number
`notifyEmail` | boolean
`isActive` | boolean

## Example

```typescript
import type { CreateAlertRuleRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "condition": null,
  "productId": null,
  "productName": null,
  "storeIds": null,
  "brandIds": null,
  "categoryIds": null,
  "thresholdPrice": null,
  "thresholdPercent": null,
  "notifyEmail": null,
  "isActive": null,
} satisfies CreateAlertRuleRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateAlertRuleRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


