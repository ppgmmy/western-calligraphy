"use client";

import { useEffect, useId, useState } from "react";
import {
  getPrintChecklistSkip,
  setPrintChecklistSkip,
} from "@/lib/practiceProgress";

const CHECKLIST_ITEMS = [
  {
    id: "paper",
    label: "紙張設為 A4",
    hint: "印表機／瀏覽器紙張大小選 A4。",
  },
  {
    id: "scale",
    label: "縮放設為「實際大小」或 100%",
    hint: "不要選「符合頁面」，以免格線比例被壓縮。",
  },
  {
    id: "headers",
    label: "關閉頁首與頁尾",
    hint: "Chrome：更多設定 → 取消「頁首及頁尾」。",
  },
  {
    id: "simplex",
    label: "單面列印",
    hint: "練習紙建議單面，方便書寫與掃描留存。",
  },
] as const;

type PrintChecklistDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirmPrint: () => void;
};

export function PrintChecklistDialog({
  open,
  onClose,
  onConfirmPrint,
}: PrintChecklistDialogProps) {
  const titleId = useId();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [skipNextTime, setSkipNextTime] = useState(false);

  useEffect(() => {
    if (!open) return;
    setChecked({});
    setSkipNextTime(false);
  }, [open]);

  if (!open) return null;

  const allChecked = CHECKLIST_ITEMS.every((item) => checked[item.id]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleConfirm() {
    if (skipNextTime) setPrintChecklistSkip(true);
    onConfirmPrint();
  }

  return (
    <div className="print-checklist" role="presentation">
      <button
        type="button"
        className="print-checklist__backdrop"
        aria-label="關閉列印檢查"
        onClick={onClose}
      />
      <div
        className="print-checklist__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p className="print-checklist__eyebrow">Print Checklist</p>
        <h2 className="print-checklist__title" id={titleId}>
          列印前檢查
        </h2>
        <p className="print-checklist__text">
          先確認這四項，可大幅減少格線被縮放或被頁首頁尾裁切。
        </p>

        <ul className="print-checklist__list">
          {CHECKLIST_ITEMS.map((item) => (
            <li key={item.id}>
              <label className="print-checklist__item">
                <input
                  type="checkbox"
                  checked={Boolean(checked[item.id])}
                  onChange={() => toggle(item.id)}
                />
                <span>
                  <strong>{item.label}</strong>
                  <em>{item.hint}</em>
                </span>
              </label>
            </li>
          ))}
        </ul>

        <label className="print-checklist__skip">
          <input
            type="checkbox"
            checked={skipNextTime}
            onChange={(event) => setSkipNextTime(event.target.checked)}
          />
          下次略過此檢查（本機記住）
        </label>

        <div className="print-checklist__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            取消
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleConfirm}
            disabled={!allChecked}
          >
            已確認，開始列印
          </button>
        </div>
      </div>
    </div>
  );
}

export function shouldSkipPrintChecklist() {
  return getPrintChecklistSkip();
}
