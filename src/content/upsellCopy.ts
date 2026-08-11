/**
 * All upsell copy in one JSON-shaped module so it can be edited without touching components.
 * Restricted ingredient wording NEVER lives here — that text is fetched at runtime from
 * /content/bump-detail.json and /content/upsell-detail.json.
 */
export interface BumpOption {
  id: "trial" | "month";
  title: string;
  price: string;
  sub: string;
  chip: string | null;
  cta: string;
}

export interface BumpCopy {
  eyebrow: string;
  headline: string;
  lead: string;
  body: string;
  detailLabel: string;
  options: BumpOption[];
  subscription: { label: string; price: string; sub: string; cta: string; discountPercent: number };
  ctaAdded: string;
  ctaSecondary: string;
  trustRow: string;
  trustRowSubscription: string;
}

export const bumpCopy: BumpCopy = {
  eyebrow: "ONE-TIME OFFER",
  headline: "Fuel for your frequency practice.",
  lead: "Your brain runs on minerals. We went to 16,000 feet to get them.",
  body: "High Frequency Honey is a caramel honey stick carrying 85+ trace minerals from Himalayan rock above 16,000 feet. One a day, alongside your sessions. It ships inside your headphone box, so there is no extra shipping and nothing to wait on.",
  detailLabel: "What's inside",
  options: [
    {
      id: "trial",
      title: "Try 3 sticks",
      price: "$1.99",
      sub: "Three mornings. Enough to feel the difference.",
      chip: "START HERE",
      cta: "Add for $1.99",
    },
    {
      id: "month",
      title: "Full month",
      price: "30 sticks \u00b7 $29.97",
      sub: "One a day for 30 days. The compound window.",
      chip: null,
      cta: "Add for $29.97",
    },
  ],
  subscription: {
    label: "Subscribe and save 20%",
    price: "$23.97 every 30 days",
    sub: "Skip, pause, or cancel anytime.",
    cta: "Subscribe \u00b7 $23.97/mo",
    discountPercent: 20,
  },
  ctaAdded: "Added \u2713",
  ctaSecondary: "No thanks, just the headphones",
  trustRow: "Ships free in your box \u00b7 30-day guarantee",
  trustRowSubscription: "Ships free in your box \u00b7 30-day guarantee \u00b7 Cancel anytime",
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
