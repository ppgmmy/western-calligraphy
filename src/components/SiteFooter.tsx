import Link from "next/link";

const footerColumns = [
  {
    title: "探索",
    links: [
      { href: "/atelier", label: "工作室理念" },
      { href: "/#styles", label: "字體譜系" },
      { href: "/#tools", label: "工具入門" },
      { href: "/#practice", label: "練習路徑" },
    ],
  },
  {
    title: "學習",
    links: [
      { href: "/resources", label: "西洋書法練習簿" },
      { href: "/lab", label: "超级實驗室" },
      { href: "/lab/generator", label: "字帖生成器" },
      { href: "/resources/italic-family-upper-straight", label: "斜體直筆家族" },
      { href: "/resources/copperplate-basic-strokes", label: "銅板基本筆畫" },
      { href: "/resources/spencerian-compound-curves", label: "斯賓塞複合曲線" },
    ],
  },
  {
    title: "服務",
    links: [
      { href: "/studio", label: "受託書寫與課程" },
      { href: "/studio#services", label: "服務項目" },
      { href: "/studio#process", label: "委託流程" },
      { href: "/studio#contact", label: "聯絡工作室" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand-block">
          <p className="site-footer__brand">Scriptoria</p>
          <p className="site-footer__tagline">西洋書法工作室</p>
          <p className="site-footer__lead">
            專職從事西洋書法教學、受託書寫與練習系統研發。以結構、節奏與可讀性為本。
          </p>
        </div>

        <div className="site-footer__columns">
          {footerColumns.map((column) => (
            <div key={column.title} className="site-footer__column">
              <p className="site-footer__column-title">{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Scriptoria Atelier</p>
        <p>Hong Kong · Traditional Chinese · Latin letterforms</p>
      </div>
    </footer>
  );
}
