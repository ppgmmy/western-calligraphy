import type { Metadata } from "next";
import Link from "next/link";
import { LabFontSample } from "@/components/LabFontSample";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  formatLabVersion,
  getArchivedLabFonts,
  getCurrentLabFonts,
  getLabChangelogNewestFirst,
  getLabCompareRows,
  labArchiveKindLabel,
  labChangeKindLabel,
  labFontStatusLabel,
} from "@/data/lab";

export const metadata: Metadata = {
  title: "超级實驗室",
  description:
    "Scriptoria 私人實驗室：字體版本歸檔、變更 log，方便查驗同對比。",
};

export default function LabPage() {
  const log = getLabChangelogNewestFirst();
  const current = getCurrentLabFonts();
  const archived = getArchivedLabFonts();
  const italicCompare = getLabCompareRows("scriptoria-italic");

  return (
    <main id="top" className="inner-page">
      <SiteHeader variant="inner" />

      <section className="section page-intro" aria-labelledby="lab-title">
        <div className="section__head">
          <p className="section__eyebrow">Super Lab</p>
          <h1 className="section__title" id="lab-title">
            超级實驗室
          </h1>
          <p className="section__text">
            私人實驗場：改字體先歸檔再覆寫；用版號 + checksum
            對照，唔靠肉眼估。基線同現行一樣係正常，直到下一次真正改字。
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="lab-current-title">
        <div className="section__head">
          <p className="section__eyebrow">Current fonts</p>
          <h2 className="section__title" id="lab-current-title">
            現行字體
          </h2>
        </div>
        <div className="lab-version-grid">
          {current.map((font) => (
            <article className="lab-card" key={font.id}>
              <p className="lab-card__meta">
                {formatLabVersion(font.version)} · {font.createdAt} ·{" "}
                {font.license}
              </p>
              <h3 className="lab-card__title">{font.family}</h3>
              <LabFontSample font={font} />
              <p className="lab-card__notes">{font.notesZh}</p>
              <p className="lab-card__source">
                來源：{font.source} · woff2 {font.checksums.woff2.slice(0, 8)}…
              </p>
              <ul className="lab-card__files">
                <li>
                  <a href={font.files.woff2}>WOFF2</a>
                </li>
                <li>
                  <a href={font.files.ttf}>TTF</a>
                </li>
                {font.files.manifest ? (
                  <li>
                    <a href={font.files.manifest}>manifest</a>
                  </li>
                ) : null}
                {font.files.ofl ? (
                  <li>
                    <a href={font.files.ofl}>OFL</a>
                  </li>
                ) : null}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="lab-compare-title">
        <div className="section__head">
          <p className="section__eyebrow">Compare</p>
          <h2 className="section__title" id="lab-compare-title">
            Scriptoria Italic 版本對比
          </h2>
          <p className="section__text">
            現行在前，歸檔按版號由新到舊。fingerprint
            相同＝字形檔一致（唔係視覺錯覺）。
          </p>
        </div>
        <div className="lab-compare-grid">
          {italicCompare.map(({ font, matchesCurrent, fingerprint }) => {
            const archiveLabel = labArchiveKindLabel(font.archiveKind);
            return (
              <article
                className={`lab-card${font.status === "archived" ? " lab-card--archived" : ""}`}
                key={`compare-${font.id}`}
              >
                <p className="lab-card__badge">
                  {labFontStatusLabel(font.status)}
                  {archiveLabel ? ` · ${archiveLabel}` : ""} ·{" "}
                  {formatLabVersion(font.version)}
                  {font.status === "archived" && matchesCurrent
                    ? " · 與現行相同"
                    : ""}
                </p>
                <LabFontSample font={font} />
                <p className="lab-card__notes">{font.notesZh}</p>
                <p className="lab-card__source">fingerprint {fingerprint}</p>
                <ul className="lab-card__files">
                  <li>
                    <a href={font.files.woff2}>WOFF2</a>
                  </li>
                  <li>
                    <a href={font.files.ttf}>TTF</a>
                  </li>
                  {font.files.manifest ? (
                    <li>
                      <a href={font.files.manifest}>manifest</a>
                    </li>
                  ) : null}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="lab-archive-title">
        <div className="section__head">
          <p className="section__eyebrow">Archive</p>
          <h2 className="section__title" id="lab-archive-title">
            歸檔字體
          </h2>
          <p className="section__text">
            實體檔喺 <code>public/fonts/_archive/</code>。建置時若現行
            checksum 已存在於最近歸檔，會跳過重複拷貝。
          </p>
        </div>
        <ul className="lab-archive-list">
          {archived.map((font) => {
            const archiveLabel = labArchiveKindLabel(font.archiveKind);
            return (
              <li key={font.id}>
                <strong>
                  {font.family} {formatLabVersion(font.version)}
                  {archiveLabel ? `（${archiveLabel}）` : ""}
                </strong>
                <span>{font.archivedAt?.slice(0, 10) ?? font.createdAt}</span>
                <span>{font.checksums.woff2.slice(0, 8)}…</span>
                <a href={font.files.woff2}>woff2</a>
                <a href={font.files.ttf}>ttf</a>
                {font.files.manifest ? (
                  <a href={font.files.manifest}>manifest</a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section" aria-labelledby="lab-log-title">
        <div className="section__head">
          <p className="section__eyebrow">Changelog</p>
          <h2 className="section__title" id="lab-log-title">
            實驗 log
          </h2>
          <p className="section__text">
            UI log：<code>src/data/lab/changelog.ts</code>
            （只追加）。機器 log：{" "}
            <code>public/fonts/_archive/lab-log.jsonl</code>。
          </p>
        </div>
        <ol className="lab-log">
          {log.map((entry) => (
            <li key={entry.id} className="lab-log__item">
              <div className="lab-log__head">
                <time dateTime={entry.date}>{entry.date}</time>
                <span className="lab-log__kind">
                  {labChangeKindLabel(entry.kind)}
                </span>
                {entry.version ? (
                  <span className="lab-log__ver">
                    {formatLabVersion(entry.version)}
                    {entry.previousVersion
                      ? ` ← ${formatLabVersion(entry.previousVersion)}`
                      : ""}
                  </span>
                ) : null}
              </div>
              <h3 className="lab-log__title">{entry.titleZh}</h3>
              <p className="lab-log__summary">{entry.summaryZh}</p>
              {entry.paths && entry.paths.length > 0 ? (
                <ul className="lab-log__paths">
                  {entry.paths.map((path) => (
                    <li key={path}>
                      <code>{path}</code>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-label="實驗室操作">
        <p className="section__text">
          有實質改動時請升版號：{" "}
          <code>npm run fonts:scriptoria-italic -- 1.001</code>
          ，再喺 changelog／fontRegistry 各追加一筆（含新 checksum）。
        </p>
        <p>
          <Link className="btn btn--ghost" href="/resources">
            返回練習本
          </Link>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
