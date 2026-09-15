import type { LetterGlyph } from "@/data/glyphs/types";

/** Modern pointed-pen minuscule `x` — edit this file only to retune the letter. */
export const glyph_x: LetterGlyph = {
  letter: "x",
  case: "lower",
  family: "special",
  advance: 30,
  strokes: [
    {
      id: "down",
      order: 1,
      kind: "shade",
      points: [
      { x: 6, y: 38, r: 0.55 },
      { x: 7.8, y: 40.89, r: 0.73 },
      { x: 9.62, y: 43.58, r: 0.91 },
      { x: 11.45, y: 46.14, r: 1.09 },
      { x: 13.33, y: 48.59, r: 1.27 },
      { x: 15.25, y: 51, r: 1.45 },
      { x: 17.23, y: 53.41, r: 1.63 },
      { x: 19.29, y: 55.86, r: 1.81 },
      { x: 21.42, y: 58.42, r: 1.99 },
      { x: 23.66, y: 61.11, r: 2.17 },
      { x: 26, y: 64, r: 2.35 },
      { x: 27.6, y: 64.24, r: 1.99 },
      { x: 29.2, y: 64.16, r: 1.63 },
      { x: 30.8, y: 63.76, r: 1.27 },
      { x: 32.4, y: 63.04, r: 0.91 },
      { x: 34, y: 62, r: 0.55 }
      ],
    },
    {
      id: "cross",
      order: 2,
      kind: "hair",
      points: [
      { x: 24, y: 38, r: 0.55 },
      { x: 22.2, y: 40.89, r: 0.55 },
      { x: 20.4, y: 43.57, r: 0.55 },
      { x: 18.6, y: 46.08, r: 0.55 },
      { x: 16.8, y: 48.46, r: 0.55 },
      { x: 15, y: 50.75, r: 0.55 },
      { x: 13.2, y: 52.98, r: 0.55 },
      { x: 11.4, y: 55.18, r: 0.55 },
      { x: 9.6, y: 57.39, r: 0.55 },
      { x: 7.8, y: 59.65, r: 0.55 },
      { x: 6, y: 62, r: 0.55 }
      ],
    }
  ],
};
