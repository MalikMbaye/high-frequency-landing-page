# Upsell Modal Shape, Delay, and Stacked Cart Add-ons

## 1. Bump modal: wider rectangle on desktop
Right now the desktop bump is a narrow 480px card that reads as a square. Change it to a landscape modal: max-width ~760px, image on the left (roughly 45% width, full-height, cropped) and eyebrow/headline/body/accordion/CTA stacked on the right. Mobile stays the current bottom sheet, unchanged.

## 2. Sequence the drawer, then the upsell
Add-to-cart currently opens the drawer and the bump in the same tick. New behavior:
1. Drawer opens with the "Added to cart" confirmation flash.
2. After a ~3s pause, the bump modal fades in layered above the drawer.
3. Backdrop click, Escape, and the "No thanks" link all dismiss it and return the user to the open drawer.

Applies to both entry points (main product block and Order Now / sticky buy bar). Still once per session. If the drawer is closed before the delay elapses, the bump is cancelled.

## 3. Cart drawer: stack add-ons instead of a carousel
Only two offers exist, so drop the carousel entirely:
- Remove dots, prev/next arrows, and slide state.
- Render the add-on cards stacked vertically in one bordered module, separated by hairlines:
  1. **Delivery Protection** — toggle default ON (hidden when the quote is ineligible)
  2. **High Frequency Honey $1 trial** — toggle default OFF
- Cards already in the cart are still skipped, and toggling still adds/removes its own cart line with optimistic UI.
- Subtotal and the single `CHECK OUT · $X` CTA stay as they are.

## Technical notes
- `src/components/upsell.css`: new desktop two-column `.hfu-sheet` layout at >=640px (wider max-width, media column on the left); mobile rules untouched.
- `src/components/BumpModal.tsx`: restructure the sheet markup into media + content columns; add backdrop-click and Escape dismissal.
- New shared helper (in `BumpModal.tsx`) for a delayed trigger, e.g. `showBumpModalAfter(3000)`, cancelled if the drawer closes; called from `ProductBlock.tsx` and `useBuyNow.ts` in place of the immediate `showBumpModal`.
- `src/components/CartDrawer.tsx`: delete `slide` state, `cd-addon-nav`/dots/arrows JSX, and map `cards` to a stacked list.
- `src/index.css`: replace `.cd-addon-nav`, `.cd-dots`, `.cd-arrows` rules with `.cd-addon + .cd-addon` divider spacing.
