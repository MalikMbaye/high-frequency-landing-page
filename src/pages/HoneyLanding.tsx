import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";

import { useShopifyProductByHandle } from "@/hooks/useShopifyProductByHandle";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "@/components/CartDrawer";
import logoAsset from "@/assets/hfh-logo.png.asset.json";
import "@/pages/honey.css";

import honeyHero from "@/assets/honey/honey-hero.webp";
import honeyRitual from "@/assets/honey/honey-ritual.webp";
import honeyIngredients from "@/assets/honey/honey-ingredients.webp";
import honeyDipperWood from "@/assets/honey/honey-dipper-wood.webp";
import honeyGuarantee from "@/assets/honey/honey-guarantee.webp";
import honeyFacts from "@/assets/honey/honey-facts.webp";
import honeySteamingCup from "@/assets/honey/honey-steaming-cup.webp";
import honeyGoldSpoon from "@/assets/honey/honey-gold-spoon.webp";
import honeyCup from "@/assets/honey/honey-cup.webp";
import honeyWave from "@/assets/honey/honey-wave.webp";
import benefitTimelineAsset from "@/assets/honey/benefit-timeline.webp.asset.json";
import gummiesHeroAsset from "@/assets/honey/gummies-hero.webp.asset.json";
import fuelImageAsset from "@/assets/honey/honey-am-pm-ritual.webp.asset.json";
import fiveShiftsAsset from "@/assets/honey/honey-five-shifts.webp.asset.json";
import labReportsAsset from "@/assets/honey/honey-lab-reports.webp.asset.json";
import sacredSecretHimalayasAsset from "@/assets/honey/sacred-secret-himalayas.webp.asset.json";
import honeySupplementFactsAsset from "@/assets/honey/honey-supplement-facts.webp.asset.json";
import gummiesMineralsAsset from "@/assets/honey/gummies-minerals.webp.asset.json";
import faqSignalAsset from "@/assets/honey/faq-tune-the-signal.webp.asset.json";
import faqGummiesAsset from "@/assets/honey/faq-gummies-desk.webp.asset.json";


const benefitTimeline = [
  {
    week: "Week 1",
    title: "Energy and sleep",
    body: "Steadier energy through the day, deeper sleep at night. The afternoon crash starts to fade.",
  },
  {
    week: "Week 2",
    title: "Clarity",
    body: "The fog lifts. Focus holds through the afternoon without rescue coffee.",
  },
  {
    week: "Week 4",
    title: "Recovery",
    body: "Faster recovery between workouts. More output, less soreness.",
  },
  {
    week: "Weeks 8–12",
    title: "Compound effect",
    body: "The full arc lands later because this is a compounding mineral, never a stimulant. Nothing spikes. Nothing crashes.",
  },
];

/** Shopify handles for the three purchase options. */
const HANDLES = {
  honey: "high-frequency-honey",
  gummies: "high-frequency-gummies",
  bundle: "high-frequency-wellness-bundle",
} as const;

type OptionId = keyof typeof HANDLES;

interface OptionSpec {
  id: OptionId;
  name: string;
  subLabel: string;
  tagline: string;
  /** Shopify variant title to select inside the product. */
  variantTitle: string;
  fallbackPrice: number;
  compareAt: number;
  badge?: { label: string; tone: "gold" | "purple" };
}

