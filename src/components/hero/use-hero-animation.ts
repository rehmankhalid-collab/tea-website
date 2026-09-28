"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const COMPACT = "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Hero motion in two stages:
 * 1. A one-off entrance timeline on load.
 * 2. Once it completes, scrubbed ScrollTrigger scenes (desktop / compact).
 *
 * The entrance and scroll stages animate different transform components on
 * each element (e.g. `y` vs `yPercent`, `scale` vs `rotation`), so the scroll
 * scene never fights the values the entrance left behind.
 *
 * Note: GSAP folds Tailwind's `-translate-*-1/2` centring into its own
 * xPercent/yPercent, so never animate those on centred elements — use x/y.
 */
export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    (_context, contextSafe) => {
      const section = scope.current;
      if (!section || !contextSafe) return;

      const reveal = () => gsap.set(section, { visibility: "visible" });

      if (window.matchMedia(REDUCED_MOTION).matches) {
        reveal();
        return;
      }

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const intro = createIntro(section, isDesktop ? 1 : 0.6);

      // contextSafe keeps the ScrollTriggers created later inside this
      // useGSAP context, so they are reverted on unmount.
      intro.eventCallback(
        "onComplete",
        contextSafe(() => createScrollScenes(section)),
      );

      // The from() tweens have already applied their start states.
      reveal();
    },
    { scope },
  );
}

