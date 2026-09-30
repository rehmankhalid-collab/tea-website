"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STORIES } from "./journal-data";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Hero creates its own pinned ScrollTrigger ~3.6s after mount, shifting
// everything below it down the page — see the same note in every other
// section's animation hook. Lower priority re-measures these triggers'
// positions after that settles.
const REFRESH_AFTER_HERO = -1;

/**
 * The journal: unlike every earlier section, this one isn't pinned — it's
 * normal document flow with a handful of independent enter animations,
 * exactly as the brief asks for ("do not create a complicated animation
 * system"). Each piece (heading, each story, the closing line) gets its own
 * `ScrollTrigger` with `toggleActions: "play none none reverse"`: it plays
 * once when scrolled into view and reverses if scrolled back above that
 * point, so backward/forward scrolling always matches what's on screen.
 *
 * Every story's image reveal is the same two-part move regardless of which
 * of the three visual kinds it holds (a real photo, a product still life,
 * or a gradient composition): a curtain the same colour as the section
 * background lifts away (`scaleY`) while the visual settles from a slight
 * scale — never a plain fade.
 *
 * With reduced motion no handler runs: everything stays in its default,
 * fully visible, final state.
 */
export function useJournalAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;

      const intro = section.querySelector<HTMLElement>("[data-journal-intro]");
      const cta = section.querySelector<HTMLElement>("[data-journal-cta]");
      const storyEls = STORIES.map((story) =>
        section.querySelector<HTMLElement>(`[data-journal-story="${story.id}"]`),
      );
      if (!intro || !cta || storyEls.some((el) => !el)) return;

      gsap.set(intro, { opacity: 0, y: 26 });
      gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: "top 85%",
          toggleActions: "play none none reverse",
          refreshPriority: REFRESH_AFTER_HERO,
        },
      }).to(intro, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });

      storyEls.forEach((storyEl, index) => {
        const image = storyEl!.querySelector<HTMLElement>("[data-journal-image]");
        const curtain = storyEl!.querySelector<HTMLElement>("[data-journal-curtain]");
        const caption = storyEl!.querySelector<HTMLElement>("[data-journal-caption]");
        if (!image || !curtain || !caption) return;

        gsap.set(image, { scale: 1.12 });
        gsap.set(curtain, { scaleY: 1 });
        gsap.set(caption, { opacity: 0, y: 20 });

        // A small, fixed head start for each story after the one before it
        // — "secondary stories enter slightly after" the featured one,
        // regardless of how the grid happens to line them up on a given
        // breakpoint.
        const delay = index * 0.12;

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: storyEl,
              start: "top 82%",
              toggleActions: "play none none reverse",
              refreshPriority: REFRESH_AFTER_HERO,
            },
          })
          .to(curtain, { scaleY: 0, duration: 0.9, ease: "power3.inOut", delay }, 0)
          .to(image, { scale: 1, duration: 1.1, delay }, 0)
          .to(caption, { opacity: 1, y: 0, duration: 0.7, delay }, 0.2);
      });

      gsap.set(cta, { opacity: 0, y: 16 });
      gsap.timeline({
        scrollTrigger: {
          trigger: cta,
          start: "top 92%",
          toggleActions: "play none none reverse",
          refreshPriority: REFRESH_AFTER_HERO,
        },
      }).to(cta, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope },
  );
}
