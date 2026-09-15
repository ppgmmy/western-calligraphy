import { glyphRibbonPaths, GLYPH_METRICS, type LetterGlyph } from "@/data/glyphs";

type GlyphLetterProps = {
  glyph: LetterGlyph;
  x: number;
  /** Baseline y in page coordinates */
  baselineY: number;
  /** Scale: glyph units → page pixels (x-height ~26 glyph units ≈ target) */
  scale?: number;
  fill?: string;
  opacity?: number;
};

/**
 * Renders one managed letter glyph as filled SVG ribbons (PDF-safe, no font).
 */
export function GlyphLetter({
  glyph,
  x,
  baselineY,
  scale = 0.9,
  fill = "#1c232b",
  opacity = 1,
}: GlyphLetterProps) {
  const paths = glyphRibbonPaths(glyph);
  const baseline = GLYPH_METRICS.baseline;

  return (
    <g
      transform={`translate(${x} ${baselineY - baseline * scale}) scale(${scale})`}
      opacity={opacity}
      aria-label={glyph.letter}
    >
      {paths.map((d, index) =>
        d ? (
          <path
            key={`${glyph.letter}-${glyph.strokes[index]?.id ?? index}`}
            d={d}
            fill={fill}
            stroke="none"
          />
        ) : null,
      )}
    </g>
  );
}
