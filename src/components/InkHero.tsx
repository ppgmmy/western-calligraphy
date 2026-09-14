export function InkHero() {
  return (
    <div className="ink-hero" aria-hidden="true">
      <div className="ink-hero__wash" />
      <svg
        className="ink-hero__flourish"
        viewBox="0 0 1200 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="ink-stroke ink-stroke--main"
          d="M80 420 C220 180 360 140 520 250 C640 330 700 470 820 430 C940 390 980 250 1100 220"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          className="ink-stroke ink-stroke--accent"
          d="M250 510 C360 470 430 390 510 360 C620 320 690 340 760 390 C850 450 910 520 1040 500"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          className="ink-stroke ink-stroke--dot"
          d="M190 250 C210 230 240 235 255 255"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <p className="ink-hero__script">Scriptoria</p>
    </div>
  );
}
