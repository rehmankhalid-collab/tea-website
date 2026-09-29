import Image from "next/image";

import type { CollectionTea } from "./collection-data";

/**
 * One tea, presented as an editorial product plate: photo, then name and a
 * few essential lines of copy. `data-product-card` wraps the image and its
 * caption together for position/scale/blur, so the caption always resizes
 * with its product — but `data-product-visual` (the photo) and
 * `data-product-caption` fade on their own separate schedules: during a
 * transition the outgoing and incoming captions must not be visible at the
 * same time, or their text overlaps, while the two photos crossing in depth
 * reads fine and fades over the full move instead. `cardClassName` carries
 * the default, normal-flow composition's own per-item scale/offset — plain
 * CSS classes that the cinematic path simply overrides with inline
 * transforms.
 */
export function CollectionProduct({ tea, cardClassName }: { tea: CollectionTea; cardClassName?: string }) {
  return (
    <article
      data-collection-product={tea.id}
      // justify-center only matters once the cinematic layout gives this a
      // fixed (100svh) height — in the default, normal-flow layout the
      // article's height already matches its content, so it's a no-op there.
      className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-6 md:px-10"
    >
      <div data-product-card className={`relative flex flex-col items-center ${cardClassName ?? ""}`}>
        <div
          aria-hidden="true"
          className="absolute top-[8%] left-1/2 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_32%_28%,#2c3d2e,transparent_72%)] opacity-60 blur-2xl"
        />

        <div data-product-visual className="relative w-full max-w-[13rem] sm:max-w-[16rem] lg:max-w-[19rem]">
          <Image
            src={tea.image}
            alt={`A Veyla tin of ${tea.name} tea`}
            className="w-full h-auto"
            sizes="(min-width: 1024px) 15rem, 40vw"
            placeholder="blur"
            priority={tea.id === "sencha"}
          />
        </div>

        <div data-product-caption className="mt-8 flex flex-col items-center text-center lg:mt-10">
          {tea.signature && (
            <span className="mb-3 rounded-full border border-cream/25 px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-stone uppercase">
              Signature
            </span>
          )}
          <p className="font-display text-xl text-stone italic">{tea.number}</p>
          <h3 className="mt-1 font-display text-4xl tracking-tight lg:text-6xl">{tea.name}</h3>
          <p className="mt-3 text-[0.65rem] tracking-[0.3em] text-matcha uppercase">{tea.tags}</p>
          <p data-product-detail className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70 lg:text-base">
            {tea.note}
          </p>
          <p data-product-detail className="mt-4 text-[0.65rem] tracking-[0.25em] text-stone uppercase">
            {tea.origin} · {tea.weight}
          </p>
        </div>
      </div>
    </article>
  );
}
