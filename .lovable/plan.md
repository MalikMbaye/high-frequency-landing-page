# Cart Drawer Rebuild + Add-to-Cart Confirmation + Upsell Copy

## What you flagged
1. No confirmation that the product was added — the bump modal fires with no feedback.
2. Cart drawer sits *under* the fixed nav on desktop/tablet (z-index/layout conflict).
3. Delivery protection has its own competing CTA; two checkout buttons is confusing.
4. Want the prefix-style add-on carousel with toggle switches inside the drawer.
5. Upsell headline/body copy + product photo + non-gold CTA.

## 1. Add-to-cart confirmation, then the bump
- On add-to-cart, open the cart drawer first with a brief "Added to cart" state on the new line (check-mark + subtle highlight that fades), so the action is visibly confirmed.
- The $1 bump modal then fires layered above the drawer (still once per session). Declining or accepting returns the user to the drawer, not straight to checkout.
- Applies to both entry points: main product block and the sticky buy bar / Order Now.

## 2. Drawer layering fix
- Raise the drawer overlay + panel above the fixed header and utility bar so it never renders under the nav on desktop/tablet. Full-height panel, own scroll region, page scroll locked while open.

## 3. Single checkout, protection as a checkbox
Replace the two-CTA "Checkout+ / Checkout without" block with:
- One protection row: brand mark, "DELIVERY PROTECTION", price, info "i" (keeps the existing Covrly info modal), and a **checkbox/toggle** on the right. Default state: on (matching current default behavior) — tell me if you want it off by default.
- Toggling adds/removes the protection line live and the subtotal updates.
- One primary CTA: `CHECK OUT · $X` reflecting the toggle state. No second button.
- If protection is ineligible, the row is hidden and only the single CTA shows.

## 4. Add-on carousel (prefix-style)
- Below the line items, above subtotal: a bordered card carousel of one add-on at a time — thumbnail, title, price, toggle switch on the right, dot indicators plus prev/next arrows.
- Add-ons: High Frequency Honey ($1 trial stick pack if not already in cart, 30-stick box, gummies, bundle) pulled from Shopify by handle; anything already in the cart is skipped.
- Toggle on adds that variant as its own cart line; toggle off removes it. Optimistic UI with rollback on failure.
- Existing line items keep the circular −/1/+ stepper and "Remove" link styling from the references, restyled to the site's dark palette (not prefix's blue/white).

## 5. Upsell copy, photo, CTA color
- `src/content/upsellCopy.ts`: headline "Fuel for your frequency practice.", body lead "Your brain runs on minerals. We went to 16,000 feet to get them."
- Use the attached honey-stick hero image as the main upsell/bump photo (uploaded as a CDN asset).
- CTA styling: no gold. Primary buttons use the site's primary purple/white system; gold stays only on the "ONE-TIME OFFER" eyebrow.

## Technical notes
- `src/components/CartDrawer.tsx`: restructure into line items → add-on carousel → protection checkbox row → single CTA; replace `onCheckoutPlus`/`onCheckoutWithout` with `protectionEnabled` state driving `addProtectionLine`/`removeProtectionLine`.
- `src/index.css`: new `.cv-*` checkbox row rules, drawer z-index above `.nav-utility-bar`/header, new `.cd-addon-*` carousel styles.
- `src/stores/cartStore.ts`: add generic `addAddonByVariant` / `removeAddon` helpers (wrapping `addCartLineRaw`) and a transient `justAddedVariantId` for the confirmation flash.
- `src/components/BumpModal.tsx` + `ProductBlock.tsx` + `useBuyNow.ts`: open drawer before showing the bump; bump portal z-index above the drawer.
- Add-on products resolved via existing `PRODUCT_BY_HANDLE_QUERY`; no mock products.
