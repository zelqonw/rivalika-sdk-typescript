
# UpdatePriceBookRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`kind` | string
`currency` | string
`isDefault` | boolean
`active` | boolean

## Example

```typescript
import type { UpdatePriceBookRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "kind": null,
  "currency": null,
  "isDefault": null,
  "active": null,
} satisfies UpdatePriceBookRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdatePriceBookRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


