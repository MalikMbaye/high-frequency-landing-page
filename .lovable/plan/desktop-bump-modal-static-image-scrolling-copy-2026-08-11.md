# Desktop bump modal: static image, scrolling copy

## What changes (desktop only, ≥640px)

1. **Smaller image column.** The gallery column narrows (grid becomes roughly 36/64 instead of 42/58) and the main square image gets a max width so the image plus thumbnail rail always fits inside the modal without pushing height.
2. **Image stays put, only the copy scrolls.** Today the whole two-column area scrolls together. Instead, the left column becomes static (pinned at the top of the row) and the right copy column becomes its own scroll area with the modal's fixed height. The sticky CTA footer stays exactly as it is.
3. **Smaller text on the right.** Headline, lead, body paragraphs, product-name row, and accordion header/body text step down a notch so more of the offer is readable without scrolling.
4. **Scroll cue follows the copy column.** The chevron cue and its "more content below" check now measure the copy column instead of the outer grid, so it appears/hides correctly.

Mobile (≤639px) behavior is untouched: whole sheet scrolls, CTA sticky at the bottom.

## Technical notes

- `src/components/upsell.css`, inside the `@media (min-width: 640px)` block:
  - `.hfu-sheet-wide .hfu-scroll` → `overflow: hidden`, `align-items: stretch`, tighter column ratio.
  - New rules: media column `position: sticky; top: 0; align-self: start;` with a `max-width` on `.hfu-sheet-wide .hfg-main` (and rail) so it fits; `.hfu-sheet-wide .hfu-copy` gets `overflow-y: auto; min-height: 0; padding-right: 8px;` plus thin scrollbar styling.
  - Desktop-only font-size reductions for `.hfu-h`, `.hfu-lead`, `.hfu-p`, `.hfu-product-name`, `.hfa-head`, `.hfa-title`, `.hfa-p`/`.hfa-lead`.
- `src/components/BumpModal.tsx`: add a ref to the copy column and use it for the `onScroll`/`scrollMore` logic on desktop (fall back to the existing outer scroll container on mobile). No changes to add-to-cart, analytics, or variant logic.
