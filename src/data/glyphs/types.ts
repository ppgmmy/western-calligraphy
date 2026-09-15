/**
 * Per-letter calligraphy glyphs — long-term source of truth.
 * Edit one letter file at a time; render expands pressure points → SVG ribbon paths.
 * These are original teaching forms (55° pointed-pen DNA), not a copy of any studio sheet.
 */

export type GlyphCase = "lower" | "upper";

export type GlyphFamily =
  | "oval"
  | "arch"
  | "ascender"
  | "descender"
  | "special"
  | "stroke"
  | "capital";

/** One point along a pen track: position + ribbon half-width (shade vs hair). */
export type PressurePoint = {
  x: number;
  y: number;
  /** ribbon half-width in glyph units */
  r: number;
};

export type GlyphStroke = {
  id: string;
  /** Optional teaching label order */
  order?: number;
  kind: "shade" | "hair" | "oval" | "dot";
  points: PressurePoint[];
};

export type LetterGlyph = {
  letter: string;
  case: GlyphCase;
  family: GlyphFamily;
  /** Horizontal advance width in glyph units */
  advance: number;
  strokes: GlyphStroke[];
  note?: string;
};

/** Shared guideline metrics (glyph viewBox height = 100). */
export const GLYPH_METRICS = {
  viewBoxH: 100,
  viewBoxW: 72,
  ascender: 14,
  xHeight: 38,
  baseline: 64,
  descender: 90,
  /** Approximate pointed-pen slant from horizontal; strokes lean "/" (down-left). */
  slantDeg: 55,
} as const;
