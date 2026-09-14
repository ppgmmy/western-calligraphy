import { InkHero } from "@/components/InkHero";
import { SiteHeader } from "@/components/SiteHeader";
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
          <h1 className="hero__brand">
            西洋書法
            <span>Scriptoria</span>
          </h1>
          <p className="hero__lead">
            從筆尖壓力到字體骨架，探索歐洲手寫傳統：銅板體的華麗、斜體字的清晰，以及哥德體的莊嚴。
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="#styles">
              認識字體
            </a>
            <a className="btn btn--ghost" href="#practice">
              開始練習
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="styles" aria-labelledby="styles-title">
        <div className="section__head">
          <p className="section__eyebrow">Styles</p>
          <h2 className="section__title" id="styles-title">
            六種值得先認識的西洋書法
          </h2>
          <p className="section__text">
            每種字體都有自己的工具、節奏與氣質。先看整體，再選一種深入練。
          </p>
        </div>

        <div className="style-grid">
          {calligraphyStyles.map((style) => (
            <article className="style-item" key={style.id}>
              <p
                className={`style-item__sample style-item__sample--${style.id}`}
              >
                {style.sample}
              </p>
              <div className="style-item__meta">
                <span>{style.nameEn}</span>
                <span>{style.era}</span>
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

      <section className="section" id="tools" aria-labelledby="tools-title">
        <div className="section__head">
          <p className="section__eyebrow">Tools</p>
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

      <section className="section" id="practice" aria-labelledby="practice-title">
        <div className="section__head">
          <p className="section__eyebrow">Practice</p>
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
      </section>

      <footer className="site-footer">
        <p className="site-footer__brand">Scriptoria</p>
        <p>西洋書法入門誌 · 以筆尖認識歐洲手寫傳統</p>
      </footer>
    </main>
  );
}
