import { TeaLeaf } from "@/components/ui/tea-leaf";

type CollectionTinProps = {
  id: string;
  name: string;
  number: string;
  fillFrom: string;
  fillTo: string;
  leaf: string;
};

// Fixed spots relative to the interior cavity — the same four for every tin,
// only their colour (set on the wrapping span) changes per tea.
const LEAF_SPOTS = [
  { top: "24%", left: "26%", rotate: -18 },
  { top: "58%", left: "64%", rotate: 22 },
  { top: "38%", left: "48%", rotate: -6 },
  { top: "62%", left: "24%", rotate: 12 },
] as const;

const STREAM_LEAVES = [
  { top: "18%", rotate: -20 },
  { top: "46%", rotate: 16 },
  { top: "76%", rotate: -10 },
] as const;

/**
 * A single Veyla tin, built from separable layers — body, lid, interior
 * cavity, tea fill and a pour stream — so the scroll-driven timeline in
 * use-collection-animation.ts can open the lid, pour tea in and close it
 * again, all with transforms and opacity. Resting/default state (no GSAP)
 * is simply the closed, empty tin — the fallback for reduced motion.
 */
export function CollectionTin({ id, name, number, fillFrom, fillTo, leaf }: CollectionTinProps) {
  const bodyGradientId = `veyla-collection-body-${id}`;
  const labelGradientId = `veyla-collection-label-${id}`;
  const fillGradientId = `veyla-collection-fill-${id}`;
  const lidGradientId = `veyla-collection-lid-${id}`;
  const lidTopGradientId = `veyla-collection-lid-top-${id}`;

  return (
    <div
      data-tin={id}
      // A stable ancestor `perspective` (rather than GSAP's element-level
      // transformPerspective) is what makes `backface-visibility: hidden`
      // on the lid behave reliably once it rotates back past 90°.
      className="relative mx-auto aspect-[3/4] w-full max-w-[16rem] sm:max-w-[19rem] lg:max-w-[22rem] [perspective:1600px]"
    >
      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="absolute bottom-[3%] left-1/2 h-[5%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl"
      />

      {/* Body + label, static */}
      <svg
        data-tin-body
        viewBox="0 0 300 400"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id={bodyGradientId} x1="0" x2="1">
            <stop offset="0" stopColor="#0c130f" />
            <stop offset="0.18" stopColor="#243527" />
            <stop offset="0.32" stopColor="#4c6650" />
            <stop offset="0.46" stopColor="#2a3c2e" />
            <stop offset="0.82" stopColor="#111a13" />
            <stop offset="1" stopColor="#090e0a" />
          </linearGradient>
          <linearGradient id={labelGradientId} x1="0" x2="1">
            <stop offset="0" stopColor="#8f887a" />
            <stop offset="0.25" stopColor="#e2dac7" />
            <stop offset="0.4" stopColor="#f4eee0" />
            <stop offset="0.72" stopColor="#d4ccb8" />
            <stop offset="1" stopColor="#7c7668" />
          </linearGradient>
        </defs>

        <path d="M40 66v268a110 28 0 0 0 220 0V66Z" fill={`url(#${bodyGradientId})`} />

        <path
          d="M40 150a110 28 0 0 0 220 0v130a110 28 0 0 1-220 0Z"
          fill={`url(#${labelGradientId})`}
        />
        <path d="M40 160a110 28 0 0 0 220 0" stroke="#1d2a20" strokeOpacity="0.35" fill="none" />
        <path d="M40 268a110 28 0 0 0 220 0" stroke="#1d2a20" strokeOpacity="0.35" fill="none" />

        <g fill="#1b271e" textAnchor="middle">
          <text x="150" y="198" className="font-display" fontSize="32" letterSpacing="2.5">
            Veyla
          </text>
          <path d="M128 212h44" stroke="#b39458" strokeWidth="1" />
          <text x="150" y="236" className="font-sans" fontSize="9.5" fontWeight="600" letterSpacing="4">
            {name.toUpperCase()}
          </text>
          <text x="150" y="260" className="font-display" fontSize="14" fontStyle="italic" fillOpacity="0.8">
            {number}
          </text>
        </g>

        {/* Rim: the visible opening once the lid lifts clear */}
        <ellipse cx="150" cy="66" rx="110" ry="17" fill="#0a100c" />

        {/* Specular highlight */}
        <rect x="86" y="90" width="8" height="270" rx="4" fill="#fff" fillOpacity="0.05" />
      </svg>

      {/* Interior: cavity + rising tea fill, revealed once the lid clears it */}
      <div
        data-tin-interior
        aria-hidden="true"
        className="absolute top-[15%] left-1/2 h-[8%] w-[62%] -translate-x-1/2"
      >
        <svg viewBox="0 0 100 20" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id={fillGradientId} cx="0.5" cy="0.4" r="0.75">
              <stop offset="0" stopColor={fillFrom} />
              <stop offset="1" stopColor={fillTo} />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="10" rx="47" ry="9" fill="#050805" />
          <ellipse data-tin-fill cx="50" cy="10" rx="41" ry="7.5" fill={`url(#${fillGradientId})`} />
        </svg>

        {LEAF_SPOTS.map((spot, index) => (
          <span
            key={index}
            data-tin-leaf
            className="absolute w-3 -translate-x-1/2 -translate-y-1/2 opacity-0"
            style={{ top: spot.top, left: spot.left, color: leaf }}
          >
            <TeaLeaf className="w-full" style={{ transform: `rotate(${spot.rotate}deg)` }} />
          </span>
        ))}
      </div>

      {/* Shadow the opening lid casts back into the tin, fading as it lifts clear */}
      <div
        data-tin-inner-shadow
        aria-hidden="true"
        className="absolute top-[13.5%] left-1/2 h-[10%] w-[68%] -translate-x-1/2 rounded-[50%] bg-black opacity-0 blur-md"
      />

      {/* Pour stream: tea arriving from outside the tin, never appearing inside it */}
      <div
        data-tin-stream
        aria-hidden="true"
        className="absolute -top-[24%] left-1/2 h-[32%] w-[3.5%] -translate-x-1/2 opacity-0"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${fillFrom}cc 35%, ${fillTo})` }}
        />
        {STREAM_LEAVES.map((spot, index) => (
          <span
            key={index}
            data-tin-leaf-stream
            className="absolute left-1/2 w-2.5 -translate-x-1/2 -translate-y-1/2 opacity-0"
            style={{ top: spot.top, color: leaf }}
          >
            <TeaLeaf className="w-full" style={{ transform: `rotate(${spot.rotate}deg)` }} />
          </span>
        ))}
      </div>

      {/* Lid: rotates open around the back rim (the hinge sits at its bottom edge).
          Sits low enough to fully cover the interior even when the tea is
          filled right to the rim — a higher position leaves a sliver of the
          fill visible under the closed lid. */}
      <div data-tin-lid aria-hidden="true" className="absolute top-[4%] left-1/2 w-[74%] -translate-x-1/2">
        <svg viewBox="0 0 300 110" className="w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]">
          <defs>
            <linearGradient id={lidGradientId} x1="0" x2="1">
              <stop offset="0" stopColor="#4f3f24" />
              <stop offset="0.22" stopColor="#a58a55" />
              <stop offset="0.34" stopColor="#e6d09c" />
              <stop offset="0.5" stopColor="#a88b56" />
              <stop offset="0.85" stopColor="#5a4829" />
              <stop offset="1" stopColor="#3a2e19" />
            </linearGradient>
            <linearGradient id={lidTopGradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f0dcaa" />
              <stop offset="0.5" stopColor="#b3955d" />
              <stop offset="1" stopColor="#6d5832" />
            </linearGradient>
          </defs>
          <path d="M4 38v40a146 22 0 0 0 292 0V38Z" fill={`url(#${lidGradientId})`} />
          <path d="M4 78a146 22 0 0 0 292 0" stroke="#2c2211" strokeOpacity="0.45" fill="none" />
          <ellipse cx="150" cy="38" rx="146" ry="22" fill={`url(#${lidTopGradientId})`} />
          <ellipse cx="150" cy="38" rx="122" ry="15" fill="none" stroke="#fff4d6" strokeOpacity="0.35" />
        </svg>
      </div>
    </div>
  );
}
