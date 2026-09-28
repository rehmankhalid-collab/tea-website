"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const TABLET =
  "(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)";

// The hero creates its pinned ScrollTrigger after its entrance finishes, i.e.
// after these are created. A lower priority makes ScrollTrigger recalculate
// these after the hero's pin spacing exists in the DOM.
const REFRESH_AFTER_HERO = -1;

// Lenis already smooths the raw wheel/touch input; stacking GSAP's own scrub
// lag on top of that is what made an earlier version feel disconnected from
// the pointer, so this stays light.
const SCRUB = 0.35;

type Profile = {
  /** Where the reveal starts, relative to the viewport. */
  start: string;
  /** Multiplier for every parallax offset — lighter on smaller screens. */
  parallax: number;
};

/**
 * Origins reveal: one ScrollTrigger, one timeline, no pin. The section is a
 * normal block in the page flow — scrolling through it is always exactly
 * 1:1 with the pointer, with no "locked" phase to feel stuck in. The
 * landscape settles from a slight zoom, its glow and two ridges drift at
 * slightly different rates, and the story copy reveals — all scrubbed
 * directly to scroll position, finishing by the time the section reaches
 * the top so normal scrolling continues with nothing left mid-animation.
 *
 * With reduced motion no handler runs: image and copy are fully visible.
 */
export function useOriginsAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => createReveal(section, { start: "top bottom", parallax: 1 }));
      mm.add(TABLET, () => createReveal(section, { start: "top bottom", parallax: 0.7 }));
      mm.add(MOBILE, () => createReveal(section, { start: "top 85%", parallax: 0.4 }));

      return () => mm.revert();
    },
    { scope },
  );
}

function createReveal(section: HTMLElement, { start, parallax }: Profile) {
  const q = gsap.utils.selector(section);

  const tl = gsap.timeline({
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: section,
      start,
      end: "top top",
      scrub: SCRUB,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  // The landscape settles from a slight zoom as it scrolls into place — a
  // small, transform-only move, no clip-path or filter involved.
  tl.fromTo(q("[data-origins-landscape]"), { scale: 1 + 0.05 * parallax }, { scale: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-glow]"), { autoAlpha: 0.5, y: 14 * parallax }, { autoAlpha: 1, y: 0, duration: 1 }, 0)
    .fromTo(q("[data-origins-ridge-far]"), { y: 22 * parallax }, { y: 0, duration: 1 }, 0)
    .fromTo(q("[data-origins-ridge-near]"), { y: 34 * parallax }, { y: 0, duration: 1 }, 0);

  // Story copy.
  tl.fromTo(q("[data-origins-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.1)
    .fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.25)
    .fromTo(q("[data-origins-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.24, stagger: 0.06, ease: "power3.out" }, 0.35)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.6)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.78);
}
