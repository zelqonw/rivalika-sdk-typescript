
# UpdateCommercialPartnerRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`roles` | Array&lt;string&gt;
`contactName` | string
`email` | string
`phone` | string
`website` | string
`notes` | string
`active` | boolean

## Example

```typescript
import type { UpdateCommercialPartnerRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "roles": null,
  "contactName": null,
  "email": null,
  "phone": null,
  "website": null,
  "notes": null,
  "active": null,
} satisfies UpdateCommercialPartnerRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateCommercialPartnerRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


