
# CreateRepricerExclusionRequest


## Properties

Name | Type
------------ | -------------
`scope` | { [key: string]: any; }
`reason` | string
`enabled` | boolean
`expiresAt` | Date

## Example

```typescript
import type { CreateRepricerExclusionRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "scope": null,
  "reason": null,
  "enabled": null,
  "expiresAt": null,
} satisfies CreateRepricerExclusionRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateRepricerExclusionRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


