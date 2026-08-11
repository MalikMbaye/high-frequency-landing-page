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

## 3. One carousel of toggleable add-ons — protection lives inside it
Persistent bordered card module below the line items, above subtotal (prefix pattern): one card at a time, swipeable on touch, dot indicators + prev/next arrows, toggle switch on the right of each card.

Cards in the carousel:
1. **Delivery Protection** — brand orb, "DELIVERY PROTECTION", price, info "i" (keeps the existing Covrly modal), toggle **default ON**. Hidden if the quote is ineligible.
2. **High Frequency Honey $1 trial** (skipped if already in the cart from the bump)
3. **Honey 30-stick box**
4. **Gummies**
5. **Wellness Bundle**

- Toggle on adds that variant as its own cart line; toggle off removes it. Optimistic UI, rollback on failure, subtotal updates live.
- Anything already in the cart is skipped from the carousel.
- Product cards resolved from Shopify by handle via `PRODUCT_BY_HANDLE_QUERY` — no mock products. Protection stays on the Covrly quote endpoint.

## 4. Single checkout CTA
- Remove the two-CTA "Checkout+ / Checkout without" block entirely.
- One primary CTA: `CHECK OUT · $X` reflecting whatever is toggled on, plus "Shipping & taxes calculated at checkout".
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
