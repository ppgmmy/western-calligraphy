"use client";

type PracticeSheetActionsProps = {
  slug: string;
  titleZh: string;
};

export function PracticeSheetActions({
  slug,
  titleZh,
}: PracticeSheetActionsProps) {
  function handlePrint() {
    window.print();
  }

  function handleDownload() {
    const svg = document.querySelector<SVGSVGElement>(".practice-sheet-svg");
    if (!svg) return;

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "794");
    clone.setAttribute("height", "1123");

    const payload = `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
    const blob = new Blob([payload], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `scriptoria-${slug}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="cta-row sheet-actions">
      <button type="button" className="btn btn--primary" onClick={handlePrint}>
        列印練習紙
      </button>
      <button type="button" className="btn btn--ghost" onClick={handleDownload}>
        下載 SVG（{titleZh}）
      </button>
    </div>
  );
}
