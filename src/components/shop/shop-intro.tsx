/**
 * Opens Section 7 the same way every other section opens — eyebrow, gold
 * rule, serif headline — so the shop reads as one more scene in the same
 * story, not a UI bolted onto the end of it.
 */
export function ShopIntro() {
  return (
    <div data-shop-intro className="mx-auto max-w-2xl text-center">
      <p className="mb-6 flex items-center justify-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-stone uppercase">
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        The Veyla collection
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
      </p>
      <h2
        id="shop-title"
        className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-cream"
      >
        Bring the ritual home.
      </h2>
      <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream/65 md:text-lg">
        Three teas, each grown, picked, and finished by hand. Choose the one
        that matches the moment you want to keep.
      </p>
    </div>
  );
}
