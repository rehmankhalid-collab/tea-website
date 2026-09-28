"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TEAS } from "./collection-data";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const COMPACT = "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Hero creates its own pinned ScrollTrigger ~3.6s after mount (after its
// entrance finishes), which shifts everything below it down the page. A
// lower priority makes ScrollTrigger recalculate this trigger after that
// happens, so a scroll position captured mid-refresh still lands on the
// right frame of the sequence instead of snapping to an earlier one.
const REFRESH_AFTER_HERO = -1;

type Profile = {
  /** Total scroll length of the pin, covering the arrival hold and all three chapters. */
  distance: string;
  /** How far the lid rotates open, in degrees. */
  lidOpen: number;
  /** How far the lid lifts as it opens, in px. */
  lidLift: number;
};

/**
 * The whole section is one continuous, scroll-scrubbed timeline inside a
 * single pinned ScrollTrigger — never several competing triggers — so the
 * open → pour → fill → settle → close sequence for each tea, and the
 * crossfade into the next, is always in lockstep with scroll position and
 * reverses perfectly on the way back up.
 *
 * With reduced motion no handler runs: the section stays in its default,
 * normal-flow layout — three closed tins, stacked and fully visible, no pin.
 */
export function useCollectionAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => createSequence(section, { distance: "+=600%", lidOpen: 118, lidLift: 26 }));
      mm.add(COMPACT, () => createSequence(section, { distance: "+=380%", lidOpen: 96, lidLift: 14 }));

      return () => mm.revert();
    },
    { scope },
  );
}

