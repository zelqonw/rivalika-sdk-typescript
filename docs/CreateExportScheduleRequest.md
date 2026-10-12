
# CreateExportScheduleRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`request` | [CreateExportScheduleRequestRequest](CreateExportScheduleRequestRequest.md)
`dateWindow` | [CreateExportScheduleRequestDateWindow](CreateExportScheduleRequestDateWindow.md)
`schedule` | { [key: string]: any; }
`timezone` | string
`recipients` | [Array&lt;CreateExportScheduleRequestRecipientsInner&gt;](CreateExportScheduleRequestRecipientsInner.md)
`attachFile` | boolean
`templateId` | string
`isActive` | boolean

## Example

```typescript
import type { CreateExportScheduleRequest } from '@rivalika/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "request": null,
  "dateWindow": null,
  "schedule": null,
  "timezone": null,
  "recipients": null,
  "attachFile": null,
  "templateId": null,
  "isActive": null,
} satisfies CreateExportScheduleRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateExportScheduleRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


