export type LabScriptTier = "fine-script" | "flourished-script" | "ornate-script";

export type LabScriptFaceRender =
  | { kind: "css-var"; cssVar: string }
  | { kind: "local"; fontId: "scriptoria-italic" };

/** One face under the glass (primary or variant). */
export type LabScriptFace = {
  id: string;
  family: string;
  moodZh: string;
  sample: string;
  source: string;
  render: LabScriptFaceRender;
};

/**
 * 實驗室草體標本：只收有藝術氣息嘅 script／撩草。
 * 全部須為可合法使用嘅 OFL（或自製裁字衍生）。
 * 每款主標本附帶正好三隻變體，方便肉眼對照後再揀。
 */
export type LabScriptSpecimen = {
  id: string;
  family: string;
  tier: LabScriptTier;
  moodZh: string;
  sample: string;
  license: string;
  source: string;
  notesZh: string;
  render: LabScriptFaceRender;
  variants: readonly [LabScriptFace, LabScriptFace, LabScriptFace];
};
