/* Section 8: USE CASE SCENARIOS
   Framework: Future Pacing (#30) + Involvement/Ownership (#5). */

const useCases = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "For Focus",
    body: "Select Focus in the app. Put on the headphones. Your brain locks in for the next four, six, eight hours. No coffee. No pills. No crash. Just your mind operating the way it was supposed to before your phone rewired it.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    title: "For Sleep",
    body: "Select Calm. The frequency downregulates your brain from the day's chaos. Your racing thoughts quiet. You fall asleep without melatonin, without grogginess the next morning, without another pill your body will learn to depend on.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "For Meditation",
    body: "Generate a personalized AI meditation about anything. Redirect it in real time by speaking to it. Overlay any frequency on top. This is meditation that adapts to you, not a 10-minute recording someone made in a studio three years ago.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "For Energy",
    body: "Replace the 2 PM coffee run. Replace the energy drink your heart detects as poison. Select Energy. Feel the vibration lock your brain into an alert state. No chemicals. No crash. Your brain generating its own sustained energy through frequency.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "For Headaches and Pain",
    body: "Users have reported relief from tinnitus, migraines, headaches, and TMJ. The bone conduction vibration combined with targeted frequency creates a physical response. One woman at an event told Jay it got rid of her tinnitus. We didn't even market for that.",
  },
];

export const AppShowcase = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            Your states, on demand
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.05]">
            One Device. Every State You Need.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <div key={i} className="fade-in-up p-7 rounded-xl bg-white border border-gray-200">
              <div className="text-brand mb-4">{uc.icon}</div>
              <h3 className="font-display text-base font-semibold text-gray-900 mb-3">{uc.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up grid grid-cols-3 gap-4 md:gap-6 mt-16 max-w-2xl mx-auto">
          {[
            { src: "/images/app-brainwave.jpg", alt: "Brainwave Generator screen" },
            { src: "/images/app-solfeggio.webp", alt: "Solfeggio Frequencies screen" },
            { src: "/images/app-unique-meditation.png", alt: "AI Meditation Engine screen" },
          ].map((img, i) => (
            <div key={i} className="rounded-[1.25rem] overflow-hidden shadow-xl shadow-brand/10">
              <img src={img.src} alt={img.alt} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
