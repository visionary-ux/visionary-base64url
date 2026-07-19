import { describe, expect, test } from "vitest";

import { decodeBase64Url, encodeBase64Url } from "..";
import { testCases } from "./fixtures";

describe(encodeBase64Url.name, () => {
  test.each(testCases)("can encode a test string", ({ text, encodedText }) => {
    expect(encodeBase64Url(text)).toEqual(encodedText);
  });

  test("can handle edge cases", () => {
    expect(encodeBase64Url("")).toEqual("");

    const errorText = /encodeBase64Url.*string/;
    expect(() => encodeBase64Url(42 as unknown as string)).toThrow(errorText);
    expect(() => encodeBase64Url(null as unknown as string)).toThrow(errorText);
    expect(() => encodeBase64Url(undefined as unknown as string)).toThrow(errorText);
  });
});

describe(decodeBase64Url.name, () => {
  test.each(testCases)("can decode a test string", ({ text, encodedText }) => {
    expect(decodeBase64Url(encodedText)).toEqual(text);
  });

  test("can handle edge cases", () => {
    expect(decodeBase64Url("")).toEqual("");

    const errorText = /decodeBase64Url.*string/;
    expect(() => decodeBase64Url(42 as unknown as string)).toThrow(errorText);
    expect(() => decodeBase64Url(null as unknown as string)).toThrow(errorText);
    expect(() => decodeBase64Url(undefined as unknown as string)).toThrow(errorText);
  });
});
