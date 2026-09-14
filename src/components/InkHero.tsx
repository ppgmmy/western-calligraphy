export function InkHero() {
  return (
    <div className="ink-hero" aria-hidden="true">
      <div className="ink-hero__wash" />
      <div className="ink-hero__grain" />
      <svg
        className="ink-hero__flourish"
        viewBox="0 0 1200 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="ink-stroke ink-stroke--guide"
          d="M60 520 L1140 520"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <path
          className="ink-stroke ink-stroke--guide"
          d="M60 455 L1140 455"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <path
          className="ink-stroke ink-stroke--main"
          d="M70 430 C210 160 350 120 510 240 C640 330 705 470 830 425 C955 380 995 235 1130 205"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          className="ink-stroke ink-stroke--accent"
          d="M240 525 C360 470 430 385 515 350 C630 305 700 335 775 395 C870 465 935 540 1070 515"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          className="ink-stroke ink-stroke--dot"
          d="M175 235 C200 210 245 215 265 245"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className="ink-stroke ink-stroke--flourish"
          d="M980 290 C1040 250 1095 255 1125 300 C1150 340 1125 375 1080 365"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <p className="ink-hero__script">Scriptoria</p>
    </div>
  );
}
