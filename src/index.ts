import { decode as decodeBase64, encode as encodeBase64 } from "js-base64";

export const encodeBase64Url = (input: string): string => {
  if (typeof input !== "string") {
    throw new Error("encodeBase64Url: input must be a string");
  }

  return encodeBase64(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const decodeBase64Url = (input: string): string => {
  if (typeof input !== "string") {
    throw new Error("decodeBase64Url: input must be a string");
  }
  return decodeBase64(input.replace(/-/g, "+").replace(/_/g, "/"));
};
