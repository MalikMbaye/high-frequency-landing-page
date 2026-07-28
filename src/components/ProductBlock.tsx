import { useState, useRef, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Star, Loader2, Minus, Plus } from "lucide-react";

import { useShopifyProductByHandle } from "@/hooks/useShopifyProductByHandle";
import { useCartStore } from "@/stores/cartStore";

// Landing page price test — points at the duplicated $169.99 product.
// Change this handle to swap which Shopify product this LP sells.
const LP_PRODUCT_HANDLE = "high-frequency-headphones-lp-test-169-99";

// Branded product gallery images
import img01 from "@/assets/product/01-resets-brain-60s.webp";
import img02 from "@/assets/product/02-meditation-works.webp";
import img03 from "@/assets/product/03-more-use-less-need.webp";
import img04 from "@/assets/product/04-frequency-dude.webp";
import img07 from "@/assets/product/07-100x-per-second.webp";
import img08 from "@/assets/product/08-transported-me.webp";
import img10 from "@/assets/product/10-not-chemicals-frequency.webp";
import img11 from "@/assets/product/11-coffee-dehydrates.webp";
import img12 from "@/assets/product/12-one-purchase-replaces.webp";
import img13 from "@/assets/product/13-spine-straightens.webp";

type GalleryItem = { src: string; alt: string };

const brandGallery: GalleryItem[] = [
  { src: img01, alt: "Feel a shift in under 60 seconds" },
  { src: img02, alt: "Meditation that actually works" },
  { src: img03, alt: "The more you use it, the less you need it" },
  { src: img04, alt: "Will.i.am quote — the frequency dude" },
  { src: img07, alt: "100x per second vibration through bone" },
  { src: img08, alt: "This transported me — Everett Taylor, CEO of Kickstarter" },
  { src: img10, alt: "Not chemicals. Frequency." },
  { src: img11, alt: "Your coffee dehydrates your brain" },
  { src: img12, alt: "One purchase replaces all three" },
  { src: img13, alt: "The spine straightens. The eyes widen." },
];

const accordionItems = [
  {
    title: "What's the science behind HFH?",
    body: (
      <>
        <p>Your brain operates on frequencies. When you're focused, it's on one frequency. When you're scattered, it's on another.</p>
        <p>These headphones deliver the exact frequency you need, directly through your skull, using frequency technology and vibration at the same time. The transducers pulse 100 times per second through your bones. Your brain doesn't just hear the frequency. It physically feels it. And it locks in.</p>
        <p>The technology is inspired by decades of research into sound frequencies and brain states, including the CIA's declassified Gateway Process, which explored how frequency patterns can influence brainwave activity.</p>
      </>
    ),
  },
  {
    title: "How fast does it work?",
    body: (
      <>
        <p>The first time you put them on, you'll feel the shift in under 60 seconds.</p>
        <p>We've recorded over 300 first-time reactions on camera. The eyes widen. The spine straightens. Everyone says the same thing.</p>
        <p>It's not subtle. Your brain recognizes the frequency immediately.</p>
      </>
    ),
  },
  {
    title: "What does \"the more you use it, the less you need it\" mean?",
    body: (
      <>
        <p>Every session helps train your brain toward stronger focus, calm, and flow.</p>
        <p>Over time, many users find it easier to enter those states on their own, without the device.</p>
        <p>Stimulants create dependency. This is designed to build independence. That's the entire point.</p>
      </>
    ),
  },
  {
    title: "What's in the box?",
    body: (
      <ul className="pdp-checks">
        <li>High Frequency Headphones<sup>™</sup></li>
        <li>Noise Isolation Earplugs</li>
        <li>USB-C Charging Cable</li>
        <li>Quick Start Guide</li>
        <li>Access to the HFH Frequency App (100,000+ downloads)</li>
      </ul>
    ),
  },
  {
    title: "Technical specifications",
    body: (
      <dl className="pdp-spec-list">
        <div><dt>Transducers</dt><dd>Dual transducer, 100 Hz vibration delivery</dd></div>
        <div><dt>Frequency Range</dt><dd>Full Rife frequency library + Gateway Process binaural patterns</dd></div>
        <div><dt>Connectivity</dt><dd>Bluetooth 5.3, full hands-free</dd></div>
        <div><dt>Battery Life</dt><dd>8 hours active use, 10 days standby</dd></div>
        <div><dt>Charging</dt><dd>USB-C, 1.5 hours full charge</dd></div>
        <div><dt>Materials</dt><dd>Aerospace-grade titanium frame, medical-grade silicone pads</dd></div>
        <div><dt>Weight</dt><dd>29g</dd></div>
        <div><dt>Water Resistance</dt><dd>IP55</dd></div>
        <div><dt>Compatibility</dt><dd>iOS, Android, all Bluetooth devices</dd></div>
      </dl>
    ),
  },
  {
    title: "The Frequency App",
    body: (
      <>
        <p>Five brain states. One tap each.</p>
        <p>
          <strong>Focus</strong> — Lock into deep work for hours. No crash. No side effects.<br />
          <strong>Calm</strong> — Drop your stress response in seconds.<br />
          <strong>Energy</strong> — Replace the morning coffee. No jitters.<br />
          <strong>Flow</strong> — Enter creative flow on demand.<br />
          <strong>Sleep</strong> — Fall asleep faster, stay asleep longer.
        </p>
        <p>Every state runs on a precision frequency stack. Includes the full Rife frequency library, Gateway Process binaural patterns, and AI-powered personalized meditation that adapts to your brain in real time.</p>
        <p>100,000+ downloads. 81% retention rate.</p>
      </>
    ),
  },
  {
    title: "Shipping & Delivery",
    body: (
      <>
        <p>Orders ship from our U.S. fulfillment center. Each unit is hand-assembled, individually tested, and quality-inspected before shipping.</p>
        <p><strong>In-stock orders:</strong> 5-10 business days from order date.</p>
        <p><strong>International:</strong> 14-28 business days depending on destination.</p>
        <p>You will receive a tracking number by email once your order ships. Questions? <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a> — we respond within 24 hours.</p>
        <p>Full details on our <a href="/shipping">Shipping & Return Policy</a> page.</p>
      </>
    ),
  },
];

