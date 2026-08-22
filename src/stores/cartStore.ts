import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import {
  CartItem,
  ShopifyProduct,
  createShopifyCart,
  addLineToShopifyCart,
  addCartLineRaw,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchCartLines,
  fetchCartStatus,
  fetchLiveCheckoutUrl,
} from "@/lib/shopify";

export type { CartItem, ShopifyProduct };

const CART_ERROR = "We couldn't reach the store. Please try again.";

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  isDrawerOpen: boolean;
  /** Variant of the line just added — drives the transient "Added to cart" flash. */
  justAddedVariantId: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  addProtectionLine: (args: { variantId: string; chargedAmount: number; coveredValue: number }) => Promise<void>;
  removeProtectionLine: () => Promise<void>;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
  /** Verified checkout URL — refreshes or rebuilds the cart if the stored one is dead. */
  resolveCheckoutUrl: () => Promise<string | null>;
}


export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      isDrawerOpen: false,
      justAddedVariantId: null,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      removeProtectionLine: async () => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          const lines = await fetchCartLines(cartId);
          const protectionLines = lines.filter((l) =>
            l.attributes.some((a) => a.key === "_shipping_protection" && a.value === "true"),
          );
          for (const line of protectionLines) {
            await removeLineFromShopifyCart(cartId, line.id);
          }
        } catch (error) {
          console.error("Failed to remove protection line:", error);
        }
      },

      addProtectionLine: async ({ variantId, chargedAmount, coveredValue }) => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          // Idempotent: clear any stale protection line (handles band change), then add the current band variant.
          await get().removeProtectionLine();
          await addCartLineRaw(cartId, variantId, 1, [
            { key: "_shipping_protection", value: "true" },
            { key: "_covered_cart_value", value: String(coveredValue) },
            { key: "_protection_premium", value: chargedAmount.toFixed(2) },
          ]);
        } catch (error) {
          console.error("Failed to add protection line:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const flash = () => {
          set({ justAddedVariantId: item.variantId });
          setTimeout(() => {
            if (get().justAddedVariantId === item.variantId) set({ justAddedVariantId: null });
          }, 2600);
        };
        const existingItem = items.find((i) => i.variantId === item.variantId);

        // Start a brand new Shopify cart and seed it with this line.
        const startFreshCart = async () => {
          const result = await createShopifyCart({ ...item, lineId: null });
          if (!result) return false;
          set({
            cartId: result.cartId,
            checkoutUrl: result.checkoutUrl,
            items: [{ ...item, lineId: result.lineId }],
          });
          flash();
          return true;
        };

        set({ isLoading: true });
        try {
          let ok = false;
          if (!cartId) {
            ok = await startFreshCart();
          } else if (existingItem?.lineId) {
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, existingItem.quantity + item.quantity);
            if (result.success) {
              const newQuantity = existingItem.quantity + item.quantity;
              set({
                items: get().items.map((i) => (i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i)),
              });
              flash();
              ok = true;
            } else if (result.cartNotFound) {
              // Expired or already-checked-out cart: rebuild instead of failing.
              clearCart();
              ok = await startFreshCart();
            }
          } else {
            const result = await addLineToShopifyCart(cartId, { ...item, lineId: null });
            if (result.success) {
              // Replace any stale duplicate (e.g. a persisted line without a lineId).
              const rest = get().items.filter((i) => i.variantId !== item.variantId);
              set({ items: [...rest, { ...item, lineId: result.lineId ?? null }] });
              flash();
              ok = true;
            } else if (result.cartNotFound) {
              clearCart();
              ok = await startFreshCart();
            }
          }
          if (!ok) toast.error(CART_ERROR, { position: "top-center" });
        } catch (error) {
          console.error("Failed to add item:", error);
          toast.error(CART_ERROR, { position: "top-center" });
        } finally {
          set({ isLoading: false });
        }
      },


      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            set({ items: get().items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)) });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const newItems = get().items.filter((i) => i.variantId !== variantId);
            newItems.length === 0 ? clearCart() : set({ items: newItems });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, justAddedVariantId: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      resolveCheckoutUrl: async () => {
        const { cartId, items, checkoutUrl } = get();
        if (!cartId) return checkoutUrl;
        try {
          const live = await fetchLiveCheckoutUrl(cartId);
          if (live) {
            if (live !== checkoutUrl) set({ checkoutUrl: live });
            return live;
          }
          // Cart expired or already completed — rebuild it from the local lines.
          const snapshot = items;
          get().clearCart();
          if (snapshot.length === 0) return null;
          const [first, ...rest] = snapshot;
          const created = await createShopifyCart({ ...first, lineId: null });
          if (!created) return null;
          set({
            cartId: created.cartId,
            checkoutUrl: created.checkoutUrl,
            items: [{ ...first, lineId: created.lineId }],
          });
          for (const line of rest) {
            const added = await addLineToShopifyCart(created.cartId, { ...line, lineId: null });
            if (added.success) {
              set({ items: [...get().items, { ...line, lineId: added.lineId ?? null }] });
            }
          }
          return created.checkoutUrl;
        } catch (error) {
          console.error("Failed to resolve checkout URL:", error);
          return checkoutUrl;
        }
      },



      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const data = await fetchCartStatus(cartId);
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (error) {
          console.error("Failed to sync cart:", error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, cartId: state.cartId, checkoutUrl: state.checkoutUrl }),
    },
  ),
);
