/**
 * Placeholder product still life: a tea caddy and a cup, drawn in SVG so it
 * stays crisp at any size. Swap the SVGs for product photography later —
 * keep the data attributes so animations keep their targets.
 */
export function HeroProduct() {
  return (
    <div
      data-hero-product
      className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[34rem]"
    >
      {/* Backdrop disc + orbit ring */}
      <div
        data-hero-disc
        aria-hidden="true"
        className="absolute top-[44%] left-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_32%_28%,#2c3d2e,#131c16_68%)] shadow-[inset_0_1px_0_rgba(239,232,216,0.08)]"
      />
      <div
        data-hero-orbit
        aria-hidden="true"
        className="absolute top-[44%] left-1/2 aspect-square w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.08]"
      >
        <span className="absolute top-[14%] left-[14%] size-1.5 rounded-full bg-gold" />
      </div>

      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="absolute bottom-[5%] left-1/2 h-[6%] w-[80%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-2xl"
      />

      <figure className="absolute inset-0">
        <TeaTin />
        <TeaCup />
        <figcaption className="sr-only">
          A tin of Veyla No. 07 Gyokuro green tea beside a cup of freshly
          steeped tea.
        </figcaption>
      </figure>

      <ProductNote />
    </div>
  );
}

function TeaTin() {
  return (
    <svg
      data-hero-tin
      viewBox="0 0 240 440"
      aria-hidden="true"
      focusable="false"
      className="absolute bottom-[9%] left-[46%] w-[44%] -translate-x-1/2 drop-shadow-[0_40px_40px_rgba(0,0,0,0.45)]"
    >
      <defs>
        <linearGradient id="veyla-tin-body" x1="0" x2="1">
          <stop offset="0" stopColor="#0f1812" />
          <stop offset="0.16" stopColor="#2b3f31" />
          <stop offset="0.3" stopColor="#577259" />
          <stop offset="0.42" stopColor="#314736" />
          <stop offset="0.8" stopColor="#152018" />
          <stop offset="1" stopColor="#0b120d" />
        </linearGradient>
        <linearGradient id="veyla-tin-lid" x1="0" x2="1">
          <stop offset="0" stopColor="#4f3f24" />
          <stop offset="0.22" stopColor="#a58a55" />
          <stop offset="0.34" stopColor="#e6d09c" />
          <stop offset="0.5" stopColor="#a88b56" />
          <stop offset="0.85" stopColor="#5a4829" />
          <stop offset="1" stopColor="#3a2e19" />
        </linearGradient>
        <linearGradient id="veyla-tin-lid-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0dcaa" />
          <stop offset="0.5" stopColor="#b3955d" />
          <stop offset="1" stopColor="#6d5832" />
        </linearGradient>
        <linearGradient id="veyla-tin-label" x1="0" x2="1">
          <stop offset="0" stopColor="#8f887a" />
          <stop offset="0.25" stopColor="#e2dac7" />
          <stop offset="0.38" stopColor="#f4eee0" />
          <stop offset="0.7" stopColor="#d4ccb8" />
          <stop offset="1" stopColor="#7c7668" />
        </linearGradient>
      </defs>

      {/* Body */}
      <path d="M14 84v328a106 16 0 0 0 212 0V84Z" fill="url(#veyla-tin-body)" />

      {/* Label band, curved to follow the cylinder */}
      <path
        d="M14 168a106 16 0 0 0 212 0v164a106 16 0 0 1-212 0Z"
        fill="url(#veyla-tin-label)"
      />
      <path
        d="M14 180a106 16 0 0 0 212 0"
        stroke="#1d2a20"
        strokeOpacity="0.35"
        fill="none"
      />
      <path
        d="M14 320a106 16 0 0 0 212 0"
        stroke="#1d2a20"
        strokeOpacity="0.35"
        fill="none"
      />
      <g fill="#1b271e" textAnchor="middle">
        <text
          x="120"
          y="236"
          className="font-display"
          fontSize="34"
          letterSpacing="3"
        >
          Veyla
        </text>
        <path d="M100 250h40" stroke="#b39458" strokeWidth="1" />
        <text
          x="120"
          y="274"
          className="font-sans"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="4.5"
        >
          GYOKURO
        </text>
        <text
          x="120"
          y="300"
          className="font-display"
          fontSize="15"
          fontStyle="italic"
          fillOpacity="0.8"
        >
          No. 07
        </text>
      </g>

      {/* Lid */}
      <path d="M8 24v58a112 16 0 0 0 224 0V24Z" fill="url(#veyla-tin-lid)" />
      <path
        d="M8 70a112 16 0 0 0 224 0"
        stroke="#2c2211"
        strokeOpacity="0.45"
        fill="none"
      />
      <ellipse cx="120" cy="24" rx="112" ry="16" fill="url(#veyla-tin-lid-top)" />
      <ellipse
        cx="120"
        cy="24"
        rx="94"
        ry="11"
        fill="none"
        stroke="#fff4d6"
        strokeOpacity="0.35"
      />

      {/* Specular highlight */}
      <rect x="62" y="96" width="7" height="310" rx="3.5" fill="#fff" fillOpacity="0.06" />
    </svg>
  );
}

