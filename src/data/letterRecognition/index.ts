import { italicRecognition, getItalicLetterRecognition } from "./italic";
import type {
  LetterRecognition,
  RecognitionStatus,
  ScriptRecognitionCatalog,
} from "./types";

export type {
  LetterRecognition,
  RecognitionStatus,
  ScriptRecognitionCatalog,
};

export { italicRecognition, getItalicLetterRecognition };

/** 目前僅斜體進入正式逐字辨認；其他風格暫緩（字體示範亦未夠靚）。 */
export const recognitionCatalogs: ScriptRecognitionCatalog[] = [
  italicRecognition,
];

export function countRecognitionByStatus(
  catalog: ScriptRecognitionCatalog,
): Record<RecognitionStatus, number> {
  const counts: Record<RecognitionStatus, number> = {
    cataloguing: 0,
    verified: 0,
    "font-ready": 0,
  };
  for (const letter of catalog.letters) {
    counts[letter.status] += 1;
  }
  return counts;
}

export function isCustomFontAllowed(catalog: ScriptRecognitionCatalog): boolean {
  return catalog.letters.every((letter) => letter.status === "font-ready");
}
