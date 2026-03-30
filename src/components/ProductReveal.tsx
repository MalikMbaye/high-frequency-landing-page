/* Brunson's Epiphany Bridge: Step 4 — The Epiphany moment
   Sugarman Trigger #5: Involvement/Ownership — make them mentally experience the product
   Vitale: Sensory stacking — visual + kinesthetic
   Brand Bible Section 2A-2C: Product deep dive */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const ProductReveal = () => {
  return (
    <section className="relative py-24 md:py-36 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Product hero — cinematic grid */}
        <div className="fade-in-up mb-20">
          <img
            src="/images/product-grid.webp"
            alt="High Frequency Headphones — multiple cinematic angles"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy using Epiphany Bridge structure */}
          <div className="fade-in-up">
            {/* Sugarman: Short first sentence */}
            <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
              The technology
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.05] mb-6">
              Not headphones.
              <br />
              <span className="gradient-text">A frequency delivery system.</span>
            </h2>

            {/* Vitale: Sensory stacking — feel, hear, experience */}
            <p className="text-base text-white/45 leading-relaxed mb-5">
              The transducers inside vibrate at 100 times per second. When you put them on, you don&apos;t just hear frequency — you feel it resonate through your bone structure directly into your brain.
            </p>
            <p className="text-base text-white/45 leading-relaxed mb-8">
              Sound enters through your ears. Vibration enters through your bones. Your brain receives both signals simultaneously and instantly shifts to match the frequency you chose. That&apos;s not marketing. That&apos;s physics.
            </p>

            <a
              href={HEADPHONES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-7 bg-brand text-white font-display font-semibold text-sm rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
            >
              Shop Now — $99
            </a>
          </div>

          {/* Right — Product + packaging */}
          <div className="fade-in-up flex flex-col items-center gap-8">
            <img
              src="/images/product-packaging.webp"
              alt="High Frequency Headphones premium packaging"
              className="w-64 md:w-80 h-auto"
            />

            {/* Sugarman Trigger #11: Specificity — exact details create believability */}
            <div className="grid grid-cols-2 gap-6 text-center w-full max-w-sm">
              {[
                { stat: "100x/sec", label: "Vibration Rate" },
                { stat: "Bluetooth 5.3", label: "Connectivity" },
                { stat: "8+ Hours", label: "Battery Life" },
                { stat: "30g", label: "Ultralight" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-lg font-bold text-white">{s.stat}</p>
                  <p className="text-[11px] text-white/30 tracking-wider uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
