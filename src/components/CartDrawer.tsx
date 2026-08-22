import { toast } from "sonner";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Loader2, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import {
  COVRLY_FUNCTIONS_BASE,
  SHOPIFY_STORE_PERMANENT_DOMAIN,
  PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";

// ---------------------------------------------------------------------------
// Covrly delivery-protection quote
// ---------------------------------------------------------------------------
interface ProtectionQuote {
  eligible: boolean;
  variantId: string | null;
  variantPrice: number;
  loading: boolean;
}

interface CalculatePremiumResponse {
  eligible?: boolean;
  variant_id?: string | null;
  variant_price?: number;
  premium?: number;
  reason?: string;
}

function useProtectionQuote(cartValue: number, enabled: boolean): ProtectionQuote {
  const { data, isLoading } = useQuery({
    queryKey: ["protection-quote", cartValue],
    enabled: enabled && cartValue > 0,
    staleTime: 60_000,
    retry: false,
    queryFn: async (): Promise<CalculatePremiumResponse> => {
      const res = await fetch(`${COVRLY_FUNCTIONS_BASE}/calculate-premium`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shop_domain: SHOPIFY_STORE_PERMANENT_DOMAIN,
          cart_value: cartValue,
          product_type: "shipping_protection",
        }),
      });
      if (!res.ok) return { eligible: false, reason: `http_${res.status}` };
      return res.json();
    },
  });

  return {
    eligible: data?.eligible === true,
    variantId: data?.variant_id ?? null,
    variantPrice: Number(data?.variant_price ?? 0),
    loading: isLoading,
  };
}

// ---------------------------------------------------------------------------
// Add-on products resolved from Shopify by handle. Missing handles / sold-out
// variants are skipped silently — no mock products ever render.
// ---------------------------------------------------------------------------
const ADDON_HANDLES = ["high-frequency-gummies"];

interface AddonProduct {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  title: string;
  price: { amount: string; currencyCode: string };
  image: string | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

function useAddonProducts(enabled: boolean) {
  return useQuery({
    queryKey: ["cart-addons", ADDON_HANDLES],
    enabled,
    staleTime: 5 * 60_000,
    retry: false,
    queryFn: async (): Promise<AddonProduct[]> => {
      const results = await Promise.all(
        ADDON_HANDLES.map(async (handle) => {
          try {
            const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
            const node = data?.data?.product;
            if (!node) return null;
            const variant = (node.variants?.edges ?? []).map((e: { node: AddonVariant }) => e.node).find((v: AddonVariant) => v.availableForSale);
            if (!variant) return null;
            return {
              product: { node } as ShopifyProduct,
              variantId: variant.id,
              variantTitle: variant.title,
              title: node.title as string,
              price: variant.price,
              image: node.images?.edges?.[0]?.node?.url ?? null,
              selectedOptions: variant.selectedOptions ?? [],
            } satisfies AddonProduct;
          } catch {
            return null;
          }
        }),
      );
      return results.filter((r): r is AddonProduct => r !== null);
    },
  });
}

interface AddonVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
}

// ---------------------------------------------------------------------------
// Toggle switch (prefix-style pill)
// ---------------------------------------------------------------------------
const ToggleSwitch = ({
  on,
  busy,
  onChange,
  label,
}: {
  on: boolean;
  busy?: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    disabled={busy}
    className={`cd-switch${on ? " is-on" : ""}`}
    onClick={() => onChange(!on)}
  >
    <span className="cd-switch-knob">{busy && <Loader2 className="h-3 w-3 animate-spin" />}</span>
  </button>
);

// ---------------------------------------------------------------------------
// Coverage info modal (native <dialog> so it renders in the browser top layer)
// ---------------------------------------------------------------------------
const COVRLY_INFO_URL = "https://app.covrly.co/shipping-protection-info.html";

function CoverageInfoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data === "close-sp") onClose();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="cv-modal"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <button type="button" className="cv-modal-x" aria-label="Close" onClick={onClose}>
        {"×"}
      </button>
      {open && <iframe className="cv-modal-frame" src={COVRLY_INFO_URL} title="Delivery Protection" />}
    </dialog>
  );
}

