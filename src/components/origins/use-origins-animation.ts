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

// Lenis already smooths the raw wheel/touch input, so a light scrub here
// avoids stacking a second, independent layer of lag on top of it. The
// previous `scrub: 1` doubled up with Lenis's own smoothing, which is what
// made the section feel laggy and disconnected from the pointer.
const SCRUB = 0.35;

type PinnedProfile = {
  /** Scroll length of the pinned story. */
  distance: string;
  /** Multiplier for every parallax offset — lighter on tablet. */
  parallax: number;
};

/**
 * Origins sequence: one ScrollTrigger per breakpoint, each driving a single
 * timeline. The section scrolls into view natively — nothing animates it
 * before the pin — then locks into place once it reaches the top: the
 * landscape settles from a slight zoom, its layers separate in a light
 * parallax, and the story copy reveals. Everything animates transform or
 * opacity only, so nothing forces a repaint mid-scroll.
 *
 * With reduced motion no handler runs: no pin, image and copy fully visible.
 */
export function useOriginsAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => createPinnedStory(section, { distance: "+=100%", parallax: 1 }));
      mm.add(TABLET, () => createPinnedStory(section, { distance: "+=80%", parallax: 0.6 }));
      mm.add(MOBILE, () => createMobileStory(section));

      return () => mm.revert();
    },
    { scope },
  );
}

function createPinnedStory(section: HTMLElement, { distance, parallax }: PinnedProfile) {
  const q = gsap.utils.selector(section);
  const layers = gsap.utils.toArray<HTMLElement>("[data-origins-layer]", section);

  // One timeline, one ScrollTrigger, one scrub value for every element in
  // this section — nothing else touches these nodes, so there is no
  // competing transform and no mismatched smoothing at any handoff.
  const tl = gsap.timeline({
    // force3D promotes these to their own GPU layer up front, instead of
    // the browser deciding mid-scroll — avoids a layer-promotion hitch on
    // the first frame each element starts moving.
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: distance,
      pin: true,
      scrub: SCRUB,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  // The landscape settles from a slight zoom as the section locks into
  // place — a small, transform-only move. (No clip-path/mask here: animating
  // a clip on a large, blurred, multi-layer image forced a repaint every
  // scroll tick and was the main source of the stutter.)
  tl.fromTo(q("[data-origins-landscape]"), { scale: 1.06 }, { scale: 1, duration: 0.55, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-foreground]"), { yPercent: 14 }, { yPercent: 0, duration: 0.55, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-mist]"), { xPercent: -3 }, { xPercent: 3, duration: 1 }, 0);

  // Depth-based parallax, running the full pin so the layers keep drifting
  // — never fully still — right up to the moment it releases.
  layers.forEach((layer) => {
    const depth = Number(layer.dataset.depth ?? 0.5);
    const travel = 24 * depth * parallax;
    tl.fromTo(layer, { y: travel }, { y: -travel, duration: 1 }, 0);
  });

  // Story copy.
  tl.fromTo(q("[data-origins-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0)
    .fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.1)
    .fromTo(q("[data-origins-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.24, stagger: 0.06, ease: "power3.out" }, 0.18)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0.4)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.58);
}

// Phones: no pin. A short, native-scroll-linked reveal that finishes as the
// section reaches the top, so normal scrolling resumes immediately after —
// no clip-path here either, for the same performance reason as above.
function createMobileStory(section: HTMLElement) {
  const q = gsap.utils.selector(section);

  const tl = gsap.timeline({
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top top",
      scrub: SCRUB,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  tl.fromTo(q("[data-origins-landscape]"), { scale: 1.05 }, { scale: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-foreground]"), { yPercent: 8 }, { yPercent: 0, duration: 1, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.2)
    .fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.3)
    .fromTo(q("[data-origins-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.24, stagger: 0.05, ease: "power3.out" }, 0.4)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.62)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.8);
}
