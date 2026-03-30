import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(count = 20) {
  return useQuery({
    queryKey: ['shopify-products', count],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: count });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
  });
}
