import Link from "next/link";

import { ArrowIcon } from "@/components/ui/arrow-icon";

/** An understated close — an editorial nav line, not a button, per the
 * brief's "invited rather than pushed." */
export function JournalCta() {
  return (
    <div data-journal-cta className="flex flex-col items-start gap-3 border-t border-ink/10 pt-10">
      <p className="text-sm text-ink/50 italic">Continue exploring.</p>
      <Link
        href="/journal"
        prefetch={false}
        className="group focus-visible:ring-gold/60 inline-flex items-center gap-2.5 rounded-sm text-sm font-medium tracking-[0.04em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
      >
        Explore the Journal
        <ArrowIcon className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
