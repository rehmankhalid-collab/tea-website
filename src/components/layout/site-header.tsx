"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCart } from "@/components/providers/cart-provider";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { CartIcon } from "@/components/ui/cart-icon";
import { Logo } from "@/components/ui/logo";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

// Hero creates its own pinned ScrollTrigger ~3.6s after mount, shifting
// everything below it down the page — see the same note in every section's
// animation hook. Lower priority re-measures this trigger's position after
// that settles.
const REFRESH_AFTER_HERO = -1;

const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#rituals", label: "Rituals" },
  { href: "#origins", label: "Origins" },
  { href: "#journal", label: "Journal" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const cart = useCart();

  // Every section so far has been dark, so a transparent header with cream
  // text has always had enough contrast. A section can opt into a light
  // background by marking itself `data-header-theme="light"` (see
  // `journal.tsx`); once one scrolls under the fixed header, this switches
  // the header itself to a dark-on-cream scrim for exactly the span it
  // overlaps, then back once it's past. No effect on any section that
  // doesn't set the attribute.
  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;
    const lightSections = document.querySelectorAll<HTMLElement>('[data-header-theme="light"]');
    if (!lightSections.length) return;

    const triggers = Array.from(lightSections).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: () => `top ${header.offsetHeight}`,
        end: () => `bottom ${header.offsetHeight}`,
        refreshPriority: REFRESH_AFTER_HERO,
        onEnter: () => setOnLight(true),
        onEnterBack: () => setOnLight(true),
        onLeave: () => setOnLight(false),
        onLeaveBack: () => setOnLight(false),
      }),
    );

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  // Lock scrolling and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const instance = lenis.current;
    instance?.stop();
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.style.overflow = "";
      instance?.start();
    };
  }, [menuOpen, lenis]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      data-site-header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        onLight
          ? "bg-cream/90 text-ink shadow-[0_1px_0_0_rgba(26,26,26,0.08)] backdrop-blur-md"
          : "text-cream"
      }`}
    >
      {/* Mobile / tablet menu panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 bg-ink/97 backdrop-blur-sm lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-between px-6 pt-32 pb-10 md:px-10"
        >
          <ul className="space-y-2">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="border-b border-cream/10">
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-baseline justify-between py-5 font-display text-5xl tracking-tight md:text-6xl"
                >
                  {link.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-stone">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#shop"
            onClick={closeMenu}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-medium text-ink"
          >
            Shop the collection
            <ArrowIcon className="size-4" />
          </a>
        </nav>
      </div>

      <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:h-24 md:px-10">
        <Logo />

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[0.7rem] font-medium uppercase tracking-[0.24em] transition-colors ${
                    onLight
                      ? "text-ink/60 hover:text-ink focus-visible:text-ink"
                      : "text-cream/70 hover:text-cream focus-visible:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#shop"
            className={`hidden items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors sm:inline-flex ${
              onLight
                ? "border-ink/25 hover:border-ink hover:bg-ink hover:text-cream"
                : "border-cream/25 hover:border-cream hover:bg-cream hover:text-ink"
            }`}
          >
            Shop tea
            <ArrowIcon className="size-3.5" />
          </a>

          <button
            type="button"
            onClick={cart.open}
            className={`relative flex size-11 items-center justify-center rounded-full border ${
              onLight ? "border-ink/25" : "border-cream/25"
            }`}
          >
            <span className="sr-only">Open cart{cart.count > 0 ? ` (${cart.count} items)` : ""}</span>
            <CartIcon className="size-4" />
            {cart.count > 0 && (
              <span
                aria-hidden="true"
                className="bg-gold text-ink absolute -top-1 -right-1 flex size-[1.15rem] items-center justify-center rounded-full text-[0.6rem] font-medium"
              >
                {cart.count}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={`relative flex size-11 items-center justify-center rounded-full border lg:hidden ${
              onLight ? "border-ink/25" : "border-cream/25"
            }`}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden="true"
              className={`absolute h-px w-4 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-4 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </div>

      <CartDrawer />
    </header>
  );
}