function createIntro(section: HTMLElement, distance: number) {
  const q = gsap.utils.selector(section);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Atmosphere
  tl.from(q("[data-hero-background]"), { autoAlpha: 0, duration: 1.8, ease: "sine.inOut" }, 0)
    .from(q("[data-hero-guide]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 1.8, stagger: 0.12, ease: "expo.inOut" }, 0.2)
    .from(q("[data-hero-glow]"), { autoAlpha: 0, duration: 2.6, ease: "sine.inOut" }, 0.3)
    .from(q("[data-hero-watermark]"), { autoAlpha: 0, y: 60 * distance, duration: 2.4, ease: "power2.out" }, 1);

  // Copy
  tl.from(q("[data-hero-eyebrow]"), { autoAlpha: 0, x: -24 * distance, duration: 1.4 }, 0.5)
    .from(q("[data-hero-line]"), { yPercent: 115, duration: 1.8, stagger: 0.16, ease: "expo.out" }, 0.65)
    .from(q("[data-hero-description]"), { autoAlpha: 0, y: 28 * distance, duration: 1.6 }, 1.45)
    .from(q("[data-hero-cta], [data-hero-cta-secondary]"), { autoAlpha: 0, y: 22 * distance, duration: 1.4, stagger: 0.14 }, 1.7);

  // Product
  tl.from(q("[data-hero-product]"), { autoAlpha: 0, scale: 0.9, y: 80 * distance, duration: 2.6, ease: "expo.out" }, 0.55)
    .from(q("[data-hero-disc]"), { scale: 0.86, duration: 2.6, ease: "expo.out" }, 0.55)
    .from(q("[data-hero-orbit]"), { autoAlpha: 0, scale: 0.94, duration: 2.4, ease: "power2.out" }, 0.9)
    .from(q("[data-hero-tin]"), { y: 36 * distance, duration: 2.4, ease: "expo.out" }, 0.75)
    .from(q("[data-hero-cup]"), { autoAlpha: 0, x: -28 * distance, y: 18 * distance, duration: 2.2, ease: "expo.out" }, 1.15)
    .from(q("[data-hero-steam]"), { autoAlpha: 0, y: 16, duration: 2, ease: "sine.out" }, 1.8)
    .from(q("[data-hero-note]"), { autoAlpha: 0, x: 20, duration: 1.4 }, 2);

  // Leaves drift in, each with its own path and timing.
  q("[data-hero-leaf-inner]").forEach((leaf, i) => {
    const dir = i % 2 ? -1 : 1;
    tl.from(
      leaf,
      {
        autoAlpha: 0,
        x: ((i % 3) - 1) * 16 * distance,
        y: dir * (40 + i * 10) * distance,
        rotation: -dir * (14 + i * 4),
        duration: 1.9 + (i % 3) * 0.25,
        ease: "power2.out",
      },
      0.8 + i * 0.08,
    );
  });

  tl.from(q("[data-hero-details]"), { autoAlpha: 0, y: 12, duration: 1.4, ease: "power2.out" }, 2.1);

  return tl;
}

function createScrollScenes(section: HTMLElement) {
  const q = gsap.utils.selector(section);
  const leaves = gsap.utils.toArray<HTMLElement>("[data-hero-leaf]", section);
  const visual = section.querySelector<HTMLElement>("[data-hero-visual]");
  const grid = visual?.parentElement;
  if (!visual || !grid) return;

  const mm = gsap.matchMedia();

  // Desktop: pinned, ~1.5 viewports of scroll. The copy clears the stage,
  // the product glides to centre and grows, and leaves parallax by depth.
  mm.add(DESKTOP, () => {
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Copy exits first
    tl.to(q("[data-hero-headline]"), { yPercent: -10, autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0)
      .to(q("[data-hero-content]"), { y: -50, autoAlpha: 0, duration: 0.4, ease: "power1.in" }, 0.04)
      .to(q("[data-hero-details]"), { y: 16, autoAlpha: 0, duration: 0.2 }, 0);

    // Product takes centre stage. offsetLeft ignores transforms, so the
    // distance stays correct when re-measured on refresh.
    tl.to(
      visual,
      {
        x: () => grid.clientWidth / 2 - (visual.offsetLeft + visual.offsetWidth / 2),
        y: () => -window.innerHeight * 0.03,
        scale: 1.16,
        duration: 1,
        ease: "power2.inOut",
      },
      0,
    )
      .to(q("[data-hero-tin]"), { yPercent: -4, duration: 1, ease: "sine.inOut" }, 0)
      .to(q("[data-hero-cup]"), { xPercent: -10, yPercent: 4, duration: 1, ease: "sine.inOut" }, 0)
      .to(q("[data-hero-steam]"), { yPercent: -18, scaleY: 1.15, transformOrigin: "50% 100%", duration: 1 }, 0)
      .to(q("[data-hero-disc]"), { y: -14, duration: 1 }, 0)
      .to(q("[data-hero-orbit]"), { rotation: 28, duration: 1 }, 0);

    // Atmosphere
    tl.to(q("[data-hero-glow]"), { xPercent: -14, yPercent: -4, scale: 1.25, duration: 1, ease: "sine.inOut" }, 0)
      .to(q("[data-hero-watermark]"), { yPercent: -12, duration: 1 }, 0);

    leaves.forEach((leaf, i) => {
      const depth = Number(leaf.dataset.depth ?? 0.5);
      tl.to(leaf, { y: -depth * 360, rotation: (i % 2 ? -1 : 1) * depth * 24, duration: 1 }, 0);
    });

    // Hand-off: settle into the page colour for the next section.
    tl.to(q("[data-hero-fade]"), { autoAlpha: 0.85, duration: 0.35 }, 0.65);
  });

  // Phones / tablets: the hero is stacked and taller than the viewport, so
  // it scrolls naturally until the product is in view, then pins briefly.
  // Smaller moves, lighter parallax, and fewer layers in motion.
  mm.add(COMPACT, () => {
    // The copy scrolls naturally here; fade it as it nears the top so it
    // never collides with the transparent header.
    gsap.to(q("[data-hero-content]"), {
      y: -30,
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: q("[data-hero-content]")[0],
        start: "top 12%",
        end: "bottom 8%",
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: "+=55%",
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    tl.to(q("[data-hero-details]"), { autoAlpha: 0, duration: 0.25 }, 0)
      .to(visual, { y: () => -window.innerHeight * 0.08, scale: 1.08, duration: 1, ease: "power1.inOut" }, 0)
      .to(q("[data-hero-orbit]"), { rotation: 12, duration: 1 }, 0)
      .to(q("[data-hero-glow]"), { scale: 1.12, duration: 1 }, 0);

    leaves.forEach((leaf) => {
      const depth = Number(leaf.dataset.depth ?? 0.5);
      tl.to(leaf, { y: -depth * 120, duration: 1 }, 0);
    });

    tl.to(q("[data-hero-fade]"), { autoAlpha: 0.85, duration: 0.4 }, 0.6);
  });

  // Web fonts can shift layout after the first measurement.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
