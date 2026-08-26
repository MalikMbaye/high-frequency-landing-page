/**
 * Per-variant PDP copy for the /honey landing page. Kept in a separate module so
 * the long-form shilajit modal bodies are lazy-loaded and never land in the
 * initial HTML.
 */
export interface HoneyVariantContent {
  /** Short description shown above the benefits list, ending at the Read more cliffhanger. */
  short: string;
  modalTitle: string;
  /** Long-form modal body, one string per paragraph. Lines starting with "• " render as bullets. */
  modalBody: string[];
  /** Fourth checkmark row, swapped per variant. */
  fourthCheck: string;
}

export const HONEY_VARIANT_CONTENT: Record<"honey" | "gummies" | "bundle", HoneyVariantContent> = {
  honey: {
    short:
      "Sacred Himalayan shilajit folded into certified organic caramel honey. Your brain is an electrical organ, and every session burns the minerals it fires with. One golden stick refills them in ten seconds, right before the headphones go on.",
    modalTitle: "High Frequency Honey — the morning ritual",
    modalBody: [
      "Fuel for your frequency practice. Sound shifts your state in under sixty seconds — that's the instant side. But that shift runs on energy, and your cells make energy out of minerals. Modern food barely delivers them anymore, and that shortage is the real story behind the 2 PM collapse and the fog.",
      "Each stick carries 400mg of sacred Himalayan shilajit — 85+ ionic trace minerals with lab-verified 75%+ fulvic acid — folded into certified organic caramel honey. Tear it, squeeze it, ten seconds once a day. No caffeine. Nothing spikes, nothing crashes.",
      "The receipts: every batch is third-party lab tested, heavy metals Non-Detect, fulvic acid verified above 75%. We publish the lab reports because the mineral category runs on trust or it runs on nothing.",
      "In the box: 30 High Frequency Honey Stix — one golden month of mornings.",
      "The guarantee: 30 days, full refund. If the practice doesn't compound for you, email us and we refund every cent.",
      "These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.",
      "Tune the signal. Feed the signal.",
    ],
    fourthCheck: "Ten seconds every morning, headphones on after",
  },
  gummies: {
    short:
      "Your brain runs on minerals, and modern food stopped delivering them years ago. That's the 2 PM collapse and the fog. Two tamarind gummies carry the full 400mg dose with 1g of sugar, none of it added, in the format that survives your worst week.",
    modalTitle: "Sacred Shilajit Multivitamins — what the minerals do, and when",
    modalBody: [
      "The benefit ladder, week by week. This is a compounding mineral, never a stimulant — nothing spikes and nothing crashes.",
      "• Week 1 — Energy and sleep: steadier energy through the day, deeper sleep at night. The afternoon crash starts to fade.",
      "• Week 2 — Clarity: the fog lifts. Focus holds through the afternoon without rescue coffee.",
      "• Week 4 — Recovery: faster recovery between workouts. More output, less soreness.",
      "• Weeks 8–12 — Compound effect: the full arc lands later because the mineral builds. The number the research actually measured came at ninety days — most people quit at week four, right before it lands.",
      "Two tamarind gummies at night. Travel-proof, zero added sugar, exact dose, no mess. Gym bag, flight, hotel room — the day you skipped breakfast and left at seven, the dose still happens.",
      "Every batch third-party lab tested: 400mg Himalayan shilajit per serving, 75%+ fulvic acid, heavy metals Non-Detect.",
    ],
    fourthCheck: "Two gummies at night. Travel-proof, zero mess",
  },
  bundle: {
    short:
      "Your headphones handle the switch. This handles the power supply. Morning honey stick, nightly gummies, the same 400mg of sacred Himalayan shilajit in both, so the practice never skips a day. The honey is the one you look forward to. The gummies are the one you never miss.",
    modalTitle: "The High Frequency Ritual — how the full system works",
    modalBody: [
      "Sound shifts your state in under sixty seconds. That's the switch. But every session burns the minerals your brain fires with — and the ritual is what keeps the power supply full.",
      "Morning: one golden honey stick. Ten seconds of caramel honey, then sixty seconds of frequency with the headphones on.",
      "Night: two tamarind gummies. The wind-down dose — travel-proof, zero added sugar, built for the days the morning didn't happen.",
      "Same mountain mineral in both, different hour, different job. The honey builds the habit because it's the one you actually want. The gummies cover everything the morning doesn't. Most people end up wanting both — the bundle exists for them.",
      "In the box: 30 High Frequency Honey Stix plus 60 Sacred Shilajit Multivitamin Gummies — one full month of the complete ritual.",
      "The guarantee: 30 days, full refund. If the ritual doesn't compound for you, we refund every cent.",
    ],
    fourthCheck: "Ten seconds in the morning. Two gummies at night",
  },
};
