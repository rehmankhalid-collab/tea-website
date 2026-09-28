import { ArrowIcon } from "@/components/ui/arrow-icon";

// Each headline line sits in an overflow-hidden mask so GSAP can later
// slide the inner span up into view line by line.
const HEADLINE_LINES = [
  { text: "Grown in mist,", accent: false },
  { text: "steeped in", accent: false },
  { text: "stillness.", accent: true },
] as const;

export function HeroEyebrow() {
  return (
    <p
      data-hero-eyebrow
      className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-stone"
    >
      <span aria-hidden="true" className="h-px w-10 bg-gold" />
      First flush · Harvest 2026
    </p>
  );
}

export function HeroHeadline() {
  return (
    <h1
      id="hero-title"
      data-hero-headline
      className="font-display text-[clamp(3.4rem,9vw,8.75rem)] leading-[1.02] tracking-[-0.008em]"
    >
      {HEADLINE_LINES.map((line) => (
        <span key={line.text} className="block overflow-hidden pb-[0.06em]">
          <span
            data-hero-line
            className={`block ${line.accent ? "text-matcha italic" : ""}`}
          >
            {line.text}
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}

export function HeroDescription() {
  return (
    <p
      data-hero-description
      className="max-w-md text-base leading-relaxed text-cream/65 md:text-lg"
    >
      Single-estate teas from high-altitude gardens — shade-grown, hand-picked
      at first light, and made for rituals that ask you to slow down.
    </p>
  );
}

export function HeroActions() {
  return (
    <div
      data-hero-actions
      className="flex flex-wrap items-center gap-x-8 gap-y-5"
    >
      <a
        href="#collection"
        data-hero-cta
        className="group inline-flex items-center gap-4 rounded-full bg-cream py-2 pr-2 pl-7 text-sm font-medium text-ink transition-colors hover:bg-white"
      >
        Discover the collection
        <span className="flex size-10 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowIcon className="size-4" />
        </span>
      </a>
      <a
        href="#origins"
        data-hero-cta-secondary
        className="border-b border-cream/30 pb-1 text-sm text-cream/80 transition-colors hover:border-cream hover:text-cream"
      >
        Visit our gardens
      </a>
    </div>
  );
}