const OPTIONS: OptionSpec[] = [
  {
    id: "honey",
    name: "High Frequency Honey",
    subLabel: "30 Honey Stix",
    tagline: "The golden morning stick. Ten seconds of caramel honey, then sixty seconds of frequency.",
    variantTitle: "1-Month Supply (30x High Frequency Honey Stix)",
    fallbackPrice: 33.33,
    compareAt: 59.99,
  },
  {
    id: "gummies",
    name: "Sacred Shilajit Multivitamins",
    subLabel: "30 Tamarind Gummies",
    tagline: "The nightly mineral gummy. Travel-proof, zero added sugar, built for wind-down.",
    variantTitle: "1-Month Supply of Vitamins (30x Gummies)",
    fallbackPrice: 33.33,
    compareAt: 59.99,
  },
  {
    id: "bundle",
    name: "High Frequency Health Bundle",
    subLabel: "30 Honey Stix + 60 Gummies",
    tagline: "Honey by morning, gummies by night. The fuel behind every session.",
    variantTitle: "30 Honey Stix + 60 Tamarind Multivitamin Gummies",
    fallbackPrice: 66.66,
    compareAt: 133.32,
    badge: { label: "BEST VALUE", tone: "gold" },
  },
];

const money = (v: number) => `$${v.toFixed(2).replace(/\.00$/, "")}`;

const gallery = [
  { src: honeyHero, alt: "High Frequency Honey stick with honey pouring out" },
  { src: honeyRitual, alt: "Tear the stick, squeeze it, ten seconds once a day" },
  { src: honeyIngredients, alt: "Three ingredients: mineral resin, organic honey, natural caramel" },
  { src: honeyDipperWood, alt: "Wooden dipper drizzling honey beside a stick and raw resin" },
  { src: honeySteamingCup, alt: "Honey stick squeezed into a steaming cup" },
  { src: honeyGoldSpoon, alt: "Brass spoon of dark honey beside resin on slate" },
  { src: honeyFacts, alt: "Supplement facts panel for High Frequency Honey" },
  { src: honeyGuarantee, alt: "30 days, full refund guarantee" },
];

const marketplaceIntro = [
  {
    eyebrow: "Introducing the High Frequency Marketplace",
    title: "The practice, expanded",
    paras: [
      "We are building more than headphones. The High Frequency Marketplace is where the rest of the practice lives. Everything in it does one job: raise the signal your brain runs on.",
      "The headphones were the first tool. They tune your state in under sixty seconds, and over 100,000 people have felt it. But a session ends and your brain keeps running.",
      "This is the first product in the marketplace. You are seeing it before it goes anywhere else.",
    ],
  },
  {
    eyebrow: "The mineral behind the frequency",
    title: "Where the charge comes from",
    paras: [
      "Every frequency you feel in those headphones is your neurons firing. Neurons fire by moving charged minerals across a membrane — that is what the signal physically is.",
      "So we went looking for one of the richest natural sources of those minerals on earth. We found it at 16,000 feet.",
      "Shilajit is a mineral essence the Himalayas spend centuries making, pressed out of ancient plant matter between layers of rock. Raw, it is bitter and hard to take. So we folded it into caramel honey and set it into a tamarind gummy.",
    ],
  },
];

const gummiesBenefits = [
  {
    title: "Energy and stamina",
    body: "Fulvic acid works inside the mitochondria, the part of every cell that produces ATP. More available fuel means energy arrives from the inside instead of being borrowed.",
  },
  {
    title: "Mental clarity and focus",
    body: "Purified resin supports mineral absorption and a quieter head. In practice, that reads as sharper focus and less afternoon fog.",
  },
  {
    title: "Strength and recovery",
    body: "Trace minerals support protein synthesis and muscle repair, so the ritual keeps building past the first few weeks.",
  },
];

