import {
  getPracticeSheet,
  practiceSheets,
  type PracticeSheet,
} from "@/data/resources";

export type PracticeBookId = "italic-beginner" | "complete";

export type PracticeBook = {
  id: PracticeBookId;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  summaryZh: string;
  /** Cover spine line */
  spineZh: string;
  fileName: string;
  /** Ordered sheet slugs */
  sheetSlugs: string[];
  guideLinesZh: string[];
  primary?: boolean;
};

/** 斜體入門練習簿：熱身 → 小寫細草 → 大寫 → 詞語 → 短句 */
const ITALIC_BEGINNER_SLUGS = [
  "italic-rules",
  "italic-family-lower-oval",
  "italic-family-lower-arch",
  "italic-family-lower-asc-desc",
  "italic-family-lower-special",
  "italic-alphabet-lower",
  "italic-family-upper-straight",
  "italic-family-upper-diagonal",
  "italic-family-upper-round",
  "italic-alphabet-upper",
  "italic-words-easy",
  "italic-words-medium",
  "italic-words-hard",
  "italic-sentences-easy",
  "italic-sentences-medium",
  "italic-sentences-hard",
] as const;

export const practiceBooks: PracticeBook[] = [
  {
    id: "italic-beginner",
    titleZh: "斜體入門練習簿",
    titleEn: "Italic Beginner Practice Book",
    subtitleZh: "Scriptoria · 先學斜體細草",
    summaryZh:
      "初學首選。按學習順序：熱身格線 → 小寫細草家族 → 小寫總覽 → 大寫 → 詞語 → 短句。一次只跟呢本。",
    spineZh: "熱身 → 小寫 → 大寫 → 詞語 → 短句",
    fileName: "scriptoria-italic-practice-book.pdf",
    sheetSlugs: [...ITALIC_BEGINNER_SLUGS],
    primary: true,
    guideLinesZh: [
      "1. 先熱身格線：對好斜度同字高，唔急寫完整字母。",
      "2. 小寫細草係主戰場：橢圓 → 拱門 → 升降／特殊形 → 小寫總覽。",
      "3. 小寫穩了先練大寫家族，再寫完整大寫表。",
      "4. 詞語由易到難；字距均勻先升級。",
      "5. 短句收束斜體主線；整本過關後先開銅板／斯賓塞／花飾。",
      "6. 列印 A4 實際大小，關閉頁眉頁腳；每次 15–20 分鐘專心一張。",
    ],
  },
  {
    id: "complete",
    titleZh: "完整練習簿",
    titleEn: "Complete Practice Book",
    subtitleZh: "Scriptoria · 全部練習紙",
    summaryZh:
      "收錄站內全部練習紙（含銅板、斯賓塞、花飾）。初學請先用「斜體入門練習簿」，唔好一開始下載呢本。",
    spineZh: "全部級別 · 全部路線",
    fileName: "scriptoria-complete-practice-book.pdf",
    sheetSlugs: [], // resolved at runtime: all sheets by stage
    guideLinesZh: [
      "1. 呢本係全集；初學請改用「斜體入門練習簿」。",
      "2. 熱身 → 字母家族 → 詞語 → 短句；質優於量。",
      "3. 一款字體過關再開下一款，唔好並行混練。",
      "4. 列印 A4 實際大小；關閉頁眉頁腳。",
      "5. 可喺網站進度追蹤標記已完成練習紙。",
    ],
  },
];

export function getPracticeBook(id: PracticeBookId): PracticeBook | undefined {
  return practiceBooks.find((book) => book.id === id);
}

export function getPracticeBookSheets(book: PracticeBook): PracticeSheet[] {
  if (book.id === "complete") {
    return [...practiceSheets].sort((a, b) => {
      if (a.stage !== b.stage) return a.stage - b.stage;
      return a.titleEn.localeCompare(b.titleEn);
    });
  }

  return book.sheetSlugs
    .map((slug) => getPracticeSheet(slug))
    .filter((sheet): sheet is PracticeSheet => Boolean(sheet));
}

export function getPrimaryPracticeBook(): PracticeBook {
  return (
    practiceBooks.find((book) => book.primary) ?? practiceBooks[0]
  );
}
