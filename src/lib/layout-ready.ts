"use client";

let settled = false;
const waiters: Array<() => void> = [];

/**
 * Call once the page's final scroll layout is known — specifically, once the
 * hero's own late-created pin (created ~3.6s after mount, after its entrance
 * finishes) has added its pin-spacer, so every section below it is at its
 * true, final scroll position.
 */
export function markLayoutSettled() {
  if (settled) return;
  settled = true;
  waiters.splice(0).forEach((fn) => fn());
}

/**
 * Runs `callback` once the layout is settled (immediately if it already is).
 *
 * Use this to guard any one-shot, self-destructing ScrollTrigger (`once:
 * true`, or anything else that fires and tears itself down) from being
 * created before the hero's pin exists. An ongoing pin/scrub trigger can
 * recover from a premature, too-short layout — `invalidateOnRefresh` simply
 * recalculates its position on the next refresh, and scrubbing keeps it
 * synced to scroll position from then on. A one-shot trigger cannot: if it
 * fires against the pre-pin layout, it plays out (and self-destructs) while
 * the section is still far off-screen, leaving nothing left to animate by
 * the time a visitor actually scrolls there.
 */
export function onLayoutSettled(callback: () => void) {
  if (settled) {
    callback();
    return () => {};
  }
  waiters.push(callback);
  // Lets a caller that unmounts before settling happens drop its callback,
  // rather than leaving it to fire later against a detached DOM node.
  return () => {
    const index = waiters.indexOf(callback);
    if (index !== -1) waiters.splice(index, 1);
  };
}