const story = [
  {
    id: "morning",
    title: "Start every morning on a high frequency",
    image: honeyRitual,
    alt: "The morning ritual: one stick, ten seconds",
    paras: [
      "Your brain tunes with sound. This is the other half of that ritual — the part that feeds it.",
      "Every morning: tear a golden honey stick, ten seconds, headphones on, press play. The sound tunes you. The honey fuels you. Sixty seconds later you're locked in, and there's no crash coming at 2 PM, because nothing here is caffeine.",
      "One stick a day. That's the entire practice.",
    ],
  },
  {
    id: "fuel",
    title: "The fuel your brain is quietly running out of",
    image: fuelImageAsset.url,
    alt: "AM honey stick and PM gummies ritual split image",
    paras: [
      "Here's what almost nobody knows: your brain runs on minerals. Every thought, every meditation, every focused hour burns them. And modern food, grown in tired soil, barely delivers them anymore.",
      "That's the real story behind the afternoon crash and the fog. Coffee can't fix it, because coffee borrows energy and bills you later. Minerals build energy from the inside.",
      "Shilajit carries 85+ trace minerals in the exact form your cells absorb. It's the supply your practice has been missing.",
    ],
  },
  {
    id: "sacred",
    title: "A sacred secret, kept by the Himalayas",
    image: sacredSecretHimalayasAsset.url,
    alt: "Three ingredients: mountain mineral resin, organic honey, and natural caramel",
    paras: [
      "High above the tree line, a rare black substance seeps out of sun-warmed rock. Locals have climbed to gather it by hand for thousands of years. The old Sanskrit texts named it the destroyer of weakness.",
      "The mountains spend centuries pressing ancient plants between layers of rock until they become a dense mineral essence — one of the richest natural sources of trace minerals on earth. 85+ of them, in the ionic form your cells absorb directly.",
      "We fold it into certified organic caramel honey for the morning, and set it into a tamarind gummy for the night. The mountain made it powerful. We made it something you'll actually keep doing.",
    ],
  },
  {
    id: "two-rituals",
    title: "One you look forward to. One you never miss.",
    image: fiveShiftsAsset.url,
    alt: "Honey stick and gummies with five benefit callouts",
    paras: [
      "Same mineral in both. Completely different reasons to own them.",
      "The honey is the morning. Golden, caramel, tied to your session, ten seconds start to finish. It's the one you actually want, which is why it builds the habit in the first place.",
      "The gummies are everything the morning doesn't cover. The gym bag. The 6 AM flight. The hotel room. The day you skipped breakfast and left the house at seven. Zero mess, exact dose, no sugar spike before bed.",
      "This compound only pays you back on the days you take it. So the format that survives your worst week is the one that decides your results. Owning both means there are no bad weeks.",
    ],
  },
  {
    id: "lab-reports",
    title: "Ancient secrets verified by modern science.",
    image: labReportsAsset.url,
    alt: "Gummies with zero sugar, zero filler, and over 85 essential vitamins and minerals",
    paras: [
      "Most of what gets sold online is fake or watered down. Every batch of ours is third-party tested before it ships.",
      "Fulvic acid verifies above 75%, against the 10 to 20% you find in a generic capsule. Authenticity is confirmed by DBP marker, which most brands never test for.",
      "Heavy metals: lead, mercury, arsenic, and cadmium are Non-Detect. Full mineral panel, zero hidden fillers, zero mycotoxins. Made in a GMP, ISO, and HACCP certified facility.",
    ],
  },
];

const honeyPanels = [
  {
    q: "What's in the honey sticks?",
    a: "Organic honey, purified Himalayan shilajit resin (400mg), and natural caramel flavor. Contains honey. No corn syrup, no artificial sweeteners, no fillers.",
  },
  {
    q: "Nutrition, per honey stick",
    a: "Serving size: 1 stick (8g). 25 calories, 0g fat, 0mg cholesterol, 8mg sodium, 6.6g total carbohydrates, 6.6g total sugars from organic honey, 0g protein, 400mg shilajit resin.",
  },
  {
    q: "How we verify it",
    a: "Every batch is tested before it ships. The 400mg dose is confirmed by lab panel. Fulvic acid is verified at 75%+, DBP authenticity is verified, and heavy metals test Non-Detect for lead, mercury, arsenic, and cadmium.",
  },
  {
    q: "Before you take it",
    a: "Adults 18 and over. Talk to your doctor first if you are pregnant, nursing, trying to conceive, on prescription medication, or managing a diagnosed condition. Shilajit contains iron and may not suit people with iron-overload conditions. Contains honey, so not for infants under 12 months. If you are managing blood sugar, note the 6.6g of honey sugar per stick.",
  },
  {
    q: "Images, packaging, and guarantee",
    a: "Product renders are accurate on format, dose, and count. Your sticks may ship in Bliss Bell partner packaging while High Frequency packaging is in production. Same formula, same 400mg, same facility. Ships free inside your headphone box. 30 days, full refund, no questions.",
  },
];

