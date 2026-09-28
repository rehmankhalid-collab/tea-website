"use client";

import { useRef, type ReactNode } from "react";

import { useHeroAnimation } from "./use-hero-animation";

/** Client boundary for the hero: owns the section element and its animation. */
export function HeroScene({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh overflow-hidden"
    >
      {children}
    </section>
  );
}
