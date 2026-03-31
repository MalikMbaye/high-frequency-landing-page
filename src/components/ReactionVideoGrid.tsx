/* Section 5: THE REACTION PROOF
   Framework: Social Proof stack (Trigger #16). Seeing is believing. */

const reactions = [
  {
    src: "/images/reaction-1.png",
    alt: "First-time reaction — instant spine straighten and eyes widen",
  },
  {
    src: "/images/reaction-2.png",
    alt: "Tech executive experiencing frequency shift for the first time",
  },
  {
    src: "/images/reaction-3.png",
    alt: "Woman reacting to bone conduction vibration",
  },
  {
    src: "/images/reaction-wearing.webp",
    alt: "Woman wearing High Frequency bone conduction headphones",
  },
];

export const ReactionVideoGrid = () => {
  return (
    <section className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up max-w-3xl mb-14">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            See it for yourself
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.05] mb-6">
            300+ People Have Had This Reaction on Camera. Watch.
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-5">
            This reaction isn&apos;t scripted.
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-5">
            It happens every single time someone puts these on for the first time. The spine straightens. The eyes widen. They say the same thing: &ldquo;whoa.&rdquo; We&apos;ve recorded it over 300 times. We stopped being surprised a long time ago.
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-5">
            What you&apos;re seeing is the brain recognizing the frequency and shifting in real time. The bone conduction vibration at 100 times per second creates a sensation your brain has never felt from regular headphones. Your brain doesn&apos;t just process it. It responds. Immediately.
          </p>
          <p className="text-base text-gray-700 font-medium italic">
            Now imagine that reaction is you. Tomorrow morning. Before work.
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        <p className="fade-in-up text-xs text-gray-400 text-center mt-6">
          These reactions are real. Unscripted. Unpaid.
        </p>
      </div>
    </section>
  );
};
