/* Sugarman Trigger #16: Social Proof — others like them succeeded
   Brand Bible Section 8: Real traction metrics */

const metrics = [
  { value: "100K+", label: "Downloads" },
  { value: "81%", label: "Retention" },
  { value: "500K+", label: "Followers" },
  { value: "25+", label: "Countries" },
];

export const SocialProofBar = () => {
  return (
    <section className="relative py-5 md:py-6 border-y border-white/[0.06] bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up flex items-center justify-between md:justify-center gap-8 md:gap-20 overflow-x-auto">
          {metrics.map((m) => (
            <div key={m.label} className="flex-shrink-0 text-center">
              <p className="font-display text-lg md:text-xl font-bold text-white">{m.value}</p>
              <p className="text-[10px] md:text-[11px] text-white/30 mt-0.5 tracking-wider uppercase">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
