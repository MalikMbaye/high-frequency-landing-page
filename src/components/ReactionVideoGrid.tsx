/* Sugarman Trigger #16: Social Proof + #6: Emotion
   Brand Bible Section 4B: "300 recorded reaction videos"
   "Instant spine reaction, eyes lighting up, visible real-time shift"
   Brunson: Show the achievement (Step 7) through OTHER people's transformations */

const reactions = [
  {
    src: "/images/reaction-1.png",
    quote: "Zen state in 10 seconds",
    alt: "Woman experiencing immediate calm after trying HFH headphones",
  },
  {
    src: "/images/reaction-2.png",
    quote: "I felt transported",
    alt: "Tech executive trying High Frequency Headphones for the first time",
  },
  {
    src: "/images/reaction-3.png",
    quote: "Frequency WHOA",
    alt: "Woman reacting to the vibration from bone conduction frequency",
  },
  {
    src: "/images/reaction-wearing.webp",
    quote: "I can feel it in my skull",
    alt: "Woman wearing High Frequency bone conduction headphones",
  },
];

export const ReactionVideoGrid = () => {
  return (
    <section className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up max-w-2xl mb-14">
          {/* Sugarman: Short first sentence → curiosity */}
          <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            300+ reactions recorded
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.05] mb-5">
            You can&apos;t fake this.
          </h2>
          <p className="text-base text-white/45 leading-relaxed">
            Every person who puts these on has the same reaction — spine tingling, eyes widening, an involuntary &ldquo;whoa.&rdquo; It&apos;s instant. It&apos;s visible. And it happens every single time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {reactions.map((r, i) => (
            <div key={i} className="fade-in-up relative group overflow-hidden rounded-xl aspect-[3/4]">
              <img
                src={r.src}
                alt={r.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 font-display text-xs md:text-sm font-medium text-white/80">
                &ldquo;{r.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
