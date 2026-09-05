import { base64ToUtf8, utf8ToBase64 } from "./runtime";

const VALID_BASE64URL_REGEX = /^[A-Za-z0-9_-]*={0,2}$/;
const INVALID_BASE64URL_ERROR = "decodeBase64Url: input must be a valid base64url string";

/**
 * Encodes a string as base64url
 *
 * @param input string to encode
 * @returns base64url-encoded string
 * @throws {Error} If input is not a string
 */
export const encodeBase64Url = (input: string): string => {
  if (typeof input !== "string") {
    throw new Error("encodeBase64Url: input must be a string");
  }

  return toBase64Url(utf8ToBase64(input));
};

/**
 * Decodes a base64url-encoded string to plain text
 *
 * @param input base64url-encoded string to decode
 * @returns decoded plain text string
 * @throws {Error} If input is not a string or is not valid base64url
 */
export const decodeBase64Url = (input: string): string => {
  if (typeof input !== "string") {
    throw new Error("decodeBase64Url: input must be a string");
  }

  assertValidBase64Url(input);

  return base64ToUtf8(fromBase64Url(input));
};

/** Converts standard Base64 into a URL-safe version (RFC 4648, Section 5) */
const toBase64Url = (base64: string): string =>
  base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** Converts URL-safe Base64 back to standard form (RFC 4648, Section 4: restores `+` and `/`) */
const fromBase64Url = (base64Url: string): string => base64Url.replace(/-/g, "+").replace(/_/g, "/");

/** Validates base64url input before runtime-specific decode paths */
const assertValidBase64Url = (input: string): void => {
  if (!VALID_BASE64URL_REGEX.test(input)) {
    throw new Error(INVALID_BASE64URL_ERROR);
  }

  const unpadded = input.replace(/=+$/, "");
  const paddingLength = input.length - unpadded.length;
  const remainder = unpadded.length % 4;

  // Base64 strings can never have a remainder of 1
  if (remainder === 1) {
    throw new Error(INVALID_BASE64URL_ERROR);
  }

  if (paddingLength > 0) {
    const expectedPadding = remainder === 2 ? 2 : remainder === 3 ? 1 : 0;

    if (expectedPadding === 0 || paddingLength !== expectedPadding) {
      throw new Error(INVALID_BASE64URL_ERROR);
    }
  }
};
