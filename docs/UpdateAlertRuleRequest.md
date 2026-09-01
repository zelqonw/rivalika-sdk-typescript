
# UpdateAlertRuleRequest


## Properties

Name | Type
------------ | -------------
`productId` | string
`productName` | string
`storeIds` | Array&lt;string&gt;
`brandIds` | Array&lt;string&gt;
`categoryIds` | Array&lt;string&gt;
`condition` | string
`thresholdPrice` | number
`thresholdPercent` | number
`cooldown` | string
`notifyEmail` | boolean
`isActive` | boolean

## Example

```typescript
import type { UpdateAlertRuleRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "productId": null,
  "productName": null,
  "storeIds": null,
  "brandIds": null,
  "categoryIds": null,
  "condition": null,
  "thresholdPrice": null,
  "thresholdPercent": null,
  "cooldown": null,
  "notifyEmail": null,
  "isActive": null,
} satisfies UpdateAlertRuleRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateAlertRuleRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


