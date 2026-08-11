/**
 * All upsell copy in one JSON-shaped module so it can be edited without touching components.
 * Restricted ingredient wording NEVER lives here — that text is fetched at runtime from
 * /content/bump-detail.json and /content/upsell-detail.json.
 */
export interface BumpCopy {
  /** Stable variant tag used for conversion reporting. */
  variant: string;
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

/** Variant A — "Start your morning on the high frequency" */
export const bumpVariantA: BumpCopy = {
  variant: "A_high_frequency_morning",
  eyebrow: "ONE-TIME OFFER",
  headline: "Start your morning on the high frequency.",
  lead:
    "A sacred healing secret from 16,000 feet, folded into golden honey. The old texts called it the destroyer of weakness.",
  body:
    "Tear the seal. Squeeze it into your tea, or straight onto your tongue. Put the headphones on. Feel the frequency rise while 85+ mountain minerals feed the very cells doing the rising. Ten seconds of honey. Sixty seconds of sound. A morning that doesn't crash.",
  offer: "3 sticks for $1. This screen only, and they arrive tucked inside your headphone box.",
  detailLabel: "What's inside",
  cta: "Add the 3-pack for $1",
  ctaAdded: "Added \u2713",
  ctaSecondary: "No thanks, just the headphones",
  trustRow: "Ships free in your box \u00b7 30-day guarantee",
};

/** Variant B — "The mountain kept a secret" */
export const bumpVariantB: BumpCopy = {
  variant: "B_mountain_secret",
  eyebrow: "ONE-TIME OFFER",
  headline: "The mountain kept a secret. It tastes like caramel.",
  lead:
    "Shilajit: gathered by hand above 16,000 feet for thousands of years. The Sanskrit name means destroyer of weakness.",
  body:
    "Imagine your morning tea carrying 85+ minerals your brain fires with, from a sacred essence the Himalayas took centuries to make. One golden stick, ten seconds, headphones on after. The sound tunes you. The mountain feeds you. That's the practice, complete.",
  offer: "3 sticks for $1, this screen only. They ride inside your headphone box.",
  detailLabel: "What's inside",
  cta: "Add the 3-pack for $1",
  ctaAdded: "Added \u2713",
  ctaSecondary: "No thanks, just the headphones",
  trustRow: "Ships free in your box \u00b7 30-day guarantee",
};

export const bumpVariants: BumpCopy[] = [bumpVariantA, bumpVariantB];

/** Picks a variant at random each time the modal opens. */
export function pickBumpVariant(): BumpCopy {
  return bumpVariants[Math.floor(Math.random() * bumpVariants.length)];
}

/** Back-compat default export used by anything that just needs a single copy object. */
export const bumpCopy: BumpCopy = bumpVariantA;

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
