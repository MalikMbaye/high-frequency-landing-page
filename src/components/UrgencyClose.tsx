/* Section 10: PRICE REFRAME + FINAL CTA
   Framework: Value (#27) + Instant Gratification (#23) + Fear of Loss (#20) + Risk Reversal (#31). */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const UrgencyClose = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gray-50">
      <div className="relative max-w-3xl mx-auto px-5 md:px-10 text-center">
        <div className="fade-in-up mb-12">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            The investment
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.05] mb-8">
            You&apos;re Already Spending More Than This on Things That Don&apos;t Work
          </h2>

          <div className="text-base text-gray-500 leading-relaxed space-y-5 text-left md:text-center max-w-2xl mx-auto">
            <p>
              Three dollars a day on coffee is over $1,000 a year. Adderall prescriptions run $200 a month or more. Annual Calm subscription. Energy drinks. Nootropic stacks. You&apos;re already spending hundreds, maybe thousands, on things that make you more dependent.
            </p>
            <p className="text-gray-700 font-medium">
              This is one purchase that makes you less dependent. Every single day.
            </p>
            <p>
              No subscription. No refills. No monthly dose increases. One device that delivers focus, calm, energy, flow, and sleep on demand, while simultaneously building your brain&apos;s ability to do it without help.
            </p>
          </div>
        </div>

        <div className="fade-in-up border-t border-gray-200 pt-12 mb-12">
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto mb-5">
            Your brain isn&apos;t waiting for you to decide. It&apos;s getting rewired right now. Every scroll, every notification, every context-switch is training your brain to never focus again.
          </p>
          <p className="text-base text-gray-700 font-medium">
            The only question is whether you&apos;re going to control the direction.
          </p>
        </div>

        <div className="fade-in-up mb-6">
          <a
            href={HEADPHONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-12 py-4 bg-brand text-white font-display font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97] shadow-lg shadow-brand/20"
          >
            Get Your High Frequency Highway Headphones →
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Start rebuilding your brain today. Ships worldwide.
          </p>
        </div>

        <div className="fade-in-up inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200">
          <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-xs text-gray-500">
            <span className="text-gray-700 font-medium">30-Day Money-Back Guarantee.</span> If you don&apos;t feel the shift, send them back. Full refund. No questions.
          </p>
        </div>
      </div>
    </section>
  );
};
