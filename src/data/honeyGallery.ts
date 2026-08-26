// Manually curated PDP gallery images (no Shopify image fetching).
// Every image renders inside a 1:1 container, letterboxed (never cropped)
// against a `bg` color chosen to blend with the artwork.
import img01 from "@/assets/honey/pdp/honey-01.webp.asset.json";
import img02 from "@/assets/honey/pdp/honey-02.webp.asset.json";
import img03 from "@/assets/honey/pdp/honey-03.webp.asset.json";
import img04 from "@/assets/honey/pdp/honey-04.webp.asset.json";
import img05 from "@/assets/honey/pdp/honey-05.webp.asset.json";
import img06 from "@/assets/honey/pdp/honey-06.webp.asset.json";
import img07 from "@/assets/honey/pdp/honey-07.webp.asset.json";
import img08 from "@/assets/honey/pdp/honey-08.webp.asset.json";
import img09 from "@/assets/honey/pdp/honey-09.webp.asset.json";
import img10 from "@/assets/honey/pdp/honey-10.webp.asset.json";
import img11 from "@/assets/honey/pdp/honey-11.webp.asset.json";
import img12 from "@/assets/honey/pdp/honey-12.webp.asset.json";
import img13 from "@/assets/honey/pdp/honey-13.webp.asset.json";
import img14 from "@/assets/honey/pdp/honey-14.webp.asset.json";
import img15 from "@/assets/honey/pdp/honey-15.webp.asset.json";
import img16 from "@/assets/honey/pdp/honey-16.webp.asset.json";

export type GalleryImage = { src: string; alt: string; bg: string };

export const honeyGallery: GalleryImage[] = [
  { src: img01.url, alt: "High Frequency Honey stick with honey pouring out", bg: "#0b0b18" },
  { src: img02.url, alt: "Wooden dipper drizzling honey beside a honey stick and raw shilajit resin", bg: "#40291a" },
  { src: img03.url, alt: "Honey stick squeezed into a steaming cup of tea", bg: "#100c1a" },
  { src: img04.url, alt: "Three ingredients: mountain mineral resin, organic honey, natural caramel", bg: "#f1efe7" },
  { src: img05.url, alt: "The ritual takes ten seconds: tear, squeeze, once a day", bg: "#f4f0e8" },
  { src: img06.url, alt: "Supplement facts panel for High Frequency Honey", bg: "#f2ece1" },
  { src: img07.url, alt: "Raw shilajit resin beside a pour of golden honey", bg: "#0a0a0a" },
  { src: img08.url, alt: "Your brain runs on minerals — High Frequency Honey stick", bg: "#0a0d1d" },
  { src: img09.url, alt: "The soil ran out. Your cells noticed.", bg: "#0a0e1c" },
  { src: img10.url, alt: "Sixty seconds to shift. Ninety days to compound. Week 1 to week 12 timeline", bg: "#080b16" },
  { src: img11.url, alt: "Ten seconds, once a day: tear, squeeze, go — no water, no spoon, no prep", bg: "#efece3" },
  { src: img12.url, alt: "Golden spoon of shilajit honey beside a raw resin stone", bg: "#0a0a0a" },
  { src: img13.url, alt: "Honey stick torn open, pouring onto linen", bg: "#f0ece4" },
  { src: img14.url, alt: "Try it for 30 days — full refund, no questions, no return shipping", bg: "#f2efe9" },
  { src: img15.url, alt: "Man wearing High Frequency headphones opening a honey stick at his desk", bg: "#f4f4f4" },
  { src: img16.url, alt: "Straight answers: AI-generated imagery, Bliss Bell partner packaging, 30-day full refund", bg: "#efece2" },
];

import g01 from "@/assets/honey/pdp/gummies-01.webp.asset.json";
import g02 from "@/assets/honey/pdp/gummies-02.webp.asset.json";
import g03 from "@/assets/honey/pdp/gummies-03.webp.asset.json";
import g04 from "@/assets/honey/pdp/gummies-04.webp.asset.json";
import g05 from "@/assets/honey/pdp/gummies-05.webp.asset.json";
import g06 from "@/assets/honey/pdp/gummies-06.webp.asset.json";
import g07 from "@/assets/honey/pdp/gummies-07.webp.asset.json";
import g08 from "@/assets/honey/pdp/gummies-08.webp.asset.json";
import g09 from "@/assets/honey/pdp/gummies-09.webp.asset.json";
import g10 from "@/assets/honey/pdp/gummies-10.webp.asset.json";

