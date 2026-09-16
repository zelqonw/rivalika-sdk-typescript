
# UpdateReportRequest


## Properties

Name | Type
------------ | -------------
`timezone` | string
`type` | string
`name` | string
`locale` | string
`schedule` | { [key: string]: any; }
`isActive` | boolean
`_configuration` | { [key: string]: any; }

## Example

```typescript
import type { UpdateReportRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "timezone": null,
  "type": null,
  "name": null,
  "locale": null,
  "schedule": null,
  "isActive": null,
  "_configuration": null,
} satisfies UpdateReportRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateReportRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


