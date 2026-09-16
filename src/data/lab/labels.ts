import type { LabChangeKind } from "./types";

export function labChangeKindLabel(kind: LabChangeKind): string {
  switch (kind) {
    case "font-release":
      return "字體發行";
    case "font-archive":
      return "字體歸檔";
    case "glyph-edit":
      return "字形庫";
    case "sheet-ui":
      return "練習紙 UI";
    case "policy":
      return "實驗室規則";
    case "note":
      return "筆記";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export function labFontStatusLabel(status: "current" | "archived"): string {
  switch (status) {
    case "current":
      return "現行";
    case "archived":
      return "歸檔";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function labArchiveKindLabel(
  kind: "baseline" | "pre-overwrite" | undefined,
): string | null {
  switch (kind) {
    case undefined:
      return null;
    case "baseline":
      return "基線";
    case "pre-overwrite":
      return "覆寫前";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
