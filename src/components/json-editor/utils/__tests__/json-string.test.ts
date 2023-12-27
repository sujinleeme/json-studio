import {
  invalidFormattedJsonInput,
  validFormattedJsonInput,
  validMinifiedJsonInput,
} from "../__mocks__/mock-data";
import { minifyJsonString, prettifyJsonString } from "../json-string";

describe("minifyJsonString", () => {
  test("should minify string if json string is valid", () => {
    const result = minifyJsonString(validFormattedJsonInput);
    expect(result).toBe(validMinifiedJsonInput);
  });

  test("should original string if json string is invalid", () => {
    const result = minifyJsonString(invalidFormattedJsonInput);
    expect(result).toBe(invalidFormattedJsonInput);
  });
});

describe("prettifyJsonString", () => {
  test("should format string if json string is valid", () => {
    const result = prettifyJsonString(validMinifiedJsonInput);
    expect(result).toBe(validFormattedJsonInput);
  });

  test("should original string if json string is invalid", () => {
    const result = prettifyJsonString(invalidFormattedJsonInput);
    expect(result).toBe(invalidFormattedJsonInput);
  });
});
