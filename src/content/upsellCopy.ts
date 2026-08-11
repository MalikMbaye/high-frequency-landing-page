/**
 * All upsell copy in one JSON-shaped module so it can be edited without touching components.
 * Restricted ingredient wording NEVER lives here — that text is fetched at runtime from
 * /content/bump-detail.json and /content/upsell-detail.json.
 */
export const bumpCopy = {
  eyebrow: "ONE-TIME OFFER",
  headline: "Fuel for your frequency practice.",
  body: [
    "Your brain runs on minerals. We went to 16,000 feet to get them. High Frequency Honey is a caramel honey stick carrying 85+ trace minerals from the Himalayas \u2014 one a day, alongside your sessions.",
    "A 3-stick pack for $1 — one time only, at checkout. It ships inside your headphone box.",
  ],
  detailLabel: "What's inside",
  cta: "Add the 3-pack for $1",
  ctaAdded: "Added \u2713",
  decline: "No thanks, just the headphones",
  trust: ["Ships free in your box", "30-day guarantee"],
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
