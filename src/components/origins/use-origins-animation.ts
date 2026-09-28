"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const TABLET =
  "(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)";

// The hero creates its pinned ScrollTrigger after its entrance, i.e. after
// these. A lower priority makes ScrollTrigger refresh these after the hero's
// pin spacing exists, so their start/end positions account for it.
const REFRESH_AFTER_HERO = -1;

type PinnedProfile = {
  /** Scroll length of the pinned story. */
  distance: string;
  /** Multiplier for every parallax offset. */
  parallax: number;
  /** Radius of the circular window the landscape first appears through. */
  startRadius: number;
};

/**
 * Origins sequence. The landscape first appears through a circular window —
 * echoing the hero's product disc — that rises from below as the hero lifts
 * away. Once the section reaches the top it pins, the window opens to full
 * bleed, the layers separate in parallax, and the story copy reveals.
 *
 * With reduced motion no handler runs: no pin, image and copy fully visible.
 */
export function useOriginsAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () =>
        createPinnedStory(section, { distance: "+=130%", parallax: 1, startRadius: 20 }),
      );
      mm.add(TABLET, () =>
        createPinnedStory(section, { distance: "+=90%", parallax: 0.6, startRadius: 24 }),
      );
      mm.add(MOBILE, () => createMobileStory(section));

      return () => mm.revert();
    },
    { scope },
  );
}

function createPinnedStory(
  section: HTMLElement,
  { distance, parallax, startRadius }: PinnedProfile,
) {
  const q = gsap.utils.selector(section);
  const image = q("[data-origins-image]");
  const layers = gsap.utils.toArray<HTMLElement>("[data-origins-layer]", section);

  // Approach: while the hero lifts away, the window rises slightly slower
  // than the page, so the landscape reads as sitting behind the transition.
  gsap.fromTo(
    image,
    { y: () => -window.innerHeight * 0.1 * parallax },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: REFRESH_AFTER_HERO,
      },
    },
  );

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: distance,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  // The window opens into the world; the landscape settles as it does.
  tl.fromTo(
    image,
    { clipPath: `circle(${startRadius}% at 50% 50%)` },
    { clipPath: "circle(75% at 50% 50%)", duration: 0.5, ease: "power2.inOut" },
    0,
  )
    .fromTo(q("[data-origins-landscape]"), { scale: 1.25 }, { scale: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-foreground]"), { yPercent: 30 }, { yPercent: 0, duration: 0.8, ease: "power1.out" }, 0)
    .fromTo(q("[data-origins-mist]"), { xPercent: -4 }, { xPercent: 4, duration: 1 }, 0);

  // Deeper layers move less than nearer ones.
  layers.forEach((layer) => {
    const depth = Number(layer.dataset.depth ?? 0.5);
    tl.fromTo(
      layer,
      { y: depth * 60 * parallax },
      { y: -depth * 60 * parallax, duration: 1 },
      0,
    );
  });

  // Story copy, with its own slow drift against the landscape.
  tl.fromTo(q("[data-origins-copy]"), { y: 60 * parallax }, { y: -20 * parallax, duration: 1 }, 0)
    .fromTo(q("[data-origins-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.3)
    .fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.42)
    .fromTo(q("[data-origins-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.3, stagger: 0.07, ease: "power3.out" }, 0.46)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.66)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.8)
    // Brief hold so the finished composition rests before the pin releases.
    .to({}, { duration: 0.15 });
}

// Phones: no pin and no layer parallax — a short scrubbed reveal that
// completes as the section reaches the top, leaving the copy fully readable.
function createMobileStory(section: HTMLElement) {
  const q = gsap.utils.selector(section);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      end: "top top",
      scrub: 0.6,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  tl.fromTo(
    q("[data-origins-image]"),
    { clipPath: "circle(26% at 50% 45%)" },
    { clipPath: "circle(75% at 50% 50%)", duration: 0.6, ease: "power2.inOut" },
    0,
  )
    .fromTo(q("[data-origins-landscape]"), { scale: 1.15 }, { scale: 1, duration: 1 }, 0)
    .fromTo(q("[data-origins-foreground]"), { yPercent: 15 }, { yPercent: 0, duration: 1 }, 0)
    .fromTo(q("[data-origins-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.4)
    .fromTo(q("[data-origins-eyebrow]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.5)
    .fromTo(q("[data-origins-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.3, stagger: 0.06, ease: "power3.out" }, 0.55)
    .fromTo(q("[data-origins-text]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.75)
    .fromTo(q("[data-origins-location]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.85);
}
