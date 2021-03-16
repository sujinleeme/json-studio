import jsonlint from ".";

/**
 * Validate a string containing a JSON object
 * This method uses JSONLint to validate the String. If JSONLint is not
 * available, the built-in JSON parser of the browser is used.
 */
export const validateString = (jsonString: string): void =>
  jsonlint ? jsonlint.parse(jsonString) : JSON.parse(jsonString);

/**
 * Escape unicode characters.
 * For example input '\u2661' (length 1) will output '\\u2661' (length 5).
 */
export const escapeUnicodeChars = (
  // see https://www.wikiwand.com/en/UTF-16
  text: string
): string =>
  // note: we leave surrogate pairs as two individual chars,
  // as JSON doesn't interpret them as a single unicode char.
  text.replace(/[\u007F-\uFFFF]/g, (c) => `\\u${`0000${c.charCodeAt(0).toString(16)}`.slice(-4)}`);

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
