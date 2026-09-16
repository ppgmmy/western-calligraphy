export type LabChangeKind =
  | "font-release"
  | "font-archive"
  | "glyph-edit"
  | "sheet-ui"
  | "policy"
  | "note";

export type LabLogEntry = {
  id: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  kind: LabChangeKind;
  titleZh: string;
  summaryZh: string;
  /** Related paths for inspection */
  paths?: string[];
  /** Font family id when relevant */
  fontId?: string;
  /** Semver-like lab version label */
  version?: string;
  /** Previous version for comparison */
  previousVersion?: string;
};

export type LabFontVersion = {
  id: string;
  family: string;
  version: string;
  status: "current" | "archived";
  createdAt: string;
  source: string;
  license: string;
  /** Public URL path to current or archived files */
  files: {
    ttf: string;
    woff2: string;
    readme?: string;
    ofl?: string;
    manifest?: string;
  };
  notesZh: string;
  sample: string;
};
