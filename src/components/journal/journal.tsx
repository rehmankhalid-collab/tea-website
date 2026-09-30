"use client";

import { useRef } from "react";

import { JournalCta } from "./journal-cta";
import { JournalIntro } from "./journal-intro";
import { STORIES } from "./journal-data";
import { JournalStory } from "./journal-story";
import { useJournalAnimation } from "./use-journal-animation";

/**
 * Section 6 — the journal. Where every prior section has been a dark,
 * atmospheric scene, this one is meant to feel like stepping out into an
 * editorial magazine's own paper stock: warm cream, ink-toned type, and
 * normal document flow rather than a pinned camera sequence — lighter and
 * faster, as the brief asks for.
 *
 * The composition is an asymmetric magazine spread rather than a 3-up grid:
 * one large featured story on the left, two lighter secondary stories
 * stacked on the right (collapsing to a single 01 → 02 → 03 column below
 * `lg`). `useJournalAnimation` reveals each piece as it enters the
 * viewport — no pin, no scrub, just independent enter triggers.
 */
export function Journal() {
  const sectionRef = useRef<HTMLElement>(null);
  useJournalAnimation(sectionRef);

  const [featured, second, third] = STORIES;

  return (
    <section
      ref={sectionRef}
      id="journal"
      data-journal
      data-header-theme="light"
      aria-labelledby="journal-title"
      className="relative bg-cream"
    >
      {/* Softens the seam with Philosophy's dark ending into a gradual
          fade rather than a hard cut between the two sections' palettes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink to-transparent md:h-56"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-32 pb-28 md:px-10 md:pt-40 md:pb-36">
        <JournalIntro />

        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <div className="lg:col-span-7">
            <JournalStory story={featured} featured />
          </div>
          <div className="flex flex-col gap-14 lg:col-span-5 lg:gap-16">
            <JournalStory story={second} />
            <JournalStory story={third} />
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <JournalCta />
        </div>
      </div>

      {/* Breathing room before Section 7 (not yet built) — establishes the
          transition space without borrowing that section's own palette. */}
      <div aria-hidden="true" className="h-24 md:h-32" />
    </section>
  );
}
