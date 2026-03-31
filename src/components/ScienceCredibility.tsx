/* Section 9: THE SCIENCE
   v2: Science-first framing. Research is the lead. Declassified program is supporting evidence.
   The word "CIA" appears once as context, not as the hook. */

export const ScienceCredibility = () => {
  return (
    <section id="science" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Full-bleed science image — keeps dark overlay for readability */}
        <div className="fade-in-up mb-20">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] max-h-[420px]">
            <img
              src="/images/science-sound.jpg"
              alt="Sound frequency waves entering the human brain"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-xl">
                <p className="text-purple-300 font-display text-xs font-medium tracking-[0.25em] uppercase mb-4">
                  The science
                </p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-white leading-[1.05]">
                  Decades of Research.
                  <br />
                  <span className="text-white/50">One Device That Delivers It.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-up max-w-3xl mb-16">
          <p className="text-base text-gray-500 leading-relaxed">
            This technology is built on neuroscience, not marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-20">
          {[
            {
              label: "Government-Funded Frequency Research",
              body: "Starting in the 1980s, the US government funded extensive research into how sound frequencies affect brain states. The resulting program, known as the Gateway Process, was classified for decades before being released to the public. The findings proved that specific binaural beats and frequency patterns can shift brainwave states on command. Focus, calm, heightened awareness, deep rest. All achievable through precise frequency delivery. High Frequency Highway is the first consumer product engineered to deliver this science through bone conduction hardware.",
            },
            {
              label: "EEG Validation (NYU Student Testing)",
              body: "EEG testing conducted with NYU students showed that the technology keeps the brain in coherent brainwave states for longer periods. Jay's analogy: would you rather run in a straight line or a zigzag? A coherent brainwave state lets your brain compute faster and process faster. The HFH headphones keep your brain running in a straight line.",
            },
            {
              label: "81% App Retention Rate",
              body: "Over 100,000 people have downloaded the HFH app. 81% of them kept using it. In an industry where the average app retention rate at 30 days is under 10%, that number tells you everything about whether this works.",
            },
          ].map((point, i) => (
            <div key={i} className="fade-in-up">
              <h3 className="font-display text-base font-bold text-gray-900 mb-3">{point.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="rounded-xl border border-gray-200 p-4">
            <img
              src="/images/brain-before-after.png"
              alt="Brain EEG data before and after wearing HFH headphones"
              className="w-full h-auto"
            />
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <img
              src="/images/science-eeg-data.png"
              alt="Cohen Test — brainwave power shifts before and after wearing device"
              className="w-full h-auto"
            />
          </div>
        </div>
        <p className="fade-in-up text-[11px] text-gray-400 text-center mt-4">
          EEG brain mapping data from controlled testing with NYU students.
        </p>
      </div>
    </section>
  );
};
