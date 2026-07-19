import { Buffer } from "node:buffer";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { base64ToUtf8, resetRuntimeForTesting, utf8ToBase64 } from "../runtime";
import { testCases } from "./fixtures";

// Store refs to native globals
const NativeTextEncoder = globalThis.TextEncoder;
const NativeTextDecoder = globalThis.TextDecoder;

// Simulate browser btoa/atob in Node to test the TextEncoder path
const browserBtoa = (binary: string): string => Buffer.from(binary, "binary").toString("base64");
const browserAtob = (base64: string): string => Buffer.from(base64, "base64").toString("binary");

// Run as Node only (Buffer available; TextEncoder/TextDecoder, atob/btoa stubbed out)
const runWithBufferRuntime = <T>(fn: () => T): T => {
  vi.unstubAllGlobals();
  vi.stubGlobal("TextEncoder", undefined);
  vi.stubGlobal("TextDecoder", undefined);
  vi.stubGlobal("btoa", undefined);
  vi.stubGlobal("atob", undefined);
  resetRuntimeForTesting();

  return fn();
};

// Run browser/worker path by unlinking Buffer
const runWithTextEncodingRuntime = <T>(fn: () => T): T => {
  vi.unstubAllGlobals();
  vi.stubGlobal("Buffer", undefined);
  vi.stubGlobal("TextEncoder", NativeTextEncoder);
  vi.stubGlobal("TextDecoder", NativeTextDecoder);
  vi.stubGlobal("btoa", browserBtoa);
  vi.stubGlobal("atob", browserAtob);
  resetRuntimeForTesting();

  return fn();
};

// Buffer (Node) and TextEncoder+btoa (browser) paths must produce identical encode/decode results
describe("cross-runtime interop", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    resetRuntimeForTesting();
  });

  test.each(testCases)("buffer and text-encoding paths agree for %#", ({ text }) => {
    const bufferEncoded = runWithBufferRuntime(() => utf8ToBase64(text));
    const textEncodingEncoded = runWithTextEncodingRuntime(() => utf8ToBase64(text));

    expect(textEncodingEncoded).toEqual(bufferEncoded);

    const bufferDecoded = runWithBufferRuntime(() => base64ToUtf8(bufferEncoded));
    const textEncodingDecoded = runWithTextEncodingRuntime(() => base64ToUtf8(textEncodingEncoded));

    expect(textEncodingDecoded).toEqual(bufferDecoded);
    expect(bufferDecoded).toEqual(text);
  });

  // Test browser only (TextEncoder/TextDecoder + btoa/atob; Buffer not available)
  describe("browser runtime path", () => {
    beforeEach(() => {
      vi.unstubAllGlobals();
      vi.stubGlobal("Buffer", undefined);
      vi.stubGlobal("TextEncoder", NativeTextEncoder);
      vi.stubGlobal("TextDecoder", NativeTextDecoder);
      vi.stubGlobal("btoa", browserBtoa);
      vi.stubGlobal("atob", browserAtob);
      resetRuntimeForTesting();
    });

    test("round-trips emoji via text-encoding runtime", () => {
      const text = "👨‍👩‍👧‍👦";
      expect(base64ToUtf8(utf8ToBase64(text))).toEqual(text);
    });
  });

  // Test node only using Buffer, browser APIs stubbed out
  describe("node runtime path", () => {
    beforeEach(() => {
      vi.unstubAllGlobals();
      vi.stubGlobal("TextEncoder", undefined);
      vi.stubGlobal("TextDecoder", undefined);
      vi.stubGlobal("btoa", undefined);
      vi.stubGlobal("atob", undefined);
      resetRuntimeForTesting();
    });

    test("round-trips emoji via buffer runtime", () => {
      const text = "👨‍👩‍👧‍👦";
      expect(base64ToUtf8(utf8ToBase64(text))).toEqual(text);
    });
  });
});
