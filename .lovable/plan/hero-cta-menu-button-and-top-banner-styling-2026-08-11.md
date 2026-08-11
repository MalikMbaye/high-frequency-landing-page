# Hero CTA, menu button, and top banner styling

Three focused presentation changes.

## 1. Hero CTA → purple
The hero "Get Your Headphones" button currently uses the black style. Switch it back to the brand purple CTA style so it reads as the primary action.

## 2. "Order Now" in the menu → black
The nav order button (desktop nav and full-screen mobile menu) currently uses purple. Switch both to the black button style so the hero purple stays the single purple CTA in the first viewport.

## 3. Top banner → top-down purple-to-black gradient
The back-in-stock banner currently uses a left-to-right purple → gold gradient. Replace it with a vertical (top-down) gradient: dark near-black weighted across the upper portion, fading into the hero purple at the bottom edge. White text and the pulsing dot stay as-is; contrast remains high on both ends.

## Technical notes
- `src/components/Hero.tsx`: `btn-black` → `btn-purple`.
- `src/components/Navbar.tsx`: both order buttons `btn-purple` → `btn-black`.
- `src/index.css` `.stock-banner`: `background: linear-gradient(180deg, var(--hfh-near-black) 0%, var(--hfh-near-black) 45%, var(--hfh-purple) 100%)` (dark biased toward the top, purple only at the bottom).
- No copy, layout, or logic changes.
