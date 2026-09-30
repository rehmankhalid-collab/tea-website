import type { StaticImageData } from "next/image";

import tinHojicha from "../../../public/images/products/veyla-tin-hojicha.png";
import teaTerraces from "../../../public/images/tea-terraces-sunrise.jpg";

/**
 * Each story's visual is honest about what it actually is, so the three
 * cards don't pretend to be identical photography when they aren't:
 * - `photo`: a real photograph, shown full-bleed (`object-cover`).
 * - `product`: an existing product cutout, shown contained and centred on a
 *   warm backdrop, like a small still life, rather than stretched to fill
 *   a frame it was never shot for.
 * - `atelier`: no suitable asset exists yet for this story, so it gets a
 *   restrained gradient composition instead of an invented stock photo —
 *   easy to swap for real photography later without touching the card's
 *   own markup or animation.
 */
export type StoryVisual =
  | { kind: "photo"; src: StaticImageData }
  | { kind: "product"; src: StaticImageData }
  | { kind: "atelier" };

export type Story = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  href: string;
  visual: StoryVisual;
};

export const STORIES: Story[] = [
  {
    id: "uji",
    number: "01",
    category: "Origins",
    title: "Inside the Misty Hills of Uji",
    description:
      "Where cool mountain air, morning fog, and generations of craftsmanship shape extraordinary tea.",
    href: "/journal/uji",
    visual: { kind: "photo", src: teaTerraces },
  },
  {
    id: "ritual",
    number: "02",
    category: "Ritual",
    title: "The Art of Taking Your Time",
    description: "Why the simplest tea rituals can become the most meaningful moments of the day.",
    href: "/journal/ritual",
    visual: { kind: "atelier" },
  },
  {
    id: "craft",
    number: "03",
    category: "Craft",
    title: "What Makes a Tea Worth Remembering",
    description: "From the first leaf to the final sip, discover the details that define exceptional tea.",
    href: "/journal/craft",
    visual: { kind: "product", src: tinHojicha },
  },
];
