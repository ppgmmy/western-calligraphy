import Link from "next/link";

type SiteHeaderProps = {
  variant?: "home" | "inner";
};

const navItems = [
  { href: "/atelier", label: "工作室" },
  { href: "/#styles", label: "字體" },
  { href: "/studio", label: "服務" },
  { href: "/resources", label: "練習本" },
  { href: "/lab", label: "實驗室" },
  { href: "/studio#contact", label: "聯絡" },
] as const;

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  const brandHref = variant === "home" ? "#top" : "/";

  return (
    <header
      className={`site-header${variant === "inner" ? " site-header--inner" : ""}`}
    >
      <Link className="brand-mark" href={brandHref} aria-label="Scriptoria 首頁">
        <span className="brand-mark__script">Scriptoria</span>
        <span className="brand-mark__zh">西洋書法工作室</span>
      </Link>
      <nav className="site-nav" aria-label="主要導覽">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
