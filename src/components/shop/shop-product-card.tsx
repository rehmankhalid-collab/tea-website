"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { CollectionTea } from "@/components/collection/collection-data";
import { useCart } from "@/components/providers/cart-provider";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export function ShopProductCard({ tea }: { tea: CollectionTea }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Clear the "Added" state a moment after it appears rather than leaving it
  // stuck once a visitor moves on to add a different tea.
  useEffect(() => {
    if (!justAdded) return;
    const timeout = window.setTimeout(() => setJustAdded(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [justAdded]);

  return (
    <article data-shop-product={tea.id} className="flex flex-col items-center text-center">
      <div data-shop-product-image className="relative w-full">
        <div
          aria-hidden="true"
          className="absolute top-[8%] left-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_32%_28%,#2c3d2e,transparent_72%)] opacity-50 blur-2xl"
        />
        <div className="relative mx-auto w-full max-w-[11rem]">
          <Image
            src={tea.image}
            alt={`A Veyla tin of ${tea.name} tea`}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 15rem, 40vw"
            placeholder="blur"
          />
        </div>
      </div>

      <div data-shop-product-caption className="mt-8 flex flex-1 flex-col items-center">
        {tea.signature && (
          <span className="mb-3 rounded-full border border-cream/25 px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-stone uppercase">
            Signature
          </span>
        )}
        <h3 className="font-display text-3xl tracking-tight text-cream">{tea.name}</h3>
        <p className="mt-2 text-[0.65rem] tracking-[0.25em] text-matcha uppercase">{tea.tags}</p>
        <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-cream/65">{tea.note}</p>
        <p className="mt-3 text-[0.65rem] tracking-[0.2em] text-stone uppercase">
          {tea.origin} · {tea.weight}
        </p>
        <p className="mt-5 font-display text-2xl text-cream">{formatPrice(tea.price)}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border border-cream/20 px-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="focus-visible:ring-gold/60 flex size-8 items-center justify-center rounded-full text-base outline-none focus-visible:ring-2"
              aria-label={`Decrease quantity of ${tea.name}`}
            >
              −
            </button>
            <span className="w-4 text-center text-sm tabular-nums text-cream">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="focus-visible:ring-gold/60 flex size-8 items-center justify-center rounded-full text-base outline-none focus-visible:ring-2"
              aria-label={`Increase quantity of ${tea.name}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addItem(tea.id, quantity);
              setQuantity(1);
              setJustAdded(true);
            }}
            className="focus-visible:ring-gold/60 inline-flex items-center justify-center rounded-full bg-cream px-6 py-2.5 text-[0.7rem] font-medium tracking-[0.15em] text-ink uppercase outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
          >
            {justAdded ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
