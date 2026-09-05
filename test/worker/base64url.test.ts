import { describe, expect, test, vi } from "vitest";

import { decodeBase64Url, encodeBase64Url } from "../../dist/index.js";
import { malformedBase64UrlCases, runtimeCases } from "../runtime-cases";

// Vitest adds Node.js compatibility -- hide Buffer to test the edge-native path
vi.stubGlobal("Buffer", undefined);

describe("Cloudflare Workers runtime", () => {
  test("uses Workers APIs without browser or Node.js globals", () => {
    const workerGlobal = globalThis as typeof globalThis & {
      Buffer?: unknown;
      WebSocketPair?: unknown;
    };

    expect(typeof workerGlobal.WebSocketPair).toBe("function");
    expect(typeof globalThis.atob).toBe("function");
    expect(typeof globalThis.btoa).toBe("function");
    expect("document" in globalThis).toBe(false);
    expect(workerGlobal.Buffer).toBeUndefined();
  });

  test.each(runtimeCases)("encodes and decodes $text", ({ encoded, text }) => {
    expect(encodeBase64Url(text)).toBe(encoded);
    expect(decodeBase64Url(encoded)).toBe(text);
  });

  test.each(malformedBase64UrlCases)("rejects malformed input %s", (input) => {
    expect(() => decodeBase64Url(input)).toThrow(/valid base64url string/);
  });
});
