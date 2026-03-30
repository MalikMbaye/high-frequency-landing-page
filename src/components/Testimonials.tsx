/* Vitale: Promise-Proof-Price — this is the PROOF section
   Sugarman Trigger #16: Social Proof + #7: Authority
   Brand Bible Section 3 (Celebrity Endorsements) + Section 4A (User Testimonials)
   Kennedy: "Damaging admission" builds credibility — include the raw, unpolished quotes */

const testimonials = [
  {
    quote: "I felt transported. This is how I shut my brain off after back-to-back meetings all day. Works better than melatonin.",
    name: "Everett Taylor",
    role: "CEO of Kickstarter",
    highlight: true,
  },
  {
    quote: "I follow you — you're the frequency dude. I f*** with what you're doing.",
    name: "Will.i.am",
    role: "Black Eyed Peas / Tech Mogul",
    highlight: false,
  },
  {
    quote: "This sounds fire. Talk to my team. Don't forget.",
    name: "Kyrie Irving",
    role: "NBA Champion",
    highlight: false,
  },
  {
    quote: "This got rid of my tinnitus. I've tried everything for years and nothing worked until this.",
    name: "Event Attendee",
    role: "Verified User",
    highlight: false,
  },
  {
    quote: "It feels like an orgasm for your brain. I'm not even exaggerating.",
    name: "First-Time User",
    role: "Reaction Video",
    highlight: false,
  },
  {
    quote: "I want to do a whole tour with this technology. This is the future of meditation.",
    name: "19 Keys",
    role: "Consciousness Leader / 1M+ Followers",
    highlight: false,
  },
];

export const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-36 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up max-w-2xl mb-14">
          <p className="text-brand-light font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            In their words
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.05]">
            CEOs. Athletes. Artists.
            <br />
            <span className="text-white/30">They didn&apos;t believe it either.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`fade-in-up p-7 rounded-xl border ${
                t.highlight
                  ? "bg-brand/[0.06] border-brand/20"
                  : "bg-white/[0.02] border-white/[0.05]"
              }`}
            >
              <p className="text-white/70 text-[15px] leading-relaxed mb-6 font-light">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                <p className="text-[11px] text-white/30">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
