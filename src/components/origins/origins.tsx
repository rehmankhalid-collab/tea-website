"use client";

import { useRef } from "react";

import { OriginsCopy } from "./origins-copy";
import { OriginsImage } from "./origins-image";
import { useOriginsAnimation } from "./use-origins-animation";

/** Section 2: where the tea is grown. Animation lives in use-origins-animation. */
export function Origins() {
  const sectionRef = useRef<HTMLElement>(null);
  useOriginsAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="origins"
      data-origins
      aria-labelledby="origins-title"
      className="relative isolate h-svh min-h-[36rem] overflow-hidden bg-ink"
    >
      <OriginsImage />

      {/* Legibility scrim + film grain, matching the hero's surface */}
      <div
        data-origins-scrim
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,20,16,0.92)_0%,rgba(13,20,16,0.55)_32%,transparent_62%),linear-gradient(to_right,rgba(13,20,16,0.45),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
      />

      <div className="absolute inset-0 z-10">
        <OriginsCopy />
      </div>
    </section>
  );
}
