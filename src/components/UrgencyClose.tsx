/* Brunson: Urgency close — consequence of delay + final CTA
   Kennedy: "Reason to act now" — make delay feel costly
   Brand Bible Pillar 3: Build Your Brain (Neuroplasticity) — the ultimate differentiator
   Sugarman Trigger #9: Urgency + #20: Fear of Loss + #30: Future Pacing
   Vitale: Presupposition — "When you implement this..." assumes they will */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const UrgencyClose = () => {
  return (
    <section className="relative py-24 md:py-36 bg-white/[0.015] overflow-hidden">
      {/* Subtle purple ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand/[0.06] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 text-center">
        <div className="fade-in-up max-w-2xl mx-auto">
          <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            The difference
          </p>

          {/* Brand Bible Pillar 3 — the single most powerful differentiator */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.05] mb-6">
            The more you use it,
            <br />
            <span className="gradient-text">the less you need it.</span>
          </h2>

          {/* Kennedy: Consequence of delay */}
          <p className="text-base text-white/45 leading-relaxed max-w-lg mx-auto mb-4">
            Every pharmaceutical creates dependency. Every stimulant builds tolerance. Every quick fix demands more to feel the same.
          </p>

          {/* Vitale: Future Pacing — help them see their future self */}
          <p className="text-base text-white/45 leading-relaxed max-w-lg mx-auto mb-12">
            This technology builds neuroplasticity — real neural pathways for sustained focus, calm, and clarity. Six months from now, your brain is stronger. You&apos;re sharper without trying. That&apos;s not a product. That&apos;s freedom.
          </p>

          {/* Sugarman: One clear CTA, make it easy */}
          <a
            href={HEADPHONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-10 bg-brand text-white font-display font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
          >
            Get Your Headphones
          </a>

          {/* Sugarman Trigger #8: Satisfaction conviction */}
          <p className="text-[11px] text-white/20 mt-8">
            Free worldwide shipping · Satisfaction guaranteed · Secure checkout
          </p>
        </div>
      </div>
    </section>
  );
};
