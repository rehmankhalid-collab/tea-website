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

// Matches the hero's own pinned scrub exactly, so both cinematic sections
// feel like the same camera rather than two different scroll personalities.
const SCRUB = 1;

type Profile = {
  /** Scroll length of the pinned story. */
  distance: string;
  /** Multiplier for every parallax offset — lighter on smaller screens. */
  parallax: number;
};

/**
 * Origins sequence: one ScrollTrigger, one timeline, pinned — the same
 * mechanism as the hero, so scrolling from one cinematic section into the
 * next feels continuous rather than switching styles. While pinned, the
 * landscape settles from a slight zoom, the glow and its ring drift and
 * turn, the two ridges separate in parallax, and the story copy reveals.
 * Every property is transform/opacity; there is no clip-path and no
 * blur() filter anywhere in this section, so nothing forces a repaint.
 *
 * With reduced motion no handler runs: no pin, image and copy fully visible.
 */
export function useOriginsAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => createPinnedStory(section, { distance: "+=110%", parallax: 1 }));
      mm.add(TABLET, () => createPinnedStory(section, { distance: "+=85%", parallax: 0.65 }));
      mm.add(MOBILE, () => createPinnedStory(section, { distance: "+=55%", parallax: 0.4 }));

      return () => mm.revert();
    },
    { scope },
  );
}

function createPinnedStory(section: HTMLElement, { distance, parallax }: Profile) {
  const q = gsap.utils.selector(section);

  const tl = gsap.timeline({
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
  // place — transform-only, no clip-path or filter involved.
  tl.fromTo(q("[data-origins-landscape]"), { scale: 1 + 0.08 * parallax }, { scale: 1, duration: 0.6, ease: "power1.out" }, 0)
    .fromTo(
      q("[data-origins-glow]"),
      { autoAlpha: 0.45, scale: 0.92, x: -10 * parallax },
      { autoAlpha: 1, scale: 1, x: 10 * parallax, duration: 1 },
      0,
    )
    .fromTo(q("[data-origins-ring]"), { rotation: 0, autoAlpha: 0 }, { rotation: 34 * parallax, autoAlpha: 0.4, duration: 1 }, 0)
    .fromTo(q("[data-origins-ridge-far]"), { y: 36 * parallax }, { y: -14 * parallax, duration: 1 }, 0)
    .fromTo(q("[data-origins-ridge-near]"), { y: 54 * parallax }, { y: -22 * parallax, duration: 1 }, 0)
    // Closest to camera, so it travels furthest — the branch drifts past
    // faster than anything behind it, the clearest parallax cue there is.
    .fromTo(q("[data-origins-foreground]"), { y: 50 * parallax, autoAlpha: 0.75 }, { y: -10 * parallax, autoAlpha: 1, duration: 1 }, 0);

  // Story copy.
  tl.fromTo(q("[data-origins-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.05)
    .fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.16)
    .fromTo(q("[data-origins-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.22, stagger: 0.06, ease: "power3.out" }, 0.24)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.46)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.62);

  // Parallax and the ring keep drifting through to t=1, so the last third of
  // the pin still has motion to follow rather than sitting dead once the
  // copy has landed.
}
