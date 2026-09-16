
# UpdateSupplierOfferRequest


## Properties

Name | Type
------------ | -------------
`productId` | string
`partnerId` | string
`supplierSku` | string
`costAmount` | number
`currency` | string
`minOrderQuantity` | number
`leadTimeDays` | number
`validFrom` | Date
`validTo` | Date
`isPreferred` | boolean

## Example

```typescript
import type { UpdateSupplierOfferRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "productId": null,
  "partnerId": null,
  "supplierSku": null,
  "costAmount": null,
  "currency": null,
  "minOrderQuantity": null,
  "leadTimeDays": null,
  "validFrom": null,
  "validTo": null,
  "isPreferred": null,
} satisfies UpdateSupplierOfferRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateSupplierOfferRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


