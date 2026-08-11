/**
 * All upsell copy in one JSON-shaped module so it can be edited without touching components.
 * Restricted ingredient wording NEVER lives here — that text is fetched at runtime from
 * /content/bump-detail.json and /content/upsell-detail.json.
 */
export interface BumpCopy {
  eyebrow: string;
  headline: string;
  lead: string;
  body: string;
  offer: string;
  detailLabel: string;
  cta: string;
  ctaAdded: string;
  ctaSecondary: string;
  trustRow: string;
}

export const bumpCopy: BumpCopy = {
  eyebrow: "ONE-TIME OFFER",
  headline: "The stuff we hiked 16,000 feet for.",
  lead: "Above the tree line, black resin bleeds out of the rock. Locals have scraped it by hand for centuries.",
  body: "Our team treks up, carries it down, and we fold it into a caramel honey stick — 85+ trace minerals, the raw material your brain runs on. One in the morning, alongside your sessions.",
  offer: "3 sticks for $1. This screen only, and it ships inside your headphone box.",
  detailLabel: "What's inside",
  cta: "Add the 3-pack for $1",
  ctaAdded: "Added \u2713",
  ctaSecondary: "No thanks, just the headphones",
  trustRow: "Ships free in your box \u00b7 30-day guarantee",
};


export const upsellCopy = {
  headline: "Fuel for your frequency practice.",
  sub: "Your brain runs on minerals. We went to 16,000 feet to get them. Your headphones are on the way. Fuel ships in the same box if you add it in the next step. This screen is the only place you'll see launch pricing.",
  cards: [
    {
      sku: "HFH-HONEY-30",
      title: "High Frequency Honey",
      desc: "30 caramel honey sticks \u00b7 a month of the morning ritual",
      price: "$35",
      compareAt: null as string | null,
      cta: "Add Honey",
      chip: null as string | null,
    },
    {
      sku: "HFH-GUMMIES-60",
      title: "High Frequency Gummies",
      desc: "60 tamarind gummies, zero added sugar, vegan \u00b7 the travel-proof dose",
      price: "$35",
      compareAt: null as string | null,
      cta: "Add Gummies",
      chip: null as string | null,
    },
    {
      sku: "HFH-BUNDLE",
      title: "The Wellness Bundle",
      desc: "both boxes \u00b7 morning stick, evening gummies",
      price: "$59",
      compareAt: "$70" as string | null,
      cta: "Add the Bundle",
      chip: "Most complete" as string | null,
    },
  ],
  skip: "Skip, take me to my order",
  footer: "30 days, full refund, no questions. Independently tested, every batch.",
};
