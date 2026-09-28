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
 * a single timeline once as the section comes into view: the eyebrow,
 * headline and intro line settle in, then the three product cards follow
 * with a short stagger. Small distances, no bounce, never re-triggers.
 *
 * With reduced motion no handler runs: everything is visible immediately.
 */
export function useCollectionAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(section);

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
        .from(q("[data-collection-card]"), { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.12 }, 0.45);
    },
    { scope },
  );
}