export const gummiesGallery: GalleryImage[] = [
  { src: g01.url, alt: "High Frequency Gummies jar with tamarind shilajit gummies", bg: "#0a0c1a" },
  { src: g02.url, alt: "Gummies jar on a desk beside headphones, diffuser and the app playing a frequency", bg: "#e8ded4" },
  { src: g03.url, alt: "Woman wearing headphones taking a High Frequency gummy at home", bg: "#2a1c2c" },
  { src: g04.url, alt: "One daily vitamin from 16,000 ft — energy, focus, recovery, sleep, 85+ trace minerals", bg: "#0a0c1a" },
  { src: g05.url, alt: "Feel it build week by week — week 1 energy and sleep through week 8-12 peak", bg: "#0a0c1c" },
  { src: g06.url, alt: "The wind-down, upgraded: two gummies plus a calm frequency", bg: "#241a14" },
  { src: g07.url, alt: "Your multivitamin has 20 minerals. This has 85+. Two gummies a day.", bg: "#0b0d1b" },
  { src: g08.url, alt: "Zero sugar, zero filler, over 85 essential vitamins and minerals", bg: "#0a0b14" },
  { src: g09.url, alt: "High Frequency Gummies jar, Himalayan shilajit with 75% fulvic", bg: "#0a0b18" },
  { src: g10.url, alt: "Woman in headphones taking a gummy at her table in the evening", bg: "#241d1a" },
];

import b01 from "@/assets/honey/pdp/bundle-01.webp.asset.json";
import b02 from "@/assets/honey/pdp/bundle-02.webp.asset.json";
import b03 from "@/assets/honey/pdp/bundle-03.webp.asset.json";
import b04 from "@/assets/honey/pdp/bundle-04.webp.asset.json";
import b05 from "@/assets/honey/pdp/bundle-05.webp.asset.json";
import b06 from "@/assets/honey/pdp/bundle-06.webp.asset.json";
import b07 from "@/assets/honey/pdp/bundle-07.webp.asset.json";
import b08 from "@/assets/honey/pdp/bundle-08.webp.asset.json";
import b09 from "@/assets/honey/pdp/bundle-09.webp.asset.json";
import b10 from "@/assets/honey/pdp/bundle-10.webp.asset.json";

export const bundleGallery: GalleryImage[] = [
  { src: b01.url, alt: "Headphones, High Frequency Honey stick and gummies jar — wear it, hear it, fuel it", bg: "#08091a" },
  { src: b02.url, alt: "One mineral, two rituals: the honey you look forward to, the gummies you never miss", bg: "#09091a" },
  { src: b03.url, alt: "One ritual, five shifts: energy, focus, recovery, sleep, 85+ trace minerals", bg: "#08091a" },
  { src: b04.url, alt: "Week 1 energy and sleep, week 2 focus, week 4 recovery, week 12 the full compound", bg: "#07081a" },
  { src: b05.url, alt: "Purity you can verify: 75%+ fulvic acid, tested every batch, heavy metals non-detect, GMP ISO HACCP", bg: "#07081a" },
  { src: b06.url, alt: "The High Frequency ritual: 30 honey sticks, 60 gummies, the 30-day protocol", bg: "#07081a" },
  { src: b07.url, alt: "Sixty days, no gaps — the jar outlasts the box", bg: "#07081a" },
  { src: b08.url, alt: "Borrowed energy crashes at 2 PM. Built energy: no spike, no crash.", bg: "#12121c" },
  { src: b09.url, alt: "The study ran ninety days — most people stop before week 12", bg: "#07081a" },
  { src: b10.url, alt: "Tune the signal, feed the signal: honey at the desk, gummies at night", bg: "#1c1a18" },
];

export const galleriesByOption: Record<string, GalleryImage[]> = {
  honey: honeyGallery,
  trial: honeyGallery,
  gummies: gummiesGallery,
  bundle: bundleGallery,
};
