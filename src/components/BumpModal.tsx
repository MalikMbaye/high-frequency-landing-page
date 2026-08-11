import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Loader2 } from "lucide-react";
import "./upsell.css";
import { pickBumpVariant, type BumpCopy } from "@/content/upsellCopy";
import { trackBump } from "@/lib/bumpAnalytics";
import BumpGallery from "@/components/BumpGallery";
import BumpAccordion from "@/components/BumpAccordion";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

// ---------------------------------------------------------------------------
// Imperative trigger. Call showBumpModal() from any add-to-cart handler; the
// modal mounts lazily (nothing of it is in the initial DOM until triggered).
// ---------------------------------------------------------------------------
type Listener = (onContinue?: () => void) => void;
let listener: Listener | null = null;

/** Returns true if the modal was shown (i.e. the caller should NOT continue itself). */
export function showBumpModal(onContinue?: () => void): boolean {
  if (typeof window === "undefined") return false;
  if (!listener) return false;
  // Intentionally shown on every add-to-cart (no session suppression).
  listener(onContinue);
  return true;
}


// The trial lives on its own handle when it exists; otherwise we fall back to the
// 3-stick variant on the main honey product.
const TRIAL_HANDLE = "high-frequency-honey-trial";
const MONTH_HANDLE = "high-frequency-honey";
const TRIAL_VARIANT_FALLBACK = "gid://shopify/ProductVariant/44712793964610"; // 3x stix
const MONTH_VARIANT_ID = "gid://shopify/ProductVariant/44712941879362"; // 30x stix


interface ResolvedOffer {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
}

function pickVariant(node: { variants?: { edges?: Array<{ node: Record<string, unknown> }> } }, preferredId: string) {
  const variants = node?.variants?.edges ?? [];
  const preferred = variants.find((v) => (v.node as { id: string }).id === preferredId);
  if (preferred) return preferred.node as never;
  const sorted = [...variants].sort(
    (a, b) =>
      parseFloat((a.node as { price: { amount: string } }).price.amount) -
      parseFloat((b.node as { price: { amount: string } }).price.amount),
  );
  return (sorted[0]?.node ?? null) as never;
}

async function fetchOffer(handle: string, preferredVariantId: string): Promise<ResolvedOffer | null> {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    const node = data?.data?.product;
    if (!node) return null;
    const variant = pickVariant(node, preferredVariantId) as {
      id: string;
      title: string;
      price: { amount: string; currencyCode: string };
      selectedOptions?: Array<{ name: string; value: string }>;
    } | null;
    if (!variant) return null;
    return {
      product: { node } as ShopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      selectedOptions: variant.selectedOptions ?? [],
    };
  } catch (error) {
    console.error(`Bump offer lookup failed for ${handle}:`, error);
    return null;
  }
}

/** Adds the selected honey offer through the cart store so the drawer reflects it instantly. */
export async function addBumpToCart(args: { variantId?: string; sellingPlanId?: string | null } = {}): Promise<boolean> {
  const wanted = args.variantId ?? TRIAL_VARIANT_FALLBACK;
  const offer =
    (await fetchOffer(MONTH_HANDLE, wanted)) ?? (await fetchOffer(TRIAL_HANDLE, wanted));
  if (!offer) return false;
  await useCartStore.getState().addItem({
    product: offer.product,
    variantId: args.variantId ?? offer.variantId,
    variantTitle: offer.variantTitle,
    price: offer.price,
    quantity: 1,
    selectedOptions: offer.selectedOptions,
    sellingPlanId: args.sellingPlanId ?? null,
  });
  return true;
}

