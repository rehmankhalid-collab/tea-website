"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { ArrowIcon } from "@/components/ui/arrow-icon";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

/**
 * A slide-out cart, the same weight as the header's own mobile menu panel
 * (full-screen scrim on mobile, a fixed side panel from `sm` up). There's no
 * payment backend yet, so "Checkout" doesn't navigate anywhere — it swaps in
 * a quiet inline note instead of pretending to process an order.
 */
export function CartDrawer() {
  const { lines, subtotal, isOpen, close, removeItem, setQuantity } = useCart();
  const lenis = useLenis();
  const [checkoutRequested, setCheckoutRequested] = useState(false);

  // Every path that closes the drawer clears the checkout note through here,
  // rather than resetting it from an effect keyed on `isOpen` turning true.
  const handleClose = useCallback(() => {
    setCheckoutRequested(false);
    close();
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const instance = lenis.current;
    instance?.stop();
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.style.overflow = "";
      instance?.start();
    };
  }, [isOpen, handleClose, lenis]);

  return (
    <div
      id="cart-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Cart"
      hidden={!isOpen}
      className="fixed inset-0 z-[60]"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={handleClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink text-cream shadow-2xl sm:border-l sm:border-cream/10">
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-6">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button
            type="button"
            onClick={handleClose}
            className="focus-visible:ring-gold/60 flex size-9 items-center justify-center rounded-full border border-cream/20 outline-none focus-visible:ring-2"
          >
            <span className="sr-only">Close cart</span>
            <span aria-hidden="true" className="relative block size-3.5">
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-cream/60">Your cart is empty.</p>
            <a
              href="#shop"
              onClick={handleClose}
              className="focus-visible:ring-gold/60 inline-flex items-center gap-2.5 text-sm font-medium text-cream outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              Browse the collection
              <ArrowIcon className="size-3.5" />
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-cream/10 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.tea.id} className="flex gap-4 py-6">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-cream/5">
                    <Image
                      src={line.tea.image}
                      alt=""
                      fill
                      sizes="4rem"
                      placeholder="blur"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-lg leading-tight">{line.tea.name}</p>
                      <p className="text-sm text-cream/80">{formatPrice(line.tea.price)}</p>
                    </div>
                    <p className="mt-1 text-xs text-cream/50">{line.tea.weight}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-cream/20 px-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.tea.id, line.quantity - 1)}
                          className="focus-visible:ring-gold/60 flex size-6 items-center justify-center rounded-full text-sm outline-none focus-visible:ring-2"
                          aria-label={`Decrease quantity of ${line.tea.name}`}
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm tabular-nums">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.tea.id, line.quantity + 1)}
                          className="focus-visible:ring-gold/60 flex size-6 items-center justify-center rounded-full text-sm outline-none focus-visible:ring-2"
                          aria-label={`Increase quantity of ${line.tea.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.tea.id)}
                        className="focus-visible:ring-gold/60 text-xs tracking-[0.1em] text-cream/50 uppercase outline-none hover:text-cream focus-visible:ring-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-cream/10 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-cream/60">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-cream/40">Shipping and taxes calculated at checkout.</p>

              {checkoutRequested ? (
                <p className="mt-4 rounded-sm border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-cream/80">
                  Online checkout is coming soon. In the meantime, write to{" "}
                  <a href="mailto:hello@veyla.tea" className="underline underline-offset-2">
                    hello@veyla.tea
                  </a>{" "}
                  to place an order.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setCheckoutRequested(true)}
                  className="focus-visible:ring-gold/60 mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                >
                  Checkout
                  <ArrowIcon className="size-3.5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
