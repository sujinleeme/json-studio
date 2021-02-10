const jsonInput =
  '{"name": "Lucrezia Nethersole", "email": "l.nethersole@hotmail.com", "date_of_birth": "2007–01–23" }';

const schema = `{ "name": "sample schema", "type": "object", "properties": { "name": { "title": "Name", "type": "string", "description": "Users full name supporting unicode but no emojis.", "maxLength": 20 }, "email": { "title": "Email", "description": "Like a postal address but for computers.", "type": "string", "format": "email" }, "date_of_birth": { "title": "Date Of Birth", "type": "string", "description": "Date of uses birth in the one and only date standard: ISO 8601.", "format": "date", "example": "1990–12–28" } }, "required": [ "name" ] }`;

export interface MockData {
  jsonInput?: string;
  schema?: string;
}

export const mockData: MockData = {
  jsonInput,
  schema,
};
