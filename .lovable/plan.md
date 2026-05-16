# Copy Redundancy Audit & Streamlining Plan

The page currently runs ~28 sections plus 3 ProductBlocks. Many sections re-state the same 5-6 core ideas in slightly different words. Below is what's repeated, where, and what to cut/merge — grouped by impact.

## The 6 ideas being repeated everywhere

| Core idea | Currently repeated in |
|---|---|
| "100 pulses/sec bone conduction through skull" | Hero subhead, HowItWorks #1, ProductReveal hardware row, ProductBlock accordion (science + specs), FAQ #1 |
| "100K downloads / 81% retention / 200+ countries" | Hero strip, BeforeAfterScience (twice — big-stat-line + coherence card + pillar), StatsBlock, LibraryHubNetwork hub + network, ProductBlock rating + accordion |
| "Brain runs on frequencies — focused is one, scattered is another — we deliver the exact one" | ProductReveal software row, ProductBlock accordion "science", Generator intro |
| "More you use it, less you need it / builds neuroplasticity vs. coffee+Adderall dependency" | WrongTeardown transition, Neuroplasticity (entire section), ProductBlock accordion, FAQ, PriceReframe |
| "Coffee dehydrates / Adderall rents focus / Calm = beach sounds" | WrongTeardown (3 cards), VehicleSwitch (3 ledger rows), PriceReframe intro, Generator ("no beach sounds") |
| "Focus / Calm / Energy / Flow / Sleep — pick one" | Hero subhead, ProductReveal software, FiveStates (orbs), UseCases (4 cards), ProductBlock accordion "Frequency App", FAQ |

## High-impact cuts (kill duplicates outright)

1. **UseCases ↔ FiveStates** — FiveStates already names all 5 states with a one-liner each. UseCases re-explains Focus/Sleep/Meditation/Energy with longer paragraphs that re-use the *same* phrasing ("no coffee, no crash, no pill", "without melatonin", "Replace the 2 PM coffee"). The AI-Meditation card in UseCases is **verbatim** the closing paragraph of the AIMeditation section.
   → **Remove UseCases entirely** OR collapse FiveStates into a header for UseCases. Recommend: delete UseCases, keep FiveStates.

2. **PriceReframe ↔ VehicleSwitch** — VehicleSwitch is the visual ledger of "what you spend now vs. HFH". PriceReframe opens by re-listing the same costs in prose ("$3/day coffee… Adderall $200/mo… Calm subscription… nootropic stacks…") and re-states "one purchase makes you less dependent."
   → **Strip PriceReframe** down to the guarantee + final CTA only. Drop the cost-comparison paragraphs (VehicleSwitch already did the work).

3. **Neuroplasticity** — The whole "more you use it, less you need it" thesis already lives in: the WrongTeardown transition line, the ProductBlock accordion, the FAQ, and PriceReframe. The dedicated Neuroplasticity section adds the pull-quote but otherwise repeats.
   → **Either delete** and move the pull-quote ("Name one other product…") into BeforeAfterScience or PriceReframe, **or** keep the section and remove the duplicate phrasing from accordion/FAQ/PriceReframe.

4. **ProductBlock accordion** is acting as a mini-version of the whole page: "Science behind HFH" = HowItWorks + BeforeAfterScience; "What's in the box" = WhatsInBox section; "Frequency App" = FiveStates + Generator + AIMeditation; "Shipping/warranty" = PriceReframe guarantee; "How fast does it work" = Hero claim + reaction wall.
   → **Trim accordion to 3 items**: Tech specs, What's in the box (short), Shipping & guarantee. Let the page sections do the storytelling — the accordion shouldn't recap them.

5. **StatsBlock ↔ BeforeAfterScience pillar #3 ↔ LibraryHubNetwork "Network"** — All three say "100K downloads / 81% retention / 200+ countries". BeforeAfterScience also repeats the 81% line three times within itself (big-stat-line, coherence card, pillar).
   → Keep StatsBlock as the canonical stats moment. **Delete pillar #3** in BeforeAfterScience and the "big-stat-line" (the EEG charts already make the point). Remove the 100K/200+ phrasing from LibraryHubNetwork copy.

