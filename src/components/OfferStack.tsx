/* Section 7: THE VEHICLE SWITCH
   Framework: Comparison (#28) + Fear of Loss (#20) + Value (#27). */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

const competitors = [
  {
    name: "Coffee / Caffeine",
    cost: "$3/day = $1,095/year",
    drawback: "Dehydrates a brain that's 73% water. Crashes by 2 PM. Creates a dependency cycle that gets worse over time. Makes you MORE reliant every single morning.",
  },
  {
    name: "Adderall / Vyvanse",
    cost: "$200+/month",
    drawback: "Rents focus and charges with side effects, dependency, and withdrawal. Can't eat. Can't sleep. Requires a prescription and monthly dose increases. Makes you MORE reliant every month.",
  },
  {
    name: "Calm / Headspace",
    cost: "$70/year",
    drawback: "Beach sounds and bird noises labeled as meditation. Almost zero real frequency science. No hardware. No vibration. No measurable brain state shift. The CEO of Kickstarter says HFH works better than melatonin for calming his mind.",
  },
  {
    name: "Nootropic Stacks",
    cost: "$200+/month",
    drawback: "Expensive supplement combinations that still don't rebuild your brain. You're swallowing capsules hoping for a state change. Zero neuroplasticity building. Zero on-demand control.",
  },
  {
    name: "Energy Drinks",
    cost: "$4/can, multiple per day",
    drawback: "Your heart detects them as poison. Crash cycle. Chemical dependency. Zero cognitive benefit. Makes you MORE reliant every week.",
  },
];

export const OfferStack = () => {
  return (
    <section className="relative py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        <div className="fade-in-up text-center mb-16">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            The comparison
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.05] mb-5">
            What You&apos;re Spending Now vs. What You Could Be Using
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            You&apos;re already spending money trying to manage your brain. The question is whether what you&apos;re using is making you stronger or more dependent.
          </p>
        </div>

        <div className="space-y-3 mb-14">
          {competitors.map((c, i) => (
            <div key={i} className="fade-in-up p-5 md:p-6 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-sm font-semibold text-gray-700">{c.name}</h3>
                <span className="text-xs text-red-500 font-medium ml-4 flex-shrink-0">{c.cost}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{c.drawback}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up max-w-md mx-auto mb-14">
          <img
            src="/images/marketing-one-purchase.png"
            alt="One purchase replaces all three. Coffee, Adderall, Nootropics. You're already paying for this."
            className="w-full h-auto rounded-2xl shadow-2xl shadow-brand/20"
          />
        </div>

        <div className="fade-in-up p-6 md:p-8 rounded-xl bg-brand/[0.06] border border-brand/20 mb-14">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-lg font-bold text-gray-900">High Frequency Highway</h3>
            <span className="text-xs text-brand-dark font-semibold ml-4 flex-shrink-0">One purchase</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            No subscription. No side effects. No crash. No dependency. Focus, calm, flow, or sleep on demand. Builds neuroplasticity with every session. The more you use it, the less you need it. Backed by neuroscience research, validated by EEG testing, endorsed by the people who built the tech and entertainment industries.
          </p>
        </div>

        <div className="fade-in-up text-center">
          <a
            href={HEADPHONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-13 px-10 py-3.5 bg-brand text-white font-display font-bold text-base rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
          >
            Get Your Headphones →
          </a>
        </div>
      </div>
    </section>
  );
};
