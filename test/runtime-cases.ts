export const runtimeCases = [
  { text: "", encoded: "" },
  { text: "test", encoded: "dGVzdA" },
  { text: "?>?>", encoded: "Pz4_Pg" },
  { text: "~~~~~~~", encoded: "fn5-fn5-fg" },
  { text: "Hello, 世界! 🌍", encoded: "SGVsbG8sIOS4lueVjCEg8J-MjQ" },
] as const;

export const malformedBase64UrlCases = ["Q", "@@@", "Zm9v$", "YWJj=Z", "YQ==="] as const;
