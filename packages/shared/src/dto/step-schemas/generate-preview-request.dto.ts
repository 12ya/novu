import { JSONSchema } from 'json-schema-to-ts';

export class GeneratePreviewRequestDto {
  controlValues: Record<string, unknown>;
  controlSchema: JSONSchema;
  variablesSchema: JSONSchema;
  payload: Record<string, unknown>;
}
