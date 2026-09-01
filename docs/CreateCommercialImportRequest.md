
# CreateCommercialImportRequest


## Properties

Name | Type
------------ | -------------
`kind` | string
`fileName` | string
`storageKey` | string
`contentSha256` | string
`sizeBytes` | number
`sheetName` | string
`mapping` | { [key: string]: any; }
`autoMatchEnabled` | boolean
`dryRun` | boolean

## Example

```typescript
import type { CreateCommercialImportRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "kind": null,
  "fileName": null,
  "storageKey": null,
  "contentSha256": null,
  "sizeBytes": null,
  "sheetName": null,
  "mapping": null,
  "autoMatchEnabled": null,
  "dryRun": null,
} satisfies CreateCommercialImportRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCommercialImportRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


