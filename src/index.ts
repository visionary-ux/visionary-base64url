import { base64ToUtf8, utf8ToBase64 } from "./runtime";

/**
 * Encodes a string as base64url.
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
 * Decodes a base64url-encoded string to plain text.
 *
 * @param input base64url-encoded string to decode
 * @returns decoded plain text string
 * @throws {Error} If input is not a string
 */
export const decodeBase64Url = (input: string): string => {
  if (typeof input !== "string") {
    throw new Error("decodeBase64Url: input must be a string");
  }

  return base64ToUtf8(fromBase64Url(input));
};

/** Standard Base64 → base64url (RFC 4648 §5 alphabet, no padding). */
const toBase64Url = (base64: string): string =>
  base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** base64url → standard Base64 (RFC 4648 §4 alphabet). */
const fromBase64Url = (base64Url: string): string => base64Url.replace(/-/g, "+").replace(/_/g, "/");
