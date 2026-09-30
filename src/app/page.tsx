import { Collection } from "@/components/collection/collection";
import { Hero } from "@/components/hero/hero";
import { Journal } from "@/components/journal/journal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Origins } from "@/components/origins/origins";
import { Philosophy } from "@/components/philosophy/philosophy";
import { Ritual } from "@/components/ritual/ritual";
import { Shop } from "@/components/shop/shop";

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
        <Journal />
        <Shop />
      </main>
      <SiteFooter />
    </>
  );
}
