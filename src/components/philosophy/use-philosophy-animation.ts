"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PHILOSOPHY_PHRASES } from "./philosophy-copy";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const TABLET =
  "(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Hero creates its own pinned ScrollTrigger ~3.6s after mount, shifting
// everything below it down the page — see the same note in
// use-collection-animation.ts and use-ritual-animation.ts.
const REFRESH_AFTER_HERO = -1;

type Profile = {
  /** Total scroll length of the pin — deliberately short: this section is
   * mostly text and long holds, not distance to travel. */
  distance: string;
  /** Clearance from the fixed header above. */
  topPad: string;
};

/**
 * The philosophy: one short, quiet, pinned scroll sequence — the calmest
 * section on the site by design. A two-line statement reveals through a
 * line mask, holds, then gives way to three supporting phrases (one at a
 * time), then to the closing brand signature. Every animated property is
 * opacity, a few px of y, or a very slow background scale — nothing here
 * moves with the amplitude Collection or Ritual use.
 *
 * With reduced motion no handler runs: the section stays in its default,
 * normal-flow layout — statement, then all three phrases, then the brand
 * signature, all visible at once — the "complete philosophy composition"
 * the brief asks reduced-motion visitors to see.
 */
export function usePhilosophyAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => createSequence(section, { distance: "+=280%", topPad: "8rem" }));
      mm.add(TABLET, () => createSequence(section, { distance: "+=240%", topPad: "9rem" }));
      mm.add(MOBILE, () => createSequence(section, { distance: "+=220%", topPad: "10rem" }));

      return () => mm.revert();
    },
    { scope },
  );
}

/** Same technique as use-ritual-animation.ts's own caption-list promotion:
 * once every item goes absolute, neither the list's height nor its width is
 * contributed to by its children any more, so both need freezing explicitly
 * or the list collapses and its text wraps at every word. */
function promoteCaptionList(list: HTMLElement, items: HTMLElement[]) {
  const maxHeight = Math.max(...items.map((item) => item.offsetHeight));
  list.style.position = "relative";
  list.style.width = "100%";
  list.style.height = `${maxHeight}px`;
  items.forEach((item) => {
    item.style.position = "absolute";
    item.style.inset = "0";
  });
}

function createSequence(section: HTMLElement, profile: Profile) {
  const stage = section.querySelector<HTMLElement>("[data-philosophy-stage]");
  const statementScene = section.querySelector<HTMLElement>('[data-philosophy-scene="statement"]');
  const phrasesScene = section.querySelector<HTMLElement>('[data-philosophy-scene="phrases"]');
  const brandScene = section.querySelector<HTMLElement>('[data-philosophy-scene="brand"]');
  if (!stage || !statementScene || !phrasesScene || !brandScene) return;

  const lines = Array.from(statementScene.querySelectorAll<HTMLElement>("[data-philosophy-line]"));
  const phraseList = phrasesScene.querySelector<HTMLElement>("[data-philosophy-caption-list]");
  const phraseItems = PHILOSOPHY_PHRASES.map((p) =>
    phrasesScene.querySelector<HTMLElement>(`[data-philosophy-phrase="${p.id}"]`),
  );
  const atmosphere = section.querySelector<HTMLElement>("[data-philosophy-atmosphere]");
  const dawn = section.querySelector<HTMLElement>("[data-philosophy-dawn]");

  if (lines.length !== 2 || !phraseList || phraseItems.some((el) => !el) || !atmosphere || !dawn) return;
  const [phrase0, phrase1, phrase2] = phraseItems as HTMLElement[];

  // Promote the default, normal-flow story into a single pinned stage — the
  // same technique as Collection's and Ritual's own stage promotion.
  section.style.height = "100svh";
  section.style.overflow = "hidden";
  stage.style.height = "100%";
  [statementScene, phrasesScene, brandScene].forEach((scene) => {
    scene.style.position = "absolute";
    scene.style.inset = "0";
    scene.style.paddingTop = profile.topPad;
    scene.style.paddingBottom = "3rem";
  });
  promoteCaptionList(phraseList, [phrase0, phrase1, phrase2]);

  // Starting state: the statement's lines wait just below their masks,
  // everything after it invisible, ready to arrive in turn.
  gsap.set(lines, { yPercent: 100 });
  gsap.set(phrasesScene, { opacity: 0 });
  gsap.set([phrase0, phrase1, phrase2], { opacity: 0 });
  gsap.set(brandScene, { opacity: 0, y: 10 });
  gsap.set(dawn, { opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: profile.distance,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_AFTER_HERO,
    },
  });

  // --- The statement --------------------------------------------------
  // A brief, quiet pause before anything moves — the "breath" the brief
  // asks for — then each line lifts clear of its mask in turn.
  const ENTRY = 0.3;
  const LINE_STAGGER = 0.18;
  const LINE_REVEAL = 0.4;
  tl.to(lines[0], { yPercent: 0, duration: LINE_REVEAL, ease: "power3.out" }, ENTRY)
    .to(lines[1], { yPercent: 0, duration: LINE_REVEAL, ease: "power3.out" }, ENTRY + LINE_STAGGER);

  let cursor = ENTRY + LINE_STAGGER + LINE_REVEAL;

  // A long hold — this is the section's whole point, so it needs time to be
  // read, not scrolled past.
  const STATEMENT_HOLD = 1.05;
  cursor += STATEMENT_HOLD;

  // --- Statement → supporting phrases -----------------------------------
  const CROSSFADE = 0.45;
  tl.to(statementScene, { opacity: 0, y: -10, duration: CROSSFADE }, cursor).to(
    phrasesScene,
    { opacity: 1, duration: CROSSFADE },
    cursor,
  );
  cursor += CROSSFADE;

  // --- The three phrases, one at a time ---------------------------------
  const PHRASE_HOLD = 0.85;
  const PHRASE_FADE = 0.35;
  tl.to(phrase0, { opacity: 1, duration: PHRASE_FADE }, cursor);
  cursor += PHRASE_HOLD;
  const rest = [phrase1, phrase2];
  let previous = phrase0;
  rest.forEach((next) => {
    tl.to(previous, { opacity: 0, duration: PHRASE_FADE }, cursor).to(
      next,
      { opacity: 1, duration: PHRASE_FADE },
      cursor,
    );
    cursor += PHRASE_HOLD;
    previous = next;
  });

  // --- Phrases → brand signature ------------------------------------------
  tl.to(phrasesScene, { opacity: 0, y: -10, duration: CROSSFADE }, cursor).to(
    brandScene,
    { opacity: 1, y: 0, duration: CROSSFADE },
    cursor,
  );
  cursor += CROSSFADE;

  const BRAND_HOLD = 1.1;
  // The dawn glow eases in during the back half of this final hold —
  // lighter, not darker, preparing the page for what comes after this
  // section rather than sealing it off.
  tl.to(dawn, { opacity: 1, duration: BRAND_HOLD * 0.6 }, cursor + BRAND_HOLD * 0.4);
  cursor += BRAND_HOLD;

  // A very slow, continuous background scale over the whole sequence —
  // "cinematic camera breathing," not a parallax effect a viewer would
  // consciously register.
  tl.fromTo(atmosphere, { scale: 1 }, { scale: 1.05, duration: cursor, ease: "none" }, 0);

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
