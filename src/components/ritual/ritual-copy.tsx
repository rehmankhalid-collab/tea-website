/** The section's opening line — visible at rest, faded out early in the
 * cinematic sequence once the leaf comes into focus (see the brief: "Do not
 * display all of this text simultaneously"). */
export function RitualIntro() {
  return (
    <div data-ritual-intro className="flex flex-col items-center gap-5 text-center">
      <p className="flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-stone uppercase">
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        The ritual
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
      </p>
      <p className="font-display text-2xl text-cream/85 italic sm:text-3xl">
        Every cup begins with patience.
      </p>
    </div>
  );
}

export type RitualPhaseId = "leaf" | "water" | "steep" | "moment";

const PHASES: Record<RitualPhaseId, { number: string; title: string; line: string }> = {
  leaf: { number: "01", title: "The leaf", line: "Everything begins with the leaf." },
  water: { number: "02", title: "The water", line: "Temperature. Timing. Patience." },
  steep: { number: "03", title: "The steep", line: "Give the leaf time to become itself." },
  moment: { number: "04", title: "The moment", line: "Take your time." },
};

/** One phase's number + title + line. `moment`'s line is its own closing
 * statement, so it's set larger — the emotional payoff, not another caption. */
export function RitualPhaseCaption({ id }: { id: RitualPhaseId }) {
  const phase = PHASES[id];
  return (
    <div data-ritual-phase={id} className="flex flex-col items-center justify-center gap-3 text-center">
      <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.3em] text-gold uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
        {phase.number} — {phase.title}
      </p>
      <p
        className={
          id === "moment"
            ? "font-display text-4xl text-cream italic sm:text-5xl"
            : "font-display text-xl text-cream/90 italic sm:text-2xl"
        }
      >
        {phase.line}
      </p>
    </div>
  );
}
