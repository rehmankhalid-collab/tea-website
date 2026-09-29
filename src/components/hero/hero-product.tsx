import Image from "next/image";

import heroTin from "../../../public/images/products/veyla-tin-brand.png";

/**
 * Product still life: real tin photography beside an illustrated cup (kept
 * as SVG since there's no product photo of it). The tin's own label reads
 * only the brand mark — no specific tea name — since the Hero isn't about
 * one numbered blend the way the Collection section is.
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
        <Image
          data-hero-tin
          src={heroTin}
          alt="A Veyla tea tin, its label showing only the brand mark"
          priority
          className="absolute top-[39%] left-1/2 h-auto w-[58%] -translate-x-1/2 -translate-y-1/2"
        />
        <TeaCup />
        <figcaption className="sr-only">
          A tin of Veyla tea beside a cup of freshly steeped tea.
        </figcaption>
      </figure>

      <ProductNote />
    </div>
  );
}

function TeaCup() {
  return (
    <div
      data-hero-cup
      className="absolute bottom-[26%] left-[23%] w-[34%] drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
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
          Veyla
        </span>
        Single estate · 50 g
      </p>
    </div>
  );
}
