import type { LetterGlyph } from "@/data/glyphs/types";

/** Modern pointed-pen minuscule `i` — edit this file only to retune the letter. */
export const glyph_i: LetterGlyph = {
  letter: "i",
  case: "lower",
  family: "arch",
  advance: 22,
  note: "stem + tittle",
  strokes: [
    {
      id: "stem",
      order: 1,
      kind: "shade",
      points: [
      { x: 8, y: 40, r: 0.55 },
      { x: 9.68, y: 42.4, r: 0.73 },
      { x: 11.36, y: 44.8, r: 0.91 },
      { x: 13.04, y: 47.2, r: 1.09 },
      { x: 14.72, y: 49.6, r: 1.27 },
      { x: 16.4, y: 52, r: 1.45 },
      { x: 18.08, y: 54.4, r: 1.63 },
      { x: 19.76, y: 56.8, r: 1.81 },
      { x: 21.44, y: 59.2, r: 1.99 },
      { x: 23.12, y: 61.6, r: 2.17 },
      { x: 24.8, y: 64, r: 2.35 },
      { x: 26.4, y: 64.24, r: 1.99 },
      { x: 28, y: 64.16, r: 1.63 },
      { x: 29.6, y: 63.76, r: 1.27 },
      { x: 31.2, y: 63.04, r: 0.91 },
      { x: 32.8, y: 62, r: 0.55 }
      ],
    },
    {
      id: "dot",
      order: 2,
      kind: "dot",
      points: [
      { x: 11, y: 21, r: 1.25 },
      { x: 12.2, y: 19.5, r: 1.1 },
      { x: 11, y: 21, r: 1.25 }
      ],
    }
  ],
};
