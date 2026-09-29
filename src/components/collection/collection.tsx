"use client";

import { useRef } from "react";

import { CollectionBackground } from "./collection-background";
import { CollectionProduct } from "./collection-product";
import { CollectionHeading } from "./collection-heading";
import { TEAS } from "./collection-data";
import { useCollectionAnimation } from "./use-collection-animation";

/**
 * Section 3: a cinematic collection reveal. Scroll brings Sencha, then
 * Hōjicha, then Gyokuro into focus one at a time like a camera changing
 * subject, before pulling back to settle all three into one editorial
 * arrangement. Default markup (below) IS that same final arrangement,
 * laid out normally — the reduced-motion fallback, and what renders before
 * use-collection-animation.ts promotes it into the pinned, cinematic stage.
 */
export function Collection() {
  const sectionRef = useRef<HTMLElement>(null);
  useCollectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="collection" data-collection aria-labelledby="collection-title" className="relative bg-ink">
      <CollectionBackground />
      <CollectionHeading />

      <div
        data-collection-stage
        className="relative flex flex-col items-center gap-20 py-28 lg:flex-row lg:items-end lg:justify-center lg:gap-8 lg:py-36 xl:gap-16"
      >
        <CollectionProduct tea={TEAS[0]} cardClassName="lg:scale-[0.92]" />
        <CollectionProduct tea={TEAS[1]} cardClassName="lg:translate-y-3 lg:scale-[0.88]" />
        <CollectionProduct tea={TEAS[2]} cardClassName="lg:-translate-y-2 lg:scale-[1.02]" />
      </div>
    </section>
  );
}
