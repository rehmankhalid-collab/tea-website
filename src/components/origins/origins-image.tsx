import type { ReactNode } from "react";

import { TeaLeaf } from "@/components/ui/tea-leaf";

/**
 * Placeholder landscape: layered SVG hills, mist and tea terraces at dawn.
 * Each `data-origins-layer` moves at its own `data-depth` for parallax.
 * To use photography later, replace the layers inside
 * `data-origins-landscape` with an <Image fill />; the animation targets
 * (`data-origins-image`, `data-origins-landscape`) stay the same.
 */
export function OriginsImage() {
  return (
    <div
      data-origins-image
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label="Terraced tea fields on misty hills at dawn in Uji, Kyoto."
    >
      <div data-origins-landscape className="absolute inset-0">
        {/* Dawn sky */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#15201a_0%,#34423a_34%,#8d8a6c_56%,#cdbf95_66%,#8f9272_76%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_28%_22%_at_58%_54%,rgba(246,228,182,0.7),transparent_70%)]" />

        <Layer depth={0.2}>
          <path
            d="M0 600C120 560 200 520 300 540S470 470 600 500 820 430 960 455 1180 500 1300 470 1500 510 1600 490V1400H0Z"
            fill="#7d8570"
            fillOpacity="0.6"
          />
        </Layer>

        <Mist className="top-[46%] h-[16%] opacity-70" />

        <Layer depth={0.4}>
          <path
            d="M0 690C150 640 260 610 380 630S600 690 760 650 1000 580 1150 610 1420 680 1600 640V1400H0Z"
            fill="#48584a"
          />
        </Layer>

        <Mist className="top-[60%] h-[12%] opacity-50" />

        <Layer depth={0.7}>
          <path
            d="M0 760C220 700 420 690 640 720S1060 780 1300 730 1520 700 1600 720V1400H0Z"
            fill="#223320"
          />
          <TeaRows />
        </Layer>

        {/* Foreground bushes and out-of-focus leaves, closest to camera */}
        <div
          data-origins-foreground
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[30%]"
        >
          <svg
            viewBox="0 0 1600 300"
            preserveAspectRatio="xMidYMax slice"
            className="absolute inset-0 size-full blur-[1.5px]"
            aria-hidden="true"
          >
            <path d={FOREGROUND_PATH} fill="#0c150e" />
          </svg>
          <TeaLeaf className="absolute -bottom-6 left-[4%] w-20 rotate-[28deg] text-moss blur-[5px] md:w-28" />
          <TeaLeaf className="absolute right-[6%] bottom-[18%] w-14 -rotate-[36deg] text-leaf blur-[3px] md:w-20" />
        </div>
      </div>
    </div>
  );
}

function Layer({ depth, children }: { depth: number; children: ReactNode }) {
  return (
    <div data-origins-layer data-depth={depth} className="absolute inset-0">
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="size-full overflow-visible"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

function Mist({ className }: { className: string }) {
  return (
    <div
      data-origins-mist
      aria-hidden="true"
      className={`absolute -inset-x-[10%] bg-[linear-gradient(to_bottom,transparent,rgba(226,220,198,0.45),transparent)] blur-2xl ${className}`}
    />
  );
}

// Terraced rows of tea bushes, spaced wider toward the viewer for depth.
function TeaRows() {
  return (
    <g strokeLinecap="round" fill="none">
      {Array.from({ length: 16 }, (_, i) => {
        const y = 790 + i * 14 + i * i * 0.9;
        const d = `M-40 ${y + 20}C300 ${y - 40} 700 ${y - 20} 1000 ${y + 10}S1450 ${y - 30} 1640 ${y}`;
        const width = 4 + i * 0.7;
        return (
          <g key={i}>
            <path d={d} stroke="#35512a" strokeWidth={width} strokeDasharray={`${30 + i * 3} ${4 + i * 0.4}`} />
            <path
              d={d}
              stroke="#62804a"
              strokeOpacity="0.45"
              strokeWidth={width * 0.4}
              strokeDasharray={`${30 + i * 3} ${4 + i * 0.4}`}
              transform={`translate(0 ${-width * 0.35})`}
            />
          </g>
        );
      })}
    </g>
  );
}

// Irregular, rounded bush crowns (deterministic, so SSR and client match).
const FOREGROUND_PATH = (() => {
  let d = "M0 300V170";
  for (let x = 0, i = 0; x < 1600; i++) {
    const width = 70 + ((i * 37) % 5) * 22;
    const crown = 60 + ((i * 53) % 7) * 12;
    const base = 150 + ((i * 29) % 3) * 14;
    d += `C${x + width * 0.12} ${crown} ${x + width * 0.88} ${crown} ${x + width} ${base}`;
    x += width;
  }
  return `${d}V300Z`;
})();