const gummiesPanels = [
  {
    q: "What's in the gummies?",
    a: "Tamarind multivitamin gummies infused with purified Himalayan shilajit. Vegan, gluten free, non-GMO, no preservatives, 20 calories and 1g of sugar per serving with none added.",
  },
  {
    q: "How we verify it",
    a: "Every batch is tested before it ships. The 400mg dose is confirmed by lab panel. Fulvic acid is verified at 75%+, DBP authenticity is verified, and heavy metals test Non-Detect for lead, mercury, arsenic, and cadmium.",
  },
  {
    q: "Before you take it",
    a: "Adults 18 and over. Talk to your doctor first if you are pregnant, nursing, trying to conceive, on prescription medication, or managing a diagnosed condition. Shilajit contains iron and may not suit people with iron-overload conditions. Contains honey, so not for infants under 12 months. If you are managing blood sugar, note the 6.6g of honey sugar per stick.",
  },
  {
    q: "Images, packaging, and guarantee",
    a: "Product renders are accurate on format, dose, and count. Your sticks may ship in Bliss Bell partner packaging while High Frequency packaging is in production. Same formula, same 400mg, same facility. Ships free inside your headphone box. 30 days, full refund, no questions.",
  },
];


const faqsShared = [
  {
    q: "What is shilajit, exactly?",
    a: "A mineral essence the Himalayas spend centuries pressing out of ancient plant matter between layers of rock. It seeps from sun-warmed cliffs above 16,000 feet, where it's gathered by hand the way it has been for thousands of years. The old Sanskrit name translates to \"destroyer of weakness.\" It carries 85+ trace minerals in ionic form — the charged form your cells absorb directly — plus fulvic acid, which helps your cells turn fuel into energy.",
  },
  {
    q: "Is it a stimulant? Will I crash?",
    a: "No. There's no caffeine and nothing that spikes. It works inside your mitochondria, the part of every cell that produces ATP, so energy arrives from the inside instead of being borrowed. That's why there's no jitters and no 2 PM bill coming due. It's fuel, not a stimulant.",
  },
  {
    q: "Is there real research behind this?",
    a: "Yes. Energy: Joukar et al. 2014; Carrasco-Gallardo et al. 2012. Focus and cognition: Surapaneni et al. 2009; Stohs 2014. Sleep: Shevtsov et al. 2003; Bhattacharyya et al. 2009. Strength and recovery: Keller et al. 2019, a double-blind randomized controlled trial. And a 90-day double-blind, placebo-controlled study published in Andrologia (Pandit et al. 2016, n=96) measured total testosterone up 20% and free testosterone up 19% at the same dose in every serving. The mechanisms — mitochondrial energy, mineral absorption, clarity — aren't sex-specific, so the benefits apply to men and women.",
  },
  {
    q: "Why honey sticks and gummies instead of raw resin or capsules?",
    a: "Because this compound only pays you back on the days you take it. Raw resin is bitter and hard to take; capsules are forgettable. The honey is the one you actually look forward to — golden, caramel, ten seconds, tied to your morning session. The gummies are the one you never miss — gym bag, 6 AM flight, hotel room, zero mess, exact dose. Owning both means there are no bad weeks.",
  },
  {
    q: "Shipping & guarantee",
    a: "Ships from our U.S. fulfillment center in 5–10 business days, free inside your headphone box when ordered together. 30 days, full refund, no questions, no return shipping — same as the headphones.",
  },
];

