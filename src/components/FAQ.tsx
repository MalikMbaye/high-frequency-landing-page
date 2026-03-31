/* Section 11: FAQ (OBJECTION HANDLING)
   Framework: Objection handling from Sales Letter Master Structure.
   Written in Jay's voice, conversational and direct. */

const faqs = [
  {
    q: "How is this different from binaural beats on YouTube or Spotify?",
    a: "Two things. First, you don't know the exact frequency you're getting on those platforms. There's no quality control, no precision. Second, those are audio-only. Our headphones use bone conduction transducers that vibrate 100 times per second. Your brain doesn't just hear the frequency through your ears. It physically feels it through your skull. That's why the shift is instant and that's why every reaction video looks the same.",
  },
  {
    q: "Is this actually backed by science?",
    a: "The US government spent decades researching frequency's effect on brain states. The findings, now publicly available, proved that specific frequencies shift brainwave states on command. We've also conducted EEG testing with NYU students that showed increased brainwave coherence while using the technology. This is neuroscience delivered through hardware.",
  },
  {
    q: "Can I use these as regular headphones too?",
    a: "Yes. Full Bluetooth connectivity. Music, podcasts, phone calls. They work as your everyday headphones with frequency technology built in. You also get noise-isolation earplugs for full frequency immersion.",
  },
  {
    q: 'What does "the more you use it, the less you need it" actually mean?',
    a: "Every session builds neuroplasticity. Your brain forms stronger neural pathways for focus, calm, and flow. Over time, your brain gets better at entering those states on its own, without the device. Adderall and coffee create dependency. This builds independence.",
  },
  {
    q: "How fast does it work?",
    a: "The first time you put them on, you'll feel the shift in under 60 seconds. We've recorded over 300 first-time reactions on camera. The eyes widen. The spine straightens. Everyone says the same thing.",
  },
  {
    q: "Do you ship internationally?",
    a: "We've shipped to over 25 countries. Yes, we ship worldwide.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "30-day money-back guarantee. Full refund. No questions. We've done this demo hundreds of times, in person, on camera, at events, with celebrities, with regular people. The reaction is the same every time.",
  },
];

export const FAQ = () => {
  return (
    <section className="relative py-24 md:py-36">
      <div className="max-w-2xl mx-auto px-5 md:px-10">
        <div className="fade-in-up text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <details key={i} className="fade-in-up group rounded-lg bg-gray-50 border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-display text-sm font-medium text-gray-900 hover:text-brand transition-colors list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <svg className="w-4 h-4 text-gray-300 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
