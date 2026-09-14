"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useState } from "react";

type PracticeSheetActionsProps = {
  slug: string;
  titleZh: string;
};

export function PracticeSheetActions({
  slug,
  titleZh,
}: PracticeSheetActionsProps) {
  const [pdfBusy, setPdfBusy] = useState(false);

  function handlePrint() {
    window.print();
  }

  function handleDownloadSvg() {
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

  async function handleDownloadPdf() {
    const frame = document.querySelector<HTMLElement>(".sheet-preview__frame");
    if (!frame || pdfBusy) return;

    setPdfBusy(true);
    try {
      const canvas = await html2canvas(frame, {
        backgroundColor: "#f7f5f1",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH);
      pdf.save(`scriptoria-${slug}.pdf`);
    } catch (error) {
      console.error("PDF download failed", error);
      window.alert("PDF 產生失敗，請改用列印或下載 SVG。");
    } finally {
      setPdfBusy(false);
    }
  }

  return (
    <div className="cta-row sheet-actions">
      <button type="button" className="btn btn--primary" onClick={handlePrint}>
        列印練習紙
      </button>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={handleDownloadPdf}
        disabled={pdfBusy}
      >
        {pdfBusy ? "正在產生 PDF…" : "下載 A4 PDF"}
      </button>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={handleDownloadSvg}
      >
        下載 SVG（{titleZh}）
      </button>
    </div>
  );
}
