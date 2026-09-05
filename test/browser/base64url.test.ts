import { describe, expect, test } from "vitest";

import { decodeBase64Url, encodeBase64Url } from "../../dist/index.js";
import { malformedBase64UrlCases, runtimeCases } from "../runtime-cases";

describe("Chromium runtime", () => {
  test("uses browser APIs without Node.js globals", () => {
    expect(typeof window).toBe("object");
    expect(typeof globalThis.atob).toBe("function");
    expect(typeof globalThis.btoa).toBe("function");
    expect("Buffer" in globalThis).toBe(false);
  });

  test.each(runtimeCases)("encodes and decodes $text", ({ encoded, text }) => {
    expect(encodeBase64Url(text)).toBe(encoded);
    expect(decodeBase64Url(encoded)).toBe(text);
  });

  test.each(malformedBase64UrlCases)("rejects malformed input %s", (input) => {
    expect(() => decodeBase64Url(input)).toThrow(/valid base64url string/);
  });
});
