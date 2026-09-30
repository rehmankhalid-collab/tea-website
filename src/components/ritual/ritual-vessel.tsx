/**
 * The section's one vessel — a chawan-style tea bowl, built as a single
 * persistent instance shared across the water/steep/moment beats of the
 * story (never swapped for a different asset, per the brief's "no sudden
 * asset replacement"). The bowl silhouette and rim/liquid geometry reuse the
 * hero's own proven cup path (`hero-product.tsx`) at a larger scale — its
 * particular arc keeps the bowl's glaze fill from painting over the rim
 * opening, which a straightforward hand-drawn path did not.
 *
 * Everything that changes over the course of the ritual — the pour, the
 * infusion's colour, the steam — is a layer within this one component, each
 * independently addressable by `use-ritual-animation`:
 *
 * - `data-ritual-water` / `data-ritual-ripple`: the pour (phase 2).
 * - `data-ritual-liquid="0..3"`: four stacked, identically-shaped fills —
 *   clear, pale, mid-infusion and full colour — cross-faded by opacity
 *   rather than tweening a single fill colour directly, so the whole scene
 *   stays on the same transform/opacity vocabulary as everything else on
 *   this site (phase 3).
 * - `data-ritual-steam`: two soft wisps (phase 3 → 4).
 *
 * Rendered here already in its finished state — full colour, steam settled,
 * pour long done — which doubles as the "final tea ritual composition" the
 * brief asks reduced-motion users to see; the animation hook resets these
 * same layers to their starting opacities only once motion is allowed.
 */
export function RitualVessel() {
  return (
    <div
      data-ritual-vessel
      aria-hidden="true"
      className="relative mx-auto aspect-[240/172] w-full max-w-[26rem] sm:max-w-[30rem]"
    >
      {/* Wood tray shadow — grounds the bowl and carries the "dark wood"
          note from the brief without needing an actual tray illustration. */}
      <div
        aria-hidden="true"
        className="absolute top-[80%] left-1/2 h-[18%] w-[56%] -translate-x-1/2 rounded-[50%] bg-[#1c130c]/70 blur-2xl"
      />

      {/* The pour: a thin, controlled stream rather than any kind of
          waterfall, revealed top-down via scaleY so it reads as water
          arriving, not a shape fading in. Hidden at rest — the pour is long
          finished by the time this is the static/reduced-motion view.
          Positioned with plain left/top percentages rather than Tailwind's
          -translate-1/2 centring — GSAP can't tell that kind of translate
          apart from a fixed pixel offset once it takes the transform over
          (see the note in use-hero-animation.ts), so centring and animated
          transform never share an element here. */}
      <div
        data-ritual-water
        className="absolute top-0 left-[49%] h-[17%] w-[2%] scale-y-0 rounded-full bg-linear-to-b from-transparent via-cream/60 to-cream/80 opacity-0 blur-[0.4px]"
        style={{ transformOrigin: "50% 0%" }}
      />
      <div
        data-ritual-ripple
        className="absolute top-[11%] left-[44%] size-[12%] scale-75 rounded-full border border-cream/50 opacity-0"
      />

      <svg viewBox="0 0 240 172" className="relative w-full" fill="none" focusable="false">
        <defs>
          <linearGradient id="ritual-glaze" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8a7357" />
            <stop offset="0.3" stopColor="#e7dcc4" />
            <stop offset="0.5" stopColor="#f3ead6" />
            <stop offset="0.78" stopColor="#c9b78f" />
            <stop offset="1" stopColor="#5f4f3a" />
          </linearGradient>
        </defs>

        {/* Foot */}
        <path d="M82 150h76l-4 16a6 6 0 0 1-6 4H92a6 6 0 0 1-6-4Z" fill="#3a2c1f" />

        {/* Inner rim — a neutral ceramic shadow, not a tea tone, so an empty
            bowl (before any liquid layer fades in) reads as empty rather
            than as if it's already holding a dark, finished infusion.
            Drawn first so only its ring shows once the smaller liquid
            ellipses sit on top of it. */}
        <ellipse cx="120" cy="30" rx="110" ry="22" fill="#8c8474" />

        {/* Bowl body — the arc in this path traces the rim's own back edge
            rather than cutting across the opening, which is what leaves the
            liquid inside actually visible instead of painted over. */}
        <path
          d="M10 30a110 22 0 0 0 220 0c-4 88-48 128-110 130C58 158 14 118 10 30Z"
          fill="url(#ritual-glaze)"
        />

        {/* Liquid — four stacked fills, cross-faded by opacity rather than
            animating one fill colour. Index 0 is plain water, 3 is a full,
            finished infusion — the resting state shown here. Drawn after
            the bowl body so they sit visibly inside it. */}
        <ellipse data-ritual-liquid="0" cx="120" cy="34" rx="98" ry="17" fill="#dfe6d3" opacity="0" />
        <ellipse data-ritual-liquid="1" cx="120" cy="34" rx="98" ry="17" fill="#c7cf85" opacity="0" />
        <ellipse data-ritual-liquid="2" cx="120" cy="34" rx="98" ry="17" fill="#9a8a44" opacity="0" />
        <ellipse data-ritual-liquid="3" cx="120" cy="34" rx="98" ry="17" fill="#6e4a28" opacity="1" />
        <ellipse cx="96" cy="30" rx="30" ry="4" fill="#fff" fillOpacity="0.14" />

        {/* Front rim edge */}
        <ellipse cx="120" cy="30" rx="110" ry="22" stroke="#f7f1e3" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Steam — two soft wisps, understated even at rest. */}
      <svg
        data-ritual-steam
        viewBox="0 0 120 140"
        className="absolute top-[4%] left-1/2 w-[22%] -translate-x-1/2 opacity-55 blur-[1.5px]"
        fill="none"
        stroke="#efe8d8"
        strokeLinecap="round"
      >
        <path d="M44 136c-14-22 14-34 0-58s12-40 4-70" strokeOpacity="0.26" strokeWidth="3" />
        <path d="M78 136c-12-20 16-30 4-54s10-34 2-60" strokeOpacity="0.18" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