function createSequence(section: HTMLElement, profile: Profile) {
  const q = gsap.utils.selector(section);
  const stage = section.querySelector<HTMLElement>("[data-collection-stage]");
  const chapters = TEAS.map((tea) => section.querySelector<HTMLElement>(`[data-collection-chapter="${tea.id}"]`)).filter(
    (el): el is HTMLElement => el !== null,
  );
  if (!stage || chapters.length !== TEAS.length) return;

  // Turn the normal-flow, all-visible default markup into a single
  // viewport-height stage with every chapter stacked in the same spot —
  // a one-time structural switch, not something to animate over time.
  // The stage's own py-*/gap-* classes are sized for the default stacked
  // layout; once its children go absolute they no longer contribute to its
  // height, so without resetting them here the stage collapses to just its
  // padding and every chapter gets squeezed into that instead of the full
  // frame. The replacement padding keeps each chapter clear of the fixed
  // header above (inset/top on an absolutely positioned child is measured
  // from its container's padding edge, so this is also what gives it room).
  section.style.height = "100svh";
  section.style.overflow = "hidden";
  stage.style.height = "100%";
  // Only top/bottom: the stage's own px-*/md:px-* classes still apply and
  // must keep the caption text clear of the viewport edges.
  stage.style.paddingTop = "8rem";
  stage.style.paddingBottom = "3rem";
  chapters.forEach((chapter) => {
    chapter.style.position = "absolute";
    chapter.style.inset = "0";
  });
  gsap.set(chapters.slice(1), { autoAlpha: 0 });

  TEAS.forEach((tea) => {
    gsap.set(q(`[data-collection-chapter="${tea.id}"] [data-tin-lid]`), {
      transformOrigin: "50% 100%",
      // Without this, rotating past 90° shows the same flat texture from
      // behind — which, foreshortened, reads as "closed" again rather than
      // "swung open and out of the way". (Perspective comes from the tin's
      // own ancestor CSS `perspective`, not transformPerspective here — the
      // two combined make backface-visibility unreliable right at 0deg.)
      backfaceVisibility: "hidden",
    });
    gsap.set(q(`[data-collection-chapter="${tea.id}"] [data-tin-fill]`), {
      scale: 0.06,
      transformOrigin: "50% 50%",
    });
    gsap.set(q(`[data-collection-chapter="${tea.id}"] [data-tin-stream]`), {
      scaleY: 0,
      transformOrigin: "50% 0%",
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: profile.distance,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  // A calm beat before anything moves: Phase 1, arrival.
  let cursor = 0.6;

  TEAS.forEach((tea, index) => {
    cursor = addChapter(tl, q, tea.id, cursor, profile);
    const next = chapters[index + 1];
    if (next) cursor = addCrossfade(tl, chapters[index], next, cursor);
  });

  // Web fonts can shift layout after the first measurement.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/** Open → pour → fill → settle → close for one tea. Returns the cursor just after it. */
function addChapter(
  tl: gsap.core.Timeline,
  q: ReturnType<typeof gsap.utils.selector>,
  id: string,
  cursor: number,
  profile: Profile,
) {
  const within = (selector: string) => q(`[data-collection-chapter="${id}"] ${selector}`);
  const lid = within("[data-tin-lid]");
  const fill = within("[data-tin-fill]");
  const stream = within("[data-tin-stream]");
  const leaves = within("[data-tin-leaf]");
  const streamLeaves = within("[data-tin-leaf-stream]");
  const shadow = within("[data-tin-inner-shadow]");

  const OPEN = 1;
  const POUR = 1.8;
  const SETTLE = 0.45;
  const CLOSE = 0.85;

  // The lid swings up and back around its hinge, revealing the cavity —
  // never a fade. A brief shadow sells the lid passing over the opening.
  tl.to(lid, { rotationX: -profile.lidOpen, y: -profile.lidLift, duration: OPEN, ease: "power2.inOut" }, cursor)
    .to(shadow, { opacity: 0.4, duration: OPEN * 0.6, ease: "power1.out" }, cursor)
    .to(shadow, { opacity: 0, duration: OPEN * 0.4, ease: "power1.in" }, cursor + OPEN * 0.6);

  // The stream appears above the tin and reaches down into it — tea visibly
  // arriving from outside — while the level inside rises to match.
  tl.to(stream, { opacity: 1, scaleY: 1, duration: POUR * 0.3, ease: "power1.out" }, cursor + OPEN * 0.9)
    .to(streamLeaves, { opacity: 0.9, stagger: 0.06, duration: POUR * 0.25 }, cursor + OPEN)
    .to(fill, { scale: 1, duration: POUR, ease: "power1.inOut" }, cursor + OPEN)
    .to(leaves, { opacity: 1, stagger: 0.06, duration: POUR * 0.3 }, cursor + OPEN + POUR * 0.65)
    .to(stream, { opacity: 0, scaleY: 0.3, duration: POUR * 0.3, ease: "power1.in" }, cursor + OPEN + POUR * 0.7)
    .to(streamLeaves, { opacity: 0, duration: POUR * 0.2 }, cursor + OPEN + POUR * 0.75);

  // Tea settles with a small overshoot, then the lid closes back down.
  tl.to(fill, { scaleY: "+=0.05", duration: SETTLE * 0.4, ease: "power1.out" }, cursor + OPEN + POUR)
    .to(fill, { scaleY: "-=0.05", duration: SETTLE * 0.6, ease: "power2.out" }, cursor + OPEN + POUR + SETTLE * 0.4)
    .to(shadow, { opacity: 0.3, duration: CLOSE * 0.5, ease: "power1.out" }, cursor + OPEN + POUR + SETTLE)
    .to(shadow, { opacity: 0, duration: CLOSE * 0.5, ease: "power1.in" }, cursor + OPEN + POUR + SETTLE + CLOSE * 0.5)
    // -0.01deg rather than a flat 0: once a `backface-visibility: hidden`
    // element has been 3D-rotated, GSAP simplifies an exact 0 back down to a
    // plain 2D transform, and Chromium can leave it stuck culled from the
    // last 3D frame. A hair off zero keeps it a real 3D transform (and is
    // visually identical) so the closed lid reliably reappears.
    .to(lid, { rotationX: -0.01, y: 0, duration: CLOSE, ease: "power2.inOut" }, cursor + OPEN + POUR + SETTLE);

  return cursor + OPEN + POUR + SETTLE + CLOSE;
}

/** Both tins are closed at this point — cross-dissolve, then hold briefly before the next opens. */
function addCrossfade(tl: gsap.core.Timeline, current: HTMLElement, next: HTMLElement, cursor: number) {
  const DURATION = 0.6;
  const HOLD = 0.5;

  tl.to(current, { autoAlpha: 0, duration: DURATION, ease: "power1.inOut" }, cursor).to(
    next,
    { autoAlpha: 1, duration: DURATION, ease: "power1.inOut" },
    cursor,
  );

  return cursor + DURATION + HOLD;
}
