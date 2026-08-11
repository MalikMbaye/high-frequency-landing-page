# Gallery AI disclaimer footnote

Add a small, centered disclaimer line directly beneath the bump modal's image gallery (below the thumbnail rail).

## Copy

"Product images are AI-generated renders. Final packaging may vary."

Accurate on format and dose, matches the existing disclosure wording in the accordion, and reads cleaner than the raw parenthetical.

## Build details

- `src/components/BumpGallery.tsx`: render a `<p className="hfg-note">` after the `.hfg-rail` block.
- `src/components/upsell.css`: add `.hfg-note` — centered, ~11px (desktop) / 10.5px (mobile), muted foreground at low opacity, letter-spacing 0.01em, small top margin so it does not shift the modal's vertical balance or push the CTA.
- No layout or scroll-region changes; purely additive text.
