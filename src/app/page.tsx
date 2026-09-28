import { Hero } from "@/components/hero/hero";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        {/* Next section goes here — the hero's scroll sequence hands off to it. */}
      </main>
    </>
  );
}
