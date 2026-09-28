"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Logo } from "@/components/ui/logo";

const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#rituals", label: "Rituals" },
  { href: "#origins", label: "Origins" },
  { href: "#journal", label: "Journal" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

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
    <header data-site-header className="fixed inset-x-0 top-0 z-50 text-cream">
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
            href="#collection"
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
                  className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-cream/70 transition-colors hover:text-cream focus-visible:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#collection"
            className="hidden items-center gap-2.5 rounded-full border border-cream/25 px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:inline-flex"
          >
            Shop tea
            <ArrowIcon className="size-3.5" />
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex size-11 items-center justify-center rounded-full border border-cream/25 lg:hidden"
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
    </header>
  );
}
