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

/**
 * Full-screen hero. Every layer carries a `data-hero-*` attribute so future
 * GSAP timelines can target them without restructuring the markup.
 */
export function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh overflow-hidden"
    >
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

        <div className="relative lg:col-span-5">
          <HeroProduct />
        </div>
      </div>

      <HeroLeaves />
      <HeroDetails />
    </section>
  );
}
