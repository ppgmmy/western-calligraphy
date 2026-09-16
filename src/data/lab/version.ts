/**
 * Lab version labels are dotted numbers, e.g. "1.000" / "1.001".
 * Missing or empty segments sort before present ones.
 */
export function compareLabVersions(a: string, b: string): number {
  const left = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const right = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const len = Math.max(left.length, right.length);

  for (let i = 0; i < len; i += 1) {
    const diff = (left[i] ?? 0) - (right[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function formatLabVersion(version: string): string {
  return `v${version}`;
}

/** Short checksum for UI inspection (not for security). */
export function shortChecksum(hex: string, chars = 8): string {
  return hex.slice(0, chars);
}
