/* Section 12: FOOTER CTA (P.S. SECTION)
   Framework: P.S. Section from Sales Letter Master Structure.
   Restates the main benefit from a new angle and creates final urgency. */

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const FooterCTA = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gray-50">
      <div className="relative max-w-3xl mx-auto px-5 md:px-10">
        <div className="fade-in-up mb-12">
          <img
            src="/images/founder-stage.webp"
            alt="Jay Johnson Jr. — founder of High Frequency Highway"
            className="w-full h-auto rounded-2xl max-h-[400px] object-cover"
          />
        </div>

        <div className="fade-in-up space-y-5 text-base text-gray-500 leading-relaxed mb-14">
          <p>
            Jay sold his first company at 14. Built a six-figure tech career by 21. Generated over $60M in growth for a fitness app. Ranked among the fastest athletes in the country. 500,000 followers. 100 million organic impressions.
          </p>
          <p>
            And when his own brain became the bottleneck, he didn&apos;t accept it. He went looking for the answer. He found the science. He built the technology. And now he&apos;s training for the 2028 LA Olympics in the 100 meters.
          </p>
          <p className="text-gray-700 font-medium text-lg">
            His brain is on a different frequency now. Literally.
          </p>
          <p>
            Imagine tomorrow morning. You put these on. You select Focus. And for the next several hours, your brain is locked in. No crash. No side effects. Just your mind operating the way it should.
          </p>
          <p>
            And every time you use it, it gets easier. Because your brain is building the circuitry to do it on its own.
          </p>
          <p className="text-gray-800 font-medium text-lg">
            You&apos;re not buying a crutch. You&apos;re investing in a brain that doesn&apos;t need one.
          </p>
        </div>

        <div className="fade-in-up text-center">
          <a
            href={HEADPHONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-12 py-4 bg-brand text-white font-display font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97] shadow-lg shadow-brand/20"
          >
            Get Your Headphones →
          </a>
          <p className="text-xs text-gray-400 mt-4">
            30-Day Money-Back Guarantee. Ships Worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};
