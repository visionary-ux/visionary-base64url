export interface TestCase {
  text: string;
  /** base64url encoded text */
  encodedText: string;
}

export const testCases: Array<TestCase> = [
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
    text: "https://openrouter.ai/rankings?view=month#market-share",
    encodedText: "aHR0cHM6Ly9vcGVucm91dGVyLmFpL3JhbmtpbmdzP3ZpZXc9bW9udGgjbWFya2V0LXNoYXJl",
  },
  {
    text: "?>?>",
    encodedText: "Pz4_Pg",
  },
  {
    text: "~~~~~~~",
    encodedText: "fn5-fn5-fg",
  },
  {
    text: "base64padding==",
    encodedText: "YmFzZTY0cGFkZGluZz09",
  },
  {
    text: "slash/slash",
    encodedText: "c2xhc2gvc2xhc2g",
  },
  {
    text: "Hello, 世界! 🌍",
    encodedText: "SGVsbG8sIOS4lueVjCEg8J-MjQ",
  },
  {
    text: "👨‍👩‍👧‍👦",
    encodedText: "8J-RqOKAjfCfkanigI3wn5Gn4oCN8J-Rpg",
  },
  {
    text: "user@example.com",
    encodedText: "dXNlckBleGFtcGxlLmNvbQ",
  },
  {
    text: '{"key":"value"}',
    encodedText: "eyJrZXkiOiJ2YWx1ZSJ9",
  },
  {
    text: "Line1\nLine2\rLine3\r\n",
    encodedText: "TGluZTEKTGluZTINTGluZTMNCg",
  },
  {
    text: "\t\t\tIndented",
    encodedText: "CQkJSW5kZW50ZWQ",
  },
  {
    text: "!@#$%^&*()_+-=[]{}|;':\",./<>?`~",
    encodedText: "IUAjJCVeJiooKV8rLT1bXXt9fDsnOiIsLi88Pj9gfg",
  },
];
