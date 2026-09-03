
# CommercialImportPreparedUploadEnvelopeData


## Properties

Name | Type
------------ | -------------
`storageKey` | string
`uploadUrl` | string
`uploadHeaders` | [CommercialImportPreparedUploadEnvelopeDataUploadHeaders](CommercialImportPreparedUploadEnvelopeDataUploadHeaders.md)
`expiresInSeconds` | number

## Example

```typescript
import type { CommercialImportPreparedUploadEnvelopeData } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "storageKey": null,
  "uploadUrl": null,
  "uploadHeaders": null,
  "expiresInSeconds": null,
} satisfies CommercialImportPreparedUploadEnvelopeData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommercialImportPreparedUploadEnvelopeData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