function TeaCup() {
  return (
    <div
      data-hero-cup
      className="absolute bottom-[4%] left-[2%] w-[42%] drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
    >
      <svg
        data-hero-steam
        viewBox="0 0 120 140"
        aria-hidden="true"
        focusable="false"
        className="absolute bottom-[78%] left-1/2 w-[46%] -translate-x-1/2 blur-[1.5px]"
        fill="none"
        stroke="#efe8d8"
        strokeLinecap="round"
      >
        <path d="M40 136c-14-22 14-34 0-58s12-40 4-70" strokeOpacity="0.22" strokeWidth="3" />
        <path d="M66 136c-12-20 16-30 4-54s10-34 2-60" strokeOpacity="0.16" strokeWidth="2.5" />
        <path d="M88 136c-10-16 12-26 2-44" strokeOpacity="0.12" strokeWidth="2" />
      </svg>

      <svg
        viewBox="0 0 240 172"
        aria-hidden="true"
        focusable="false"
        className="relative w-full"
      >
        <defs>
          <linearGradient id="veyla-cup-glaze" x1="0" x2="1">
            <stop offset="0" stopColor="#6d665a" />
            <stop offset="0.28" stopColor="#d9d1bf" />
            <stop offset="0.4" stopColor="#ece5d4" />
            <stop offset="0.75" stopColor="#a39b88" />
            <stop offset="1" stopColor="#57514a" />
          </linearGradient>
          <radialGradient id="veyla-cup-tea" cx="0.42" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#b6c46e" />
            <stop offset="0.55" stopColor="#7f9241" />
            <stop offset="1" stopColor="#4a5a24" />
          </radialGradient>
        </defs>

        {/* Foot */}
        <path d="M82 150h76l-4 16a6 6 0 0 1-6 4H92a6 6 0 0 1-6-4Z" fill="#5f594f" />
        {/* Inner rim */}
        <ellipse cx="120" cy="30" rx="110" ry="22" fill="#8c8474" />
        {/* Tea surface */}
        <ellipse cx="120" cy="34" rx="98" ry="17" fill="url(#veyla-cup-tea)" />
        <ellipse cx="96" cy="30" rx="30" ry="4" fill="#fff" fillOpacity="0.14" />
        {/* Bowl */}
        <path
          d="M10 30a110 22 0 0 0 220 0c-4 88-48 128-110 130C58 158 14 118 10 30Z"
          fill="url(#veyla-cup-glaze)"
        />
        <path
          d="M10 30a110 22 0 0 0 220 0"
          stroke="#f7f1e3"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

function ProductNote() {
  return (
    <div
      data-hero-note
      className="absolute top-[10%] right-0 hidden items-start gap-3 md:flex"
    >
      <span aria-hidden="true" className="mt-2 h-px w-12 bg-cream/30" />
      <p className="text-[0.7rem] leading-relaxed tracking-[0.18em] text-stone uppercase">
        <span className="block font-display text-2xl tracking-normal text-cream normal-case italic">
          No. 07
        </span>
        Gyokuro · 60 g
      </p>
    </div>
  );
}
