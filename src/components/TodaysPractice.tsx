import Link from "next/link";
import { getStyleLabel, getTodaysPractice } from "@/data/resources";

type TodaysPracticeProps = {
  variant?: "page" | "home";
};

export function TodaysPractice({ variant = "page" }: TodaysPracticeProps) {
  const today = getTodaysPractice();

  return (
    <section
      className={`section todays-practice todays-practice--${variant}`}
      aria-labelledby="todays-practice-title"
    >
      <div className="section__head">
        <p className="section__eyebrow">Today&apos;s Practice</p>
        <h2 className="section__title" id="todays-practice-title">
          今日練習｜星期{today.weekdayLabel}
        </h2>
        <p className="section__text">
          今日焦點：{today.focus}。{today.reason}
        </p>
      </div>

      <div className="todays-practice__list">
        {today.sheets.map((sheet, index) => (
          <article className="todays-practice__item" key={sheet.slug}>
            <div className="todays-practice__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="todays-practice__body">
              <p className="todays-practice__meta">
                {getStyleLabel(sheet.styleId)} · {sheet.level}
              </p>
              <h3 className="todays-practice__title">{sheet.titleZh}</h3>
              <p className="todays-practice__summary">{sheet.summary}</p>
            </div>
            <Link className="btn btn--primary" href={`/resources/${sheet.slug}`}>
              開始練習
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
