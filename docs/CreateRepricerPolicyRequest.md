
# CreateRepricerPolicyRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`enabled` | boolean
`priority` | number
`scope` | { [key: string]: any; }
`config` | { [key: string]: any; }
`guardrails` | { [key: string]: any; }

## Example

```typescript
import type { CreateRepricerPolicyRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "enabled": null,
  "priority": null,
  "scope": null,
  "config": null,
  "guardrails": null,
} satisfies CreateRepricerPolicyRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateRepricerPolicyRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


