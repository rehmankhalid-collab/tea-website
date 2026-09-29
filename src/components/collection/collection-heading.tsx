/**
 * Minimal, persistent chrome: a small eyebrow and one editorial line rather
 * than a headline competing with the products for attention. Absolutely
 * positioned against the section (which is always `relative`) so that in
 * the cinematic, pinned layout it stays put as its own one-viewport frame
 * for the whole sequence; in the reduced-motion / static layout it simply
 * scrolls away above the products like any ordinary section intro.
 */
export function CollectionHeading() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 px-6 pt-28 md:px-10 md:pt-32">
      <h2
        id="collection-title"
        className="flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-stone uppercase"
      >
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        The collection
      </h2>
      <p className="mt-3 ml-14 font-display text-lg text-cream/60 italic">
        Three expressions of the tea leaf.
      </p>
    </div>
  );
}
