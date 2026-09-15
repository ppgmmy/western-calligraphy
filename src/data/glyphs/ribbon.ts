import type { PressurePoint } from "@/data/glyphs/types";

function dist(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/**
 * Expand a pressure centerline into a closed SVG path (pointed-pen ribbon).
 * Left edge follows the stroke; right edge returns — mimics shade/hair width.
 */
export function ribbonPath(points: PressurePoint[]): string {
  if (points.length < 2) return "";

  const left: Array<[number, number]> = [];
  const right: Array<[number, number]> = [];

  for (let i = 0; i < points.length; i += 1) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const { x, y, r } = points[i];
    left.push([x + nx * r, y + ny * r]);
    right.push([x - nx * r, y - ny * r]);
  }

  const parts: string[] = [];
  const [lx0, ly0] = left[0];
  parts.push(`M ${fmt(lx0)} ${fmt(ly0)}`);
  for (let i = 1; i < left.length; i += 1) {
    const [x, y] = left[i];
    parts.push(`L ${fmt(x)} ${fmt(y)}`);
  }
  for (let i = right.length - 1; i >= 0; i -= 1) {
    const [x, y] = right[i];
    parts.push(`L ${fmt(x)} ${fmt(y)}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

function fmt(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2);
}

/** Sample a quadratic bezier into pressure points with interpolated radius. */
export function quadStroke(
  x0: number,
  y0: number,
  r0: number,
  cx: number,
  cy: number,
  x1: number,
  y1: number,
  r1: number,
  steps = 10,
): PressurePoint[] {
  const pts: PressurePoint[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const omt = 1 - t;
    const x = omt * omt * x0 + 2 * omt * t * cx + t * t * x1;
    const y = omt * omt * y0 + 2 * omt * t * cy + t * t * y1;
    const r = r0 + (r1 - r0) * t;
    pts.push({ x, y, r });
  }
  // Drop near-duplicates
  return pts.filter((p, i, arr) => {
    if (i === 0) return true;
    return dist(arr[i - 1], p) > 0.35;
  });
}

/** Sample a cubic bezier into pressure points. */
export function cubicStroke(
  x0: number,
  y0: number,
  r0: number,
  c1x: number,
  c1y: number,
  c2x: number,
  c2y: number,
  x1: number,
  y1: number,
  r1: number,
  steps = 12,
): PressurePoint[] {
  const pts: PressurePoint[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const omt = 1 - t;
    const x =
      omt * omt * omt * x0 +
      3 * omt * omt * t * c1x +
      3 * omt * t * t * c2x +
      t * t * t * x1;
    const y =
      omt * omt * omt * y0 +
      3 * omt * omt * t * c1y +
      3 * omt * t * t * c2y +
      t * t * t * y1;
    const r = r0 + (r1 - r0) * t;
    pts.push({ x, y, r });
  }
  return pts.filter((p, i, arr) => {
    if (i === 0) return true;
    return dist(arr[i - 1], p) > 0.35;
  });
}

export function joinStrokes(
  ...segments: PressurePoint[][]
): PressurePoint[] {
  const out: PressurePoint[] = [];
  for (const seg of segments) {
    for (const p of seg) {
      if (out.length === 0 || dist(out[out.length - 1], p) > 0.35) {
        out.push(p);
      }
    }
  }
  return out;
}
