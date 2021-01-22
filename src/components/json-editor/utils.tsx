import jsonlint from "../../assets/jsonlint";

export type MinifyJsonString = (jsonString: string) => void;

export const minifyJsonString = (jsonString: string) => {
  try {
    return JSON.stringify(JSON.parse(jsonString), null);
  } catch (err) {
    return jsonString;
  }
};

export const prettifyJsonString = (jsonString: string) => {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, "\t");
  } catch (err) {
    return jsonString;
  }
};

/**
 * Validate a string containing a JSON object
 * This method uses JSONLint to validate the String. If JSONLint is not
 * available, the built-in JSON parser of the browser is used.
 */
export const validateString = (jsonString: string) =>
  jsonlint ? jsonlint.parse(jsonString) : JSON.parse(jsonString);

/**
 * Escape unicode characters.
 * For example input '\u2661' (length 1) will output '\\u2661' (length 5).
 * @param {string} text
 * @return {string}
 */
export function escapeUnicodeChars(
  // see https://www.wikiwand.com/en/UTF-16
  text: string
) {
  return (
    // note: we leave surrogate pairs as two individual chars,
    // as JSON doesn't interpret them as a single unicode char.
    text.replace(
      /[\u007F-\uFFFF]/g,
      (c) => `\\u${`0000${c.charCodeAt(0).toString(16)}`.slice(-4)}`
    )
  );
}

/**
 * Parse JSON using the parser built-in in the browser.
 * On exception, the jsonString is validated and a detailed error is thrown.
 */

export const parseString = (jsonString: string): JSON => {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    // try to throw a more detailed error message using validate
    validateString(jsonString);
    // rethrow the original error
    throw err;
  }
};
