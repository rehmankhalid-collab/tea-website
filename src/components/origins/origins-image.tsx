import Image from "next/image";

import teaFields from "../../../public/images/tea-terraces-sunrise.jpg";

/**
 * The section's photograph — real terraced tea fields under a golden,
 * backlit sunrise. This is the visual hero of the section; everything else
 * (the scrim, the copy) is built to stay out of its way.
 *
 * On wide screens the frame is close enough to the photo's own aspect ratio
 * that `object-fit: cover` only crops the sides, so the full shot — sunrise
 * glow, the misting hillside, the huts, the sweeping rows — stays visible.
 * On narrower, taller screens that same crop would show mostly sky, so the
 * vertical anchor shifts up at `md` and further at the base breakpoint to
 * keep the terraces and the light raking across them in frame instead.
 */
export function OriginsImage() {
  return (
    <div data-origins-image className="absolute inset-0 overflow-hidden">
      <Image
        src={teaFields}
        alt="Terraced tea fields on a misty hillside, lit by a golden sunrise, with two thatched-roof shelters among the rows."
        fill
        priority={false}
        sizes="100vw"
        placeholder="blur"
        className="object-cover object-[50%_46%] md:object-[50%_42%] lg:object-center"
      />
    </div>
  );
}
