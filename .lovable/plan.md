# Restyle the order bump box: green outline, translucent white panel

Swap the gold dashed treatment on the "Yes, send the full 30-day supply for 50% off." row for a green-outlined, frosted white card. Green reads as "go / save / approved" and the lighter panel lifts the offer off the dark sheet so it reads as a separate decision rather than part of the modal chrome.

## Visual direction

- Border: 2px dashed green (a money-green that passes contrast on the dark sheet), turning solid when checked.
- Background: translucent white (roughly 8% white, ~14% when checked) with a slight blur so the dark sheet still shows through.
- Checkbox: green border, fills green when checked, dark checkmark.
- Chevron: green, still rotates 180deg on expand.
- Label and expanded copy: keep current text; nudge the body copy to a brighter neutral so it stays legible on the lighter panel.
- Bold price line stays as is, with "$29.99 today" emphasized in green.

No copy changes, no layout or scroll-behavior changes — footer order (bump → CTA → decline link), the 180px capped expanding panel, and the 45% footer cap all stay exactly as they are.

## Technical notes

- Add green tokens (`--hfu-green`, `--hfu-green-soft`) to the `.hfu` scope in `src/components/upsell.css`.
- Update only the `.hfu-upgrade*` rules in `src/components/upsell.css`: border color/style, background, checkbox `input` states, `.hfu-upgrade-chev`, `.hfu-upgrade-sub`, `.hfu-upgrade-pricing`, `.hfu-upgrade-fine`.
- `src/components/BumpModal.tsx` markup is unchanged.
- Verify at 375px expanded and on desktop that contrast holds and the CTA stays visible.
