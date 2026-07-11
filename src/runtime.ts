type Runtime = "buffer" | "text-encoding";

let cachedRuntime: Runtime | null = null;

const detectRuntime = (): Runtime => {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
    return "buffer";
  }

  if (
    typeof TextEncoder !== "undefined" &&
    typeof TextDecoder !== "undefined" &&
    typeof btoa === "function" &&
    typeof atob === "function"
  ) {
    return "text-encoding";
  }

  throw new Error("No UTF-8 base64 implementation available");
};

const getRuntime = (): Runtime => {
  if (cachedRuntime === null) {
    cachedRuntime = detectRuntime();
  }

  return cachedRuntime;
};

/** @internal Resets lazy runtime detection (for tests). */
export const resetRuntimeForTesting = (): void => {
  cachedRuntime = null;
};

const bytesToBinaryString = (bytes: Uint8Array): string => {
  let binary = "";

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return binary;
};

const binaryStringToBytes = (binary: string): Uint8Array => {
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
};

const padBase64 = (base64: string): string => {
  const remainder = base64.length % 4;

  if (remainder === 0) {
    return base64;
  }

  return base64 + "=".repeat(4 - remainder);
};

const encodeWithBuffer = (input: string): string => Buffer.from(input, "utf8").toString("base64");

const decodeWithBuffer = (input: string): string => Buffer.from(input, "base64").toString("utf8");

const encodeWithTextEncoding = (input: string): string =>
  btoa(bytesToBinaryString(new TextEncoder().encode(input)));

const decodeWithTextEncoding = (input: string): string =>
  new TextDecoder().decode(binaryStringToBytes(atob(padBase64(input))));

/** @internal UTF-8 string → standard Base64. */
export const utf8ToBase64 = (input: string): string => {
  switch (getRuntime()) {
    case "buffer":
      return encodeWithBuffer(input);
    case "text-encoding":
      return encodeWithTextEncoding(input);
  }
};

/** @internal Standard Base64 → UTF-8 string. */
export const base64ToUtf8 = (input: string): string => {
  switch (getRuntime()) {
    case "buffer":
      return decodeWithBuffer(input);
    case "text-encoding":
      return decodeWithTextEncoding(input);
  }
};
