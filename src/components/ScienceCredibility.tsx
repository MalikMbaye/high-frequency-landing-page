/* Sugarman Trigger #4: Credibility — specific numbers, names, dates
   Sugarman Trigger #7: Authority — credentials, expertise, recognition
   Brand Bible Pillar 2: "Science-Backed, Not Woo"
   CIA Gateway Process, EEG testing with NYU, Rife frequencies */

export const ScienceCredibility = () => {
  return (
    <section id="science" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Full-bleed science image */}
        <div className="fade-in-up mb-20">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] max-h-[420px]">
            <img
              src="/images/science-sound.jpg"
              alt="Sound frequency waves entering the human brain"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-lg">
                <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-4">
                  The science
                </p>
                {/* Sugarman: Short sentence → pull forward */}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.05]">
                  This isn&apos;t wellness.
                  <br />
                  <span className="text-white/40">It&apos;s neuroscience.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Sugarman Trigger #11: Specificity — exact names, institutions, documents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-20">
          {[
            {
              stat: "Declassified by the CIA",
              title: "The Gateway Process",
              body: "The CIA's classified Gateway Process document — now declassified and publicly available — proved that binaural beats can shift brain states. This isn't theory. It's government-validated neuroscience.",
            },
            {
              stat: "Validated at NYU",
              title: "EEG Brain Mapping",
              body: "Controlled testing with NYU students showed the technology maintains brain coherence for significantly longer periods. Your brain runs in a straight line instead of a zigzag. That means faster processing, deeper focus.",
            },
            {
              stat: "100x Per Second",
              title: "Dual-Pathway Delivery",
              body: "Regular headphones deliver audio only. Bone conduction delivers physical vibration and audio simultaneously — creating a dual-pathway signal your brain can't ignore. It shifts. Immediately.",
            },
          ].map((point, i) => (
            <div key={i} className="fade-in-up">
              <p className="text-brand-light font-display text-[11px] font-medium tracking-[0.2em] uppercase mb-3">{point.stat}</p>
              <h3 className="font-display text-lg font-bold text-white mb-2">{point.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>

        {/* EEG data — real science visuals */}
        <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-xl p-4">
            <img
              src="/images/brain-before-after.png"
              alt="Brain EEG data before and after wearing HFH headphones"
              className="w-full h-auto"
            />
          </div>
          <div className="bg-white rounded-xl p-4">
            <img
              src="/images/science-eeg-data.png"
              alt="Cohen Test — brainwave power shifts before and after wearing device"
              className="w-full h-auto"
            />
          </div>
        </div>
        <p className="fade-in-up text-[11px] text-white/20 text-center mt-4">
          EEG brain mapping data from controlled testing with NYU students.
        </p>
      </div>
    </section>
  );
};
