import { useCallback } from "react";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProductByHandle";
import { useCartStore } from "@/stores/cartStore";

const LP_PRODUCT_HANDLE = "high-frequency-headphones-lp-test-169-99";

export function useBuyNow() {
  const { data: product } = useShopifyProductByHandle(LP_PRODUCT_HANDLE);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const buyNow = useCallback(
    async (e?: { preventDefault?: () => void }) => {
      e?.preventDefault?.();
      if (!product) return;
      const variant = product.node.variants.edges[0]?.node;
      if (!variant) return;

      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });

      const url = useCartStore.getState().getCheckoutUrl();
      if (url) window.open(url, "_blank");
    },
    [product, addItem]
  );

  return { buyNow, isLoading, ready: !!product };
}
