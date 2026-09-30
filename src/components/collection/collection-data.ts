import type { StaticImageData } from "next/image";

import gyokuroTin from "../../../public/images/products/veyla-tin-gyokuro.png";
import hojichaTin from "../../../public/images/products/veyla-tin-hojicha.png";
import senchaTin from "../../../public/images/products/veyla-tin-sencha.png";

export type CollectionTea = {
  id: "sencha" | "hojicha" | "gyokuro";
  number: string;
  name: string;
  /** Short uppercase tasting kicker, matching what's printed on the tin. */
  tags: string;
  note: string;
  origin: string;
  weight: string;
  signature?: boolean;
  image: StaticImageData;
  /** Placeholder pricing (USD) — swaps in cleanly once real prices exist. */
  price: number;
};

export const TEAS: CollectionTea[] = [
  {
    id: "sencha",
    number: "No. 03",
    name: "Sencha",
    tags: "Bright · Grassy · Spring",
    note: "Bright and grassy, the first flush of spring steamed within hours of picking.",
    origin: "Shizuoka, Japan",
    weight: "50 g",
    image: senchaTin,
    price: 28,
  },
  {
    id: "hojicha",
    number: "No. 05",
    name: "Hōjicha",
    tags: "Roasted · Caramel · Evening",
    note: "Roasted over charcoal until sweet and toasty, gentle enough for evenings.",
    origin: "Kyoto, Japan",
    weight: "50 g",
    image: hojichaTin,
    price: 26,
  },
  {
    id: "gyokuro",
    number: "No. 07",
    name: "Gyokuro",
    tags: "Shade-grown · Umami · Sweet",
    note: "Shade-grown for three weeks before harvest — deep umami, quietly intense.",
    origin: "Uji, Kyoto",
    weight: "50 g",
    signature: true,
    image: gyokuroTin,
    price: 42,
  },
];
