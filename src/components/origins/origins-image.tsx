import Image from "next/image";

import teaFields from "../../../public/images/uji-tea-fields.webp";

/**
 * The section's photograph — real tea terraces at dawn, Uji, Kyoto. This is
 * the visual hero of the section; everything else (the scrim, the copy) is
 * built to stay out of its way.
 *
 * On wide screens the frame is close to the photo's own aspect ratio, so
 * `object-fit: cover` crops from the sides and the full establishing shot —
 * sky, ridgeline, mist, the fields converging toward it — stays visible.
 * On narrower, taller screens the same crop would show mostly sky, so the
 * vertical anchor shifts down at `md` and further at the base breakpoint to
 * keep the mist band and the rows themselves — the strongest part of the
 * photograph — in frame.
 */
export function OriginsImage() {
  return (
    <div data-origins-image className="absolute inset-0 overflow-hidden">
      <Image
        src={teaFields}
        alt="Terraced tea fields converging toward a misty mountain ridge at dawn, Uji, Kyoto."
        fill
        priority={false}
        sizes="100vw"
        placeholder="blur"
        className="object-cover object-[50%_66%] md:object-[50%_58%] lg:object-center"
      />
    </div>
  );
}
