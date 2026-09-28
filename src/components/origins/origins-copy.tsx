// Each line sits in an overflow-hidden mask for a line-by-line reveal.
const HEADLINE_LINES = [
  [{ text: "Where the" }],
  [{ text: "mountains meet" }],
  [{ text: "the " }, { text: "mist.", accent: true }],
] as const;

export function OriginsCopy() {
  return (
    <div
      data-origins-copy
      // A soft, close-held shadow — the way a film title or magazine
      // headline holds over a bright photograph — so every letter keeps its
      // edge regardless of exactly what's behind it, without needing a
      // heavier background plate. Inherits to every child below.
      className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pt-28 pb-14 [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_10px_28px_rgba(0,0,0,0.4)] md:px-10 md:pb-20"
    >
      <p
        data-origins-eyebrow
        className="mb-6 flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-cream/85 uppercase md:mb-8"
      >
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        The origin
      </p>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
        <h2
          id="origins-title"
          className="font-display text-[clamp(2.9rem,6.4vw,6.5rem)] leading-[1.05] tracking-[-0.005em] lg:col-span-7"
        >
          {HEADLINE_LINES.map((segments, index) => (
            <span key={index} className="block overflow-hidden pb-[0.06em]">
              <span data-origins-line className="block">
                {segments.map((segment) =>
                  "accent" in segment ? (
                    <em key={segment.text} className="text-matcha">
                      {segment.text}
                    </em>
                  ) : (
                    segment.text
                  ),
                )}
              </span>{" "}
            </span>
          ))}
        </h2>

        <div className="max-w-sm lg:col-span-4 lg:col-start-9 lg:pb-3">
          <p
            data-origins-text
            className="text-base leading-relaxed text-cream/90 md:text-lg"
          >
            High in the hills, tea grows slowly beneath cool mountain air and
            morning fog. Every harvest begins here.
          </p>
          <p
            data-origins-location
            className="mt-8 flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-cream uppercase"
          >
            <span aria-hidden="true" className="h-px w-8 bg-cream/40" />
            Uji, Kyoto — Japan
          </p>
        </div>
      </div>
    </div>
  );
}
