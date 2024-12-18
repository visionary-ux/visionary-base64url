import { describe, expect, test } from "vitest";

import { encodeBase64Url, decodeBase64Url } from ".";

interface TestCase {
  text: string;
  /** base64url encoded text */
  encodedText: string;
}

const testCases: Array<TestCase> = [
  {
    text: "String with zero equals signs in base64",
    encodedText: "U3RyaW5nIHdpdGggemVybyBlcXVhbHMgc2lnbnMgaW4gYmFzZTY0",
  },
  {
    text: "string with one equals in base64",
    encodedText: "c3RyaW5nIHdpdGggb25lIGVxdWFscyBpbiBiYXNlNjQ",
  },
  {
    text: "String with *two* equals in base64",
    encodedText: "U3RyaW5nIHdpdGggKnR3byogZXF1YWxzIGluIGJhc2U2NA",
  },
  {
    text: "The quick brown fox jumps over the lazy dog.",
    encodedText: "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4",
  },
  {
    text: "test",
    encodedText: "dGVzdA",
  },
  {
    text: "https://www.spacex.com/vehicles/starship",
    encodedText: "aHR0cHM6Ly93d3cuc3BhY2V4LmNvbS92ZWhpY2xlcy9zdGFyc2hpcA",
  },
];

describe(encodeBase64Url.name, () => {
  test.each(testCases)("can encode a test string", ({ text, encodedText }) => {
    const result = encodeBase64Url(text);

    expect(result).toEqual(encodedText);
  });

  test("can handle edge cases", () => {
    expect(encodeBase64Url("")).toEqual("");

    const errorText = /encodeBase64Url.*string/;
    expect(() => encodeBase64Url(42 as unknown as string)).toThrowError(errorText);
    expect(() => encodeBase64Url(null as unknown as string)).toThrowError(errorText);
    expect(() => encodeBase64Url(undefined as unknown as string)).toThrowError(errorText);
  });
});

describe(decodeBase64Url.name, () => {
  test.each(testCases)("can decode a test string", ({ text, encodedText }) => {
    const result = decodeBase64Url(encodedText);

    expect(result).toEqual(text);
  });

  test("can handle edge cases", () => {
    expect(decodeBase64Url("")).toEqual("");

    const errorText = /decodeBase64Url.*string/;
    expect(() => decodeBase64Url(42 as unknown as string)).toThrowError(errorText);
    expect(() => decodeBase64Url(null as unknown as string)).toThrowError(errorText);
    expect(() => decodeBase64Url(undefined as unknown as string)).toThrowError(errorText);
  });
});