function BumpModal({ onClose, onContinue }: { onClose: () => void; onContinue?: () => void }) {
  const [state, setState] = useState<"default" | "adding" | "added">("default");
  const continued = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const [showCue, setShowCue] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  

  // A variant is drawn at random on every open, then tagged onto every event.
  const [copy] = useState<BumpCopy>(() => pickBumpVariant());

  // 10-minute urgency countdown (stops at 0:00).
  const [secondsLeft, setSecondsLeft] = useState(600);
  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const clock = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
    secondsLeft % 60,
  ).padStart(2, "0")}`;



  /** On desktop the copy column scrolls; on mobile the whole sheet does. */
  const scroller = () => {
    const el = copyRef.current;
    if (el && el.scrollHeight > el.clientHeight + 1) return el;
    return scrollRef.current;
  };

  const onScroll = useCallback(() => {
    const el = scroller();
    if (!el) return;
    setShowCue(el.scrollHeight - el.clientHeight - el.scrollTop > 24);
  }, []);

  const scrollMore = useCallback(() => {
    scroller()?.scrollBy({ top: 220, behavior: "smooth" });
  }, []);


  // Re-measure whenever content height changes (images load, accordion opens).
  useEffect(() => {
    const id = requestAnimationFrame(onScroll);
    const targets = [copyRef.current, scrollRef.current].filter(Boolean) as HTMLElement[];
    const ro = new ResizeObserver(() => onScroll());
    targets.forEach((t) => {
      ro.observe(t);
      if (t.firstElementChild) ro.observe(t.firstElementChild);
    });
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [onScroll, copy.variant]);


  useEffect(() => {
    trackBump("viewed", copy.variant);
  }, [copy.variant]);


  const finish = () => {
    if (continued.current) return;
    continued.current = true;
    onClose();
    onContinue?.();
  };

  const accept = async () => {
    setState("adding");
    trackBump("accepted", copy.variant, {
      offer: upgrade ? "month_30pack_upgrade" : "trial_3pack_1",
    });
    await addBumpToCart({ variantId: upgrade ? MONTH_VARIANT_ID : TRIAL_VARIANT_FALLBACK });
    setState("added");
    setTimeout(finish, 800);
  };



  const decline = () => {
    trackBump("declined", copy.variant);
    finish();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        decline();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return createPortal(
    <div
      className="hfu hfu-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={copy.headline}
      onClick={(e) => {
        if (e.target === e.currentTarget) decline();
      }}
    >
      <div className="hfu-sheet hfu-sheet-wide">
        <div className="hfu-topband">
          <p className="hfu-topband-h">Wait. Add this to your box for $1.</p>
          <p className="hfu-topband-sub">
            3 sticks of High Frequency Honey, shipped free inside your headphones. You'll only see
            this once.
          </p>
        </div>
        <div className="hfu-urgency">
          <span className="hfu-urgency-label">Special Offer Ends In:</span>{" "}
          <span className="hfu-urgency-clock">{clock}</span>
        </div>
        <div className="hfu-handle" />

        <div className="hfu-scroll" ref={scrollRef} onScroll={onScroll}>
          <div className="hfu-media hfu-media-gallery">
            <BumpGallery />
          </div>

          <div className="hfu-copy" ref={copyRef} onScroll={onScroll}>
            <div className="hfu-name-row">
              <p className="hfu-product-name">
                High Frequency Honey <span className="hfu-name-sub">— Infused with Sacred Shilajit</span>
              </p>
            </div>


            <h2 className="hfu-h">{copy.headline}</h2>
            <p className="hfu-lead">{copy.lead}</p>
            <p className="hfu-p">{copy.body}</p>
            <p className="hfu-p hfu-never">And it never expires.</p>


            <BumpAccordion
              onOpenPanel={(panel) => trackBump("accordion_opened", copy.variant, { panel })}
            />

            <p className="hfg-note hfu-note-mobile">
              AI-enhanced product images. Final packaging differs from what is shown.
            </p>
          </div>
        </div>

        {showCue && (
          <button type="button" className="hfu-scroll-cue" onClick={scrollMore} aria-label="Show more details">
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        )}

        <div className="hfu-actions">
          <div className="hfu-upgrade-reveal is-shown">
          <div className={`hfu-upgrade${upgradeOpen ? " is-open" : ""}${upgrade ? " is-checked" : ""}`}>

            <div
              className="hfu-upgrade-row"
              role="button"
              tabIndex={0}
              aria-pressed={upgrade}
              onClick={() => {
                const next = !upgrade;
                setUpgrade(next);
                trackBump(next ? "upgrade_checked" : "upgrade_unchecked", copy.variant);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const next = !upgrade;
                  setUpgrade(next);
                  trackBump(next ? "upgrade_checked" : "upgrade_unchecked", copy.variant);
                }
              }}
            >
              <input
                type="checkbox"
                checked={upgrade}
                tabIndex={-1}
                aria-hidden="true"
                readOnly
                style={{ pointerEvents: "none" }}
              />
              <span className="hfu-upgrade-line">
                Actually, send the full 30-day supply for 50% off.
              </span>
              <button
                type="button"
                className="hfu-upgrade-chev-btn"
                aria-expanded={upgradeOpen}
                aria-label={upgradeOpen ? "Hide offer details" : "Show offer details"}
                onClick={(e) => {
                  e.stopPropagation();
                  setUpgradeOpen((v) => !v);
                }}
              >
                <ChevronDown className="hfu-upgrade-chev" size={18} aria-hidden="true" />
              </button>
            </div>


            <div className="hfu-upgrade-panel">
              <div className="hfu-upgrade-details">
                <p className="hfu-upgrade-sub">
                  Three sticks is a taste. The minerals compound, so most people notice the
                  difference around day five and it keeps building through week four. Thirty sticks
                  is the actual test.
                </p>
                <p className="hfu-upgrade-pricing">
                  $29.99 today. $59.99 everywhere else. One time, no subscription, same box as your
                  headphones.
                </p>
                <p className="hfu-upgrade-fine">Ships free · 30-day guarantee</p>
              </div>
            </div>
          </div>
          </div>

          <button type="button" className="hfu-cta" onClick={accept} disabled={state !== "default"}>
            {state === "default" && (
              <span key={upgrade ? "up" : "trial"} className="hfu-cta-label">
                {upgrade ? "Add the 30-day supply for $29.99" : "Add the 3-pack for $1"}
              </span>
            )}


            {state === "adding" && <Loader2 className="animate-spin h-5 w-5 mx-auto" />}
            {state === "added" && copy.ctaAdded}
          </button>

          <button type="button" className="hfu-link" onClick={decline}>
            {copy.ctaSecondary}
          </button>
        </div>


      </div>
    </div>,
    document.body,
  );
}

/** Mount once near the app root. Renders nothing until showBumpModal() fires. */
export function BumpModalHost() {
  const [open, setOpen] = useState(false);
  const continueRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    listener = (onContinue) => {
      continueRef.current = onContinue;
      setOpen(true);
    };
    return () => {
      listener = null;
    };
  }, []);

  if (!open) return null;
  return <BumpModal onClose={() => setOpen(false)} onContinue={continueRef.current} />;
}