// ---------------------------------------------------------------------------
export const CartDrawer = () => {
  const {
    items,
    isLoading,
    isSyncing,
    isDrawerOpen,
    justAddedVariantId,
    openDrawer,
    closeDrawer,
    updateQuantity,
    removeItem,
    addItem,
    resolveCheckoutUrl,
    syncCart,
    addProtectionLine,
    removeProtectionLine,
  } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsTotal = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);

  const quote = useProtectionQuote(itemsTotal, isDrawerOpen && items.length > 0);
  const { data: addons = [] } = useAddonProducts(isDrawerOpen);

  const [protectionOn, setProtectionOn] = useState(true);
  const [protectionBusy, setProtectionBusy] = useState(false);
  const [busyVariant, setBusyVariant] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  

  useEffect(() => {
    if (isDrawerOpen) syncCart();
  }, [isDrawerOpen, syncCart]);

  // Keep the Shopify protection line in sync with the toggle + resolved band.
  useEffect(() => {
    if (!isDrawerOpen || items.length === 0) return;
    if (!quote.eligible || !quote.variantId) return;
    let cancelled = false;
    (async () => {
      setProtectionBusy(true);
      if (protectionOn) {
        await addProtectionLine({
          variantId: quote.variantId as string,
          chargedAmount: quote.variantPrice,
          coveredValue: itemsTotal,
        });
      } else {
        await removeProtectionLine();
      }
      if (!cancelled) setProtectionBusy(false);
    })();
    return () => {
      cancelled = true;
    };
    // itemsTotal is folded into quote.variantId/variantPrice changes
  }, [isDrawerOpen, protectionOn, quote.eligible, quote.variantId, quote.variantPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cards in the add-on carousel: protection first, then any resolved product
  // that is not already a line in the cart.
  const cards = useMemo(() => {
    const list: Array<{ key: string; kind: "protection" | "product"; addon?: AddonProduct }> = [];
    if (quote.eligible || quote.loading) list.push({ key: "protection", kind: "protection" });
    for (const addon of addons) {
      if (items.some((i) => i.variantId === addon.variantId)) continue;
      list.push({ key: addon.variantId, kind: "product", addon });
    }
    return list;
  }, [quote.eligible, quote.loading, addons, items]);



  const protectionCharge = quote.eligible && protectionOn ? quote.variantPrice : 0;
  const grandTotal = itemsTotal + protectionCharge;
  const currency = items[0]?.price.currencyCode || "USD";

  const handleAddon = async (addon: AddonProduct, next: boolean) => {
    setBusyVariant(addon.variantId);
    try {
      if (next) {
        await addItem({
          product: addon.product,
          variantId: addon.variantId,
          variantTitle: addon.variantTitle,
          price: addon.price,
          quantity: 1,
          selectedOptions: addon.selectedOptions,
        });
      } else {
        await removeItem(addon.variantId);
      }
    } finally {
      setBusyVariant(null);
    }
  };

  const [checkoutBusy, setCheckoutBusy] = useState(false);

  const goToCheckout = async () => {
    if (checkoutBusy) return;
    setCheckoutBusy(true);
    try {
      const checkoutUrl = await resolveCheckoutUrl();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("We couldn't open checkout. Please try again.", { position: "top-center" });
        setCheckoutBusy(false);
      }
    } catch {
      toast.error("We couldn't open checkout. Please try again.", { position: "top-center" });
      setCheckoutBusy(false);
    }
  };


  return (
    <Sheet open={isDrawerOpen} onOpenChange={(o) => (o ? openDrawer() : closeDrawer())}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-current hover:bg-transparent"
          onClick={() => openDrawer()}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="cd-panel w-full sm:max-w-lg flex flex-col h-full bg-background text-foreground border-l border-border"
        overlayClassName="cd-overlay"
        onPointerDownOutside={(e) => {
          // Keep the drawer open when the click lands on a layered surface
          // (the $1 bump modal or the coverage info dialog).
          const target = e.target as HTMLElement | null;
          if (target?.closest(".hfu-backdrop, .cv-modal")) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement | null;
          if (target?.closest(".hfu-backdrop, .cv-modal")) e.preventDefault();
        }}
      >
        <SheetHeader className="flex-shrink-0 text-left">
          <SheetTitle className="text-foreground">Your cart</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                <div className="space-y-3">
                  {items.map((item) => {
                    const added = justAddedVariantId === item.variantId;
                    return (
                      <div key={item.variantId} className={`cd-line${added ? " is-added" : ""}`}>
                        <div className="cd-thumb">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={item.product.node.title}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="cd-line-body">
                          <div className="cd-line-top">
                            <h4 className="cd-line-title">{item.product.node.title}</h4>
                            <span className="cd-line-price">
                              ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          {(() => {
                            const opts = (item.selectedOptions || [])
                              .filter((o) => o.value && o.value !== "Default Title")
                              .map((o) => `${o.name}: ${o.value}`)
                              .join(" · ");
                            const fallback =
                              item.variantTitle && item.variantTitle !== "Default Title" ? item.variantTitle : "";
                            const label = opts || fallback;
                            return label ? <p className="cd-line-variant">{label}</p> : null;
                          })()}
                          {added && (
                            <p className="cd-added">
                              <Check className="h-3 w-3" /> Added to cart
                            </p>
                          )}
                          <div className="cd-stepper" role="group" aria-label="Quantity">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span aria-live="polite">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button type="button" className="cd-remove" onClick={() => removeItem(item.variantId)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {cards.length > 0 && (
                <div className="cd-addons" aria-label="Add to your order">
                  {cards.map((card) =>
                    card.kind === "protection" ? (
                      <div className="cd-addon" key={card.key}>
                        <span className="cv-orb cd-addon-orb" aria-hidden="true" />
                        <div className="cd-addon-body">
                          <p className="cd-addon-title">
                            Delivery Protection
                            <button
                              type="button"
                              className="cv-info"
                              aria-label="Coverage info"
                              onClick={() => setInfoOpen(true)}
                            >
                              i
                            </button>
                          </p>
                          <p className="cd-addon-sub">Coverage for loss, theft or damage</p>
                          <p className="cd-addon-price">
                            {quote.loading ? "…" : `$${quote.variantPrice.toFixed(2)}`}
                          </p>
                        </div>
                        <ToggleSwitch
                          on={protectionOn}
                          busy={protectionBusy || quote.loading}
                          onChange={setProtectionOn}
                          label="Delivery protection"
                        />
                      </div>
                    ) : (
                      <div className="cd-addon" key={card.key}>
                        <div className="cd-addon-thumb">
                          {card.addon?.image && <img src={card.addon.image} alt={card.addon.title} loading="lazy" />}
                        </div>
                        <div className="cd-addon-body">
                          <p className="cd-addon-title">{card.addon?.title}</p>
                          <p className="cd-addon-price">${parseFloat(card.addon?.price.amount ?? "0").toFixed(2)}</p>
                        </div>
                        <ToggleSwitch
                          on={false}
                          busy={busyVariant === card.addon?.variantId}
                          onChange={(next) => card.addon && handleAddon(card.addon, next)}
                          label={`Add ${card.addon?.title ?? "add-on"}`}
                        />
                      </div>
                    ),
                  )}
                </div>
              )}


              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-border bg-background">
                <div className="flex justify-between items-center text-foreground">
                  <span className="text-lg font-semibold">Subtotal</span>
                  <span className="text-xl font-bold">
                    {currency} {grandTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-right">Shipping &amp; taxes calculated at checkout</p>
                <button
                  type="button"
                  className="cd-checkout"
                  onClick={goToCheckout}
                  disabled={isLoading || isSyncing || protectionBusy}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    `CHECK OUT · $${grandTotal.toFixed(2)}`
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
      <CoverageInfoDialog open={infoOpen} onClose={() => setInfoOpen(false)} />
    </Sheet>
  );
};
