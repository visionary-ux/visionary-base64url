import { describe, expect, test } from "vitest";

import { decodeBase64Url, encodeBase64Url } from "../index";

// "café" as precomposed é (NFC) vs e + combining acute (NFD) — same glyph, different code units
const cafeNfc = "caf\u00e9";
const cafeNfd = "cafe\u0301";

/** Round-trip cases for ZWJ, astral plane, combining marks, and invisible/control characters */
const unicodeCases = [
  {
    name: "ZWJ family emoji",
    text: "👨‍👩‍👧‍👦",
  },
  {
    name: "light skin tone + profession ZWJ",
    text: "👩🏼‍💻",
  },
  {
    name: "medium skin tone waving hand (no ZWJ)",
    text: "👋🏽",
  },
  {
    name: "pirate flag (flag + ZWJ sequence)",
    text: "🏴‍☠️",
  },
  {
    name: "heart on fire (emoji + ZWJ sequence)",
    text: "❤️‍🔥",
  },
  {
    name: "keycap sequence",
    text: "1️⃣",
  },
  {
    name: "precomposed cafe (NFC)",
    text: cafeNfc,
  },
  {
    name: "decomposed cafe (NFD)",
    text: cafeNfd,
  },
  {
    name: "astral plane emoji",
    text: "🎉",
  },
  {
    name: "rare kanji astral plane",
    text: "𠮷",
  },
  {
    name: "mixed BMP and astral",
    text: "Hello𠮷",
  },
  {
    name: "zero-width space",
    text: "a\u200Bb",
  },
  {
    name: "byte order mark",
    text: "\uFEFFhello",
  },
  {
    name: "null character",
    text: "a\u0000b",
  },
  {
    name: "right-to-left override",
    text: "abc\u202Edef",
  },
] as const;

// UTF-8 round-trips must preserve exact code units — no NFC/NFD normalization
describe("unicode-safe round trips", () => {
  test.each(unicodeCases)("$name preserves exact code units", ({ text }) => {
    expect(decodeBase64Url(encodeBase64Url(text))).toEqual(text);
  });

  // Same visual character, different code units — encoding must not normalize NFC/NFD
  test("NFC and NFD forms stay distinct", () => {
    expect(cafeNfc).not.toEqual(cafeNfd);
    expect(encodeBase64Url(cafeNfc)).not.toEqual(encodeBase64Url(cafeNfd));
    expect(decodeBase64Url(encodeBase64Url(cafeNfc))).toEqual(cafeNfc);
    expect(decodeBase64Url(encodeBase64Url(cafeNfd))).toEqual(cafeNfd);
  });
});
