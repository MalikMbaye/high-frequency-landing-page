import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { COVRLY_FUNCTIONS_BASE, SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

// ---------------------------------------------------------------------------
// Covrly delivery-protection quote (inlined here — the Lovable editor can only
// edit existing files, not add new ones).
// ---------------------------------------------------------------------------
interface ProtectionQuote {
  /** True only once the server confirms eligibility. False while loading or ineligible. */
  eligible: boolean;
  variantId: string | null;
  /** Price Shopify charges for the band (show + charge this, not `premium`). */
  variantPrice: number;
  premium: number;
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
    premium: Number(data?.premium ?? 0),
    loading: isLoading,
  };
}

// ---------------------------------------------------------------------------
// Canonical Covrly two-CTA "Checkout+" block (inlined). Styles (.cv-*) live in
// index.css, ported verbatim from cart-protection.css.
// ---------------------------------------------------------------------------
const COVRLY_INFO_URL = "https://app.covrly.co/shipping-protection-info.html";

interface DeliveryProtectionProps {
  variantPrice: number;
  cartTotal: number;
  loading: boolean;
  onCheckoutPlus: () => void;
  onCheckoutWithout: () => void;
}

function DeliveryProtection({
  variantPrice,
  cartTotal,
  loading,
  onCheckoutPlus,
  onCheckoutWithout,
}: DeliveryProtectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Drive the native <dialog> imperatively so it uses the browser top layer and
  // renders ABOVE the drawer Sheet (top layer beats any z-index).
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (modalOpen && !dlg.open) dlg.showModal();
    if (!modalOpen && dlg.open) dlg.close();
  }, [modalOpen]);

  // The info iframe can ask to close itself via postMessage('close-sp').
  useEffect(() => {
    if (!modalOpen) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data === "close-sp") setModalOpen(false);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [modalOpen]);

  return (
    <>
      <div className={loading ? "cv-block cv-skeleton" : "cv-block"}>
        <div className="cv-row">
          <span className="cv-brand">
            <span className="cv-orb" />
            <span className="cv-label">DELIVERY PROTECTION</span>
            <button type="button" className="cv-info" aria-label="Coverage info" onClick={() => setModalOpen(true)}>
              i
            </button>
          </span>
          <span className="cv-amt">{loading ? "…" : `$${variantPrice.toFixed(2)}`}</span>
        </div>

        <div className="cv-sub">Coverage for loss, theft or damage</div>

        <button type="button" className="cv-cta" onClick={onCheckoutPlus}>
          {loading ? "CHECKOUT+ PROTECTION" : `CHECKOUT+ PROTECTION · $${(cartTotal + variantPrice).toFixed(2)}`}
        </button>

        <button type="button" className="cv-skip" onClick={onCheckoutWithout}>
          CHECKOUT WITHOUT PROTECTION
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="cv-modal"
        onClick={(e) => {
          if (e.target === dialogRef.current) setModalOpen(false);
        }}
        onCancel={(e) => {
          e.preventDefault();
          setModalOpen(false);
        }}
        onClose={() => setModalOpen(false)}
      >
        <button type="button" className="cv-modal-x" aria-label="Close" onClick={() => setModalOpen(false)}>
          {"×"}
        </button>
        {modalOpen && <iframe className="cv-modal-frame" src={COVRLY_INFO_URL} title="Shipping Protection" />}
      </dialog>
    </>
  );
}

// ---------------------------------------------------------------------------
export const CartDrawer = () => {
  const {
    items,
    isLoading,
    isSyncing,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
    addProtectionLine,
    removeProtectionLine,
  } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);

  // Covrly delivery-protection quote (band variant + charged price), re-resolved as the subtotal changes.
  const quote = useProtectionQuote(totalPrice, isDrawerOpen && items.length > 0);

  // Sync cart with Shopify when drawer opens (catches edge cases)
  useEffect(() => {
    if (isDrawerOpen) syncCart();
  }, [isDrawerOpen, syncCart]);

  const goToCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) window.location.href = checkoutUrl;
  };

  // Add the protection band variant (with attribute tags) then go to checkout.
  const handleCheckoutPlus = async () => {
    if (quote.variantId) {
      await addProtectionLine({
        variantId: quote.variantId,
        chargedAmount: quote.variantPrice,
        coveredValue: totalPrice,
      });
    }
    goToCheckout();
  };

  // Ensure no protection line, then go to checkout.
  const handleCheckoutWithout = async () => {
    await removeProtectionLine();
    goToCheckout();
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
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-cyan-400 text-black">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background text-foreground border-l border-zinc-800">
        <SheetHeader className="flex-shrink-0 text-left">
          <SheetTitle className="text-white">Shopping Cart</SheetTitle>
          <SheetDescription className="text-zinc-400">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-500">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2 rounded-lg bg-zinc-900/50">
                      <div className="w-16 h-16 bg-zinc-900 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-white">{item.product.node.title}</h4>
                        <p className="text-sm text-zinc-400">
                          {item.selectedOptions.map((option) => option.value).join(" • ")}
                        </p>
                        <p className="font-semibold text-cyan-400">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-zinc-500 hover:text-white"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 border-zinc-700 bg-transparent text-white"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 border-zinc-700 bg-transparent text-white"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-zinc-800 bg-background mt-auto">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    {items[0]?.price.currencyCode || "$"} {totalPrice.toFixed(2)}
                  </span>
                </div>
                {quote.loading || quote.eligible ? (
                  <DeliveryProtection
                    variantPrice={quote.variantPrice}
                    cartTotal={totalPrice}
                    loading={quote.loading}
                    onCheckoutPlus={handleCheckoutPlus}
                    onCheckoutWithout={handleCheckoutWithout}
                  />
                ) : (
                  <Button
                    onClick={handleCheckoutWithout}
                    className="w-full font-bold"
                    size="lg"
                    disabled={isLoading || isSyncing}
                  >
                    {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : "CHECKOUT"}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
