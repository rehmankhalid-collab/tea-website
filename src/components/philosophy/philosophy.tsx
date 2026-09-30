"use client";

import { useRef } from "react";

import { PhilosophyBackground } from "./philosophy-background";
import { PHILOSOPHY_PHRASES, PhilosophyBrand, PhilosophyPhrase, PhilosophyStatement } from "./philosophy-copy";
import { usePhilosophyAnimation } from "./use-philosophy-animation";

/**
 * Section 5 — the philosophy. Where Ritual is cinematic and tactile, this is
 * meant to feel like the site taking a breath: one statement, three quiet
 * phrases, then the brand's own signature — nothing else. The three
 * `data-philosophy-scene` blocks read as a plain, normal-flow, top-to-bottom
 * sequence by default — this reading order **is** the reduced-motion
 * experience, not a fallback bolted on after. `usePhilosophyAnimation`
 * promotes them into full-stage overlays that cross-fade in place, the same
 * technique Collection and Ritual already use for their own scenes.
 */
export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  usePhilosophyAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      data-philosophy
      aria-labelledby="philosophy-title"
      className="relative bg-ink"
    >
      <h2 id="philosophy-title" className="sr-only">
        The philosophy
      </h2>
      <PhilosophyBackground />

      <div
        data-philosophy-stage
        className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-24 px-6 py-28 md:px-10 md:py-36"
      >
        <div data-philosophy-scene="statement" className="flex w-full flex-col items-center justify-center">
          <PhilosophyStatement />
        </div>

        <div data-philosophy-scene="phrases" className="flex w-full flex-col items-center justify-center">
          <div data-philosophy-caption-list className="relative flex flex-col items-center gap-8">
            {PHILOSOPHY_PHRASES.map((phrase) => (
              <PhilosophyPhrase key={phrase.id} phrase={phrase} />
            ))}
          </div>
        </div>

        <div data-philosophy-scene="brand" className="flex w-full flex-col items-center justify-center">
          <PhilosophyBrand />
        </div>
      </div>
    </section>
  );
}
