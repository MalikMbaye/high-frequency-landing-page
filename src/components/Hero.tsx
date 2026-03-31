/* Section 1: HERO (Above the Fold)
   v2: Headline pulled from GFY V2 ad overlay (6.65x ROAS with 35-44 male demo).
   Product-claim-focused. Direct. Physical. Undeniable.
   Social proof strip integrated below CTA. */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

const metrics = [
  { value: "100,000+", label: "App Downloads" },
  { value: "25+", label: "Countries" },
  { value: "81%", label: "Retention Rate" },
  { value: "300+", label: "Recorded Reactions" },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-headphones.webp"
          alt="High Frequency bone conduction headphones"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto animate-[fadeIn_1s_ease-out_forwards]" style={{ opacity: 0, animationDelay: '0.2s' }}>
          {/* Pre-headline: credibility + social proof */}
          <p className="text-brand-light font-display text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase mb-8">
            Used by 100,000+ people across 25 countries. Backed by decades of neuroscience research.
          </p>

          {/* Main headline: Product-claim from performing ad data */}
          <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.0] text-white mb-7">
            This Product Resets Your Brain
            <br />
            <span className="gradient-text">in Under 60 Seconds.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Bone conduction frequency headphones that shift your brain state on demand. Focus. Calm. Energy. Flow. No pills. No crash. No dependency. And the more you use them, the less you need them.
          </p>

          {/* Primary CTA */}
          <div className="mb-14">
            <a
              href={HEADPHONES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-13 px-8 py-3.5 bg-brand text-white font-display font-semibold text-sm md:text-base rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
            >
              Get Your Headphones →
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex items-center justify-center gap-4 md:gap-0 flex-wrap">
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-center">
                <div className="text-center px-4 md:px-6">
                  <p className="font-display text-sm md:text-base font-bold text-white/80">{m.value}</p>
                  <p className="text-[9px] md:text-[10px] text-white/30 tracking-wider uppercase mt-0.5">{m.label}</p>
                </div>
                {i < metrics.length - 1 && (
                  <div className="hidden md:block w-px h-8 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
