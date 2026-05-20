import { useState, useRef, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Star, Loader2 } from "lucide-react";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProductByHandle";
import { useCartStore } from "@/stores/cartStore";

// Landing page price test — points at the duplicated $169.99 product.
// Change this handle to swap which Shopify product this LP sells.
const LP_PRODUCT_HANDLE = "high-frequency-headphones-lp-test-169-99";

// Branded product gallery images
import img01 from "@/assets/product/01-resets-brain-60s.png";
import img02 from "@/assets/product/02-meditation-works.png";
import img03 from "@/assets/product/03-more-use-less-need.png";
import img04 from "@/assets/product/04-frequency-dude.png";
import img05 from "@/assets/product/05-no-pills-no-migraines.png";
import img06 from "@/assets/product/06-tinnitus.png";
import img07 from "@/assets/product/07-100x-per-second.png";
import img08 from "@/assets/product/08-transported-me.png";
import img09 from "@/assets/product/09-fall-asleep-without-melatonin.png";
import img10 from "@/assets/product/10-not-chemicals-frequency.png";
import img11 from "@/assets/product/11-coffee-dehydrates.png";
import img12 from "@/assets/product/12-one-purchase-replaces.png";
import img13 from "@/assets/product/13-spine-straightens.png";
import img14 from "@/assets/product/14-lock-in-without-adderall.png";
import img15 from "@/assets/product/15-from-adderall-to-frequency.png";

type GalleryItem = { src: string; alt: string };

const brandGallery: GalleryItem[] = [
  { src: img01, alt: "Resets your brain in under 60 seconds" },
  { src: img02, alt: "Meditation that actually works" },
  { src: img03, alt: "The more you use it, the less you need it" },
  { src: img04, alt: "Will.i.am quote — the frequency dude" },
  { src: img05, alt: "No more pills, no more migraines" },
  { src: img06, alt: "This got rid of my tinnitus" },
  { src: img07, alt: "100x per second vibration through bone" },
  { src: img08, alt: "This transported me — Everett Taylor, CEO of Kickstarter" },
  { src: img09, alt: "Fall asleep without melatonin" },
  { src: img10, alt: "Not chemicals. Frequency." },
  { src: img11, alt: "Your coffee dehydrates your brain" },
  { src: img12, alt: "One purchase replaces all three" },
  { src: img13, alt: "The spine straightens. The eyes widen." },
  { src: img14, alt: "Lock in for hours without Adderall" },
  { src: img15, alt: "From Adderall to frequency" },
];

const accordionItems = [
  {
    title: "What's the science behind HFH?",
    body: (
      <>
        <p>Your brain operates on frequencies. When you're focused, it's on one frequency. When you're scattered, it's on another.</p>
        <p>These headphones deliver the exact frequency you need, directly through your skull, using bone conduction and vibration at the same time. The transducers pulse 100 times per second through your bones. Your brain doesn't just hear the frequency. It physically feels it. And it locks in.</p>
        <p>The technology is based on decades of government-funded neuroscience research, including the CIA's declassified Gateway Process, which proved sound frequencies can shift brain states on command.</p>
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
        <p>Every session builds neuroplasticity. Your brain forms stronger neural pathways for focus, calm, and flow.</p>
        <p>Over time, your brain gets better at entering those states on its own, without the device.</p>
        <p>Adderall and coffee create dependency. This builds independence. That's the entire point.</p>
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
];

const ProductBlock = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
              <span className="pdp-rating-count">300+ RECORDED REACTIONS</span>
            </div>

            <h2 className="pdp-headline">High Frequency Headphones<sup>™</sup></h2>

            <p className="pdp-subhead">Reset your brain in under 60 seconds. Frequency headphones that shift your brain state on demand. Focus. Calm. Energy. Flow. Sleep. The more you use them, the less you need them.</p>

            <ul className="pdp-bullets">
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Resets Brain State in Under 60 Seconds</li>
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Builds Neuroplasticity, Not Dependency</li>
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Backed by Decades of Neuroscience</li>
              <li><span className="pdp-bullet-check"><Check size={12} /></span>Used in 25+ Countries Worldwide</li>
            </ul>

            <label className="pdp-price-box" htmlFor="pdpBuyOption">
              <input type="radio" id="pdpBuyOption" name="pdp-buy-option" className="pdp-price-radio" defaultChecked />
              <span className="pdp-price-radio-fake" aria-hidden="true"></span>
              <span className="pdp-price-label">BUY 1</span>
              <span className="pdp-save-badge">SAVE $50</span>
              <span className="pdp-price-amounts">
                <span className="pdp-price-now">
                  {product ? `${product.node.priceRange.minVariantPrice.currencyCode === 'USD' ? '$' : ''}${Math.floor(parseFloat(product.node.priceRange.minVariantPrice.amount))}` : "$169"}
                </span>
                <span className="pdp-price-was">$347</span>
              </span>
            </label>

            <button 
              className="pdp-cta w-full flex justify-center items-center"
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
                  quantity: 1,
                  selectedOptions: selectedVariant.selectedOptions || []
                });

                const url = useCartStore.getState().getCheckoutUrl();
                if (url) window.open(url, "_blank");
              }}
              disabled={isCartLoading || !product}
            >
              {isCartLoading ? <Loader2 className="animate-spin h-6 w-6" /> : "BUY NOW"}
            </button>

            <p className="pdp-trust">
              <span aria-hidden="true">⚡</span> Limited Stock Remaining · Ships With Next Batch <span aria-hidden="true">⚡</span>
            </p>

            <div className="pdp-accordion">
              {accordionItems.map((item, i) => (
                <details
                  key={item.title}
                  className="pdp-acc"
                  open={openIndex === i}
                  onToggle={(e) => {
                    const el = e.currentTarget;
                    if (el.open) setOpenIndex(i);
                    else if (openIndex === i) setOpenIndex(null);
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
