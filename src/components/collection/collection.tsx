"use client";

import { useRef } from "react";

import gyokuroTin from "../../../public/images/products/veyla-tin-gyokuro.png";
import hojichaTin from "../../../public/images/products/veyla-tin-hojicha.png";
import senchaTin from "../../../public/images/products/veyla-tin-sencha.png";
import { CollectionCopy } from "./collection-copy";
import { ProductCard, type Product } from "./product-card";
import { useCollectionAnimation } from "./use-collection-animation";

const PRODUCTS: Product[] = [
  {
    number: "No. 03",
    name: "Sencha",
    note: "Bright and grassy, the first flush of spring steamed within hours of picking.",
    weight: "50 g",
    image: senchaTin,
  },
  {
    number: "No. 05",
    name: "Hōjicha",
    note: "Roasted over charcoal until sweet and toasty, gentle enough for evenings.",
    weight: "50 g",
    image: hojichaTin,
  },
  {
    number: "No. 07",
    name: "Gyokuro",
    note: "Shade-grown for three weeks before harvest — deep umami, quietly intense.",
    weight: "50 g",
    image: gyokuroTin,
    signature: true,
  },
];

/** Section 3: the products, as a small numbered collection rather than a shop grid. */
export function Collection() {
  const sectionRef = useRef<HTMLElement>(null);
  useCollectionAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="collection"
      data-collection
      aria-labelledby="collection-title"
      // Collection is the last section on the page, so scrolling to the
      // absolute bottom stops the instant its own bottom edge hits the
      // viewport bottom — at that point its top sits exactly
      // `sectionHeight - viewportHeight` above the viewport. Unless that gap
      // is bigger than the distance from the section's top down past its own
      // eyebrow and headline, those are still on screen, under the header,
      // once scrolling maxes out. Tying the minimum height to the viewport
      // (100svh plus a fixed margin comfortably larger than the eyebrow and
      // headline together) keeps that gap large enough regardless of
      // viewport height. Any shortfall vs. the product grid's own height
      // just shows as extra (on-brand, bg-ink) space at the very end of the
      // page, rather than as padding to visually balance against the top.
      className="relative min-h-[calc(100svh+30rem)] bg-ink py-24 md:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      <div className="relative">
        <CollectionCopy />

        <div className="mx-auto mt-20 grid max-w-[1440px] grid-cols-1 gap-16 px-6 sm:grid-cols-2 md:px-10 lg:mt-28 lg:grid-cols-3 lg:gap-12">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.number} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
