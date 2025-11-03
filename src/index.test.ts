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
  {
    text: "?>?>", // Produces '/' in standard base64 (Pz4/Pg==)
    encodedText: "Pz4_Pg",
  },
  {
    text: "~~~~~~~", // Produces '+' in standard base64 (fn5+fn5+fg==)
    encodedText: "fn5-fn5-fg",
  },
  {
    text: "base64padding==", // Tests padding removal
    encodedText: "YmFzZTY0cGFkZGluZz09",
  },
  {
    text: "slash/slash",
    encodedText: "c2xhc2gvc2xhc2g",
  },
  {
    text: "Hello, 世界! 🌍", // Unicode and emoji
    encodedText: "SGVsbG8sIOS4lueVjCEg8J-MjQ",
  },
  {
    text: "user@example.com",
    encodedText: "dXNlckBleGFtcGxlLmNvbQ",
  },
  {
    text: '{"key":"value"}', // stringified JSON
    encodedText: "eyJrZXkiOiJ2YWx1ZSJ9",
  },
  {
    text: "Line1\nLine2\rLine3\r\n", // test newlines
    encodedText: "TGluZTEKTGluZTINTGluZTMNCg",
  },
  {
    text: "\t\t\tIndented", // test tabs
    encodedText: "CQkJSW5kZW50ZWQ",
  },
  {
    text: "!@#$%^&*()_+-=[]{}|;':\",./<>?`~", // test ASCII characters
    encodedText: "IUAjJCVeJiooKV8rLT1bXXt9fDsnOiIsLi88Pj9gfg",
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
