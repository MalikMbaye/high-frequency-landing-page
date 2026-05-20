import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProductByHandle(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async (): Promise<ShopifyProduct | null> => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = data?.data?.product;
      if (!product) return null;
      // Wrap to match `{ node: ... }` shape used by useShopifyProducts
      return { node: product } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}
