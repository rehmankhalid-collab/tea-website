"use client";

import { useRef } from "react";

import { RitualBackground } from "./ritual-background";
import { RitualIntro, RitualPhaseCaption } from "./ritual-copy";
import { RitualLeaves } from "./ritual-leaves";
import { RitualVessel } from "./ritual-vessel";
import { useRitualAnimation } from "./use-ritual-animation";

/**
 * Section 4 — the ritual. Where Collection is a clean, precise product
 * plate, this is meant to feel warm and unhurried: one continuous scene —
 * leaf, then water, then steep, then the finished cup — rather than a grid
 * of things to compare.
 *
 * Two `data-ritual-scene` blocks (leaf, vessel) read as a plain,
 * normal-flow, top-to-bottom story by default — this stacked reading order
 * **is** the reduced-motion experience, not a fallback bolted on after. The
 * leaves are the opening's visual from the very first frame (per the brief,
 * the ritual opens already looking at them, not fading them in as a later
 * "phase") — only the caption above them changes, from the section's own
 * intro line to "01 — the leaf". `useRitualAnimation` promotes both scenes
 * into full-stage overlays that cross-fade in place, and each caption list
 * into its own cross-fading stack, exactly the way Collection's hook
 * promotes its three product cards.
 */
export function Ritual() {
  const sectionRef = useRef<HTMLElement>(null);
  useRitualAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="rituals"
      data-ritual
      aria-labelledby="ritual-title"
      className="relative bg-[#140f0a]"
    >
      <h2 id="ritual-title" className="sr-only">
        The ritual
      </h2>
      <RitualBackground />

      <div
        data-ritual-stage
        className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-20 px-6 py-28 md:gap-24 md:px-10 md:py-36"
      >
        <div data-ritual-scene="leaf" className="flex w-full flex-col items-center justify-center gap-10">
          <div data-ritual-caption-list className="relative flex flex-col items-center gap-8">
            <div data-ritual-phase="intro" className="flex flex-col items-center justify-center">
              <RitualIntro />
            </div>
            <RitualPhaseCaption id="leaf" />
          </div>
          <RitualLeaves />
        </div>

        <div data-ritual-scene="vessel" className="flex w-full flex-col items-center justify-center gap-14">
          <div data-ritual-caption-list className="relative flex flex-col items-center gap-10">
            <RitualPhaseCaption id="water" />
            <RitualPhaseCaption id="steep" />
            <RitualPhaseCaption id="moment" />
          </div>
          <RitualVessel />
        </div>
      </div>

      {/* Fades the ritual into the next section at the very end of the
          scroll sequence — matches the hero's own handoff treatment, timed
          late enough to stay out of the way of "Take your time". */}
      <div
        data-ritual-fade
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5 bg-linear-to-t from-[#140f0a] to-transparent opacity-0"
      />
    </section>
  );
}
