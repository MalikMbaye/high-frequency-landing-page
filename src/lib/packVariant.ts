import { ShopifyProduct } from "@/lib/shopify";
import { PackTier } from "@/stores/packStore";

export function resolvePackVariant(product: ShopifyProduct | null | undefined, tier: PackTier) {
  const edges = product?.node.variants.edges ?? [];
  const match = edges.find((e) => e.node.title === tier.variantTitle);
  return match?.node ?? edges[tier.sets - 1]?.node ?? edges[0]?.node;
}

/** Display price for a tier: live Shopify price when available, else the fallback. */
export function packPrice(product: ShopifyProduct | null | undefined, tier: PackTier) {
  const variant = resolvePackVariant(product, tier);
  const amount = variant ? parseFloat(variant.price.amount) : NaN;
  return Number.isFinite(amount) ? Math.floor(amount) : tier.fallbackPrice;
}

export const formatMoney = (value: number) =>
  value % 1 === 0 ? `$${value.toLocaleString("en-US")}` : `$${value.toFixed(2)}`;
