/** Layered, static backdrop for the hero. Each layer is a future GSAP target. */
export function HeroBackground() {
  return (
    <div
      data-hero-background
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Soft light pooling behind the product */}
      <div
        data-hero-glow
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_72%_48%,rgba(166,184,110,0.16),transparent_70%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_120%,rgba(200,169,110,0.10),transparent_60%)]" />

      {/* Editorial column guides */}
      <div className="absolute inset-0 mx-auto hidden max-w-[1440px] grid-cols-4 px-10 md:grid">
        {Array.from({ length: 4 }, (_, index) => (
          <span
            key={index}
            data-hero-guide
            className="border-l border-cream/[0.05] last:border-r"
          />
        ))}
      </div>

      {/* Oversized watermark word */}
      <p
        data-hero-watermark
        className="absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 font-display text-[34vw] leading-none tracking-tighter whitespace-nowrap text-cream/[0.025] select-none"
      >
        Veyla
      </p>

      {/* Vignette + film grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55))]" />
      <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
