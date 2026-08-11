import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import "./upsell.css";
import { bumpCopy, type BumpOption } from "@/content/upsellCopy";
import honeyHero from "@/assets/honey/honey-hero.webp";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_SELLING_PLANS_QUERY,
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

// Analytics stubs — swap for the real pixel/GA calls later.
const track = (event: string, data?: Record<string, unknown>) =>
  console.log(`[bump] ${event}`, { bump_variant: "multi", ...(data ?? {}) });

type OptionId = BumpOption["id"];

// The trial lives on its own handle when it exists; otherwise we fall back to the
// 3-stick variant on the main honey product.
const TRIAL_HANDLE = "high-frequency-honey-trial";
const MONTH_HANDLE = "high-frequency-honey";
const TRIAL_VARIANT_FALLBACK = "gid://shopify/ProductVariant/44712793964610"; // 3x stix
const MONTH_VARIANT_FALLBACK = "gid://shopify/ProductVariant/44712941879362"; // 30x stix

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

/** Selling plans need an extra storefront scope; a failure just hides the toggle. */
async function fetchSellingPlanId(handle: string): Promise<string | null> {
  try {
    const data = await storefrontApiRequest(PRODUCT_SELLING_PLANS_QUERY, { handle });
    const groups = data?.data?.product?.sellingPlanGroups?.edges ?? [];
    const plan = groups[0]?.node?.sellingPlans?.edges?.[0]?.node;
    return plan?.id ?? null;
  } catch {
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

interface DetailContent {
  paragraphs: string[];
  disclaimer: string;
}

/** Lazy accordion — the ingredient copy is fetched on first open, never inlined. */
function WhatsInside() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<DetailContent | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(async () => {
    const next = !open;
    setOpen(next);
    if (next && !content && !loading) {
      track("bumpDetailOpened");
      setLoading(true);
      try {
        const res = await fetch("/content/bump-detail.json");
        setContent(await res.json());
      } catch (error) {
        console.error("Failed to load bump detail:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [open, content, loading]);

  return (
    <div className="hfu-acc">
      <button type="button" className="hfu-acc-btn" onClick={toggle} aria-expanded={open}>
        <span>{bumpCopy.detailLabel}</span>
        <span aria-hidden="true">{open ? "\u2191" : "\u2193"}</span>
      </button>
      {open && (
        <div className="hfu-acc-body">
          {loading && <Loader2 className="animate-spin h-4 w-4" />}
          {content?.paragraphs.map((p) => (
            <p key={p} className="hfu-p">
              {p}
            </p>
          ))}
          {content && <p className="hfu-fine">{content.disclaimer}</p>}
        </div>
      )}
    </div>
  );
}

function BumpModal({ onClose, onContinue }: { onClose: () => void; onContinue?: () => void }) {
  const [state, setState] = useState<"default" | "adding" | "added">("default");
  const [selected, setSelected] = useState<OptionId>("trial");
  const [subscribed, setSubscribed] = useState(false);
  const [sellingPlanId, setSellingPlanId] = useState<string | null>(null);
  const continued = useRef(false);

  useEffect(() => {
    track("bumpViewed");
    let alive = true;
    fetchSellingPlanId(MONTH_HANDLE).then((id) => {
      if (alive) setSellingPlanId(id);
    });
    return () => {
      alive = false;
    };
  }, []);

  const finish = () => {
    if (continued.current) return;
    continued.current = true;
    onClose();
    onContinue?.();
  };

  const select = (id: OptionId) => {
    setSelected(id);
    track("bumpOptionSelected", { option: id });
    if (id === "trial" && subscribed) {
      setSubscribed(false);
      track("bumpSubscribeToggled", { subscribed: false });
    }
  };

  const toggleSubscribe = () => {
    const next = !subscribed;
    setSubscribed(next);
    track("bumpSubscribeToggled", { subscribed: next });
  };

  const accept = async () => {
    setState("adding");
    track("bumpAccepted", { option: selected, subscribed });
    await addBumpToCart({
      variantId: selected === "trial" ? TRIAL_VARIANT_FALLBACK : MONTH_VARIANT_FALLBACK,
      sellingPlanId: selected === "month" && subscribed ? sellingPlanId : null,
    });
    setState("added");
    setTimeout(finish, 800);
  };

  const decline = () => {
    track("bumpDeclined");
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

  const ctaLabel =
    selected === "month"
      ? subscribed
        ? bumpCopy.subscription.cta
        : bumpCopy.options[1].cta
      : bumpCopy.options[0].cta;

  const showSubscribe = !!sellingPlanId;

  return createPortal(
    <div
      className="hfu hfu-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={bumpCopy.headline}
      onClick={(e) => {
        if (e.target === e.currentTarget) decline();
      }}
    >
      <div className="hfu-sheet hfu-sheet-wide">
        <div className="hfu-handle" />
        <div className="hfu-media">
          <img src={honeyHero} alt="High Frequency Honey sachet with honey pouring out" loading="lazy" />
        </div>

        <div className="hfu-col">
          <span className="hfu-chip">{bumpCopy.eyebrow}</span>
          <h2 className="hfu-h">{bumpCopy.headline}</h2>
          <p className="hfu-lead">{bumpCopy.lead}</p>
          <p className="hfu-p">{bumpCopy.body}</p>

          <WhatsInside />

          <div className="hfu-opts" role="radiogroup" aria-label="Choose your honey option">
            {bumpCopy.options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`hfu-opt${isSelected ? " hfu-opt-on" : ""}`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => select(opt.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(opt.id);
                    }
                  }}
                >
                  {opt.chip && <span className="hfu-badge">{opt.chip}</span>}
                  <div className="hfu-opt-row">
                    <span className="hfu-radio" aria-hidden="true" />
                    <div className="hfu-opt-text">
                      <span className="hfu-opt-title">{opt.title}</span>
                      <span className="hfu-opt-price">{opt.price}</span>
                      <span className="hfu-opt-sub">{opt.sub}</span>
                    </div>
                  </div>

                  {opt.id === "month" && showSubscribe && (
                    <div className={`hfu-sub-wrap${isSelected ? " hfu-sub-open" : ""}`}>
                      <div className="hfu-sub-row">
                        <label className="hfu-switch">
                          <input
                            type="checkbox"
                            checked={subscribed}
                            onChange={toggleSubscribe}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={bumpCopy.subscription.label}
                          />
                          <span className="hfu-switch-track" aria-hidden="true" />
                        </label>
                        <div className="hfu-opt-text">
                          <span className="hfu-opt-title">{bumpCopy.subscription.label}</span>
                          <span className="hfu-opt-price">{bumpCopy.subscription.price}</span>
                          <span className="hfu-opt-sub">{bumpCopy.subscription.sub}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button type="button" className="hfu-cta" onClick={accept} disabled={state !== "default"}>
            {state === "default" && ctaLabel}
            {state === "adding" && <Loader2 className="animate-spin h-5 w-5 mx-auto" />}
            {state === "added" && bumpCopy.ctaAdded}
          </button>

          <button type="button" className="hfu-link" onClick={decline}>
            {bumpCopy.ctaSecondary}
          </button>

          <p className="hfu-trust">{subscribed ? bumpCopy.trustRowSubscription : bumpCopy.trustRow}</p>
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
