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

/** A product's depth/position state — transform and blur only, never opacity (see below). */
type Spatial = { x: number; y: number; scale: number; blur: number };

const HERO: Spatial = { x: 0, y: 0, scale: 1, blur: 0 };
/** Just stepped down from hero, one place behind. */
const RECEDE: Spatial = { x: -0.62, y: 0, scale: 0.92, blur: 3 };
/** Two places behind — nearly out of the story, barely there. */
const FAR: Spatial = { x: -0.94, y: 0, scale: 0.84, blur: 5 };
/** Waiting just off to the right, about to become hero. */
const INCOMING: Spatial = { x: 0.62, y: 0, scale: 0.9, blur: 3 };
/** Where the very first product starts, before it has been presented. */
const ARRIVE_START: Spatial = { x: 0, y: 0.09, scale: 0.92, blur: 0 };

/** The editorial three-up the section settles into — asymmetric on purpose. */
const FINAL_SLOTS_DESKTOP: Spatial[] = [
  { x: -0.86, y: 0, scale: 0.62, blur: 0 },
  { x: 0, y: 0.05, scale: 0.58, blur: 0 },
  { x: 0.86, y: -0.04, scale: 0.68, blur: 0 },
];
/**
 * Mobile: no room for three across, so the collection forms as a short
 * stack instead — smaller still, and with the note/origin lines trimmed
 * (see `trimFinalDetail` below), so three full captions never have to
 * share this little vertical room at once.
 */
const FINAL_SLOTS_COMPACT: Spatial[] = [
  { x: 0, y: -1.2, scale: 0.5, blur: 0 },
  { x: 0, y: 0, scale: 0.48, blur: 0 },
  { x: 0, y: 1.2, scale: 0.54, blur: 0 },
];

/** Visual (photo) opacity per role — the photo fades gradually over a whole move. */
const VISUAL_OPACITY = { hero: 1, recede: 0.45, far: 0.14, incoming: 0, arrive: 0.32 };

type Profile = {
  /** Total scroll length of the pin. */
  distance: string;
  /** Reference card width (px) that the Spatial x/y fractions above scale against. */
  unit: number;
  /** Softens blur and travel distance on smaller screens. */
  intensity: number;
  finalSlots: Spatial[];
  /** Mobile only: hide each product's note/origin lines once the three-up forms, so a full caption never has to fit three-deep in a short stack. */
  trimFinalDetail?: boolean;
  /** Clearance from the fixed header above; mobile's stacked final composition needs a bit more. */
  topPad: string;
};

/**
 * One continuous, scroll-scrubbed timeline inside a single pinned
 * ScrollTrigger: Sencha is presented, recedes as Hōjicha takes focus,
 * Hōjicha recedes as Gyokuro takes focus, then all three settle into one
 * editorial arrangement. Every property animated is transform/opacity/blur,
 * and every step reverses exactly since it's all one scrubbed timeline —
 * there is no autoplay and no step that runs independently of scroll.
 *
 * With reduced motion no handler runs: the section stays in its default,
 * normal-flow layout — the same three-up arrangement the sequence ends on,
 * fully visible immediately, no pin.
 */
export function useCollectionAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () =>
        createSequence(section, {
          distance: "+=500%",
          unit: 260,
          intensity: 1,
          finalSlots: FINAL_SLOTS_DESKTOP,
          topPad: "8rem",
        }),
      );
      mm.add(COMPACT, () =>
        createSequence(section, {
          distance: "+=420%",
          unit: 160,
          intensity: 0.55,
          finalSlots: FINAL_SLOTS_COMPACT,
          trimFinalDetail: true,
          topPad: "10.5rem",
        }),
      );

      return () => mm.revert();
    },
    { scope },
  );
}

function spatial(role: Spatial, profile: Profile) {
  return {
    x: role.x * profile.unit,
    y: role.y * profile.unit,
    scale: role.scale,
    filter: `blur(${role.blur * profile.intensity}px)`,
  };
}

type Targets = { card: HTMLElement; visual: HTMLElement; caption: HTMLElement };

