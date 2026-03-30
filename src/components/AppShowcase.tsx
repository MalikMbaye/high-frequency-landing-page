/* Brunson's "New Opportunity" framing — this isn't an improvement, it's a category shift
   Vitale: Future Pacing — "Imagine clicking a button and being locked in for 12 hours"
   Brand Bible Section 2C + 2G: "Digital pharmacy of brain states" / "Limitless pill" positioning */

const APP_URL = "https://highfrequency.onelink.me/lwuw/mkogg00s";

export const AppShowcase = () => {
  return (
    <section className="relative py-24 md:py-36 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up text-center max-w-2xl mx-auto mb-20">
          <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            The ecosystem
          </p>

          {/* Brand Bible 2G: "Limitless pill" positioning */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.05] mb-5">
            Click Adderall. Click Melatonin.
            <br />
            <span className="gradient-text">Click any state you want.</span>
          </h2>

          {/* Vitale: Future Pacing */}
          <p className="text-base text-white/45 leading-relaxed">
            Imagine a digital pharmacy for your brain — no prescriptions, no side effects, no crash. Choose your state. Your brain shifts to match. That&apos;s not a metaphor. That&apos;s what 100,000 people are doing right now.
          </p>
        </div>

        {/* App screenshots — 3 features side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {[
            {
              image: "/images/app-brainwave.jpg",
              title: "Brainwave Generator",
              desc: "Theta for deep sleep. Alpha for creative flow. Beta for laser focus. Gamma for peak performance. Choose your state with precision control.",
            },
            {
              image: "/images/app-solfeggio.webp",
              title: "Solfeggio Frequencies",
              desc: "396Hz to 963Hz — 9 ancient healing frequencies backed by modern research. Each one mapped to a specific outcome.",
            },
            {
              image: "/images/app-unique-meditation.png",
              title: "AI Meditation Engine",
              desc: "Generate a meditation about anything. Redirect it in real time by speaking to it. Overlay any frequency on top. Nothing else does this.",
            },
          ].map((feature, i) => (
            <div key={i} className="fade-in-up text-center">
              <div className="w-52 md:w-56 mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl shadow-brand/10 mb-6">
                <img src={feature.image} alt={feature.title} className="w-full h-auto" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up text-center mt-16">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-7 border border-brand/30 text-brand-light hover:bg-brand hover:text-white font-display font-semibold text-sm rounded-full transition-all duration-300"
          >
            Download the App — Free
          </a>
        </div>
      </div>
    </section>
  );
};
