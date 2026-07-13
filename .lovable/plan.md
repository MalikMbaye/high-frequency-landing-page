
## Goal

Sweep the landing copy to remove FDA/FTC risk called out in `Claims_sheet.md`: no named conditions, no "cure/replaces medication" framing, no unsubstantiated mechanism claims, no borrowed NYU credibility, and no business-metric-disguised-as-science.

Only text/copy changes (plus a couple of image `alt` strings and the icon-strip label for "Retention"). No layout, styling, or logic changes.

## Files to edit

### 1. `index.html`
- **Title**: "High Frequency Headphones — Resets Your Brain in Under 60 Seconds" → "High Frequency Headphones — Feel a Shift in Under 60 Seconds"
- **Meta description**: remove "Validated by EEG"; soften to "Frequency headphones designed to help you shift your brain state on demand. Focus. Calm. Energy. Flow. Loved by 100,000+ users across 200+ countries."
- Update matching og/twitter tags to mirror.

### 2. `src/components/Hero.tsx`
- Headline: `RESETS YOUR BRAIN IN UNDER 60 SECONDS` → `FEEL A SHIFT IN UNDER 60 SECONDS`
- Pre-headline: drop "Backed by decades of neuroscience research" → "Used by 100,000+ people in every country on earth. Inspired by decades of frequency research."
- Subhead: keep, but change "No pills. No crash. No dependency." → "No jitters. No crash. No subscription." (removes drug-comparison framing)

### 3. `src/components/HowItWorks.tsx`
- Callout 1 heading `Direct Frequency Transmission` and body: reframe as hardware description. Body → "Bone-conduction transducers deliver gentle vibration through the temporal bone at a precise frequency."
- Callout 2 heading `Instant Brain Stimulation` → `Sound You Feel, Not Just Hear`. Body → "The vibration travels through the skull so you experience the frequency physically, not only through your eardrums."
- Callout 3 body: `State shifts in under 60 seconds` → `Most people feel a shift in under 60 seconds. Focus. Calm. Flow. Energy. On demand.`

### 4. `src/components/BeforeAfterScience.tsx`
This is the highest-risk section. Rewrites:
- Section header stays; sub → replace "Validated by EEG testing with NYU students" with "In an informal pilot session, we recorded EEG signals from a small group of volunteers. Here's what we saw."
- `big-stat-line`: `81% of users stay locked in past 30 minutes.` — this is retention data conflated with brain data. Move retention into the retention pillar only. Replace this line with: "Most participants reported feeling a clear state shift within the first minute."
- Card 1 (`EEG POWER SPECTRUM` / "Chaos Becomes Coherence"): keep visual, but soften body → "In this informal pilot recording, brainwave activity looked noisy before the session and appeared more organized after 60 seconds of frequency delivery. Small sample, not a clinical study — just what we saw on the readout."
- Card 2 (`RECORDED BY NYU STUDENTS`): remove NYU attribution. Tag → `INFORMAL PILOT RECORDING`. Heading `A Measurable State Shift` → `A Visible Shift on the Readout`. Body → "In this small pilot, the BEFORE and AFTER EEG epochs looked distinct on a scatter plot. It's a snapshot from one informal session, not a peer-reviewed study — but users consistently report the same subjective shift the readout suggests." (Removes "isn't placebo / measurable, reproducible neurological event.")
- Card 3 (`COHERENCE INDEX` / "81% Coherence"): rename tag → `USER RETENTION`. Heading → `81% Stay Past 30 Minutes.` Body clarifies this is app retention (not a brain metric): "Over 100,000 people have downloaded the HFH app. 81% keep using it past 30 minutes — in a category where 30-day retention typically sits under 10%. That's an engagement stat, not a brain measurement, but it tells us people keep coming back."
- Image `alt` for Card 3 chart: replace "brainwave coherence" wording with "user retention".
- Science pillars:
  - Pillar 1 (`Government-Funded Frequency Research`): drop "proved". → "Starting in the 1980s, the US government funded research into how sound frequencies affect brain states, later declassified as the Gateway Process. HFH is inspired by that body of research — not a clinical replication of it."
  - Pillar 2: `EEG Validation (NYU Student Testing)` → `Informal EEG Pilot`. Body → "In an informal pilot session, EEG recordings showed more organized brainwave patterns during use. Small sample, no clinical claims — just an early signal that matched what users described feeling."
  - Pillar 3 stays factual (already framed as retention).
