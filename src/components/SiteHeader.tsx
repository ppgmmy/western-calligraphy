type SiteHeaderProps = {
  variant?: "home" | "inner";
};

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  const brandHref = variant === "home" ? "#top" : "/";

  return (
    <header className={`site-header${variant === "inner" ? " site-header--inner" : ""}`}>
      <a className="brand-mark" href={brandHref}>
        Scriptoria
      </a>
      <nav className="site-nav" aria-label="主要導覽">
        <a href="/#styles">字體</a>
        <a href="/#tools">工具</a>
        <a href="/#practice">練習</a>
        <a href="/resources">練習本</a>
      </nav>
    </header>
  );
}
