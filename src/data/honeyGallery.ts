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
