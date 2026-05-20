Remove three section groups from the landing page (`src/pages/Index.tsx`):

1. **Celebrity cosign** — `<Captivation />` ("They Came To Us")
2. **All Instagram-pointing sections** — all three `<InstagramReactions ... />` placements plus the unused `ALL_INSTAGRAM_POSTS` import and `reactionSlices` array
3. **Rife library section** — `<Generator />` ("The Generator / Generate Any Frequency. On Demand.")

Also remove the now-unused imports (`Captivation`, `InstagramReactions`, `Generator`). Leave the component files on disk in case they're wanted later.

No other components, copy, or styling change.