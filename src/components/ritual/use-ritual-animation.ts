"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const TABLET =
  "(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Hero creates its own pinned ScrollTrigger ~3.6s after mount, shifting
// everything below it down the page — see the same note in
// use-collection-animation.ts. Lower priority re-measures this section after
// that settles.
const REFRESH_AFTER_HERO = -1;

type Profile = {
  /** Total scroll length of the pin. */
  distance: string;
  /** How far the leaves scale in during the opening + phase 1 approach. */
  leafZoom: number;
  /** How far the vessel scales in for the steep phase's "move closer". */
  steepZoom: number;
  /** Softens the small parallax drifts on smaller screens. */
  parallax: number;
  /** Clearance from the fixed header above. */
  topPad: string;
};

/**
 * The ritual: one pinned, scroll-scrubbed timeline carrying the whole story
 * — leaf, water, steep, moment — as continuous camera movement over two
 * persistent visual subjects (the leaves, then the one vessel that's poured,
 * steeped and finally presented) rather than a series of separate clips.
 * Every animated property is transform, opacity or blur, matching the rest
 * of the site's cinematic sections.
 *
 * With reduced motion no handler runs: the section stays in its default,
 * normal-flow layout — leaves and vessel both visible, every caption in
 * reading order, vessel already shown finished — which is the "final tea
 * ritual composition" the brief asks reduced-motion visitors to see.
 */
export function useRitualAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () =>
        createSequence(section, {
          distance: "+=420%",
          leafZoom: 0.1,
          steepZoom: 0.07,
          parallax: 1,
          topPad: "8rem",
        }),
      );
      mm.add(TABLET, () =>
        createSequence(section, {
          distance: "+=360%",
          leafZoom: 0.06,
          steepZoom: 0.045,
          parallax: 0.6,
          topPad: "9rem",
        }),
      );
      mm.add(MOBILE, () =>
        createSequence(section, {
          distance: "+=320%",
          leafZoom: 0.04,
          steepZoom: 0.03,
          parallax: 0.35,
          topPad: "10rem",
        }),
      );

      return () => mm.revert();
    },
    { scope },
  );
}

/** Freezes a cross-fading caption stack's height to its tallest member, then
 * lays every member over the others so only opacity distinguishes which one
 * is "showing" — the same technique `use-collection-animation.ts` uses for
 * its final three-up, needed here because "Take your time" (moment) and a
 * plain phase line (water, steep) aren't the same height. Width needs the
 * same explicit treatment as height: once every child goes absolute, none
 * of them contribute to the list's own intrinsic size any more, so without
 * this it collapses to zero width and wraps its text at every word. */
function promoteCaptionList(list: HTMLElement, items: HTMLElement[]) {
  const maxHeight = Math.max(...items.map((item) => item.offsetHeight));
  list.style.position = "relative";
  list.style.width = "100%";
  list.style.height = `${maxHeight}px`;
  items.forEach((item) => {
    item.style.position = "absolute";
    item.style.inset = "0";
  });
}

