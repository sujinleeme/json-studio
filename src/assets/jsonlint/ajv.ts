import Ajv, { ErrorObject } from "ajv";
import JSONSchemaDraft6Definition from "ajv/lib/refs/json-schema-draft-06.json";

export type AjvErrorObject = ErrorObject;

export const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  $data: true,
});

ajv.addMetaSchema(JSONSchemaDraft6Definition);
