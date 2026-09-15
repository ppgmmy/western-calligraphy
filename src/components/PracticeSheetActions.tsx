"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";
import {
  PrintChecklistDialog,
  shouldSkipPrintChecklist,
} from "@/components/PrintChecklistDialog";
import { SheetProgressControls } from "@/components/PracticeProgress";
import { usePracticeProgress } from "@/hooks/usePracticeProgress";
import {
  svgElementToJpeg,
  svgElementToSvgBlob,
} from "@/lib/exportPracticeSheet";

type PracticeSheetActionsProps = {
  slug: string;
  titleZh: string;
};

export function PracticeSheetActions({
  slug,
  titleZh,
}: PracticeSheetActionsProps) {
  const [pdfBusy, setPdfBusy] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const { markDownloaded } = usePracticeProgress();

  function runPrint() {
    setChecklistOpen(false);
    window.setTimeout(() => window.print(), 50);
  }

  function handlePrint() {
    if (shouldSkipPrintChecklist()) {
      runPrint();
      return;
    }
    setChecklistOpen(true);
  }

  async function handleDownloadSvg() {
    const svg = document.querySelector<SVGSVGElement>(".practice-sheet-svg");
    if (!svg) return;

    try {
      const blob = await svgElementToSvgBlob(svg);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `scriptoria-${slug}.svg`;
      anchor.click();
      URL.revokeObjectURL(url);
      markDownloaded(slug);
    } catch (error) {
      console.error("SVG download failed", error);
      window.alert("SVG 產生失敗，請稍後再試。");
    }
  }

  async function handleDownloadPdf() {
    const svg = document.querySelector<SVGSVGElement>(".practice-sheet-svg");
    if (!svg || pdfBusy) return;

    setPdfBusy(true);
    try {
      // Rasterize the SVG with embedded calligraphy fonts — not html2canvas,
      // which drops CSS-variable script faces and falls back to Georgia.
      const imgData = await svgElementToJpeg(svg, { scale: 2, quality: 0.95 });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH);
      pdf.save(`scriptoria-${slug}.pdf`);
      markDownloaded(slug);
    } catch (error) {
      console.error("PDF download failed", error);
      window.alert("PDF 產生失敗，請改用列印或下載 SVG。");
    } finally {
      setPdfBusy(false);
    }
  }

  return (
    <div className="sheet-actions-block">
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

      <SheetProgressControls slug={slug} />

      <PrintChecklistDialog
        open={checklistOpen}
        onClose={() => setChecklistOpen(false)}
        onConfirmPrint={runPrint}
      />
    </div>
  );
}
