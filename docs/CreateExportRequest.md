
# CreateExportRequest


## Properties

Name | Type
------------ | -------------
`profile` | string
`dataset` | string
`format` | string
`locale` | string
`timezone` | string
`columns` | Array&lt;string&gt;
`filters` | { [key: string]: any; }
`name` | string

## Example

```typescript
import type { CreateExportRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "profile": null,
  "dataset": null,
  "format": null,
  "locale": null,
  "timezone": null,
  "columns": null,
  "filters": null,
  "name": null,
} satisfies CreateExportRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateExportRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


