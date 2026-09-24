
# CommercialImportDetailEnvelopeData


## Properties

Name | Type
------------ | -------------
`id` | string
`kind` | string
`status` | string
`fileName` | string
`dryRun` | boolean
`sheetName` | string
`totalRows` | number
`importedRows` | number
`rejectedRows` | number
`lastProcessedRow` | number
`hasErrorReport` | boolean
`failureSummary` | string
`errorCode` | string
`errorParams` | { [key: string]: string; }
`rowErrors` | [Array&lt;CommercialImportDetailEnvelopeDataRowErrorsInner&gt;](CommercialImportDetailEnvelopeDataRowErrorsInner.md)
`rowErrorsTruncated` | boolean
`startedAt` | Date
`completedAt` | Date
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { CommercialImportDetailEnvelopeData } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "kind": null,
  "status": null,
  "fileName": null,
  "dryRun": null,
  "sheetName": null,
  "totalRows": null,
  "importedRows": null,
  "rejectedRows": null,
  "lastProcessedRow": null,
  "hasErrorReport": null,
  "failureSummary": null,
  "errorCode": null,
  "errorParams": null,
  "rowErrors": null,
  "rowErrorsTruncated": null,
  "startedAt": null,
  "completedAt": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies CommercialImportDetailEnvelopeData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommercialImportDetailEnvelopeData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


