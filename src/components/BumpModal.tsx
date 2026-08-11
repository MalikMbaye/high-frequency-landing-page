import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import "./upsell.css";
import { bumpCopy } from "@/content/upsellCopy";
import honeyHero from "@/assets/honey/honey-hero.webp";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
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
const track = (event: string, data?: Record<string, unknown>) => console.log(`[bump] ${event}`, data ?? "");

// The $1 trial lives on the honey product; we resolve the ~$1.00 variant at runtime
// so the SKU can stay a backend-only product.
const BUMP_PRODUCT_HANDLE = "high-frequency-honey";
// 1-Day Supply (3x High Frequency Honey Stix) — the $1 one-time-offer variant.
const BUMP_VARIANT_ID = "gid://shopify/ProductVariant/44712793964610";

async function resolveBumpVariant() {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: BUMP_PRODUCT_HANDLE });
    const node = data?.data?.product;
    const variants = node?.variants?.edges ?? [];
    const trial =
      variants.find((v: { node: { id: string } }) => v.node.id === BUMP_VARIANT_ID) ??
      // Fallback: cheapest available variant (3-stick pack).
      [...variants].sort(
        (a: { node: { price: { amount: string } } }, b: { node: { price: { amount: string } } }) =>
          parseFloat(a.node.price.amount) - parseFloat(b.node.price.amount),
      )[0];
    if (!node || !trial) return null;
    return {
      product: { node } as ShopifyProduct,
      variantId: trial.node.id as string,
      variantTitle: trial.node.title as string,
      price: trial.node.price as { amount: string; currencyCode: string },
      selectedOptions: (trial.node.selectedOptions ?? []) as Array<{ name: string; value: string }>,
    };
  } catch (error) {
    console.error("Bump variant lookup failed:", error);
    return null;
  }
}

/** Adds the $1 trial through the cart store so the open drawer reflects it instantly. */
export async function addBumpToCart(): Promise<boolean> {
  const trial = await resolveBumpVariant();
  if (!trial) return false;
  await useCartStore.getState().addItem({
    product: trial.product,
    variantId: trial.variantId,
    variantTitle: trial.variantTitle,
    price: trial.price,
    quantity: 1,
    selectedOptions: trial.selectedOptions,
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
  const continued = useRef(false);

  useEffect(() => {
    track("bumpViewed");
  }, []);

  const finish = () => {
    if (continued.current) return;
    continued.current = true;
    onClose();
    onContinue?.();
  };

  const accept = async () => {
    setState("adding");
    track("bumpAccepted");
    await addBumpToCart();
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
          {bumpCopy.body.map((p) => (
            <p key={p} className="hfu-p">
              {p}
            </p>
          ))}

          <WhatsInside />

          <button type="button" className="hfu-cta" onClick={accept} disabled={state !== "default"}>
            {state === "default" && bumpCopy.cta}
            {state === "adding" && <Loader2 className="animate-spin h-5 w-5 mx-auto" />}
            {state === "added" && `${bumpCopy.ctaAdded} Continue to checkout`}
          </button>

          <button type="button" className="hfu-link" onClick={decline}>
            {bumpCopy.decline}
          </button>

          <p className="hfu-trust">{bumpCopy.trust.join(" \u00b7 ")}</p>
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
