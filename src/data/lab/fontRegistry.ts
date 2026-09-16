import type { LabFontVersion } from "./types";

/**
 * 字體版本登記冊：current + archived。
 * 規則：每個 fontId 只應有一筆 current；archived 只追加、唔改寫。
 * 建置腳本歸檔後，請同步追加 archived（含 checksums）。
 */
export const labFontVersions: LabFontVersion[] = [
  {
    id: "scriptoria-italic-1.000",
    fontId: "scriptoria-italic",
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
    checksums: {
      ttf: "570f2181338b98ad184536afcfaf09c052b55a1c86ce1278f3eac132a3c41347",
      woff2:
        "2fd3a1be390145cff52487a521465e9eca2674913fa020ced397635266d8ecf1",
    },
    notesZh:
      "首發裁字版。字形本身已係 Italic master，網頁用 font-style:normal。專供斜體細草示範。",
    sample: "human scriptoria abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: "scriptoria-italic-1.000-baseline",
    fontId: "scriptoria-italic",
    family: "Scriptoria Italic",
    version: "1.000",
    status: "archived",
    createdAt: "2026-09-15",
    archivedAt: "2026-09-16T05:45:01.692714+00:00",
    archiveKind: "baseline",
    source: "Cormorant Garamond Italic (OFL) subset",
    license: "SIL Open Font License 1.1",
    files: {
      ttf: "/fonts/_archive/scriptoria-italic/v1.000-20260915/ScriptoriaItalic-Regular.ttf",
      woff2:
        "/fonts/_archive/scriptoria-italic/v1.000-20260915/ScriptoriaItalic-Regular.woff2",
      manifest:
        "/fonts/_archive/scriptoria-italic/v1.000-20260915/manifest.json",
    },
    checksums: {
      ttf: "570f2181338b98ad184536afcfaf09c052b55a1c86ce1278f3eac132a3c41347",
      woff2:
        "2fd3a1be390145cff52487a521465e9eca2674913fa020ced397635266d8ecf1",
    },
    notesZh:
      "實驗室基線：建立歸檔系統時嘅快照。與現行相同屬正常，直到下一次真正改字。",
    sample: "human scriptoria abcdefghijklmnopqrstuvwxyz",
  },
];
