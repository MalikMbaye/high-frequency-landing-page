import { ArrowRight, Bolt, Flower2, Moon, Target, Waves } from "lucide-react";
import img_8kyfS5Ig from "@/assets/genspark/8kyfS5Ig.webp";

const FiveStates = () => {
  return (
    <section className="section section-dark full-bleed-tier" data-theme="dark">
      <div className="constellation-bg" aria-hidden="true">
        <img src={img_8kyfS5Ig} alt="" />
      </div>
      <div className="constellation-overlay" aria-hidden="true"></div>
      <div className="hfh-container constellation-content">
        <h2 className="section-header light">One Device. Every State You Need.</h2>
        <p className="section-sub light">Five brain states. One frequency device. Select on demand.</p>

        <div className="states-constellation">
          <div className="state-orb orb-focus">
            <div className="s-icon"><Target size={22} /></div>
            <h4>FOCUS</h4>
            <p>Lock in for hours. No coffee, no crash, no pill.</p>
          </div>
          <div className="state-orb orb-sleep">
            <div className="s-icon"><Moon size={22} /></div>
            <h4>SLEEP</h4>
            <p>Wind down faster before bed.</p>
          </div>
          <div className="state-orb orb-meditation">
            <div className="s-icon"><Flower2 size={22} /></div>
            <h4>MEDITATION</h4>
            <p>Achieve instant calm. AI-personalized in real time.</p>
          </div>
          <div className="state-orb orb-energy">
            <div className="s-icon"><Bolt size={22} /></div>
            <h4>ENERGY</h4>
            <p>Boost alertness without jitters or crash.</p>
          </div>
          <div className="state-orb orb-relief">
            <div className="s-icon"><Waves size={22} /></div>
            <h4>TENSION</h4>
            <p>Help your body feel less tense and more relaxed.</p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="#order" className="btn btn-gold btn-lg">
            Choose Your State <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FiveStates;
