"use client";

import { useRef } from "react";

import { TEAS } from "@/components/collection/collection-data";
import { ShopIntro } from "./shop-intro";
import { ShopProductCard } from "./shop-product-card";
import { useShopAnimation } from "./use-shop-animation";

/**
 * Section 7 — the payoff. Journal's ending already eases the page back
 * toward this section's dark palette, so this opens directly on `bg-ink`
 * with no seam of its own to build: the invitation ("Bring the ritual
 * home.") and the shop grid are one continuous section, the grid resolving
 * out of the same moment as the visitor keeps scrolling rather than
 * appearing as a separate, disconnected part of the page.
 */
export function Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  useShopAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="shop"
      data-shop
      aria-labelledby="shop-title"
      className="relative bg-ink"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-28 md:px-10 md:pt-36 md:pb-36">
        <ShopIntro />

        <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-20 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {TEAS.map((tea) => (
            <ShopProductCard key={tea.id} tea={tea} />
          ))}
        </div>
      </div>
    </section>
  );
}
