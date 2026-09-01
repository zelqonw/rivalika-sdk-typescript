
# CreateReportRequest


## Properties

Name | Type
------------ | -------------
`type` | string
`name` | string
`locale` | string
`schedule` | { [key: string]: any; }
`isActive` | boolean
`_configuration` | { [key: string]: any; }
`timezone` | string

## Example

```typescript
import type { CreateReportRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "name": null,
  "locale": null,
  "schedule": null,
  "isActive": null,
  "_configuration": null,
  "timezone": null,
} satisfies CreateReportRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateReportRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


