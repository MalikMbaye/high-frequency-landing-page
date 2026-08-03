import { ArrowRight } from "lucide-react";
import appControl from "@/assets/app-control-frequency.png.asset.json";

const FrequencyControl = () => {
  return (
    <section className="section section-dark the-generator" id="frequency-control" data-theme="dark">
      <div className="hfh-container">
        <header className="ts-header">
          <span className="row-label gold">YOU HOLD THE DIAL</span>
          <h2 className="section-header light">Control Your Own Frequency. From Your Phone.</h2>
          <p className="section-sub light">Pick the state. Dial the Hz. Feel the shift in under 60 seconds. No subscription, no guessing, no waiting for a recording to work.</p>
        </header>

        <div className="reveal-row">
          <div className="reveal-visual tier-2-visual">
            <div className="ambient-halo halo-soft"></div>
            <div className="ambient-ribbon ribbon-purple"></div>
            <img
              src={appControl.url}
              alt="A man holding a phone running the High Frequency app on the Focus session screen, with the headphones and glowing frequency rings below"
              loading="lazy"
            />
            <span className="floating-pill pill-purple">FOCUS</span>
            <span className="floating-pill pill-gold">CALM</span>
          </div>
          <div className="reveal-copy light">
            <h3>Your brain state becomes a setting you choose, not a mood you wait on.</h3>
            <p>Open the app and the whole frequency engine is in your hand. Choose Focus, Sleep, Meditation, Energy, or Tension. Type an exact frequency and send it straight through the headphones. Layer two together and save the stack you keep coming back to.</p>
            <p>Redirect an AI meditation mid-session with your voice. Pull a journey from the Library. Run a synced session with people in 200+ countries. Every one of those controls lives on one screen, and every one of them plays through frequency technology at 100 vibrations a second, so you feel it working instead of hoping it is.</p>
            <p>That is the difference. Most apps hand you a playlist. This one hands you the dial.</p>
            <a href="https://highfrequency.onelink.me/lwuw/mkogg00s" className="btn btn-gold" target="_blank" rel="noopener noreferrer">
              Take Control in the App <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrequencyControl;
