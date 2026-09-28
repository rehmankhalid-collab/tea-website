// Each line sits in an overflow-hidden mask for a line-by-line reveal,
// matching the Origins headline treatment.
const HEADLINE_LINES = [
  [{ text: "Three teas." }],
  [{ text: "One quiet " }, { text: "ritual.", accent: true }],
] as const;

export function CollectionCopy() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <p
        data-collection-eyebrow
        className="mb-6 flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-stone uppercase md:mb-8"
      >
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        The collection
      </p>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
        <h2
          id="collection-title"
          className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:col-span-7"
        >
          {HEADLINE_LINES.map((segments, index) => (
            <span key={index} className="block overflow-hidden pb-[0.06em]">
              <span data-collection-line className="block">
                {segments.map((segment) =>
                  "accent" in segment ? (
                    <em key={segment.text} className="text-matcha">
                      {segment.text}
                    </em>
                  ) : (
                    segment.text
                  ),
                )}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-collection-text
          className="max-w-sm text-base leading-relaxed text-cream/70 lg:col-span-4 lg:col-start-9 md:text-lg"
        >
          Each batch grown, dried and finished by hand, then released a few
          crates at a time — a small collection rather than a catalogue.
        </p>
      </div>
    </div>
  );
}
