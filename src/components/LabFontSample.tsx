import type { LabFontVersion } from "@/data/lab";

/** 每版字體獨立 @font-face，方便 /lab 並排對比（唔共用現行變數）。 */
export function LabFontSample({
  font,
  className = "lab-card__sample",
}: {
  font: LabFontVersion;
  className?: string;
}) {
  const family = `LabFont-${font.id}`;

  return (
    <>
      <style>{`
        @font-face {
          font-family: "${family}";
          src: url("${font.files.woff2}") format("woff2"),
               url("${font.files.ttf}") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <p
        className={className}
        lang="en"
        style={{ fontFamily: `"${family}", serif`, fontStyle: "normal" }}
      >
        {font.sample}
      </p>
    </>
  );
}
