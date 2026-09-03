import { toast } from "sonner";

const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "86z1ah-wz.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "c7974177ac686c3fdf129c6b37c5d336";

// Covrly Supabase functions base (calculate-premium, etc.)
export const COVRLY_FUNCTIONS_BASE = "https://kojezikjpqgynmadzpll.supabase.co/functions/v1";

// A Shopify cart line attribute (line-item property), e.g. the protection tags.
export interface CartAttribute {
  key: string;
  value: string;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  // Hard timeout so a hung request can never leave the UI spinning forever.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  let response: Response;
  try {
    response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
  } catch (error) {
    if ((error as Error)?.name === "AbortError") {
      toast.error("Network timeout", { description: "Please try adding to cart again." });
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }


  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Your store needs to be upgraded to a paid plan.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }

  return data;
}

export const STOREFRONT_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale

            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

/**
 * Selling plans live behind the `unauthenticated_read_selling_plans` scope, which
 * this storefront token may not have. Kept as its own query so a denial only
 * hides the subscribe option instead of breaking the product fetch.
 */
export const PRODUCT_SELLING_PLANS_QUERY = `
  query GetProductSellingPlans($handle: String!) {
    product(handle: $handle) {
      sellingPlanGroups(first: 5) {
        edges {
          node {
            name
            sellingPlans(first: 5) {
              edges {
                node {
                  id
                  name
                  priceAdjustments {
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Cart mutations
const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity checkoutUrl }
  }
`;


const CART_LINES_QUERY = `
  query cartLines($id: ID!) {
    cart(id: $id) {
      lines(first: 100) {
        edges { node { id merchandise { ... on ProductVariant { id } } attributes { key value } } }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } attributes { key value } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } attributes { key value } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return withAttributionParams(url.toString());
  } catch {
    return checkoutUrl;
  }
}


interface UserError {
  field: string[] | null;
  message: string;
}

function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(
    (e) => e.message.toLowerCase().includes("cart not found") || e.message.toLowerCase().includes("does not exist"),
  );
}

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
  /** Optional Shopify selling plan (subscription) applied to this line. */
  sellingPlanId?: string | null;
}

export async function createShopifyCart(
  item: CartItem,
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: {
      lines: [
        {
          quantity: item.quantity,
          merchandiseId: item.variantId,
          ...(item.sellingPlanId ? { sellingPlanId: item.sellingPlanId } : {}),
        },
      ],
    },
  });

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error("Cart creation failed:", data.data.cartCreate.userErrors);
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(
  cartId: string,
  item: CartItem,
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [
      {
        quantity: item.quantity,
        merchandiseId: item.variantId,
        ...(item.sellingPlanId ? { sellingPlanId: item.sellingPlanId } : {}),
      },
    ],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find(
    (l: { node: { id: string; merchandise: { id: string } } }) => l.node.merchandise.id === item.variantId,
  );
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function fetchCartStatus(cartId: string) {
  return storefrontApiRequest(CART_QUERY, { id: cartId });
}

/**
 * Re-read the live checkout URL for a cart. Returns null when the cart no
 * longer exists (expired or already completed), so callers can rebuild it
 * instead of navigating to a dead checkout.
 */
export async function fetchLiveCheckoutUrl(cartId: string): Promise<string | null> {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  const cart = data?.data?.cart;
  if (!cart?.checkoutUrl || cart.totalQuantity === 0) return null;
  return formatCheckoutUrl(cart.checkoutUrl);
}


type RawLineEdge = { node: { id: string; merchandise?: { id?: string }; attributes?: CartAttribute[] } };

/**
 * Fetch all lines on a cart with their merchandise id + attributes.
 * Used to find/remove the Covrly protection line (matched by the
 * `_shipping_protection` attribute, since the variant is band-dependent).
 */
export async function fetchCartLines(
  cartId: string,
): Promise<Array<{ id: string; merchandiseId: string; attributes: CartAttribute[] }>> {
  const data = await storefrontApiRequest(CART_LINES_QUERY, { id: cartId });
  const edges: RawLineEdge[] = data?.data?.cart?.lines?.edges || [];
  return edges.map((e) => ({
    id: e.node.id,
    merchandiseId: e.node.merchandise?.id ?? "",
    attributes: e.node.attributes ?? [],
  }));
}

/**
 * Add a single line to an existing cart by variant id, carrying line
 * attributes (the protection tags). Lower-level than addLineToShopifyCart
 * (which takes a full CartItem) — used for the delivery-protection line.
 */
export async function addCartLineRaw(
  cartId: string,
  merchandiseId: string,
  quantity: number,
  attributes: CartAttribute[],
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId, attributes }],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("addCartLineRaw failed:", userErrors);
    return { success: false };
  }

  const lines: RawLineEdge[] = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l) => l.node.merchandise?.id === merchandiseId);
  return { success: true, lineId: newLine?.node?.id };
}
