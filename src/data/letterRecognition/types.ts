/**
 * 逐字精準辨認規格 — 自製字體檔之前的唯一真相來源。
 * 先把每個字母的結構、筆順、辨認檢查寫清楚；通過後才考慮打包成 .woff。
 */

export type RecognitionStatus =
  | "cataloguing"
  | "verified"
  | "font-ready";

export type LetterCase = "lower" | "upper";

export type LetterFamilyId =
  | "oval"
  | "arch"
  | "asc-desc"
  | "special"
  | "straight"
  | "diagonal"
  | "round";

export type LetterRecognition = {
  letter: string;
  case: LetterCase;
  family: LetterFamilyId;
  /** 一句话：這個字憑什麼被認出來 */
  identity: string;
  /** 闊尖筆筆順（教學用） */
  strokeOrder: string[];
  /** 幾何／比例要點（相對 x-height、筆寬） */
  geometry: string[];
  /** 對／錯快速檢查 */
  checks: string[];
  /** 常見走樣 */
  pitfalls: string[];
  status: RecognitionStatus;
};

export type ScriptRecognitionCatalog = {
  id: "italic" | "modern-script";
  nameZh: string;
  nameEn: string;
  /** 相對垂直的斜度（度）；正值＝上端偏右＝"/" */
  slantFromVerticalDeg: number;
  tool: string;
  /** 自製字體前必須完成的原則 */
  fontGate: string;
  letters: LetterRecognition[];
};
