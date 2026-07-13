import img_0bGQsqAQ from "@/assets/genspark/0bGQsqAQ.webp";
import img_33eRRyE9 from "@/assets/genspark/33eRRyE9.webp";
import img_TqT6saaC from "@/assets/genspark/TqT6saaC.webp";
import img_eyqqYZrK from "@/assets/genspark/eyqqYZrK.webp";
import img_ohrwRejH from "@/assets/genspark/ohrwRejH.webp";
const UseCases = () => {
  return (
    <section className="section section-light use-cases" data-theme="light">
      <div className="hfh-container">
        <h2 className="section-header">What Your Day Looks Like With This.</h2>

        <article className="use-card">
          <div className="use-image use-app-shot">
            <img src={img_eyqqYZrK} alt="HFH app Focus mode showing amber-gold focus orb, 4-hour session timer, and 40 Hz Gamma frequency stack" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Focus</h4>
            <p>Select Focus. Put the headphones on. Give yourself a long, uninterrupted work block — no coffee run, no crash, just a state that's easier to settle into.</p>
          </div>
        </article>
        <article className="use-card reverse">
          <div className="use-image use-app-shot">
            <img src={img_TqT6saaC} alt="HFH app Sleep mode showing deep indigo crescent moon orb and 4 Hz Delta wave visualization" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Sleep</h4>
            <p>Select Calm. The frequency helps quiet the day's noise so it's easier to wind down before bed.</p>
          </div>
        </article>
        <article className="use-card">
          <div className="use-image use-app-shot">
            <img src={img_ohrwRejH} alt="HFH app Meditation mode showing violet meditation orb, voice redirect microphone, and 7.83 Hz Schumann overlay" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Meditation</h4>
            <p>Generate a personalized AI meditation about anything. Redirect it in real time by speaking to it. Overlay any frequency on top. Meditation that adapts to you, not a 10-minute recording someone made in a studio three years ago.</p>
          </div>
        </article>
        <article className="use-card reverse">
          <div className="use-image use-app-shot">
            <img src={img_0bGQsqAQ} alt="HFH app Energy mode showing bright orange energy orb and 20 Hz Beta wave visualization" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Energy</h4>
            <p>Skip the 2 PM coffee run. Select Energy. Feel the vibration help you settle into a more alert state — no jitters, no crash.</p>
          </div>
        </article>
        <article className="use-card">
          <div className="use-image use-app-shot">
            <img src={img_33eRRyE9} alt="HFH app Tension mode showing soft purple orb and 304 Hz frequency visualization" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Tension</h4>
            <p>Some users report feeling less tense and more relaxed after use. That's a subjective experience, not a medical claim — we don't treat conditions, we help you feel a shift.</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default UseCases;