function createSequence(section: HTMLElement, profile: Profile) {
  const stage = section.querySelector<HTMLElement>("[data-ritual-stage]");
  const leafScene = section.querySelector<HTMLElement>('[data-ritual-scene="leaf"]');
  const vesselScene = section.querySelector<HTMLElement>('[data-ritual-scene="vessel"]');
  if (!stage || !leafScene || !vesselScene) return;

  const leafCaptionList = leafScene.querySelector<HTMLElement>("[data-ritual-caption-list]");
  const introCaption = leafScene.querySelector<HTMLElement>('[data-ritual-phase="intro"]');
  const leafCaption = leafScene.querySelector<HTMLElement>('[data-ritual-phase="leaf"]');
  const leaves = leafScene.querySelector<HTMLElement>("[data-ritual-leaves]");

  const vesselCaptionList = vesselScene.querySelector<HTMLElement>("[data-ritual-caption-list]");
  const waterCaption = vesselScene.querySelector<HTMLElement>('[data-ritual-phase="water"]');
  const steepCaption = vesselScene.querySelector<HTMLElement>('[data-ritual-phase="steep"]');
  const momentCaption = vesselScene.querySelector<HTMLElement>('[data-ritual-phase="moment"]');
  const vessel = vesselScene.querySelector<HTMLElement>("[data-ritual-vessel]");
  const water = vesselScene.querySelector<HTMLElement>("[data-ritual-water]");
  const ripple = vesselScene.querySelector<HTMLElement>("[data-ritual-ripple]");
  const liquids = ["0", "1", "2", "3"].map((i) =>
    vesselScene.querySelector<HTMLElement>(`[data-ritual-liquid="${i}"]`),
  );
  const steam = vesselScene.querySelector<HTMLElement>("[data-ritual-steam]");
  const fade = section.querySelector<HTMLElement>("[data-ritual-fade]");

  if (
    !leafCaptionList ||
    !introCaption ||
    !leafCaption ||
    !leaves ||
    !vesselCaptionList ||
    !waterCaption ||
    !steepCaption ||
    !momentCaption ||
    !vessel ||
    !water ||
    !ripple ||
    liquids.some((el) => !el) ||
    !steam ||
    !fade
  ) {
    return;
  }
  const [liquid0, liquid1, liquid2, liquid3] = liquids as HTMLElement[];

  // Promote the default, normal-flow story into a single pinned stage: the
  // leaf and vessel scenes become full-stage overlays that cross-fade in
  // place instead of a column the page scrolls past. Same technique, same
  // reasoning, as use-collection-animation.ts's own stage promotion.
  section.style.height = "100svh";
  section.style.overflow = "hidden";
  stage.style.height = "100%";
  [leafScene, vesselScene].forEach((scene) => {
    scene.style.position = "absolute";
    scene.style.inset = "0";
    scene.style.paddingTop = profile.topPad;
    scene.style.paddingBottom = "3rem";
  });
  promoteCaptionList(leafCaptionList, [introCaption, leafCaption]);
  promoteCaptionList(vesselCaptionList, [waterCaption, steepCaption, momentCaption]);

  // Starting state: the leaves are what the section opens on — sharp, in
  // place, intro caption showing over them. The vessel waits just out of
  // focus, ready to arrive once the leaf beat finishes.
  gsap.set(leafScene, { opacity: 1, scale: 1, filter: "blur(0px)" });
  gsap.set(vesselScene, { opacity: 0, scale: 0.94, filter: "blur(4px)" });
  gsap.set(introCaption, { opacity: 1 });
  gsap.set(leafCaption, { opacity: 0 });
  gsap.set([waterCaption, steepCaption, momentCaption], { opacity: 0 });
  gsap.set(water, { scaleY: 0, opacity: 0 });
  gsap.set(ripple, { scale: 0.75, opacity: 0 });
  gsap.set([liquid0, liquid1, liquid2, liquid3], { opacity: 0 });
  gsap.set(steam, { opacity: 0, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
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

  // --- Opening + phase 1, "the leaf" ------------------------------------
  // One continuous, slow approach on the leaves for the entire beat — the
  // camera never stops to "start a new animation" for the caption change
  // partway through it.
  const OPENING_HOLD = 0.9;
  const TO_LEAF_CAPTION = 0.6;
  const LEAF_HOLD = 1.6;
  const leafBeat = OPENING_HOLD + TO_LEAF_CAPTION + LEAF_HOLD;

  tl.to(leaves, { scale: 1 + profile.leafZoom, y: -8 * profile.parallax, duration: leafBeat, ease: "none" }, 0)
    .to(introCaption, { opacity: 0, duration: TO_LEAF_CAPTION }, OPENING_HOLD)
    .to(leafCaption, { opacity: 1, duration: TO_LEAF_CAPTION }, OPENING_HOLD);

  let cursor = leafBeat;

  // --- Transition: the leaf recedes as the vessel arrives ----------------
  // Both changes happen in the same window and overlap, the way the brief
  // asks for — no hard cut, no moment where neither subject is visible.
  const LEAF_TO_VESSEL = 0.9;
  tl.to(leafScene, { opacity: 0, scale: 1 - profile.leafZoom * 0.5, filter: "blur(6px)", duration: LEAF_TO_VESSEL }, cursor)
    .to(leafCaption, { opacity: 0, duration: LEAF_TO_VESSEL * 0.4 }, cursor)
    .to(vesselScene, { opacity: 1, scale: 1, filter: "blur(0px)", duration: LEAF_TO_VESSEL }, cursor);

  cursor += LEAF_TO_VESSEL;

  // --- Phase 2, "the water" ------------------------------------------------
  // A thin, controlled pour — scaleY reveal, not a size/height change — then
  // a quick ripple where it lands, then the stream itself clears once the
  // vessel already holds water.
  const WATER_HOLD = 1.3;
  tl.to(waterCaption, { opacity: 1, duration: 0.3 }, cursor + 0.1)
    .to(water, { scaleY: 1, opacity: 1, duration: WATER_HOLD * 0.5, ease: "power1.inOut" }, cursor)
    .to(liquid0, { opacity: 1, duration: WATER_HOLD * 0.35 }, cursor + WATER_HOLD * 0.45)
    .to(ripple, { scale: 1.3, opacity: 0.55, duration: 0.22 }, cursor + WATER_HOLD * 0.48)
    .to(ripple, { scale: 1.6, opacity: 0, duration: 0.3 }, cursor + WATER_HOLD * 0.62)
    .to(water, { opacity: 0, duration: 0.3 }, cursor + WATER_HOLD * 0.75)
    .to(waterCaption, { opacity: 0, duration: 0.22 }, cursor + WATER_HOLD - 0.18);

  cursor += WATER_HOLD;

  // --- Phase 3, "the steep" ------------------------------------------------
  // The liquid's colour is never tweened directly — four identically-shaped
  // fills cross-fade in sequence, clear through to a full infusion, which
  // keeps every animated property here to opacity. The vessel drifts very
  // slightly closer, as if the camera is settling in to watch it steep.
  const STEEP_HOLD = 2.4;
  tl.to(steepCaption, { opacity: 1, duration: 0.3 }, cursor + 0.1)
    .to(steam, { opacity: 0.5, duration: STEEP_HOLD * 0.7 }, cursor + 0.2)
    .to(vessel, { scale: 1 + profile.steepZoom, duration: STEEP_HOLD, ease: "none" }, cursor)
    .to(liquid0, { opacity: 0, duration: STEEP_HOLD * 0.28 }, cursor + STEEP_HOLD * 0.06)
    .to(liquid1, { opacity: 1, duration: STEEP_HOLD * 0.28 }, cursor + STEEP_HOLD * 0.06)
    .to(liquid1, { opacity: 0, duration: STEEP_HOLD * 0.28 }, cursor + STEEP_HOLD * 0.36)
    .to(liquid2, { opacity: 1, duration: STEEP_HOLD * 0.28 }, cursor + STEEP_HOLD * 0.36)
    .to(liquid2, { opacity: 0, duration: STEEP_HOLD * 0.28 }, cursor + STEEP_HOLD * 0.66)
    .to(liquid3, { opacity: 1, duration: STEEP_HOLD * 0.28 }, cursor + STEEP_HOLD * 0.66)
    .to(steepCaption, { opacity: 0, duration: 0.22 }, cursor + STEEP_HOLD - 0.18);

  cursor += STEEP_HOLD;

  // --- Phase 4, "the moment" -----------------------------------------------
  // The camera pulls back from the steep phase's close-in framing, the
  // finished cup settles as the whole scene's subject, and the closing line
  // holds until the pin releases — no exit animation rushing it away.
  const PULL_BACK = 0.7;
  tl.to(vessel, { scale: 1, duration: PULL_BACK, ease: "power2.out" }, cursor)
    .to(steam, { opacity: 0.55, duration: PULL_BACK }, cursor)
    .to(momentCaption, { opacity: 1, duration: 0.4 }, cursor + 0.2);

  cursor += PULL_BACK;

  const MOMENT_HOLD = 1.6;
  cursor += MOMENT_HOLD;

  // A late, subtle grade into whatever comes next — timed to the very end so
  // it never competes with "Take your time" for attention.
  tl.to(fade, { opacity: 0.85, duration: 0.25 }, cursor - 0.25);

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