const faqsHoney = [
  {
    q: "How do I take the honey?",
    a: "Tear the stick at the top notch — no scissors, no measuring, no mess. Squeeze it straight into your mouth, or stir it into tea, coffee, or warm water. Caramel first, then something mineral underneath. Morning works best, or about thirty minutes before a workout. Then headphones on: ten seconds of honey, sixty seconds of frequency.",
  },
  {
    q: "What if I miss a day?",
    a: "Just continue the next one. Don't double up. The only thing that really matters is doing it daily, because the benefits compound rather than arriving all at once.",
  },
];

const faqsGummies = [
  {
    q: "When should I take the gummies?",
    a: "Anytime, but they're built for the evening and the road. One gummy ritual at night pairs with a calm frequency session and wind-down into sleep that actually repairs you. They're also the travel-proof dose: gym bag, flight, hotel room, the day you skipped breakfast and left at seven. Zero mess, exact dose, no sugar spike before bed.",
  },
  {
    q: "Honey in the morning, gummies at night — do I need both?",
    a: "Same mountain mineral in both, different hour, different job. The honey builds the habit because it's the one you actually want. The gummies cover everything the morning doesn't — travel, the gym, the chaotic days. You can start with either. The bundle exists because most people end up wanting both.",
  },
  {
    q: "Is one month enough to feel the full effect?",
    a: "Honestly, no. A single month ends right as the good part begins. Energy in week one is nice, clarity in week two is better — but the number the study actually measured came at ninety days, and most people never get there because they run out around week four. That's why the 2-month supply and the bundle exist: they carry you past the gap.",
  },
  {
    q: "How does it work with the headphones?",
    a: "The headphones shift your state in under sixty seconds — that's the instant side. That shift runs on energy, and your cells make energy out of minerals. The gummies and honey are the side that builds underneath it, one morning and one night at a time. Tune the signal. Feed the signal.",
  },
];

