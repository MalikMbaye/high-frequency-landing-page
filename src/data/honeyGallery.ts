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

export const bundleGallery: GalleryImage[] = [honeyGallery[0], gummiesGallery[0], ...honeyGallery.slice(1), ...gummiesGallery.slice(1)];

export const galleriesByOption: Record<string, GalleryImage[]> = {
  honey: honeyGallery,
  gummies: gummiesGallery,
  bundle: bundleGallery,
};
