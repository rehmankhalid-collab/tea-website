import type { ReactNode } from "react";

import { TeaLeaf } from "@/components/ui/tea-leaf";

/**
 * Dawn-over-mountains backdrop: a distant pale range, a mid ridge carrying a
 * small pagoda silhouette, a terraced near ridge, and an animated tea-branch
 * foreground — real front-to-back depth, built from gradients and vector
 * shapes (no blur() filters on anything full-bleed, so it stays cheap to
 * composite). `data-origins-landscape` takes the scale-settle; the glow,
 * ring, two ridges and foreground each carry their own `data-origins-*`
 * target for independent parallax.
 *
 * To use photography later, put an <Image fill> inside `data-origins-image`
 * (behind or instead of the gradient) and keep the same data attributes —
 * the animation only ever targets those, never the pixels inside them.
 */
export function OriginsImage() {
  return (
    <div
      data-origins-image
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label="A misty mountain range at dawn, glowing gold over terraced tea gardens near a distant temple in Uji, Kyoto."
    >
      <div data-origins-landscape className="absolute inset-0">
        {/* Dawn sky: a single smooth gradient carries the color grading. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0a0f0b 0%, #16241a 22%, #34482f 40%, #97946d 54%, #e6cf99 60%, #f2e2b8 64%, #5a6547 72%, #202f1c 88%, #0a0f0b 100%)",
          }}
        />

        {/* Sun: a defined disc rather than a bare glow gives the light a
            source, not just a haze. Sized in vmin so it stays a true circle
            regardless of the viewport's aspect ratio. */}
        <div
          aria-hidden="true"
          className="absolute top-[47%] left-[54%] size-[8.5vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, #fdf1cf 0%, #f0d99e 55%, rgba(240,217,158,0) 100%)",
          }}
        />
        <div
          data-origins-glow
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "radial-gradient(40% 32% at 54% 47%, rgba(236,220,178,0.55), transparent 70%)",
          }}
        />

        {/* A slow-turning ring around the light — the same motif as the
            hero's product orbit, tying the two sections together. */}
        <svg
          data-origins-ring
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute top-[46%] left-[54%] size-[46%] -translate-x-1/2 -translate-y-1/2 opacity-40"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="#e7cf9c" strokeWidth="0.25" />
          <circle cx="50" cy="4" r="0.9" fill="#e7cf9c" />
        </svg>

        <Birds />

        {/* Distant range: pale, low-contrast, furthest from camera. */}
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <path
            d="M0,500 C200,472 360,494 540,480 C760,463 940,498 1140,482 C1320,468 1470,486 1600,478 L1600,900 L0,900 Z"
            fill="#7c8768"
            fillOpacity="0.4"
          />
        </svg>

        <Ridge
          dataAttr="data-origins-ridge-far"
          path="M0,560 C220,500 420,545 660,520 C900,495 1120,540 1360,515 C1460,505 1540,515 1600,510 L1600,900 L0,900 Z"
          top="#5d6e4d"
          bottom="#25321e"
          opacity={0.8}
        >
          <Pines baseX={640} baseY={523} />
          <Pines baseX={1290} baseY={518} />
        </Ridge>

        <Ridge
          dataAttr="data-origins-ridge-near"
          path="M0,700 C260,635 520,675 780,648 C1040,622 1300,660 1600,630 L1600,900 L0,900 Z"
          top="#212f19"
          bottom="#08100a"
          opacity={1}
          rimLight
          terraces={[
            "M0,730 C260,670 520,705 780,680 C1040,657 1300,690 1600,663",
            "M0,765 C260,710 520,740 780,718 C1040,698 1300,725 1600,700",
            "M0,805 C260,755 520,780 780,762 C1040,745 1300,765 1600,745",
            "M0,850 C260,805 520,825 780,810 C1040,798 1300,812 1600,798",
          ]}
        />

        {/* Gentle vignette for edge falloff and text legibility, independent
            of the scrim (which fades in on scroll). */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgba(6,10,7,0.55) 100%)",
          }}
        />
      </div>

      {/* Foreground: a few tea leaves close to the camera — the same motif
          and scale as the hero's leaves, so the brand language carries
          through — with their own light parallax for front-to-back depth
          as the section scrolls. */}
      <div
        data-origins-foreground
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <TeaLeaf className="absolute -bottom-1 left-0 w-12 rotate-[24deg] text-leaf drop-shadow-[0_14px_16px_rgba(0,0,0,0.5)] md:w-16" />
        <TeaLeaf className="absolute -right-1 -bottom-2 w-10 -rotate-[38deg] text-moss drop-shadow-[0_14px_16px_rgba(0,0,0,0.5)] md:w-14" />
      </div>
    </div>
  );
}

function Birds() {
  const wing = "M0,3 Q4,-3 8,3 Q4,0 0,3Z M8,3 Q12,-3 16,3 Q12,0 8,3Z";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full opacity-50"
    >
      <g fill="#0d1410" fillOpacity="0.5">
        <path d={wing} transform="translate(760,300) scale(1.4)" />
        <path d={wing} transform="translate(820,325) scale(1)" />
        <path d={wing} transform="translate(700,335) scale(0.8)" />
      </g>
    </svg>
  );
}

function Pines({ baseX, baseY }: { baseX: number; baseY: number }) {
  // A small cluster of tapering silhouettes, bases sunk a few pixels into
  // the ridge fill so there is never a gap between tree and mountainside,
  // whatever the exact curve value at that x. Reads as a tree line at this
  // scale, not individual trees.
  const offsets = [-26, -12, 0, 14, 28];
  return (
    <g fill="#16220f" fillOpacity="0.8">
      {offsets.map((dx, i) => {
        const h = 22 + (i % 2) * 8;
        const w = 7 + (i % 3);
        const x = baseX + dx;
        const y = baseY + 4;
        return <path key={dx} d={`M${x - w},${y} L${x},${y - h} L${x + w},${y} Z`} />;
      })}
    </g>
  );
}

function Ridge({
  dataAttr,
  path,
  top,
  bottom,
  opacity,
  rimLight,
  terraces,
  children,
}: {
  dataAttr: string;
  path: string;
  top: string;
  bottom: string;
  opacity: number;
  rimLight?: boolean;
  terraces?: string[];
  children?: ReactNode;
}) {
  // The ridgeline itself, isolated as the fill's top edge, reused for the
  // rim-light strokes below — three widening, fading strokes fake a soft
  // glow along the crest without a blur() filter.
  const ridgeLine = path.slice(0, path.indexOf(" L"));
  const gradientId = `${dataAttr.replace(/[^a-z-]/g, "")}-fill`;

  return (
    <svg
      {...{ [dataAttr]: "" }}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gradientId})`} />
      {children}
      {/* Terracing: contour lines that follow the slope, suggesting cultivated
          tea rows without drawing every row — smooth curves, not dashes. */}
      {terraces && (
        <g stroke="#7d9460" strokeOpacity="0.3" strokeWidth="1.5" fill="none">
          {terraces.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      )}
      {rimLight && (
        <g stroke="#e7cf9c" fill="none" strokeLinecap="round">
          <path d={ridgeLine} strokeWidth={10} strokeOpacity={0.05} />
          <path d={ridgeLine} strokeWidth={4} strokeOpacity={0.12} />
          <path d={ridgeLine} strokeWidth={1.25} strokeOpacity={0.4} />
        </g>
      )}
    </svg>
  );
}
