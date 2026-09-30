/**
 * Static, always-on atmosphere — no GSAP targets. Section 4 is meant to feel
 * warmer and more intimate than Collection's clean product-plate lighting, so
 * this trades that section's cool green-only glow for a warm ivory/amber
 * wash over a warm charcoal-brown ground (set on the section itself), still
 * restrained: three soft radial washes and a vignette, the same recipe as
 * every other section's background, just a different temperature.
 */
export function RitualBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_50%_at_50%_38%,rgba(239,232,216,0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_88%,rgba(200,169,110,0.10),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_46%_at_50%_58%,rgba(95,124,69,0.08),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(8,5,3,0.6))]" />
      <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}