- Remove `pull-stat` line "The brain runs in a straight line, not a zigzag." (mechanism metaphor tied to EEG evidence). Replace with: "Real people. Real sessions. Honest data."

### 5. `src/components/Neuroplasticity.tsx`
- Mega headline stays (it's ambiguous enough).
- Subhead: strip "neuroplasticity" and "literally rewiring". → "Every session helps train your brain. You're not renting a temporary state — you're building the habit of dropping into focus, calm, or flow on your own."
- Body: drop drug names & "literally rewiring". → "Stimulants tend to make you more dependent over time. This is designed to do the opposite — help your brain get better at finding these states on its own."
- Pull quote: keep as-is (it's opinion/rhetorical).

### 6. `src/components/UseCases.tsx`
- For Focus: remove "No pills" and "before your phone rewired it" mechanism claim. → "Select Focus. Put the headphones on. Give yourself a long, uninterrupted work block — no coffee run, no crash, just a state that's easier to settle into."
- For Sleep: strip melatonin/pill language. → "Select Calm. The frequency helps quiet the day's noise so it's easier to wind down before bed."
- For Meditation: keep (no medical claims).
- For Energy: keep vibe, drop "chemicals". → "Skip the 2 PM coffee run. Select Energy. Feel the vibration help you settle into a more alert state — no jitters, no crash."
- Rename card 5 from "For Headaches and Pain" → "For Tension". Body → "Some users report feeling less tense and more relaxed after use. That's a subjective experience, not a medical claim — we don't treat conditions, we help you feel a shift." Remove tinnitus/migraine/TMJ anecdote entirely.
- Image `alt` for card 5: remove "Relief" wording tied to head-pain silhouette; rewrite to "HFH app Tension mode showing soft purple orb and 304 Hz frequency visualization".

### 7. `src/components/FiveStates.tsx`
- Sleep card body: `Fall asleep faster, deeper. No melatonin needed.` → `Wind down faster before bed.`
- Rename RELIEF orb → `TENSION`. Body → `Help your body feel less tense and more relaxed.` Remove tinnitus/migraine/TMJ line.

### 8. `src/components/VehicleSwitch.tsx`
- Replace "Adderall / Vyvanse" row with a generic "Prescription Stimulants" row; drawback becomes "Prescription stimulants can carry side effects, dependency, and withdrawal — and they're a monthly cost that doesn't build anything long term."
- Nootropic Stacks drawback: strip "Zero neuroplasticity building" → "Expensive supplement combinations that don't build anything long-term."
- HFH row drawback: replace "Builds neuroplasticity with every session" → "Designed to help your brain get better at finding these states on its own."

### 9. `src/components/WrongTeardown.tsx`
- Card 2 title: `Adderall actually works though. Right?` → `Prescription stimulants actually work though. Right?` Body: remove Adderall/Vyvanse names & clinical side-effect list. → "Prescription stimulants can borrow you a few hours of focus and charge you back with dependency, tolerance, and rough comedowns. Over time many people need more just to feel normal — that's a subscription, not a solution."

### 10. `src/components/VideoProof.tsx`
- Headline: `Watch What Happens to Your Brain in 60 Seconds.` → `Watch What People Feel in 60 Seconds.`
- Caption: `Real EEG footage. No edits. No filters. Recorded with NYU students.` → `Real footage from an informal pilot session. No edits. No filters.` (Removes NYU trademark borrowing.)

### 11. `src/components/ProductBlock.tsx`
- PDP subhead: `Reset your brain in under 60 seconds.` → `Feel a shift in under 60 seconds.`
- Bullet `Resets Brain State in Under 60 Seconds` → `Feel a Shift in Under 60 Seconds`
- Bullet `Builds Neuroplasticity, Not Dependency` → `Builds a Habit, Not a Dependency`
- "About the technology" body: drop "proved" language. → "The technology is inspired by decades of research into sound frequencies and brain states, including the CIA's declassified Gateway Process, which explored how frequency patterns can influence brainwave activity."
- "First time you put them on" body: `feel the shift in under 60 seconds` (already acceptable — keep).
- Neuroplasticity paragraph: → "Every session helps train your brain toward stronger focus, calm, and flow. Stimulants build dependency. This is designed to build the opposite."
- Remove Adderall reference: "Adderall and coffee create dependency. This builds independence." → "Stimulants create dependency. This is designed to build independence."
- Product image `alt` text updates (copy-only, image files themselves aren't changed since we can't edit binaries): update alts referencing tinnitus, migraines, Adderall, melatonin to neutral descriptions ("User quote card" style). Note in section notes that the image files themselves still contain the risky words in-picture — flag to user separately.

### 12. `src/components/FAQ.tsx`
- Q about science: remove "proved" and NYU. → "The US government funded decades of research into how frequency affects brain states, later declassified as the Gateway Process. We've also run informal EEG pilot sessions that showed more organized brainwave patterns during use. HFH is inspired by that body of work — we don't claim to treat any medical condition."
- Q about long-term use: strip "neuroplasticity" and Adderall. → "Every session helps train your brain toward focus, calm, and flow. Over time many users find it easier to reach those states on their own. Stimulants tend to build dependency — this is designed to build the opposite."
- Any other FAQ answer referencing "reset / 60 seconds" as a physiological event → change to "feel a shift". (Will confirm exact copy while editing.)

### 13. `src/components/FounderStory.tsx`
- First column: strip Vyvanse. → "But when he pushed to the next level, focus became the bottleneck. In his teens he was prescribed a stimulant that helped him lock in but left him unable to eat or train the way he needed to. The tool that was supposed to help was costing him the thing he cared about most."
- "He stopped taking Vyvanse" → "He walked away from the athletic path. He got off the stimulant. And he went looking for something that didn't come with a crash."
- Second column: soften "proved that precise frequency patterns can shift brainwave states on command" → "explored how specific frequency patterns can influence brainwave states."

### 14. `src/components/StatsBlock.tsx` and Hero social proof strip
- No changes needed to the numbers themselves — they're honest engagement stats. Keep "81% Retention Rate" wording (it's already labeled as retention, which is what the Claims Sheet asks for).

## Out of scope (flagging, not fixing)

- The **in-image text** on product cards (`05-no-pills-no-migraines.webp`, `06-tinnitus.webp`, `09-fall-asleep-without-melatonin.webp`, `14-lock-in-without-adderall.webp`, `15-from-adderall-to-frequency.webp`) still contains the risky claims baked into the pixels. Alt text will be updated, but the images themselves need to be regenerated or removed. I'll call this out at the end so you can decide.
- Bar chart image `Rp0TCgqL.webp` visually shows "35% vs 81%" as brain coherence. The Claims Sheet flags this as the single highest-risk item. Copy around it will be reframed as retention, but the chart image itself should ultimately be swapped or relabeled visually. Flagging for a follow-up turn.

## Verification

After edits: grep for `tinnitus|migraine|TMJ|melatonin|Vyvanse|Adderall|neuroplasticity|placebo|literally rewir|Resets Your Brain|Validated by EEG|NYU` across `src/` and `index.html` — expected result: zero hits outside image filenames.
