export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top">
        Scriptoria
      </a>
      <nav className="site-nav" aria-label="主要導覽">
        <a href="#styles">字體</a>
        <a href="#tools">工具</a>
        <a href="#practice">練習</a>
      </nav>
    </header>
  );
}
