/**
 * Atmospheric dawn-over-mountains backdrop, built entirely from gradients and
 * two soft-edged ridge silhouettes — no blur() filters and no dashed/bitmap
 * texture, so every layer is cheap to composite. `data-origins-landscape`
 * takes the scale-settle; the glow and two ridges each carry their own
 * `data-origins-*` target for a light, independent parallax drift.
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
      aria-label="A misty mountain ridge at dawn, glowing gold over the tea terraces of Uji, Kyoto."
    >
      <div data-origins-landscape className="absolute inset-0">
        {/* Dawn sky: a single smooth gradient carries all the color grading. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0d1410 0%, #182619 26%, #3d5236 44%, #c9b184 57%, #ecdcb2 63%, #48573b 73%, #182417 90%, #0d1410 100%)",
          }}
        />

        {/* Soft dawn light pooling behind the ridge line. */}
        <div
          data-origins-glow
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(38% 30% at 54% 46%, rgba(236,220,178,0.6), transparent 70%)",
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

        <Ridge
          dataAttr="data-origins-ridge-far"
          path="M0,560 C220,500 420,545 660,520 C900,495 1120,540 1360,515 C1460,505 1540,515 1600,510 L1600,900 L0,900 Z"
          top="#5d6e4d"
          bottom="#25321e"
          opacity={0.75}
        />

        <Ridge
          dataAttr="data-origins-ridge-near"
          path="M0,700 C260,635 520,675 780,648 C1040,622 1300,660 1600,630 L1600,900 L0,900 Z"
          top="#212f19"
          bottom="#0a100a"
          opacity={1}
          rimLight
        />

        {/* Gentle vignette for edge falloff and text legibility, independent
            of the scrim (which fades in on scroll). */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgba(6,10,7,0.55) 100%)",
          }}
        />
      </div>
    </div>
  );
}

function Ridge({
  dataAttr,
  path,
  top,
  bottom,
  opacity,
  rimLight,
}: {
  dataAttr: string;
  path: string;
  top: string;
  bottom: string;
  opacity: number;
  rimLight?: boolean;
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
