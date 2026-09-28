import { Collection } from "@/components/collection/collection";
import { Hero } from "@/components/hero/hero";
import { SiteHeader } from "@/components/layout/site-header";
import { Origins } from "@/components/origins/origins";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Origins />
        <Collection />
      </main>
    </>
  );
}
