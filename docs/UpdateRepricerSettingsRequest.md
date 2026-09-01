
# UpdateRepricerSettingsRequest


## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`timezone` | string
`schedule` | { [key: string]: any; }
`recommendationLifetimeHours` | number
`evidenceMaxAgeHours` | number
`minimumInStockObservations` | number
`maximumMovePercent` | string
`batchApplyLimit` | number
`evidenceCap` | number
`roundingMode` | string
`priceEnding` | string
`lowStockProtectionEnabled` | boolean
`lowStockThreshold` | number
`b2bTierMode` | string
`excludedStoreIds` | Array&lt;string&gt;

## Example

```typescript
import type { UpdateRepricerSettingsRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "timezone": null,
  "schedule": null,
  "recommendationLifetimeHours": null,
  "evidenceMaxAgeHours": null,
  "minimumInStockObservations": null,
  "maximumMovePercent": null,
  "batchApplyLimit": null,
  "evidenceCap": null,
  "roundingMode": null,
  "priceEnding": null,
  "lowStockProtectionEnabled": null,
  "lowStockThreshold": null,
  "b2bTierMode": null,
  "excludedStoreIds": null,
} satisfies UpdateRepricerSettingsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateRepricerSettingsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