## Mid-impact tightening (same section, dense duplication)

6. **WrongTeardown transition line** — "And what if decades of neuroscience research already proved it?" then BeforeAfterScience opens with "Decades of Research. One Device That Delivers It." Same beat twice in 30 seconds of scroll. Cut the transition line or shorten to one sentence.

7. **ProductReveal "software" row** — Re-explains "brain operates on frequencies" (already said in HowItWorks #2 and ProductBlock accordion) and re-lists the 5 states (FiveStates does this with visuals). Cut the second paragraph; let the row just introduce "the app" and hand off to FiveStates/Generator/AIMeditation.

8. **Generator + AIMeditation + LibraryHubNetwork** — Three back-to-back sections on the app, each with its own header, hero image, ribbon, and CTA. Generator's "no beach sounds, no bird noises" repeats WrongTeardown card #3. Recommend: keep Generator + AIMeditation as feature spotlights, **fold LibraryHubNetwork's 3 panels into a single compact row** (it's currently 3 full panels saying "we have content, community, and global users"). Drop the "200+ countries" line from The Network panel since StatsBlock owns that.

9. **FounderStory** — Two large Expandable blocks, ~600 words. The second block repeats the Gateway Process / "frequency shifts brain state on command" claim already made in BeforeAfterScience pillar #1 and the accordion. Trim the research recap (2 paragraphs) — Jay's *story* is the unique content; the science is covered elsewhere.

10. **Hero pre-headline + subhead** — Pre-headline says "Used by 100,000+ people in every country on earth. Backed by decades of neuroscience." Subhead says "shift your brain state on demand. Focus. Calm. Energy. Flow." Then the social-proof strip says "100K+ Users / 200+ Countries / 81% Retention." The 100K stat appears 3 times in the hero alone. Pick one.

## Low-impact polish

- Hero subhead's "No pills. No crash. No dependency." reappears in PriceReframe, VehicleSwitch HFH row, and FiveStates Focus orb. Keep in Hero, drop the others.
- "Reset your brain in under 60 seconds" — Hero H1, ProductBlock subhead, BeforeAfterScience implied, FAQ. Pick Hero + one other.
- PriceReframe guarantee mentions "300+ reactions" — user just removed this everywhere else; should be removed here too.
- VideoProof headline ("Watch What Happens to Your Brain in 60 Seconds") re-states the Hero promise. Could just be "Real EEG. NYU. No edits." with the video.

## Recommended execution order

1. Delete `UseCases` from `Index.tsx` (biggest single redundancy).
2. Trim `ProductBlock` accordion from 7 items → 3 (specs, box, shipping).
3. Strip `PriceReframe` to guarantee + CTA only.
4. Decide: keep `Neuroplasticity` OR keep the duplicated phrasing in accordion/FAQ — not both.
5. Tighten `BeforeAfterScience` (remove pillar #3 + big-stat-line) and `LibraryHubNetwork` (collapse to one compact row, drop stats line).
6. Trim `Hero`, `FounderStory`, `Generator`, `ProductReveal` per notes above.
7. Remove the leftover "300+ reactions" mention in `PriceReframe`.

Estimated outcome: ~35-40% less body copy, same persuasive arc, faster mobile scroll, and each claim earns its place by appearing once in its strongest form.

## Open questions before I implement

- Are you OK fully **deleting** `UseCases` and `Neuroplasticity` (option A), or do you want to keep them and instead remove duplicates elsewhere (option B)?
- For the `ProductBlock` accordion: trim to 3 items as proposed, or keep the science/app items because they help on-page SEO?
- `PriceReframe`: strip to guarantee+CTA only, or keep one short cost-comparison line as the bridge?
