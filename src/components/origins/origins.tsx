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

      {/* A quiet, film-toned grade rather than a graphic overlay: a faint
          overall tint toward the brand's palette, and darkening concentrated
          low, only enough to hold the type — most of the photograph is left
          untouched. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/10" />
      <div
        data-origins-scrim
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,12,9,0.72)_0%,rgba(8,12,9,0.32)_28%,transparent_56%)]"
      />
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
      />

      <div className="absolute inset-0 z-10">
        <OriginsCopy />
      </div>
    </section>
  );
}
