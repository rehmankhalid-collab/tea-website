"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

// Hero's pinned ScrollTrigger is created ~3.6s after mount (after its
// entrance finishes), shifting everything below it down the page. A lower
// priority makes ScrollTrigger recalculate this trigger after that happens.
const REFRESH_AFTER_HERO = -1;

/**
 * Collection reveal: unlike the Hero and Origins, this section is not
 * pinned — it is a normal content grid, and pinning three more sections in
 * a row would make the whole page feel like one long cinematic device
 * rather than a set of distinct moments. Instead, one ScrollTrigger plays
 * a single timeline once as the section comes into view: the eyebrow and
 * headline settle in, then each wooden box unveils from behind a solid
 * curtain — lifted away like a stage curtain rather than a plain fade —
 * with its label settling in just as the curtain clears. Small distances,
 * no bounce, never re-triggers.
 *
 * With reduced motion no handler runs: everything is visible immediately.
 */
export function useCollectionAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const q = gsap.utils.selector(section);

      // Unlike the other reveals in this section (fades/masks, whose
      // un-animated state already IS the fully visible one), the curtain's
      // resting position covers the box — so reduced motion must explicitly
      // clear it away, not just skip the animation.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(q("[data-collection-curtain]"), { autoAlpha: 0 });
        return;
      }

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
            invalidateOnRefresh: true,
            refreshPriority: REFRESH_AFTER_HERO,
          },
        })
        .from(q("[data-collection-eyebrow]"), { autoAlpha: 0, y: 14, duration: 0.5 }, 0)
        .from(q("[data-collection-line]"), { yPercent: 100, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.08)
        .from(q("[data-collection-text]"), { autoAlpha: 0, y: 14, duration: 0.5 }, 0.3)
        // The curtain: each panel lifts up and off, uncovering its box from
        // top to bottom — a stage-curtain rise, not a fade.
        .fromTo(
          q("[data-collection-curtain]"),
          { yPercent: 0 },
          { yPercent: -100, duration: 0.8, stagger: 0.15, ease: "power3.inOut" },
          0.5,
        )
        // Labels arrive just as their own curtain clears (same stagger,
        // offset later so meta[i] follows curtain[i], not curtain[0]).
        .from(q("[data-collection-badge]"), { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.15 }, 0.85)
        .from(q("[data-collection-meta]"), { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.15 }, 0.95);
    },
    { scope },
  );
}
