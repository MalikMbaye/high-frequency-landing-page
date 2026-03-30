/* Brunson: Grand Slam Offer — stack value until it's irrational to say no
   Kennedy: "Vehicle Switch" — don't sell the product, sell the switch FROM their current solution
   Vitale Law #4: Reward — unexpected value stacking
   Sugarman Trigger #20: Fear of Loss + #27: Value
   Brand Bible Section 2C + 2D + 2E */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const OfferStack = () => {
  return (
    <section className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Value Stack — Brunson: Make the value so obvious it's irrational to say no */}
        <div className="fade-in-up text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            What you get
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.05]">
            The complete system.
          </h2>
        </div>

        <div className="fade-in-up max-w-xl mx-auto mb-14">
          {[
            "High Frequency Bone Conduction Headphones",
            "Full Access to the HFH App (100K+ downloads, 81% retention)",
            "Brainwave Generator — Theta, Alpha, Delta, Beta, Gamma",
            "All 9 Solfeggio Healing Frequencies (396Hz–963Hz)",
            "Complete Rife Frequency Library",
            "AI-Powered Personalized Meditation Engine",
            "Vocal Tone Reading & Mood Detection",
            "Noise-Isolation Earplugs for Deep Immersion",
            "Free Worldwide Shipping",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-b-0">
              <svg className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-sm text-white/60">{item}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up text-center mb-28">
          <a
            href={HEADPHONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-13 px-10 py-3.5 bg-brand text-white font-display font-bold text-base rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
          >
            Get Your Headphones
          </a>
        </div>

        {/* Kennedy: Vehicle Switch — Brand Bible Section 2D */}
        <div className="fade-in-up max-w-4xl mx-auto mb-28">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-12">
            The switch people are making.
          </h3>
          <div className="space-y-4">
            {[
              {
                from: "Adderall / Vyvanse",
                cost: "$200+/mo + side effects + dependency",
                hfh: "Non-invasive. No side effects. Builds neuroplasticity — you need it LESS over time, not more.",
              },
              {
                from: "Coffee / Energy Drinks",
                cost: "$150+/mo + crashes + dehydration",
                hfh: "No crash. No dehydration. Locked in from 7am to 8pm. One purchase, unlimited use.",
              },
              {
                from: "Calm / Headspace",
                cost: "$70/yr + beach sounds + no real frequency",
                hfh: "Real frequencies. AI meditation. Bone conduction. 81% retention vs. their 4% industry average.",
              },
            ].map((s, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-4 md:gap-6 items-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div>
                  <p className="font-display text-sm font-semibold text-white/40 mb-1">{s.from}</p>
                  <p className="text-xs text-white/25">{s.cost}</p>
                </div>
                <span className="hidden md:block text-brand text-lg">→</span>
                <div>
                  <p className="font-display text-sm font-semibold text-brand-light mb-1">High Frequency Highway</p>
                  <p className="text-xs text-white/50">{s.hfh}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ — Kennedy: Handle objections explicitly
           Sugarman Trigger #8: Satisfaction Conviction */}
        <div className="fade-in-up max-w-2xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-white text-center mb-10">
            Questions
          </h3>
          <div className="space-y-2">
            {[
              {
                q: "How is this different from binaural beats on YouTube?",
                a: "Two critical differences. First — you don't know the exact frequency you're getting on YouTube or Spotify. Our app gives you precision control. Second — regular headphones only deliver audio. Bone conduction delivers physical vibration + audio simultaneously, creating a dual-pathway signal that shifts your state immediately.",
              },
              {
                q: "Is there real scientific evidence?",
                a: "Yes. The CIA's declassified Gateway Process document proved binaural beats shift brain states. Our EEG testing with NYU students showed the technology maintains brain coherence for significantly longer periods. This is neuroscience delivered through hardware, not wellness marketing.",
              },
              {
                q: "How quickly will I feel it?",
                a: "The shift is instant and perceptible — most people report feeling it within 10-30 seconds. The CEO of Kickstarter described it as being 'transported.' We have 300+ documented reaction videos showing this moment.",
              },
              {
                q: "Does it create dependency like medication?",
                a: "The exact opposite. The technology builds neuroplasticity — real neural pathways for sustained focus, calm, and clarity. The more you use it, the less you need it. That's the opposite of every pharmaceutical, stimulant, and supplement on the market.",
              },
              {
                q: "What can I use it for?",
                a: "Focus and productivity. Sleep and relaxation. Pain relief. Meditation. Stress management. Consciousness expansion. The app includes Brainwave frequencies, all 9 Solfeggio frequencies, Rife frequencies, and an AI meditation engine that generates personalized sessions.",
              },
            ].map((faq, i) => (
              <details key={i} className="group rounded-lg bg-white/[0.02] border border-white/[0.05] overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-display text-sm font-medium text-white hover:text-brand-light transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg className="w-4 h-4 text-white/20 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-white/35 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
