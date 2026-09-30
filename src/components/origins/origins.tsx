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

      {/* Hero exits into near-black ink; without this the photo's bright
          sunrise would slam to full brightness within a few pixels of
          scroll. Starts opaque (matching the ink the hero fades into) and
          lifts away in the timeline's opening beat, so the cut becomes a
          graduated reveal instead. */}
      <div
        data-origins-entry-veil
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-ink opacity-0"
      />

      {/* A quiet, film-toned grade rather than a graphic overlay: a faint
          overall tint toward the brand's palette, and darkening that holds
          the full height the type occupies — solid enough at the type to
          read reliably over a bright, uneven photograph, fading out well
          before the top third, which is left untouched. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/14" />
      <div
        data-origins-scrim
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,10,7,0.88)_0%,rgba(6,10,7,0.62)_30%,rgba(6,10,7,0.26)_55%,transparent_78%)]"
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