const ProductBlock = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const [quantity, setQuantity] = useState(1);
  const fadeTimer = useRef<number | null>(null);


  const { data: product } = useShopifyProductByHandle(LP_PRODUCT_HANDLE);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  
  const cycle = brandGallery;
  
  const thumbs = cycle.slice(1);

  useEffect(() => {
    return () => {
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    };
  }, []);

  const setImage = (target: number) => {
    let next = target;
    if (next < 0) next = cycle.length - 1;
    if (next >= cycle.length) next = 0;
    if (next === index) return;
    setIsFading(true);
    if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    fadeTimer.current = window.setTimeout(() => {
      setIndex(next);
      setIsFading(false);
    }, 200);
  };

  const current = cycle[index];

  return (
    <section className="section pdp-section" id="buy" data-theme="light">
      <div className="hfh-container">
        <div className="pdp-grid">
          {/* LEFT — Gallery */}
          <div className="pdp-gallery">
            <div className={`pdp-main-image ${isFading ? "is-fading" : ""}`}>
              <img src={current?.src} alt={current?.alt || ""} />
              <button
                className="pdp-arrow pdp-arrow-prev"
                aria-label="Previous image"
                onClick={() => setImage(index - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="pdp-arrow pdp-arrow-next"
                aria-label="Next image"
                onClick={() => setImage(index + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="pdp-thumbs" role="tablist" aria-label="Product images">
              {thumbs.map((t, i) => (
                <button
                  key={t.src}
                  className={`pdp-thumb ${index === i + 1 ? "is-active" : ""}`}
                  aria-label={`View image ${i + 1}`}
                  onClick={() => setImage(i + 1)}
                  type="button"
                >
                  <img src={t.src} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="pdp-info">
            <div className="pdp-rating">
              <span className="pdp-stars" aria-label="5 out of 5 stars">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </span>
            </div>

            <h2 className="pdp-headline">High Frequency Headphones<sup>™</sup></h2>

            <p className="pdp-subhead">Feel a shift in under 60 seconds. Frequency headphones that help you shift your brain state on demand. Focus. Calm. Energy. Flow. Sleep. The more you use them, the less you need them.</p>

            <ul className="pdp-bullets">
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Feel a Shift in Under 60 Seconds</li>
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Builds a Habit, Not a Dependency</li>
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Inspired by Decades of Frequency Research</li>
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Used in 200+ Countries Worldwide</li>
            </ul>

            <div className="pdp-purchase-card">
              <div className="pdp-price-row">
                <span className="pdp-price-now">
                  ${product ? Math.floor(parseFloat(product.node.priceRange.minVariantPrice.amount)) * quantity : 169 * quantity}
                </span>
                <span className="pdp-price-was">${347 * quantity}</span>
                <span className="pdp-save-badge">SAVE $178 · 51%</span>
              </div>

              <div className="pdp-qty" role="group" aria-label="Quantity">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>
                  <Minus size={14} />
                </button>
                <span className="pdp-qty-value" aria-live="polite">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(10, q + 1))}>
                  <Plus size={14} />
                </button>
              </div>

              <button
                className="pdp-cta"
              onClick={async (e) => {
                e.preventDefault();
                if (!product) return;
                const selectedVariant = product.node.variants.edges[0]?.node;
                if (!selectedVariant) return;
                
                await addItem({
                  product,
                  variantId: selectedVariant.id,
                  variantTitle: selectedVariant.title,
                  price: selectedVariant.price,
                  quantity,
                  selectedOptions: selectedVariant.selectedOptions || []
                });


                useCartStore.getState().openDrawer();
              }}
              disabled={isCartLoading || !product}
            >
              {isCartLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Order Now"}
            </button>
            </div>

            <p className="pdp-trust">
              <span aria-hidden="true">⚡</span> In Stock · Arrives in as little as 3 days <span aria-hidden="true">⚡</span>
            </p>

            <DeliveryTimeline />


            <div className="pdp-accordion">
              {accordionItems.map((item, i) => (
                <details
                  key={item.title}
                  className="pdp-acc"
                  open={openIndexes.has(i)}
                  onToggle={(e) => {
                    const el = e.currentTarget;
                    setOpenIndexes((prev) => {
                      const next = new Set(prev);
                      if (el.open) next.add(i);
                      else next.delete(i);
                      return next;
                    });
                  }}
                >
                  <summary className="pdp-acc-summary">
                    <span className="pdp-acc-title">{item.title}</span>
                    <span className="pdp-acc-icon" aria-hidden="true"></span>
                  </summary>
                  <div className="pdp-acc-body">{item.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBlock;
