import { labFontVersions } from "./fontRegistry";
import type {
  LabCompareRow,
  LabFontId,
  LabFontVersion,
} from "./types";
import { compareLabVersions, shortChecksum } from "./version";

function byVersionThenId(a: LabFontVersion, b: LabFontVersion): number {
  const versionDiff = compareLabVersions(b.version, a.version);
  if (versionDiff !== 0) return versionDiff;
  return b.id.localeCompare(a.id);
}

export function getCurrentLabFonts(): LabFontVersion[] {
  return labFontVersions.filter((item) => item.status === "current");
}

export function getArchivedLabFonts(): LabFontVersion[] {
  return labFontVersions
    .filter((item) => item.status === "archived")
    .slice()
    .sort((a, b) => {
      const byArchived = (b.archivedAt ?? b.createdAt).localeCompare(
        a.archivedAt ?? a.createdAt,
      );
      if (byArchived !== 0) return byArchived;
      return byVersionThenId(a, b);
    });
}

export function getLabFontsByFamily(family: string): LabFontVersion[] {
  return labFontVersions.filter((item) => item.family === family);
}

export function getCurrentLabFont(
  fontId: LabFontId,
): LabFontVersion | undefined {
  const currents = labFontVersions.filter(
    (item) => item.fontId === fontId && item.status === "current",
  );
  if (currents.length > 1) {
    console.warn(
      `[lab] fontId "${fontId}" has ${currents.length} current entries; using first.`,
    );
  }
  return currents[0];
}

/**
 * Lineage for one font family: current first, then archives
 * (newer version / newer archive first).
 */
export function getLabFontLineage(fontId: LabFontId): LabFontVersion[] {
  const current = getCurrentLabFont(fontId);
  const archives = labFontVersions
    .filter((item) => item.fontId === fontId && item.status === "archived")
    .slice()
    .sort((a, b) => {
      const versionDiff = compareLabVersions(b.version, a.version);
      if (versionDiff !== 0) return versionDiff;
      return (b.archivedAt ?? b.createdAt).localeCompare(
        a.archivedAt ?? a.createdAt,
      );
    });

  return current ? [current, ...archives] : archives;
}

export function fontsShareGlyphs(
  a: LabFontVersion,
  b: LabFontVersion,
): boolean {
  return a.checksums.woff2 === b.checksums.woff2;
}

/** Compare grid rows with derived “same as current” flags. */
export function getLabCompareRows(fontId: LabFontId): LabCompareRow[] {
  const current = getCurrentLabFont(fontId);
  return getLabFontLineage(fontId).map((font) => ({
    font,
    matchesCurrent: current ? fontsShareGlyphs(font, current) : false,
    fingerprint: shortChecksum(font.checksums.woff2),
  }));
}
