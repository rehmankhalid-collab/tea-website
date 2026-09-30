/**
 * The hero statement — the section's emotional centerpiece. Each line sits
 * in its own overflow-hidden mask, exactly like Origins' headline
 * (`data-origins-line`), so the reveal is a quiet upward wipe rather than a
 * fade — the "optional line mask" the brief calls out. Deliberately not a
 * `<h2>`: the section's one visible heading is the sr-only title in
 * `philosophy.tsx`, so this reads as a statement to feel, not a navigable
 * heading competing with it.
 *
 * Mobile gets its own explicit line breaks (not just smaller type) so the
 * statement never wraps mid-phrase on a narrow screen.
 */
export function PhilosophyStatement() {
  return (
    <p className="max-w-[70rem] text-center font-display text-[clamp(2.35rem,6.6vw,6.75rem)] leading-[1.14] tracking-[-0.01em] text-cream">
      <span className="block overflow-hidden pb-[0.08em]">
        <span data-philosophy-line className="block">
          Tea is not a moment
          <span className="sm:hidden"><br />to fill.</span>
          <span className="hidden sm:inline"> to fill.</span>
        </span>
      </span>
      <span className="block overflow-hidden pb-[0.08em]">
        <span data-philosophy-line className="block text-stone italic">
          It is a moment
          <span className="sm:hidden"><br />to keep.</span>
          <span className="hidden sm:inline"> to keep.</span>
        </span>
      </span>
    </p>
  );
}

type Phrase = { id: string; before?: string; emphasis: string; after: string };

const PHRASES: Phrase[] = [
  { id: "grown", emphasis: "Slowly", after: " grown." },
  { id: "selected", emphasis: "Carefully", after: " selected." },
  { id: "savored", before: "Meant to be ", emphasis: "savored", after: "." },
];

/** One supporting line, its key word set apart by upright tracked-out
 * caps and full opacity against the rest of the phrase's dimmer italic —
 * typography and spacing doing the emphasis, never colour or glow. */
export function PhilosophyPhrase({ phrase }: { phrase: Phrase }) {
  return (
    <p
      data-philosophy-phrase={phrase.id}
      className="text-center font-display text-[clamp(1.6rem,3.4vw,2.75rem)] text-cream/60 italic"
    >
      {phrase.before}
      <span className="text-cream tracking-[0.06em] uppercase not-italic">{phrase.emphasis}</span>
      {phrase.after}
    </p>
  );
}

export const PHILOSOPHY_PHRASES = PHRASES;

/** The closing brand signature — echoes the header's own Logo mark (same
 * leaf path, same font-display wordmark) at campaign-poster scale, plus one
 * quiet line of copy and two very small editorial details. Not the `Logo`
 * component itself: that one is a home link wired for the header nav, and a
 * clickable "go home" mark in the middle of a contemplative moment like this
 * one would be an odd, unintended affordance. */
export function PhilosophyBrand() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="size-7 text-matcha" fill="none" aria-hidden="true">
          <path d="M12 2.5c5 4 6.5 12 0 19-6.5-7-5-15 0-19Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 6v15" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="font-display text-4xl leading-none tracking-tight text-cream sm:text-5xl">
          Veyla
        </span>
      </div>
      <p className="text-sm text-stone italic sm:text-base">Tea, thoughtfully.</p>
      <p className="flex items-center gap-4 text-[0.65rem] tracking-[0.3em] text-cream/40 uppercase">
        Est. 2026
        <span aria-hidden="true" className="h-px w-6 bg-cream/20" />
        Uji · Kyoto
      </p>
    </div>
  );
}
