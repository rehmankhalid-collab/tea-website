/**
 * Static atmosphere for the philosophy section — deliberately the quietest
 * background on the site. Returns to the brand's core deep, almost-black
 * green (the same `bg-ink` used by Hero/Origins/Collection) after Ritual's
 * warm brown interlude, rather than introducing a new colour. No photograph
 * exists for "mist" or "tea leaves" yet, so the one piece of "tea leaf
 * imagery" the brief asks for is an oversized, barely-there leaf silhouette
 * — the same restrained "watermark" trick the hero uses for its own giant
 * wordmark, just a shape instead of a word, so it reads as texture rather
 * than a logo repeated twice on the page.
 */
import { TeaLeaf } from "@/components/ui/tea-leaf";

export function PhilosophyBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        data-philosophy-atmosphere
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(52,72,44,0.35),transparent_70%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_82%_78%,rgba(239,232,216,0.05),transparent_65%)]" />

      {/* Opacity on the wrapper, not a `text-color/alpha` class on the mark
          itself — the leaf's decorative veins are drawn with a hardcoded
          stroke colour and don't run through `currentColor`, so fading only
          the fill would leave them just as visible as at full strength. */}
      <div className="absolute top-1/2 right-[-14vw] w-[62vw] -translate-y-1/2 rotate-[18deg] opacity-[0.05] blur-[6px]">
        <TeaLeaf className="w-full text-leaf" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.6))]" />
      <div className="bg-grain absolute inset-0 opacity-[0.045] mix-blend-overlay" />

      {/* A soft warmth waiting at the foot of the section — held at zero
          until the very end of the timeline, where it eases in just enough
          to suggest the page is about to open into somewhere lighter
          (Journal, not yet built) rather than staying sealed in this
          section's own dark, contemplative register. */}
      <div
        data-philosophy-dawn
        className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_90%_100%_at_50%_100%,rgba(200,169,110,0.16),transparent_65%)] opacity-0"
      />
    </div>
  );
}
