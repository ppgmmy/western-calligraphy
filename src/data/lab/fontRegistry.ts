import type { LabFontVersion } from "./types";

/**
 * 字體版本登記冊：current + archived。
 * 建置腳本歸檔後，請同步追加一筆 archived（或跑 scripts/lab/sync-font-registry 若有）。
 */
export const labFontVersions: LabFontVersion[] = [
  {
    id: "scriptoria-italic-1.000",
    family: "Scriptoria Italic",
    version: "1.000",
    status: "current",
    createdAt: "2026-09-15",
    source: "Cormorant Garamond Italic (OFL) subset",
    license: "SIL Open Font License 1.1",
    files: {
      ttf: "/fonts/scriptoria-italic/ScriptoriaItalic-Regular.ttf",
      woff2: "/fonts/scriptoria-italic/ScriptoriaItalic-Regular.woff2",
      readme: "/fonts/scriptoria-italic/README.md",
      ofl: "/fonts/scriptoria-italic/OFL.txt",
      manifest: "/fonts/scriptoria-italic/manifest.json",
    },
    notesZh:
      "首發裁字版。字形本身已係 Italic master，網頁用 font-style:normal。專供斜體細草示範。",
    sample: "human scriptoria abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: "scriptoria-italic-1.000-archive",
    family: "Scriptoria Italic",
    version: "1.000",
    status: "archived",
    createdAt: "2026-09-15",
    source: "Cormorant Garamond Italic (OFL) subset",
    license: "SIL Open Font License 1.1",
    files: {
      ttf: "/fonts/_archive/scriptoria-italic/v1.000-20260915/ScriptoriaItalic-Regular.ttf",
      woff2:
        "/fonts/_archive/scriptoria-italic/v1.000-20260915/ScriptoriaItalic-Regular.woff2",
      manifest:
        "/fonts/_archive/scriptoria-italic/v1.000-20260915/manifest.json",
    },
    notesZh: "實驗室基線歸檔：同 current v1.000 對照用，之後每次改字體都另開新 archive 資料夾。",
    sample: "human scriptoria abcdefghijklmnopqrstuvwxyz",
  },
];

export function getCurrentLabFonts(): LabFontVersion[] {
  return labFontVersions.filter((item) => item.status === "current");
}

export function getArchivedLabFonts(): LabFontVersion[] {
  return labFontVersions.filter((item) => item.status === "archived");
}

export function getLabFontsByFamily(family: string): LabFontVersion[] {
  return labFontVersions.filter((item) => item.family === family);
}
