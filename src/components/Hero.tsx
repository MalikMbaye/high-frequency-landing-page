/* Master Copywriting: Sugarman's Slippery Slide — ultra-short first sentence,
   every element's only job is to get the next element read.
   Brunson's "This Changes Everything" curiosity hook.
   Brand Bible Pillar 1: Instant State Shift */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed cinematic product shot */}
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
          {/* Sugarman: First sentence must be 3-8 words max */}
          <p className="text-brand-light font-display text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-8">
            This changes everything.
          </p>

          {/* Brunson: Lead with the transformation, not the product */}
          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] text-white mb-7">
            Shift your brain state
            <br />
            <span className="gradient-text">in 10 seconds.</span>
          </h1>

          {/* Kennedy: Enter the conversation already in their head */}
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Bone conduction headphones that vibrate healing frequencies directly through your body. Not sound you hear. Vibration you feel. The CIA proved it works. 100,000 people downloaded the app. Now it&apos;s your turn.
          </p>

          {/* Vitale: Clear CTA — one action, make it easy */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={HEADPHONES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-13 px-8 py-3.5 bg-brand text-white font-display font-semibold text-sm md:text-base rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
            >
              Shop Now
            </a>
            <a
              href="#problem"
              className="inline-flex items-center justify-center h-13 px-8 py-3.5 text-white/50 hover:text-white font-display font-medium text-sm md:text-base transition-colors duration-300"
            >
              How it works →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