function createSequence(section: HTMLElement, profile: Profile) {
  const stage = section.querySelector<HTMLElement>("[data-collection-stage]");
  const products = TEAS.map((tea) => section.querySelector<HTMLElement>(`[data-collection-product="${tea.id}"]`));
  if (!stage || products.some((el) => !el)) return;

  const targets: Targets[] = products.map((product) => ({
    card: product!.querySelector<HTMLElement>("[data-product-card]")!,
    visual: product!.querySelector<HTMLElement>("[data-product-visual]")!,
    caption: product!.querySelector<HTMLElement>("[data-product-caption]")!,
  }));
  if (targets.some((t) => !t.card || !t.visual || !t.caption)) return;

  // Turn the normal-flow, all-visible default markup into a single
  // viewport-height stage with every product stacked in the same spot — a
  // one-time structural switch, not something to animate over time. The
  // stage's own py-*/gap-* classes are sized for the default row layout;
  // once its children go absolute they no longer contribute to its height,
  // so without resetting it here the stage collapses to just its padding.
  // `inset: 0` on an absolutely positioned child is measured from its
  // container's *border* box, not its padding box, so padding put on the
  // stage itself would never reach these products at all — it has to go on
  // each product directly, where its own `justify-center` does honour it,
  // to keep them clear of the fixed header above.
  section.style.height = "100svh";
  section.style.overflow = "hidden";
  stage.style.height = "100%";
  (products as HTMLElement[]).forEach((product) => {
    product.style.position = "absolute";
    product.style.inset = "0";
    product.style.paddingTop = profile.topPad;
    product.style.paddingBottom = "3rem";
  });

  gsap.set(targets[0].card, spatial(ARRIVE_START, profile));
  gsap.set(targets[0].visual, { opacity: VISUAL_OPACITY.arrive });
  gsap.set(targets[0].caption, { opacity: VISUAL_OPACITY.arrive });
  [1, 2].forEach((i) => {
    gsap.set(targets[i].card, spatial(INCOMING, profile));
    gsap.set(targets[i].visual, { opacity: 0 });
    gsap.set(targets[i].caption, { opacity: 0 });
  });

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

  const ARRIVE = 1.2;
  const HOLD_HERO = 1.8;
  const TRANSITION = 2.5;
  const HOLD_LAST = 0.8;
  const FORM_FINAL = 1.2;

  // Sencha is presented: a calm settle into place, then a hold so it can be
  // seen before anything else moves.
  tl.to(targets[0].card, { ...spatial(HERO, profile), duration: ARRIVE, ease: "power2.out" }, 0)
    .to(targets[0].visual, { opacity: VISUAL_OPACITY.hero, duration: ARRIVE, ease: "power2.out" }, 0)
    .to(targets[0].caption, { opacity: 1, duration: ARRIVE, ease: "power2.out" }, 0);

  let cursor = ARRIVE + HOLD_HERO;

  // Sencha → Hōjicha, then Hōjicha → Gyokuro: one recedes as the other
  // arrives, like a camera changing focus. The two captions never overlap —
  // the outgoing one clears early in the move, the incoming one only
  // appears once it is nearly settled — while the photos cross more slowly,
  // over the whole move, which reads as depth rather than a swap.
  cursor = addTransition(tl, targets[0], targets[1], RECEDE, cursor, TRANSITION, profile);
  cursor = addTransition(tl, targets[1], targets[2], RECEDE, cursor, TRANSITION, profile, [
    { target: targets[0], role: FAR },
  ]);
  cursor += HOLD_LAST;

  // The camera pulls back: all three settle into one editorial arrangement,
  // and whichever captions were hidden reappear together with it.
  targets.forEach((t, i) => {
    tl.to(t.card, { ...spatial(profile.finalSlots[i], profile), duration: FORM_FINAL }, cursor).to(
      t.visual,
      { opacity: 1, duration: FORM_FINAL },
      cursor,
    );
    if (i !== 2) tl.to(t.caption, { opacity: 1, duration: FORM_FINAL * 0.6, ease: "power1.out" }, cursor + FORM_FINAL * 0.4);
    if (profile.trimFinalDetail) {
      const detail = products[i]!.querySelectorAll<HTMLElement>("[data-product-detail]");
      tl.to(detail, { opacity: 0, duration: FORM_FINAL * 0.6 }, cursor);
    }
  });

  // Web fonts can shift layout after the first measurement.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/**
 * One camera-focus change: `out` steps back to `outRole` as `into` arrives
 * at hero. Any `also` entries move a third, already-receded product further
 * back in the same window (e.g. Sencha going RECEDE → FAR while Hōjicha
 * itself steps back and Gyokuro arrives). Returns the cursor just after it.
 */
function addTransition(
  tl: gsap.core.Timeline,
  out: Targets,
  into: Targets,
  outRole: Spatial,
  cursor: number,
  duration: number,
  profile: Profile,
  also: { target: Targets; role: Spatial }[] = [],
) {
  const outOpacity = outRole === FAR ? VISUAL_OPACITY.far : VISUAL_OPACITY.recede;

  tl.to(out.card, { ...spatial(outRole, profile), duration }, cursor)
    .to(out.visual, { opacity: outOpacity, duration }, cursor)
    .to(out.caption, { opacity: 0, duration: duration * 0.3, ease: "power1.in" }, cursor)
    .to(into.card, { ...spatial(HERO, profile), duration }, cursor)
    .to(into.visual, { opacity: VISUAL_OPACITY.hero, duration }, cursor)
    .to(into.caption, { opacity: 1, duration: duration * 0.3, ease: "power1.out" }, cursor + duration * 0.7);

  also.forEach(({ target, role }) => {
    const opacity = role === FAR ? VISUAL_OPACITY.far : VISUAL_OPACITY.recede;
    tl.to(target.card, { ...spatial(role, profile), duration }, cursor).to(target.visual, { opacity, duration }, cursor);
  });

  return cursor + duration;
}
