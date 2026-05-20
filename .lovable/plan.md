## Goal
Run a price test at $169.99 on this Lovable landing page without disturbing the original $123 product on the live Shopify store.

## Step 1 — Duplicate the product in Shopify
Create a new product that mirrors the existing **High Frequency Headphones** (ID 7531168825410), but at the test price:

- Title: `High Frequency Headphones (LP Test $169.99)`
- Handle: `high-frequency-headphones-lp-169` (used by the landing page to target this exact product)
- Vendor / type: same (`My Store` / `Headphones`)
- Body HTML: copied from the original
- Images: same 5 images (re-referenced from the original Shopify CDN URLs)
- One variant: price `169.99`, weight 0.5 lb, inventory tracked by Shopify, `inventory_policy: continue` (so it stays buyable regardless of stock count), requires shipping
- Status: active, published

The original product stays untouched at $123.

## Step 2 — Point the landing page at the new product
Today `ProductBlock` calls `useShopifyProducts(1)` which just grabs whichever product comes back first. Switch it to fetch the test product explicitly so this can never accidentally show the $123 one.

- Add a `useShopifyProductByHandle('high-frequency-headphones-lp-169')` hook that uses the existing `PRODUCT_BY_HANDLE_QUERY` already defined in `src/lib/shopify.ts`.
- Update `ProductBlock` to use this hook instead of `useShopifyProducts(1)`. Same shape, so the rest of the component (price display, Add to Cart → cart store → Shopify checkout) keeps working unchanged.
- The handle is the only thing tying the page to the test product, so flipping back to the original later is a one-line change.

## Step 3 — Verify
- Confirm the page shows `$169` in the price box (was `$347` strikethrough kept as-is unless you want it changed).
- Click Add to Cart, open the cart drawer, hit Checkout — confirm the Shopify checkout URL loads with the $169.99 line item and `channel=online_store`.

## Notes / open questions
- The hero/sticky bar currently say **$349** and **$297** in hardcoded copy. Want me to update those to `$169.99` too, or leave them as-is for this test? (Default: I'll leave them; tell me if you want them synced.)
- The strikethrough "was" price of `$347` in the price box — keep, change to a different anchor (e.g. `$249`), or remove?
- Anything I should change in the duplicated product's description/title, or mirror it exactly?
