import Link from "next/link";

import { Logo } from "@/components/ui/logo";

const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#rituals", label: "Rituals" },
  { href: "#origins", label: "Origins" },
  { href: "#journal", label: "Journal" },
  { href: "#shop", label: "Shop" },
] as const;

// These pages don't exist yet — same placeholder-route convention as
// Journal's article links (prefetch off so there's nothing to 404 on).
const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              Single-estate teas from high-altitude gardens, shade-grown and
              hand-picked at first light.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-10 gap-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-visible:ring-gold/60 text-[0.7rem] font-medium tracking-[0.2em] text-cream/70 uppercase outline-none transition-colors hover:text-cream focus-visible:text-cream focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-sm text-cream/60">
            <p>
              <a
                href="mailto:hello@veyla.tea"
                className="focus-visible:ring-gold/60 outline-none hover:text-cream focus-visible:text-cream focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                hello@veyla.tea
              </a>
            </p>
            <p className="mt-2">Kyoto, Japan</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veyla. All rights reserved.</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="focus-visible:ring-gold/60 outline-none hover:text-cream/70 focus-visible:text-cream/70 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
