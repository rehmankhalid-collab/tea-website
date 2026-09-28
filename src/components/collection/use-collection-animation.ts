"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { onLayoutSettled } from "@/lib/layout-ready";

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
    (_context, contextSafe) => {
      const section = scope.current;
      if (!section || !contextSafe) return;

      const q = gsap.utils.selector(section);

      // Unlike the other reveals in this section (fades/masks, whose
      // un-animated state already IS the fully visible one), the curtain's
      // resting position covers the box — so reduced motion must explicitly
      // clear it away, not just skip the animation.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(q("[data-collection-curtain]"), { autoAlpha: 0 });
        return;
      }

      // Wait until the hero's own late-created pin (if any) has settled the
      // page's final scroll layout before this — a one-shot trigger — is
      // even created. See lib/layout-ready.ts: firing early against the
      // shorter, pre-pin layout would play this out, and self-destruct,
      // while the section is still far off-screen. The returned unsubscribe
      // drops the callback if this component unmounts first.
      const unsubscribe = onLayoutSettled(contextSafe(() => createReveal(section)));

      // Unlike Hero and Origins, this section's copy has no scroll-driven
      // exit of its own -- it is normal document flow. As a visitor scrolls
      // past it toward the bottom of the page it would otherwise still be
      // fully opaque while it briefly passes behind the transparent fixed
      // header, the same way any static heading would. This scrub fades it
      // out just before that happens (mirroring the hero's compact-mode
      // copy fade) and back in if scrolled back up to.
      gsap.to(q("[data-collection-copy]"), {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: q("[data-collection-copy]")[0],
          start: "top 12%",
          end: "bottom 8%",
          scrub: true,
        },
      });

      return unsubscribe;
    },
    { scope },
  );
}

function createReveal(section: HTMLElement) {
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
}
