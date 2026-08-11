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

type BumpPosition = "above" | "below";

function BumpModal({
  onClose,
  onContinue,
  bumpPosition = "below",
}: {
  onClose: () => void;
  onContinue?: () => void;
  bumpPosition?: BumpPosition;
}) {
  const [state, setState] = useState<"default" | "adding" | "added">("default");
  const continued = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const [showCue, setShowCue] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  // A variant is drawn at random on every open, then tagged onto every event.
  const [copy] = useState<BumpCopy>(() => pickBumpVariant());



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
    trackBump("viewed", copy.variant, { bump_position: bumpPosition });
  }, [copy.variant, bumpPosition]);


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
      bump_position: bumpPosition,
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

  const bumpBox = (
    <div className={`hfu-upgrade${upgradeOpen ? " is-open" : ""}${upgrade ? " is-checked" : ""}`}>
      <div
        className="hfu-upgrade-row"
        role="button"
        tabIndex={0}
        aria-expanded={upgradeOpen}
        onClick={() => setUpgradeOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setUpgradeOpen((v) => !v);
          }
        }}
      >
        <input
          type="checkbox"
          checked={upgrade}
          aria-label="Send 30 days for half price"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setUpgrade(e.target.checked);
            trackBump(e.target.checked ? "upgrade_checked" : "upgrade_unchecked", copy.variant, {
              bump_position: bumpPosition,
            });
          }}
        />
        <span className="hfu-upgrade-line">Yes, send 30 days for half price.</span>
        <ChevronDown className="hfu-upgrade-chev" size={18} aria-hidden="true" />
      </div>

      <div className="hfu-upgrade-panel">
        <div className="hfu-upgrade-details">
          <p className="hfu-upgrade-sub">
            Three sticks is a taste. Minerals compound, so most people notice it around day five and
            it builds through week four. Thirty sticks is the real test. $29.99 today, $59.99 later.
            One time, no subscription.
          </p>
        </div>
      </div>
    </div>
  );

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
        <div className="hfu-handle" />

        <div className="hfu-scroll" ref={scrollRef} onScroll={onScroll}>
          <div className="hfu-media hfu-media-gallery">
            <BumpGallery />
          </div>

          <div className="hfu-copy" ref={copyRef} onScroll={onScroll}>
            <span className="hfu-chip">{copy.eyebrow}</span>
            <div className="hfu-name-row">
              <p className="hfu-product-name">High Frequency Honey</p>
              <span className="hfu-price-tag">3-Pack for $1</span>
            </div>

            <h2 className="hfu-h">{copy.headline}</h2>
            <p className="hfu-lead">{copy.lead}</p>
            <p className="hfu-p">{copy.body}</p>
            <p className="hfu-p">{copy.offer}</p>
            <p className="hfu-p hfu-never">And it never expires.</p>

            <BumpAccordion
              onOpenPanel={(panel) => trackBump("accordion_opened", copy.variant, { panel })}
            />
          </div>
        </div>

        {showCue && (
          <button type="button" className="hfu-scroll-cue" onClick={scrollMore} aria-label="Show more details">
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        )}

        <div className="hfu-actions">
          {bumpPosition === "above" && bumpBox}

          <button type="button" className="hfu-cta" onClick={accept} disabled={state !== "default"}>
            {state === "default" && (
              <span key={upgrade ? "up" : "trial"} className="hfu-cta-label">
                {upgrade ? "Add the 30-day supply for $29.99" : "Add the 3-pack for $1"}
              </span>
            )}
            {state === "adding" && <Loader2 className="animate-spin h-5 w-5 mx-auto" />}
            {state === "added" && copy.ctaAdded}
          </button>

          {bumpPosition === "below" && bumpBox}

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