export default function HoneyLanding() {
  const [selected, setSelected] = useState<OptionId>("bundle");
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<Set<string>>(new Set());
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const isCartLoading = useCartStore((s) => s.isLoading);

  const honey = useShopifyProductByHandle(HANDLES.honey);
  const gummies = useShopifyProductByHandle(HANDLES.gummies);
  const bundle = useShopifyProductByHandle(HANDLES.bundle);
  const products = useMemo(
    () => ({ honey: honey.data, gummies: gummies.data, bundle: bundle.data }),
    [honey.data, gummies.data, bundle.data]
  );

  const priceFor = (opt: OptionSpec) => {
    const variant = variantFor(opt);
    const amount = variant ? parseFloat(variant.price.amount) : NaN;
    return Number.isFinite(amount) ? amount : opt.fallbackPrice;
  };

  function variantFor(opt: OptionSpec) {
    const edges = products[opt.id]?.node.variants.edges ?? [];
    return edges.find((e) => e.node.title === opt.variantTitle)?.node ?? edges[edges.length - 1]?.node;
  }

  const activeOption = OPTIONS.find((o) => o.id === selected) ?? OPTIONS[0];
  const total = priceFor(activeOption) * quantity;

  /** Shopify product images for the selected option, falling back to local art. */
  const activeGallery = useMemo(() => {
    const edges = products[activeOption.id]?.node.images?.edges ?? [];
    const shopifyImages = edges
      .filter((e) => !!e.node.url)
      .map((e) => ({
        src: e.node.url,
        alt: e.node.altText || `${activeOption.name} — ${activeOption.subLabel}`,
      }));
    return shopifyImages.length ? shopifyImages : gallery;
  }, [products, activeOption]);

  useEffect(() => {
    setIndex(0);
  }, [selected]);

  useEffect(() => {
    document.title = "High Frequency Honey — Shilajit Mineral Honey & Gummies";
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);
  const step = (dir: number) => {
    setIndex((i) => (i + dir + activeGallery.length) % activeGallery.length);
  };


  const handleAdd = async () => {
    const product = products[activeOption.id];
    const variant = product ? variantFor(activeOption) : null;
    if (!product || !variant) {
      toast.error("Still loading the store. Please tap again in a moment.", { position: "top-center" });
      return;
    }
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    openDrawer();
  };

  const current = activeGallery[Math.min(index, activeGallery.length - 1)];

  return (
    <div className="hfhoney">
      <header className="hny-nav">
        <a href="/" className="hny-brand" aria-label="High Frequency">
          <img src={logoAsset.url} alt="High Frequency logo" />
        </a>
        <div className="hny-nav-actions">
          <CartDrawer />
        </div>
      </header>

      <main>
        <section className="hny-pdp" data-theme="light" id="buy">
          <div className="hny-container hny-pdp-grid">
            <div className="hny-gallery" ref={galleryRef}>
              <div className="hny-main-image">
                <img src={current.src} alt={current.alt} />
                <button type="button" className="hny-arrow hny-arrow-prev" aria-label="Previous image" onClick={() => step(-1)}>
                  <ChevronLeft size={16} />
                </button>
                <button type="button" className="hny-arrow hny-arrow-next" aria-label="Next image" onClick={() => step(1)}>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="hny-thumbs">
                {activeGallery.map((g, i) => (
                  <button
                    key={g.src}
                    type="button"
                    className={`hny-thumb ${i === index ? "is-active" : ""}`}
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setIndex(i)}
                  >
                    <img src={g.src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="hny-info">
              <span className="hny-eyebrow">Himalayan Shilajit · 75%+ Fulvic</span>
              <span className="hny-stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </span>
              <h1 className="hny-h1">High Frequency Honey</h1>
              <p className="hny-sub">
                Sacred Himalayan shilajit folded into certified organic caramel honey — and set into tamarind
                multivitamin gummies. The mineral your brain runs on, in the formats you'll actually keep doing.
              </p>

              <ul className="hny-bullets">
                <li><span className="hny-check"><Check size={12} /></span>85+ ionic trace minerals, 400mg per serving</li>
                <li><span className="hny-check"><Check size={12} /></span>Lab-verified 75%+ fulvic acid, heavy metals Non-Detect</li>
                <li><span className="hny-check"><Check size={12} /></span>No caffeine. Nothing spikes, nothing crashes</li>
                <li><span className="hny-check"><Check size={12} /></span>Ten seconds in the morning. Two gummies at night</li>
              </ul>

              <div className="hny-purchase">
                <div className="hny-options" role="radiogroup" aria-label="Choose your ritual">
                  {OPTIONS.map((opt) => {
                    const price = priceFor(opt);
                    const isSel = opt.id === selected;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSel}
                        className={`hny-option ${isSel ? "is-selected" : ""}`}
                        onClick={() => {
                          setSelected(opt.id);
                          setQuantity(1);
                        }}
                      >
                        {opt.badge && <span className={`hny-badge hny-badge-${opt.badge.tone}`}>{opt.badge.label}</span>}
                        <span className="hny-radio" aria-hidden="true" />
                        <span className="hny-option-info">
                          <span className="hny-option-name">
                            {opt.name} <span className="hny-option-sub">/ {opt.subLabel}</span>
                          </span>
                          <span className="hny-option-tag">{opt.tagline}</span>
                          <span className="hny-option-save">Save {money(Math.max(0, opt.compareAt - price))}</span>
                        </span>
                        <span className="hny-option-pricing">
                          <span className="hny-compare">{money(opt.compareAt)}</span>
                          <span className="hny-price">{money(price)}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="hny-qty-row">
                  <span className="hny-qty-label">Quantity</span>
                  <div className="hny-qty">
                    <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                      <Minus size={16} />
                    </button>
                    <span className="hny-qty-value" aria-live="polite">{quantity}</span>
                    <button type="button" aria-label="Increase quantity" disabled={quantity >= 10} onClick={() => setQuantity((q) => Math.min(10, q + 1))}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button type="button" className="hny-cta" onClick={handleAdd} disabled={isCartLoading}>
                  {isCartLoading ? <Loader2 className="animate-spin h-5 w-5" /> : `ADD TO CART · ${money(total)}`}
                </button>
                <p className="hny-guarantee">30-Day Money-Back Guarantee · Ships in 5–10 business days</p>
              </div>
            </div>
          </div>
        </section>

        <section className="hny-market" data-theme="light">
          <div className="hny-container hny-market-grid">
            {marketplaceIntro.map((block) => (
              <article key={block.title} className="hny-market-card">
                <span className="hny-eyebrow">{block.eyebrow}</span>
                <h2>{block.title}</h2>
                {block.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="hny-benefits" data-theme="light">
          <div className="hny-container">
            <div className="hny-benefits-grid">
              <div className="hny-benefits-left">
                <div className="hny-section-head">
                  <span className="hny-eyebrow">Product benefits</span>
                  <h2>What compounds, and when</h2>
                  <p>
                    This is a compounding mineral, never a stimulant. Coffee borrows energy and bills you at 2 PM. Minerals
                    build it.
                  </p>
                </div>
                <div className="hny-timeline">
                  {benefitTimeline.map((item) => (
                    <article key={item.week} className="hny-time-card">
                      <span>{item.week}</span>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
              <figure className="hny-timeline-figure">
                <img
                  src={benefitTimelineAsset.url}
                  alt="Product benefits timeline: Week 1 energy and sleep, Week 2 focus holds, Week 4 faster recovery, Week 12 the full compound"
                  width="1080"
                  height="1080"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="hny-gummies" data-theme="light">
          <div className="hny-container">
            <div className="hny-gummies-hero">
              <div className="hny-gummies-copy">
                <span className="hny-eyebrow">High Frequency Gummies</span>
                <h2>Your brain runs on minerals.</h2>
                <p>
                  Every thought, every meditation, every locked-in work block burns them. Modern food, grown in tired soil,
                  barely delivers them anymore. That shortage is the real story behind the 2 PM collapse and the fog that
                  shows up right when you need to think clearly.
                </p>
                <p>
                  The gummies make the supply portable: purified Himalayan resin sourced above 16,000 feet, standardized to
                  75%+ fulvic acid, with 85+ ionic trace minerals. Natural tamarind flavor, low sugar, vegan, gluten free,
                  non-GMO, and no preservatives.
                </p>
              </div>
              <figure className="hny-gummies-figure">
                <img
                  src={gummiesHeroAsset.url}
                  alt="High Frequency Gummies jar — one daily vitamin from 16,000 ft"
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="hny-gummies-benefits">
              {gummiesBenefits.map((benefit) => (
                <article key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {story.map((s, i) => (
          <section key={s.id} className={`hny-story ${i % 2 === 1 ? "is-reversed" : ""}`} data-theme="light">
            <div className="hny-container hny-story-grid">
              <div className="hny-story-copy">
                <h2>{s.title}</h2>
                {s.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <figure className="hny-story-media">
                <img src={s.image} alt={s.alt} loading="lazy" />
              </figure>
            </div>
          </section>
        ))}


        <section className="hny-info-section" data-theme="light">
          <div className="hny-container">
            <div className="hny-section-head">
              <span className="hny-eyebrow">Product information</span>
              <h2>Ingredients, nutrition, testing, and safety</h2>
            </div>

            <div className="hny-info-row">
              <div className="hny-info-copy">
                <span className="hny-eyebrow">Honey sticks</span>
                <h3>What's in the honey sticks</h3>
                <div className="hny-info-accs">
                  {honeyPanels.map((panel, i) => (
                    <details key={panel.q} className="hny-info-acc" open={i < 1}>
                      <summary>{panel.q}</summary>
                      <p>{panel.a}</p>
                    </details>
                  ))}
                </div>
              </div>
              <figure className="hny-info-figure">
                <img
                  src={honeySupplementFactsAsset.url}
                  alt="High Frequency Honey supplement facts panel — 1 stick, 30 servings, 400mg shilajit resin"
                  loading="lazy"
                />
              </figure>
            </div>

            <div className="hny-info-row is-reversed">
              <figure className="hny-info-figure">
                <img
                  src={gummiesMineralsAsset.url}
                  alt="High Frequency Gummies — 85+ ionic trace minerals in two daily gummies"
                  loading="lazy"
                />
              </figure>
              <div className="hny-info-copy">
                <span className="hny-eyebrow">Multivitamin gummies</span>
                <h3>What's in the gummies</h3>
                <div className="hny-info-accs">
                  {gummiesPanels.map((panel, i) => (
                    <details key={panel.q} className="hny-info-acc" open={i < 1}>
                      <summary>{panel.q}</summary>
                      <p>{panel.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="hny-faq" data-theme="light">
          <div className="hny-container">
            <h2 className="hny-faq-title">Questions, answered</h2>

            <div className="hny-faq-row">
              <div className="hny-faq-copy">
                <span className="hny-eyebrow">The practice &amp; the honey</span>
                <div className="hny-acc-list">
                  {[...faqsShared, ...faqsHoney].map((f, i) => {
                    const key = `a-${i}`;
                    return (
                      <details
                        key={f.q}
                        className="hny-acc"
                        open={openFaq.has(key)}
                        onToggle={(e) => {
                          const el = e.currentTarget;
                          setOpenFaq((prev) => {
                            const next = new Set(prev);
                            if (el.open) next.add(key);
                            else next.delete(key);
                            return next;
                          });
                        }}
                      >
                        <summary>
                          <span>{f.q}</span>
                          <span className="hny-acc-icon" aria-hidden="true" />
                        </summary>
                        <div className="hny-acc-body">
                          <p>{f.a}</p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
              <figure className="hny-info-figure hny-faq-figure">
                <img
                  src={faqSignalAsset.url}
                  alt="Morning ritual — High Frequency Honey stick and headphones, tune the signal, feed the signal"
                  loading="lazy"
                />
              </figure>
            </div>

            <div className="hny-faq-row is-reversed">
              <figure className="hny-info-figure hny-faq-figure">
                <img
                  src={faqGummiesAsset.url}
                  alt="High Frequency Gummies jar beside frequency headphones and the app on a phone"
                  loading="lazy"
                />
              </figure>
              <div className="hny-faq-copy">
                <span className="hny-eyebrow">The gummies &amp; the ritual</span>
                <div className="hny-acc-list">
                  {faqsGummies.map((f, i) => {
                    const key = `b-${i}`;
                    return (
                      <details
                        key={f.q}
                        className="hny-acc"
                        open={openFaq.has(key)}
                        onToggle={(e) => {
                          const el = e.currentTarget;
                          setOpenFaq((prev) => {
                            const next = new Set(prev);
                            if (el.open) next.add(key);
                            else next.delete(key);
                            return next;
                          });
                        }}
                      >
                        <summary>
                          <span>{f.q}</span>
                          <span className="hny-acc-icon" aria-hidden="true" />
                        </summary>
                        <div className="hny-acc-body">
                          <p>{f.a}</p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            </div>


            <div className="hny-final">
              <h2>One mineral. Two rituals.</h2>
              <p>Start tomorrow morning on a higher frequency.</p>
              <button type="button" className="hny-cta hny-cta-wide" onClick={handleAdd} disabled={isCartLoading}>
                {isCartLoading ? <Loader2 className="animate-spin h-5 w-5" /> : `ADD TO CART · ${money(total)}`}
              </button>
            </div>

            <p className="hny-disclaimer">
              These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any
              disease.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
