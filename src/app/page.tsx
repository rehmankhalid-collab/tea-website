import { Collection } from "@/components/collection/collection";
import { Hero } from "@/components/hero/hero";
import { SiteHeader } from "@/components/layout/site-header";
import { Origins } from "@/components/origins/origins";
import { Philosophy } from "@/components/philosophy/philosophy";
import { Ritual } from "@/components/ritual/ritual";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Origins />
        <Collection />
        <Ritual />
        <Philosophy />
      </main>
    </>
  );
}
