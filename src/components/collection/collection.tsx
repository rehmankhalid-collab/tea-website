"use client";

import { useRef } from "react";

import { CollectionCopy } from "./collection-copy";
import { ProductCard, type Product } from "./product-card";
import { useCollectionAnimation } from "./use-collection-animation";

const PRODUCTS: Product[] = [
  {
    number: "No. 03",
    name: "Sencha",
    note: "Bright and grassy, the first flush of spring steamed within hours of picking.",
    weight: "60 g",
    sealColor: "#a6b86e",
  },
  {
    number: "No. 05",
    name: "Hōjicha",
    note: "Roasted over charcoal until sweet and toasty, gentle enough for evenings.",
    weight: "60 g",
    sealColor: "#c8a96e",
  },
  {
    number: "No. 07",
    name: "Gyokuro",
    note: "Shade-grown for three weeks before harvest — deep umami, quietly intense.",
    weight: "60 g",
    sealColor: "#5f7c45",
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
      className="relative bg-ink py-24 md:py-32 lg:py-40"
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
