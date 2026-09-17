import { LabFontSample } from "@/components/LabFontSample";
import {
  getCurrentLabFont,
  type LabScriptFace,
} from "@/data/lab";

/** 草體標本示範：本地歸檔字 or CSS variable（Google OFL）。 */
export function LabScriptSample({
  face,
  className = "lab-script-sample",
}: {
  face: LabScriptFace;
  className?: string;
}) {
  if (face.render.kind === "local") {
    const font = getCurrentLabFont(face.render.fontId);
    if (!font) {
      return (
        <p className={className} lang="en">
          {face.sample}
        </p>
      );
    }
    return (
      <LabFontSample
        font={{ ...font, sample: face.sample }}
        className={className}
      />
    );
  }

  const cssVar = face.render.cssVar;
  return (
    <p
      className={className}
      lang="en"
      style={{
        fontFamily: `var(${cssVar}), cursive`,
        fontStyle: "normal",
      }}
    >
      {face.sample}
    </p>
  );
}
