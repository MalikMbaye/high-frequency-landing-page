import heroImage from "@/assets/hero-headphones.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="High Frequency Headphones"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-2">
            <p className="text-primary font-display text-sm tracking-[0.3em] uppercase animate-pulse-glow">
              Premium Audio Experience
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              High
              <br />
              Frequency
              <br />
              <span className="gradient-text">Headphones</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Engineered for audiophiles who demand nothing less than perfection.
            Crystal-clear highs, thunderous lows, zero compromise.
          </p>
          <div className="flex gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:opacity-90 transition-all box-glow"
            >
              Shop Now
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-border text-foreground font-display font-semibold text-sm tracking-wide hover:border-primary/50 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
