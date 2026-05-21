import img_0bGQsqAQ from "@/assets/genspark/0bGQsqAQ.png";
import img_33eRRyE9 from "@/assets/genspark/33eRRyE9.png";
import img_TqT6saaC from "@/assets/genspark/TqT6saaC.png";
import img_eyqqYZrK from "@/assets/genspark/eyqqYZrK.png";
import img_ohrwRejH from "@/assets/genspark/ohrwRejH.png";
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
            <p>Select Focus in the app. Put on the headphones. Your brain locks in for four hours. No coffee. No pills. No crash. Just your mind operating the way it was supposed to before your phone rewired it.</p>
          </div>
        </article>
        <article className="use-card reverse">
          <div className="use-image use-app-shot">
            <img src={img_TqT6saaC} alt="HFH app Sleep mode showing deep indigo crescent moon orb and 4 Hz Delta wave visualization" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Sleep</h4>
            <p>Select Calm. The frequency downregulates your brain from the day's chaos. Your racing thoughts quiet. You fall asleep without melatonin, without grogginess the next morning, without another pill your body will learn to depend on.</p>
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
            <p>Replace the 2 PM coffee run. Replace the energy drink. Select Energy. Feel the vibration lock your brain into an alert state. No chemicals. No crash. Your brain generating its own sustained energy through frequency.</p>
          </div>
        </article>
        <article className="use-card">
          <div className="use-image use-app-shot">
            <img src={img_33eRRyE9} alt="HFH app Relief mode showing soft purple relief orb, head silhouette and 304 Hz tension frequency" loading="lazy" />
          </div>
          <div className="use-copy">
            <h4>For Headaches and Pain</h4>
            <p>Users have reported relief from tinnitus, migraines, headaches, and TMJ. The bone conduction vibration combined with targeted frequency creates a physical response. One woman at an event told J it got rid of her tinnitus. We didn't even market for that.</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default UseCases;
