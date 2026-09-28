"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Ref to the active Lenis instance. Read `.current` inside effects or event
 * handlers; it is null during SSR and when reduced motion is preferred.
 */
export function useLenis() {
  const ref = useContext(LenisContext);
  if (!ref) {
    throw new Error("useLenis must be used within SmoothScrollProvider");
  }
  return ref;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect users who prefer reduced motion: keep native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // GSAP's ticker drives Lenis, so Lenis must not run its own rAF loop.
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // gsap.ticker passes time in seconds; Lenis expects milliseconds.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext value={lenisRef}>{children}</LenisContext>;
}
