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

// Matches the hero's own pinned scrub, so both cinematic sections feel like
// the same camera rather than two different scroll personalities.
const SCRUB = 1;

type Profile = {
  /** Scroll length of the pin. */
  distance: string;
  /** Multiplier for the (already small) movement — lighter on smaller screens. */
  scale: number;
};

/**
 * Origins: one ScrollTrigger, one timeline, pinned like the hero. The
 * photograph is the only thing that moves in any noticeable way — a slow
 * settle from a slight zoom, with a few pixels of vertical drift — and the
 * copy drifts a few pixels the other way for a faint sense of depth. Every
 * number here is intentionally small: this should read as a held camera
 * breathing, not as an animation.
 *
 * With reduced motion no handler runs: no pin, image and copy fully visible.
 */
export function useOriginsAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => createScene(section, { distance: "+=90%", scale: 1 }));
      mm.add(TABLET, () => createScene(section, { distance: "+=70%", scale: 0.7 }));
      mm.add(MOBILE, () => createScene(section, { distance: "+=50%", scale: 0.5 }));

      return () => mm.revert();
    },
    { scope },
  );
}

function createScene(section: HTMLElement, { distance, scale }: Profile) {
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

  // The camera settling: a slight zoom easing off, with a few pixels of
  // vertical drift — the only "big" move in the scene, and it is still
  // small (20px of travel at most on desktop).
  tl.fromTo(
    q("[data-origins-image]"),
    { scale: 1.08, y: -10 * scale },
    { scale: 1, y: 10 * scale, duration: 1 },
    0,
  )
    // The copy drifts a few pixels against the image — enough to read as
    // two depths, not enough to look like its own animation.
    .fromTo(q("[data-origins-copy]"), { y: 8 * scale }, { y: -8 * scale, duration: 1 }, 0)
    .fromTo(q("[data-origins-scrim]"), { autoAlpha: 0.85 }, { autoAlpha: 1, duration: 1 }, 0);

  // Text reveal: eyebrow, then headline line by line, then body, then
  // location — small distances throughout, no overshoot.
  tl.fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.12)
    .fromTo(q("[data-origins-line]"), { yPercent: 100 }, { yPercent: 0, duration: 0.2, stagger: 0.06, ease: "power3.out" }, 0.22)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.46)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.62);
}
