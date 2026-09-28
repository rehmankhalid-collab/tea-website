const DETAILS = [
  { label: "Origin", value: "Uji, Kyoto" },
  { label: "Altitude", value: "1,200 m" },
  { label: "Harvest", value: "April 2026" },
] as const;

/** Bottom rail: scroll cue and product facts. */
export function HeroDetails() {
  return (
    <div
      data-hero-details
      className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1440px] items-end justify-between px-6 pb-8 md:px-10"
    >
      <div
        data-hero-scroll-cue
        aria-hidden="true"
        className="flex items-center gap-4 text-[0.65rem] tracking-[0.3em] text-stone uppercase"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-cream/70" />
        </span>
        Scroll
      </div>

      <dl className="hidden gap-10 md:flex">
        {DETAILS.map((detail) => (
          <div key={detail.label} data-hero-detail className="text-right">
            <dt className="text-[0.65rem] tracking-[0.3em] text-stone uppercase">
              {detail.label}
            </dt>
            <dd className="mt-1.5 font-display text-xl">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
