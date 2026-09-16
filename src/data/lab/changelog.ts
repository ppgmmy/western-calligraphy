import type { LabLogEntry } from "./types";

/**
 * Scriptoria 超级實驗室變更紀錄。
 * 只追加、唔改寫舊條目；方便查驗同版本對比。
 */
export const labChangelog: LabLogEntry[] = [
  {
    id: "2026-09-15-glyphs-modern-lower",
    date: "2026-09-15",
    kind: "glyph-edit",
    titleZh: "建立 modernLower 逐字母字形庫",
    summaryZh:
      "新增 a–z 尖筆教學 path（src/data/glyphs/modernLower），作花飾／modern script 長線管理，唔係掃相入庫。",
    paths: ["src/data/glyphs/modernLower/", "src/data/glyphs/types.ts"],
  },
  {
    id: "2026-09-15-italic-recognition",
    date: "2026-09-15",
    kind: "note",
    titleZh: "斜體逐字辨認規格",
    summaryZh:
      "建立 italic a–z／A–Z 辨認規格，作為改字形前嘅檢查清單。",
    paths: ["src/data/letterRecognition/"],
  },
  {
    id: "2026-09-15-scriptoria-italic-v1",
    date: "2026-09-15",
    kind: "font-release",
    titleZh: "Scriptoria Italic v1.000 首發",
    summaryZh:
      "由 Cormorant Garamond Italic（OFL）裁出 A–Z／a–z／數字標點，命名 Scriptoria Italic，接入斜體細草示範。",
    fontId: "scriptoria-italic",
    version: "1.000",
    paths: [
      "public/fonts/scriptoria-italic/ScriptoriaItalic-Regular.woff2",
      "public/fonts/scriptoria-italic/ScriptoriaItalic-Regular.ttf",
      "public/fonts/scriptoria-italic/OFL.txt",
    ],
  },
  {
    id: "2026-09-16-remove-flourish-worms",
    date: "2026-09-16",
    kind: "sheet-ui",
    titleZh: "花飾練習紙移除左右卷鬚",
    summaryZh:
      "詞語／大寫／Cartouche 練習紙唔再印左右頭髮狀卷鬚，只留字形同格線。",
    paths: ["src/components/PracticeSheetArt.tsx"],
  },
  {
    id: "2026-09-16-lab-archive-system",
    date: "2026-09-16",
    kind: "policy",
    titleZh: "超级實驗室：字體歸檔 + 變更 log",
    summaryZh:
      "之後每次改字體會先把現行版搬入 _archive，並寫入本 changelog；/lab 頁可查驗同對比。",
    fontId: "scriptoria-italic",
    version: "1.000",
    paths: [
      "public/fonts/_archive/",
      "src/data/lab/",
      "src/app/lab/page.tsx",
      "scripts/fonts/crop_scriptoria_italic.py",
    ],
  },
];

export function getLabChangelogNewestFirst(): LabLogEntry[] {
  return [...labChangelog].sort((a, b) => {
    if (a.date === b.date) return b.id.localeCompare(a.id);
    return b.date.localeCompare(a.date);
  });
}
