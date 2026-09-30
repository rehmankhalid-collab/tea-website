/** Eyebrow, headline and one short supporting line — the section's own
 * quiet opening, echoing every other section's heading treatment
 * (eyebrow + gold rule + serif headline) but in the section's ink-on-cream
 * palette rather than cream-on-ink. */
export function JournalIntro() {
  return (
    <div data-journal-intro className="max-w-2xl">
      <p className="mb-6 flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-moss uppercase">
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        The journal
      </p>
      <h2
        id="journal-title"
        className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.08] tracking-tight text-ink"
      >
        Stories worth slowing down for.
      </h2>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
        Explore the places, people, rituals, and ideas behind every cup.
      </p>
    </div>
  );
}
