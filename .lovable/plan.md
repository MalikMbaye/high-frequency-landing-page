# Recommendation: Do NOT lazy-load the Bump Modal

## Short answer
No. The lazy-load change is not worth it. Keep `BumpModalHost` eager (as it is now). The upside is negligible and the downside hits the single most important click in the funnel.

## The numbers

I measured the actual built assets and the bump modal's footprint:

| Asset | Raw size | Gzip (est.) |
|---|---|---|
| Main JS chunk (`index-…js`) | 915 KB | ~271 KB |
| Bump modal source (JS only, no CSS) | ~28 KB | **~5–8 KB** |
| Bump modal CSS (`upsell.css`) | 23 KB | already in the 160 KB CSS bundle |

The bump modal's compiled JS is roughly **5–8 KB gzipped** — under 3% of the main chunk. Removing it from the initial download would not produce a perceptible speedup on first paint. You would not feel it.

## The cost of lazy-loading (the real problem)

`React.lazy` around `BumpModalHost` means the modal's code downloads **on the first click of "Add to Cart."** That click is the highest-intent action in the entire funnel. On a mobile or slow connection that dynamic import is a fresh network request:

- Fast Wi-Fi: ~50–150 ms (a visible flicker)
- 4G: ~150–400 ms (noticeable pause)
- Slow 3G / throttled: 300 ms → 1 s+ (looks broken)

During that window the user has clicked the buy button and **nothing happens** — no modal, no feedback. That is the worst possible place to introduce latency. A one-second stall on the add-to-cart moment will lose more conversions than shaving 5 KB off the page weight will ever gain.

## Conclusion

Keep the modal eager. The current setup already opens the modal instantly because the code is in the initial bundle. The below-the-fold sections (carousels, science, FAQ, etc.) are already code-split and load on scroll — that is where the real page-weight savings are, and those are already in place.

## What I will change
Nothing. No code change. The recommendation is to leave `BumpModalHost` exactly where it is in `App.tsx` (eager import, line 21 / line 45). This is a "do not touch" decision, not a build task.

## Optional (only if you want extra insurance, not required)
If you ever want a safety net without the lazy-load risk, a `requestIdleCallback` prefetch of the Shopify product data could warm the cache ahead of time — but the modal's own code should stay eager. This is not needed today.
