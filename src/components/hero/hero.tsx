import { HeroBackground } from "./hero-background";
import {
  HeroActions,
  HeroDescription,
  HeroEyebrow,
  HeroHeadline,
} from "./hero-copy";
import { HeroDetails } from "./hero-details";
import { HeroLeaves } from "./hero-leaves";
import { HeroProduct } from "./hero-product";
import { HeroScene } from "./hero-scene";

/**
 * Full-screen hero. Every layer carries a `data-hero-*` attribute that the
 * GSAP timelines in `use-hero-animation.ts` target.
 */
export function Hero() {
  return (
    <HeroScene>
      <HeroBackground />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 pt-32 pb-32 md:px-10 lg:grid-cols-12 lg:gap-6 lg:pt-28 lg:pb-28">
        <div
          data-hero-content
          className="relative z-10 flex flex-col gap-8 lg:col-span-7 md:gap-10"
        >
          <HeroEyebrow />
          <HeroHeadline />
          <HeroDescription />
          <HeroActions />
        </div>

        <div data-hero-visual className="relative lg:col-span-5">
          <HeroProduct />
        </div>
      </div>

      <HeroLeaves />
      <HeroDetails />

      {/* Fades the hero into the next section at the end of the scroll sequence */}
      <div
        data-hero-fade
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5 bg-linear-to-t from-ink to-transparent opacity-0"
      />
    </HeroScene>
  );
}
