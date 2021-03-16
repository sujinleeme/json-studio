import { ajv, AjvErrorObject } from "./ajv";
import { parseString } from "./utils";

export enum JsonErrorType {
  Schema = "schema",
  Parse = "parse",
}

/**
 * Improve the error message of a JSON schema error
 */

export interface ImproveSchemaError extends AjvErrorObject {
  type: JsonErrorType.Schema;
}

const improveSchemaError = (error: AjvErrorObject): ImproveSchemaError => {
  let message = "";
  if (error.keyword === "enum" && Array.isArray(error.schema)) {
    let enums = error.schema;
    if (enums) {
      enums = enums.map((value) => JSON.stringify(value));

      if (enums.length > 5) {
        const more = [`(${enums.length - 5} more...)`];
        enums = enums.slice(0, 5);
        enums.push(more);
      }
      message = `should be equal to one of: ${enums.join(", ")}`;
    }
  }

  if (error.keyword === "additionalProperties") {
    message = `should NOT have additional property: ${error.params.additionalProperty}`;
  }
  return {
    ...error,
    message,
    type: JsonErrorType.Schema,
  };
};

/**
 * Execute JSON schema validation (ajv)
 */
interface ValidateSchemaArgs {
  schema?: Record<string, unknown>;
  json?: JSON;
}

type ValidateSchema = ImproveSchemaError[] | undefined;

const validateSchema = ({ schema, json }: ValidateSchemaArgs): ValidateSchema => {
  if (schema) {
    const validator = ajv.compile(schema);
    const isValid = validator(json);
    if (!isValid) {
      const { errors } = validator;
      return (errors && errors.map((error) => improveSchemaError(error))) || undefined;
    }
  }
  return undefined;
};

/**
 * Execute JSON schema validation (ajv)
 */

interface ImproveParseError {
  line?: number;
  type: JsonErrorType.Parse;
  message: string;
}

const improveParseError = (err: Error): ImproveParseError[] => {
  const match = /\w*line\s*(\d+)\w*/g.exec(err.message);
  const line = (match && +match[1]) || undefined;
  return [
    {
      line,
      type: JsonErrorType.Parse,
      message: err.message,
    },
  ];
};

/**
 * Execute JSON validation
 */
interface ValidateJsonArgs {
  jsonString: string;
  schema?: Record<string, unknown>;
}

export type ValidationJson = (ImproveSchemaError | ImproveParseError)[] | undefined;

export const validateJson = ({ jsonString, schema }: ValidateJsonArgs): ValidationJson => {
  try {
    const json = parseString(jsonString);
    // execute JSON schema validation (ajv)
    return validateSchema({ schema, json });
  } catch (err) {
    // try to extract the line number from the jsonlint error message
    return jsonString ? improveParseError(err) : undefined;
  }
};
