"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TEAS } from "@/components/collection/collection-data";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Hero creates its own pinned ScrollTrigger ~3.6s after mount, shifting
// everything below it down the page — see the same note in every other
// section's animation hook.
const REFRESH_AFTER_HERO = -1;

/**
 * Section 7: like Journal, this is normal document flow rather than a
 * pinned scene — the invitation heading settles first, then the three
 * products fade up with a short stagger as they enter. No pin, no scrub;
 * this is meant to feel lighter than Collection or Ritual, the same way
 * Journal does.
 */
export function useShopAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;

      const intro = section.querySelector<HTMLElement>("[data-shop-intro]");
      const productEls = TEAS.map((tea) =>
        section.querySelector<HTMLElement>(`[data-shop-product="${tea.id}"]`),
      );
      if (!intro || productEls.some((el) => !el)) return;

      gsap.set(intro, { opacity: 0, y: 26 });
      gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: "top 85%",
          toggleActions: "play none none reverse",
          refreshPriority: REFRESH_AFTER_HERO,
        },
      }).to(intro, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });

      productEls.forEach((productEl, index) => {
        const image = productEl!.querySelector<HTMLElement>("[data-shop-product-image]");
        const caption = productEl!.querySelector<HTMLElement>("[data-shop-product-caption]");
        if (!image || !caption) return;

        gsap.set(image, { opacity: 0, y: 24, scale: 0.96 });
        gsap.set(caption, { opacity: 0, y: 16 });

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: productEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
              refreshPriority: REFRESH_AFTER_HERO,
            },
          })
          .to(image, { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.1 }, 0)
          .to(caption, { opacity: 1, y: 0, duration: 0.6, delay: index * 0.1 }, 0.15);
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope },
  );
}
