import { LabFontSample } from "@/components/LabFontSample";
import {
  getCurrentLabFont,
  type LabScriptSpecimen,
} from "@/data/lab";

/** 草體標本示範：本地歸檔字 or CSS variable（Google OFL）。 */
export function LabScriptSample({
  specimen,
  className = "lab-script-sample",
}: {
  specimen: LabScriptSpecimen;
  className?: string;
}) {
  if (specimen.render.kind === "local") {
    const font = getCurrentLabFont(specimen.render.fontId);
    if (!font) {
      return (
        <p className={className} lang="en">
          {specimen.sample}
        </p>
      );
    }
    return (
      <LabFontSample
        font={{ ...font, sample: specimen.sample }}
        className={className}
      />
    );
  }

  const cssVar = specimen.render.cssVar;
  return (
    <p
      className={className}
      lang="en"
      style={{
        fontFamily: `var(${cssVar}), cursive`,
        fontStyle: "normal",
      }}
    >
      {specimen.sample}
    </p>
  );
}
