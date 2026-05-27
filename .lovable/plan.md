## The bug

In `src/pages/Index.tsx`, every lazy-loaded section is wrapped in **one single `<Suspense>` boundary** with a tiny 400px `<Fallback />`:

```tsx
<Suspense fallback={<Fallback />}>
  <LazySection>...</LazySection>
  <LazySection>...</LazySection>
  ...20 more...
</Suspense>
```

How React Suspense works: while *any* child inside the boundary is still loading its chunk, **the entire boundary** swaps to the fallback. So the moment the user scrolls far enough to trigger the next `lazy()` import (FAQ, Footer, etc.), every section that was already rendered above gets unmounted and replaced with a single 400px placeholder. The page collapses from ~20,000px tall to a few hundred px, and the browser clamps the scroll position — which looks exactly like "it goes back to the top."

This matches the symptom (mid-scroll, both desktop and mobile, no click required — happens whenever a new chunk fetch is triggered).

## The fix

Give each `LazySection` its own Suspense boundary so a loading chunk only swaps its own placeholder, not the whole page.

### Option A (preferred): bake Suspense into `LazySection`

In `src/components/LazySection.tsx`, wrap `children` in a local `<Suspense>` with a fallback that matches the reserved `minHeight`, so the placeholder height is preserved during chunk load:

```tsx
<div ref={ref} style={!visible ? { minHeight } : undefined}>
  {visible ? (
    <Suspense fallback={<div style={{ minHeight }} />}>
      {children}
    </Suspense>
  ) : null}
</div>
```

Then in `src/pages/Index.tsx`, remove the outer `<Suspense>` wrapper (keep `StickyBuyBar` rendered directly, optionally with its own tiny Suspense).

### Result
- Each section loads independently
- No global collapse → no scroll jump
- Reserved height stays stable during chunk fetch (no layout shift either)

## Files touched
- `src/components/LazySection.tsx` — add per-section Suspense
- `src/pages/Index.tsx` — remove outer Suspense wrapper; wrap `StickyBuyBar` in its own Suspense
