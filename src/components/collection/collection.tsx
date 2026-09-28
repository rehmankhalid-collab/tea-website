"use client";

import { useRef } from "react";

import { CollectionBackground } from "./collection-background";
import { CollectionChapter } from "./collection-chapter";
import { CollectionHeading } from "./collection-heading";
import { TEAS } from "./collection-data";
import { useCollectionAnimation } from "./use-collection-animation";

/**
 * Section 3: one tin at a time, opened, filled and sealed again by the
 * user's own scroll — Sencha, then Hōjicha, then Gyokuro. Default markup
 * (below) is a plain, normal-flow stack of closed tins: the reduced-motion
 * fallback, and what renders before the cinematic staging in
 * use-collection-animation.ts takes over.
 */
export function Collection() {
  const sectionRef = useRef<HTMLElement>(null);
  useCollectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="collection" data-collection aria-labelledby="collection-title" className="relative bg-ink">
      <CollectionBackground />
      <CollectionHeading />

      {/* Horizontal safe margins live on each chapter, not here: once a
          chapter is absolutely positioned (cinematic mode), `inset:0` fills
          the stage's border box, not its padding box, so padding set here
          would never reach it. */}
      <div data-collection-stage className="relative flex flex-col gap-28 py-28 lg:gap-36 lg:py-36">
        {TEAS.map((tea) => (
          <CollectionChapter key={tea.id} tea={tea} />
        ))}
      </div>
    </section>
  );
}
