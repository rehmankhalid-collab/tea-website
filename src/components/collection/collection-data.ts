export type CollectionTea = {
  id: "sencha" | "hojicha" | "gyokuro";
  number: string;
  name: string;
  note: string;
  weight: string;
  signature?: boolean;
  /** Tea-fill gradient, centre to edge. */
  fillFrom: string;
  fillTo: string;
  /** Loose-leaf accents scattered on top of the fill. */
  leaf: string;
};

export const TEAS: CollectionTea[] = [
  {
    id: "sencha",
    number: "No. 03",
    name: "Sencha",
    note: "Bright and grassy, the first flush of spring steamed within hours of picking.",
    weight: "50 g",
    fillFrom: "#cddb92",
    fillTo: "#6c8a3a",
    leaf: "#8aa452",
  },
  {
    id: "hojicha",
    number: "No. 05",
    name: "Hōjicha",
    note: "Roasted over charcoal until sweet and toasty, gentle enough for evenings.",
    weight: "50 g",
    fillFrom: "#cd9c63",
    fillTo: "#6b4020",
    leaf: "#a3702f",
  },
  {
    id: "gyokuro",
    number: "No. 07",
    name: "Gyokuro",
    note: "Shade-grown for three weeks before harvest — deep umami, quietly intense.",
    weight: "50 g",
    signature: true,
    fillFrom: "#63935a",
    fillTo: "#20351d",
    leaf: "#3f5c37",
  },
];
