import type { CollectionTea } from "./collection-data";
import { CollectionTin } from "./collection-tin";

/**
 * One tea's chapter: the tin plus its caption. Default/resting state (no
 * GSAP) is simply a closed tin in normal document flow — the reduced-motion
 * fallback shows all three stacked this way. In the cinematic path,
 * use-collection-animation.ts stacks these absolutely on top of one another
 * and crossfades between them as the active chapter changes.
 */
export function CollectionChapter({ tea }: { tea: CollectionTea }) {
  return (
    <article
      data-collection-chapter={tea.id}
      // justify-center only matters once the cinematic layout gives this a
      // fixed (100svh) height — in the default, normal-flow layout the
      // article's height already matches its content, so it's a no-op there.
      className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-6 md:px-10"
    >
      <CollectionTin
        id={tea.id}
        name={tea.name}
        number={tea.number}
        fillFrom={tea.fillFrom}
        fillTo={tea.fillTo}
        leaf={tea.leaf}
      />

      <div data-collection-caption className="mt-8 flex flex-col items-center text-center lg:mt-10">
        {tea.signature && (
          <span className="mb-3 rounded-full border border-cream/25 px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-stone uppercase">
            Signature
          </span>
        )}
        <p className="font-display text-xl text-stone italic">{tea.number}</p>
        <h3 className="mt-1 font-display text-4xl tracking-tight lg:text-5xl">{tea.name}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65 lg:text-base">{tea.note}</p>
        <p className="mt-4 text-[0.65rem] tracking-[0.25em] text-stone uppercase">{tea.weight}</p>
      </div>
    </article>
  );
}
