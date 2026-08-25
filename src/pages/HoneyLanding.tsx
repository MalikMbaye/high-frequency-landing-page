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
    name: "The Morning",
    subLabel: "30 Honey Stix",
    tagline: "One golden stick a day. Ten seconds, and the morning is handled.",
    variantTitle: "1-Month Supply (30x High Frequency Honey Stix)",
    fallbackPrice: 33.33,
    compareAt: 59.99,
  },
  {
    id: "gummies",
    name: "The Night",
    subLabel: "60 Tamarind Gummies",
    tagline: "Two gummies before bed. Zero mess, exact dose, no sugar spike.",
    variantTitle: "2-Month Supply of Vitamins (60x Gummies)",
    fallbackPrice: 66.66,
    compareAt: 99.99,
  },
  {
    id: "bundle",
    name: "The Full Ritual",
    subLabel: "30 Honey Stix + 60 Gummies",
    tagline: "Both halves of the day. The only version that reaches week twelve.",
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
    image: honeyDipperWood,
    alt: "Raw mineral resin beside pouring honey",
    paras: [
      "Here's what almost nobody knows: your brain runs on minerals. Every thought, every meditation, every focused hour burns them. And modern food, grown in tired soil, barely delivers them anymore.",
      "That's the real story behind the afternoon crash and the fog. Coffee can't fix it, because coffee borrows energy and bills you later. Minerals build energy from the inside.",
      "Shilajit carries 85+ trace minerals in the exact form your cells absorb. It's the supply your practice has been missing.",
    ],
  },
  {
    id: "sacred",
    title: "A sacred secret, kept by the Himalayas",
    image: honeyGoldSpoon,
    alt: "Dark mineral resin on a brass spoon",
    paras: [
      "High above the tree line, a rare black substance seeps out of sun-warmed rock. Locals have climbed to gather it by hand for thousands of years. The old Sanskrit texts named it the destroyer of weakness.",
      "The mountains spend centuries pressing ancient plants between layers of rock until they become a dense mineral essence — one of the richest natural sources of trace minerals on earth. 85+ of them, in the ionic form your cells absorb directly.",
      "We fold it into certified organic caramel honey for the morning, and set it into a tamarind gummy for the night. The mountain made it powerful. We made it something you'll actually keep doing.",
    ],
  },
  {
    id: "two-rituals",
    title: "One you look forward to. One you never miss.",
    image: honeyCup,
    alt: "A warm cup with a honey stick beside it",
    paras: [
      "Same mineral in both. Completely different reasons to own them.",
      "The honey is the morning. Golden, caramel, tied to your session, ten seconds start to finish. It's the one you actually want, which is why it builds the habit in the first place.",
      "The gummies are everything the morning doesn't cover. The gym bag. The 6 AM flight. The hotel room. The day you skipped breakfast and left the house at seven.",
      "This compound only pays you back on the days you take it. So the format that survives your worst week is the one that decides your results. Owning both means there are no bad weeks.",
    ],
  },
  {
    id: "weeks",
    title: "It builds week by week, just like your practice",
    image: honeyWave,
    alt: "Gold waveform across matte black",
    paras: [
      "Week one is energy and sleep. Steadier through the day, deeper at night, usually between day five and day seven. The 2 PM collapse goes quiet.",
      "Week two is clarity. The fog thins, focus holds on its own, and the afternoon stops needing rescue. Weeks four through eight bring the physical side: faster recovery between sessions, less soreness, more output from the same training.",
      "By week twelve the full effect lands. Nothing spikes. Nothing crashes. It compounds.",
    ],
  },
  {
    id: "week-four",
    title: "Most people quit at week four. The result lands at week twelve.",
    image: honeyFacts,
    alt: "Supplement facts panel",
    paras: [
      "That's the whole reason the full ritual exists as one box instead of two separate purchases.",
      "A single month ends right as the good part begins. Energy in week one is nice. Clarity in week two is better. Almost nobody gets to the part that matters, because they run out somewhere around week four and never reorder.",
      "Sixty gummies and thirty sticks carries you past that gap.",
    ],
  },
];

const faqs = [
  {
    q: "What exactly is in it?",
    a: "Purified Himalayan mineral resin folded into certified organic caramel honey (morning) and set into a tamarind gummy (night). Three ingredients you can pronounce. Every batch independently tested, heavy metals Non-Detect.",
  },
  {
    q: "How do I take it?",
    a: "Morning: tear one stick, ten seconds, straight or stirred into tea or coffee. Night: two gummies. That's it — nothing to measure, nothing to remember.",
  },
  {
    q: "Is it a stimulant?",
    a: "No. There is no caffeine and nothing that spikes. It's fuel, not a stimulant — which is why there's no crash on the other side of it.",
  },
  {
    q: "When will I feel something?",
    a: "Most people notice steadier energy and deeper sleep somewhere between day five and day seven, and clearer focus in the second week. It compounds from there.",
  },
  {
    q: "Shipping & guarantee",
    a: "Ships from our U.S. fulfillment center in 5–10 business days. 30 days, full refund, no questions.",
  },
];

export default function HoneyLanding() {
  const [selected, setSelected] = useState<OptionId>("bundle");
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set());
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

  useEffect(() => {
    document.title = "High Frequency Honey — Shilajit Mineral Honey & Gummies";
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);
  const step = (dir: number) => {
    setIndex((i) => (i + dir + gallery.length) % gallery.length);
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

  const current = gallery[index];

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
                {gallery.map((g, i) => (
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
                Sacred Himalayan shilajit folded into certified organic caramel honey — and set into a tamarind gummy for
                the night. The mineral your brain runs on, in the two formats you'll actually keep doing.
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

        <section className="hny-faq" data-theme="light">
          <div className="hny-container">
            <h2 className="hny-faq-title">Questions</h2>
            <div className="hny-acc-list">
              {faqs.map((f, i) => (
                <details
                  key={f.q}
                  className="hny-acc"
                  open={openFaq.has(i)}
                  onToggle={(e) => {
                    const el = e.currentTarget;
                    setOpenFaq((prev) => {
                      const next = new Set(prev);
                      if (el.open) next.add(i);
                      else next.delete(i);
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
              ))}
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
