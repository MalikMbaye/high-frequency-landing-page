import { useCallback } from "react";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProductByHandle";
import { useCartStore } from "@/stores/cartStore";
import { usePackStore, getPackTier } from "@/stores/packStore";
import { packPrice, resolvePackVariant } from "@/lib/packVariant";
import { showBumpModal } from "@/components/BumpModal";

const LP_PRODUCT_HANDLE = "high-frequency-headphones-lp-test-169-99";

export function useBuyNow() {
  const { data: product } = useShopifyProductByHandle(LP_PRODUCT_HANDLE);
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const isLoading = useCartStore((s) => s.isLoading);
  const selected = usePackStore((s) => s.selected);
  const tier = getPackTier(selected);
  const price = packPrice(product, tier);

  const buyNow = useCallback(
    async (e?: { preventDefault?: () => void }) => {
      e?.preventDefault?.();
      if (!product) return;
      const variant = resolvePackVariant(product, tier);
      if (!variant) return;

      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });

      // Present the order bump first, then reveal the completed cart.
      if (!showBumpModal(openDrawer)) openDrawer();
    },
    [product, addItem, openDrawer, tier]
  );

  return { buyNow, isLoading, ready: !!product, price, tier };
}
