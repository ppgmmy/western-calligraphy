export type LabChangeKind =
  | "font-release"
  | "font-archive"
  | "glyph-edit"
  | "sheet-ui"
  | "policy"
  | "note";

/** Stable slug used by build scripts + registry (not display name). */
export type LabFontId = "scriptoria-italic";

export type LabFontStatus = "current" | "archived";

/** Why an archived build exists. */
export type LabArchiveKind = "baseline" | "pre-overwrite";

export type LabLogEntry = {
  id: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  kind: LabChangeKind;
  titleZh: string;
  summaryZh: string;
  paths?: string[];
  fontId?: LabFontId;
  version?: string;
  /** Prior lab version this change replaces / was built from. */
  previousVersion?: string;
};

export type LabFontFiles = {
  ttf: string;
  woff2: string;
  readme?: string;
  ofl?: string;
  manifest?: string;
};

export type LabFontChecksums = {
  ttf: string;
  woff2: string;
};

export type LabFontVersion = {
  id: string;
  fontId: LabFontId;
  family: string;
  version: string;
  status: LabFontStatus;
  /** Release / first-seen date (YYYY-MM-DD). */
  createdAt: string;
  /** Set when status is archived. */
  archivedAt?: string;
  archiveKind?: LabArchiveKind;
  source: string;
  license: string;
  files: LabFontFiles;
  checksums: LabFontChecksums;
  notesZh: string;
  sample: string;
};

/** One row in the /lab compare grid, with derived sameness. */
export type LabCompareRow = {
  font: LabFontVersion;
  /** Matches the family's current build (byte-identical woff2). */
  matchesCurrent: boolean;
  fingerprint: string;
};
