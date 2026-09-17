export type LabScriptTier = "fine-script" | "flourished-script" | "ornate-script";

/**
 * 實驗室草體標本：只收有藝術氣息嘅 script／撩草。
 * 全部須為可合法使用嘅 OFL（或自製裁字衍生）。
 */
export type LabScriptSpecimen = {
  id: string;
  family: string;
  tier: LabScriptTier;
  /** Short Cantonese mood line */
  moodZh: string;
  sample: string;
  license: string;
  source: string;
  notesZh: string;
  /**
   * css-var → next/font CSS variable on <html>
   * local → Scriptoria archive specimen (LabFontSample)
   */
  render: { kind: "css-var"; cssVar: string } | { kind: "local"; fontId: "scriptoria-italic" };
};
