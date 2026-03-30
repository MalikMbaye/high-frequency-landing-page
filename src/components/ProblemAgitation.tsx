/* Kennedy's PAS Framework: Problem → Agitation → Solution
   Sugarman: Seeds of curiosity at paragraph ends
   Brand Bible Section 9A: Pain/Problem Hooks — direct from founder interview
   Vitale Law #1: Engagement — ask questions they'll answer in their head */

export const ProblemAgitation = () => {
  return (
    <section id="problem" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* PROBLEM — Kennedy: Be specific and visceral, use their language */}
        <div className="fade-in-up max-w-2xl mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.05] mb-6">
            Your brain has been
            <br />
            <span className="text-white/30">hijacked.</span>
          </h2>

          {/* Sugarman: Ultra-short first sentence */}
          <p className="text-base text-white/45 leading-relaxed mb-4">
            It&apos;s not your fault.
          </p>
          <p className="text-base text-white/45 leading-relaxed">
            Social media trained your brain to context-switch every 8 seconds. You didn&apos;t lose your ability to focus — it was engineered out of you. And now you&apos;re reaching for Adderall, Vyvanse, coffee, energy drinks, just to function at a baseline your brain should handle naturally.
          </p>
        </div>

        {/* AGITATION — Kennedy: Amplify the emotional pain */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {[
            {
              /* Vitale: Engagement — question they'll answer in their head */
              title: "The Pharmaceutical Trap",
              body: "Adderall helped you focus. Then it stopped you from eating. Then sleeping. Then feeling like yourself. And the moment you stop? You're worse than where you started. Every pill builds dependency. That's by design.",
              seed: "But what if dependency was the problem — not the solution?",
            },
            {
              title: "The Crash Cycle",
              body: "Coffee at 7am. Another at 11. Energy drink at 2. Crash at 5. Your brain is 73-80% water and you're dehydrating it every single morning. Then wondering why you can't think clearly by noon.",
              seed: "There's a reason the CEO of Kickstarter stopped using melatonin.",
            },
            {
              title: "The Meditation Lie",
              body: "You downloaded Calm. Or Headspace. Beach sounds and whale noises while someone whispers at you. No real frequency. No actual neuroscience. Just ambient noise branded as meditation. They don't even know about the Gateway Process.",
              seed: "Real frequency therapy looks nothing like what they're selling you.",
            },
          ].map((point, i) => (
            <div key={i} className="fade-in-up">
              <h3 className="font-display text-lg font-semibold text-white mb-3">{point.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-3">{point.body}</p>
              {/* Sugarman: Seed of curiosity — pulls reader forward */}
              <p className="text-sm text-brand-light/70 italic">{point.seed}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
