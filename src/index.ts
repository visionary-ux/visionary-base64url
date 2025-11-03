import { decode as decodeBase64, encode as encodeBase64 } from "js-base64";

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

  return encodeBase64(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
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
  return decodeBase64(input.replace(/-/g, "+").replace(/_/g, "/"));
};
