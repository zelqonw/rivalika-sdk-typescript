
# UpdateCommercialProductRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`parentProductId` | string
`brand` | string
`category` | string
`internalSku` | string
`externalSku` | string
`barcode` | string
`stockQuantity` | number
`stockThreshold` | number
`attributes` | { [key: string]: string; }

## Example

```typescript
import type { UpdateCommercialProductRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "parentProductId": null,
  "brand": null,
  "category": null,
  "internalSku": null,
  "externalSku": null,
  "barcode": null,
  "stockQuantity": null,
  "stockThreshold": null,
  "attributes": null,
} satisfies UpdateCommercialProductRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateCommercialProductRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


