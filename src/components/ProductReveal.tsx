/* Section 4: THE PRODUCT
   Framework: Solution introduction. Simple explanation → mechanism → neuroplasticity kill shot. */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

const features = [
  {
    title: "Bone Conduction + Vibration Delivery",
    desc: "100 vibrations per second through your skull. Sound and physical sensation working together for an instant brain state shift.",
  },
  {
    title: "Full Bluetooth Headphone",
    desc: "Music, podcasts, calls. These work as your everyday headphones, with frequency technology built in.",
  },
  {
    title: "Precision Frequency App (100,000+ Downloads)",
    desc: "Select your state: Focus. Calm. Energy. Flow. Sleep. The app delivers the exact frequency your brain needs, including all Rife frequencies and AI-powered personalized meditation.",
  },
  {
    title: "Noise Isolation Earplugs Included",
    desc: "Bone conduction plus earplugs creates full frequency immersion without outside noise. Total sensory control.",
  },
];

export const ProductReveal = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up mb-20">
          <img
            src="/images/product-grid.webp"
            alt="High Frequency Headphones — multiple cinematic angles"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        <div className="fade-in-up max-w-3xl mb-16">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            The technology
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.05] mb-6">
            Frequency Science. In a Pair of Headphones.
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-5">
            High Frequency Highway. Bone conduction frequency headphones paired with a precision frequency app.
          </p>
          <p className="text-base text-gray-600 leading-relaxed font-medium mb-5">
            Here&apos;s how it works in plain English.
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-5">
            Your brain operates on frequencies. When you&apos;re focused, your brain is on one frequency. When you&apos;re scattered, it&apos;s on another. These headphones deliver the exact frequency you need, directly through your skull, using both vibration and sound at the same time.
          </p>
          <p className="text-base text-gray-500 leading-relaxed">
            This is different from regular headphones. The transducers vibrate 100 times per second through your bones. Your brain doesn&apos;t just hear the frequency. It physically feels it. And it locks in. Instantly.
          </p>
        </div>

        <div className="fade-in-up max-w-md mx-auto mb-20">
          <img
            src="/images/marketing-resets-60s.png"
            alt="High Frequency Highway — Resets your brain in under 60 seconds. Bone conduction frequency, 100 vibrations per second."
            className="w-full h-auto rounded-2xl shadow-2xl shadow-brand/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((f, i) => (
            <div key={i} className="fade-in-up p-6 rounded-xl bg-white border border-gray-200">
              <h3 className="font-display text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <img
            src="/images/product-packaging.webp"
            alt="High Frequency Headphones premium packaging"
            className="w-full h-auto rounded-2xl"
          />
          <img
            src="/images/product-headphones.webp"
            alt="High Frequency Headphones close-up"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* THE NEUROPLASTICITY KILL SHOT */}
        <div className="fade-in-up max-w-3xl mx-auto text-center py-16 border-y border-gray-200">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-6">
            The part that changes everything
          </p>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-8">
            The more you use this, the less you need it.
          </h3>
          <div className="max-w-md mx-auto mb-8">
            <img
              src="/images/marketing-less-you-need.png"
              alt="The more you use it, the less you need it. Every session builds neuroplasticity."
              className="w-full h-auto rounded-2xl shadow-2xl shadow-brand/20"
            />
          </div>
          <p className="text-base text-gray-500 leading-relaxed mb-5">
            Every session builds neuroplasticity in your brain. You&apos;re not renting a temporary state. You&apos;re literally rewiring your brain&apos;s ability to focus, stay calm, and enter flow on its own. Without the device. Without a pill. Without anything.
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-5">
            Adderall makes you more dependent every month. Coffee makes you more dependent every morning. This does the opposite. It makes your brain stronger. And eventually, your brain can do it without help.
          </p>
          <p className="text-base text-gray-700 font-medium">
            Name one other product on the planet that works itself out of a job because it actually fixed the problem.
          </p>
        </div>

        <div className="fade-in-up text-center mt-14">
          <a
            href={HEADPHONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-13 px-10 py-3.5 bg-brand text-white font-display font-bold text-base rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
          >
            Start Rebuilding Your Brain →
          </a>
        </div>
      </div>
    </section>
  );
};
