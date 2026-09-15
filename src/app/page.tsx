import Link from "next/link";
import { InkHero } from "@/components/InkHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TodaysPractice } from "@/components/TodaysPractice";
import { atelierManifesto, studioServices } from "@/data/atelier";
import {
  calligraphyStyles,
  practiceSteps,
  tools,
} from "@/data/styles";

export default function HomePage() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero" aria-label="首屏">
        <InkHero />
        <div className="hero__content">
          <p className="hero__atelier-label">Western Calligraphy Atelier</p>
          <h1 className="hero__brand">
            Scriptoria
            <span>西洋書法工作室</span>
          </h1>
          <p className="hero__lead">
            專職西洋書法教學與商業字跡。現階段以 Italic 斜體為正式示範主線；Copperplate、Spencerian、Flourishing
            等路線保留練習，逐字辨認穩妥後再升級範字與自製字體。
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/resources">
              打開練習本
            </Link>
            <Link className="btn btn--ghost" href="/studio">
              委託與課程
            </Link>
          </div>
        </div>
      </section>

      <section className="manifesto-band" aria-labelledby="manifesto-title">
        <div className="manifesto-band__inner">
          <p className="section__eyebrow">{atelierManifesto.eyebrow}</p>
          <h2 className="section__title" id="manifesto-title">
            {atelierManifesto.lead}
          </h2>
          <p className="section__text">{atelierManifesto.body[0]}</p>
          <Link className="text-link" href="/atelier">
            認識工作室 →
          </Link>
        </div>
      </section>

      <section className="section" id="styles" aria-labelledby="styles-title">
        <div className="section__head">
          <p className="section__eyebrow">Scripts</p>
          <h2 className="section__title" id="styles-title">
            先練斜體，其餘風格認識即可
          </h2>
          <p className="section__text">
            站內字體示範暫時只有斜體夠靚。其他風格保留路線與工具說明，範字標明暫用；自製字體檔會等逐字辨認完成後先做。
          </p>
        </div>

        <div className="style-grid">
          {calligraphyStyles.map((style) => (
            <article
              className={`style-item${style.quality !== "primary" ? " style-item--muted" : ""}`}
              key={style.id}
            >
              <p
                className={`style-item__sample style-item__sample--${style.id}`}
              >
                {style.sample}
              </p>
              <div className="style-item__meta">
                <span>{style.nameEn}</span>
                <span>{style.era}</span>
                <span>
                  {style.quality === "primary"
                    ? "正式示範"
                    : style.quality === "experimental"
                      ? "試驗"
                      : "範字暫用"}
                </span>
              </div>
              <h3 className="style-item__name">{style.nameZh}</h3>
              <p className="style-item__summary">{style.summary}</p>
              <ul className="style-item__traits">
                {style.traits.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ul>
              <p className="style-item__tip">練習提示：{style.tip}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section services-teaser"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="section__head">
          <p className="section__eyebrow">Services</p>
          <h2 className="section__title" id="services-title">
            工作室能為你做什麼
          </h2>
          <p className="section__text">
            教學、商業字跡與活動示範，皆可依用途客製。詳見服務與流程頁。
          </p>
        </div>

        <div className="services-teaser-rail">
          {studioServices.map((service) => (
            <article key={service.id}>
              <p className="service-category">{service.category}</p>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>

        <div className="cta-row practice-cta">
          <Link className="btn btn--primary" href="/studio">
            查看完整服務
          </Link>
          <Link className="btn btn--ghost" href="/atelier">
            工作室理念
          </Link>
        </div>
      </section>

      <section className="section" id="tools" aria-labelledby="tools-title">
        <div className="section__head">
          <p className="section__eyebrow">Toolkit</p>
          <h2 className="section__title" id="tools-title">
            入門工具不必一次買齊
          </h2>
          <p className="section__text">
            先決定想練尖筆還是闊尖筆，再補齊墨水與紙張。工具服務字體，不是收藏清單。
          </p>
        </div>

        <div className="tool-list">
          {tools.map((tool, index) => (
            <article key={tool.name}>
              <span className="index-mark" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{tool.name}</h3>
                <p>{tool.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section"
        id="practice"
        aria-labelledby="practice-title"
      >
        <div className="section__head">
          <p className="section__eyebrow">Curriculum</p>
          <h2 className="section__title" id="practice-title">
            一條清楚的練習路徑
          </h2>
          <p className="section__text">
            西洋書法靠重複與觀察。短時間、高專注，比一次寫滿整頁更有效。
          </p>
        </div>

        <div className="practice-list">
          {practiceSteps.map((step, index) => (
            <article key={step.title}>
              <span className="index-mark" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-row practice-cta">
          <Link className="btn btn--primary" href="/resources">
            打開練習本
          </Link>
          <Link
            className="btn btn--ghost"
            href="/resources/copperplate-basic-strokes"
          >
            試試銅板尖筆線
          </Link>
        </div>
      </section>

      <TodaysPractice variant="home" />

      <section className="closing-band" aria-labelledby="closing-title">
        <div className="closing-band__inner">
          <p className="section__eyebrow">Begin</p>
          <h2 className="section__title" id="closing-title">
            從一頁線條開始，或留下委託需求。
          </h2>
          <p className="section__text">
            自學者可直接下載練習頁；需要婚禮字跡、識別字標或一對一課程，歡迎透過工作室聯絡。
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/resources">
              進入練習本
            </Link>
            <Link className="btn btn--ghost" href="/studio#contact">
              聯絡我們
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
