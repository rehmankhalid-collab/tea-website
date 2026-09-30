import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import { TeaLeaf } from "@/components/ui/tea-leaf";
import type { Story } from "./journal-data";

/**
 * One editorial story. `featured` only changes scale and a couple of text
 * sizes — the markup and animation targets are identical for every card, so
 * the layout's asymmetry comes from `journal.tsx`'s grid, not from three
 * different components.
 *
 * The scroll-reveal scale (`data-journal-image`, GSAP, 1.12 → 1, once) and
 * the hover zoom (the visual's own inner element, CSS `group-hover:scale`)
 * are deliberately two different elements: GSAP leaves a permanent inline
 * `transform` on whatever it animates, which would silently defeat a Tailwind
 * hover class on that same element from then on.
 */
export function JournalStory({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <Link
      href={story.href}
      // These article routes don't exist yet (see journal-data.ts), so
      // there's nothing for Next.js's default hover/viewport prefetch to
      // fetch — leaving it on just means a 404 on every load.
      prefetch={false}
      data-journal-story={story.id}
      className="group focus-visible:ring-gold/60 relative block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
    >
      <div
        className={`relative overflow-hidden bg-ink/5 ${featured ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        {/* The reveal curtain — collapsed (scale-y-0) by default, so a
            visitor with no JS or reduced motion never sees it; GSAP raises
            it to cover the frame only when it's about to animate it away. */}
        <div
          data-journal-curtain
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 scale-y-0 bg-cream"
          style={{ transformOrigin: "50% 0%" }}
        />
        <div data-journal-image className="absolute inset-0">
          <StoryVisual story={story} />
        </div>
      </div>

      <div
        data-journal-caption
        className={`flex flex-col ${featured ? "mt-7 gap-3 sm:mt-8" : "mt-5 gap-2.5"}`}
      >
        <p className="flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.25em] text-moss uppercase">
          <span aria-hidden="true" className="text-stone/70">
            {story.number}
          </span>
          <span aria-hidden="true" className="h-px w-5 bg-moss/40" />
          {story.category}
        </p>
        <h3
          className={`font-display tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 ${
            featured
              ? "text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1]"
              : "text-2xl leading-[1.15] sm:text-[1.75rem]"
          }`}
        >
          {story.title}
        </h3>
        <p className={`text-ink/60 ${featured ? "max-w-md text-base leading-relaxed" : "text-sm leading-relaxed"}`}>
          {story.description}
        </p>
        <span className="mt-1 inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-ink uppercase">
          Read story
          <ArrowIcon className="size-3 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function StoryVisual({ story }: { story: Story }) {
  const { visual } = story;

  // `alt=""` throughout: every visual sits inside a single link whose
  // heading already states the story's title as visible text right below
  // it, so a repeated alt would just have a screen reader announce that
  // same title twice for one link.
  if (visual.kind === "photo") {
    return (
      <Image
        src={visual.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        placeholder="blur"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }

  if (visual.kind === "product") {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#3a2c1f,#1c130c_85%)]">
        <Image
          src={visual.src}
          alt=""
          placeholder="blur"
          className="absolute inset-0 m-auto h-[72%] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_75%_65%_at_50%_35%,#3c4d33,#16211a_82%)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    >
      <TeaLeaf className="w-1/3 text-cream/[0.08]" />
    </div>
  );
}
