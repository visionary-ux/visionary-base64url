import { describe, expect, test } from "vitest";

import { decodeBase64Url, encodeBase64Url } from "..";

/** Fixed seed for deterministic, pseudorandom sequence */
const FUZZ_SEED = 0xba564f;
const FUZZ_ITERATIONS = 2_000;
const MAX_STRING_LENGTH = 128;

// Verify encode → decode returns the original text, over many random inputs
describe("seeded unicode fuzz", () => {
  test(`round-trips ${FUZZ_ITERATIONS} deterministic random strings`, () => {
    const random = createSeededRandom(FUZZ_SEED);

    for (let i = 0; i < FUZZ_ITERATIONS; i++) {
      const text = randomUnicodeString(random);

      try {
        expect(decodeBase64Url(encodeBase64Url(text))).toEqual(text);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`fuzz failure at iteration ${i} (seed ${FUZZ_SEED}): ${message}`);
      }
    }
  });
});

/** Generates a deterministic, pseudorandom unicode string for testing */
const randomUnicodeString = (random: () => number): string => {
  const length = Math.floor(random() * MAX_STRING_LENGTH);
  let text = "";

  for (let i = 0; i < length; i++) {
    text += String.fromCodePoint(randomUnicodeScalar(random));
  }

  return text;
};

/** Returns a valid Unicode character */
const randomUnicodeScalar = (random: () => number): number => {
  while (true) {
    const roll = random();

    if (roll < 0.1) {
      return Math.floor(random() * 0x80);
    }

    if (roll < 0.7) {
      const codePoint = Math.floor(random() * 0x10000);

      if (codePoint < 0xd800 || codePoint > 0xdfff) {
        return codePoint;
      }

      continue;
    }

    return 0x10000 + Math.floor(random() * 0x10000);
  }
};

/** Create deterministic pseudorandom number generator seeded by `FUZZ_SEED` */
const createSeededRandom = (seed: number): (() => number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
