import { ArrowRight } from "lucide-react";
import img_0NZ0CLru from "@/assets/genspark/0NZ0CLru.jpg";
import img_Xq82Mk5S from "@/assets/genspark/Xq82Mk5S.jpg";
import img_cdI1KKwk from "@/assets/genspark/cdI1KKwk.jpg";

const LibraryHubNetwork = () => {
  return (
    <section className="section section-light library-hub-network" data-theme="light">
      <div className="hfh-container">
        <header className="ts-header">
          <span className="row-label">THE LIBRARY · THE HUB · THE NETWORK</span>
          <h2 className="section-header">A Frequency Ecosystem. Not Just an App.</h2>
          <p className="section-sub">Three living layers that grow with every user. Curated content, a community of frequency builders, and a global network of people training their brains in sync.</p>
        </header>

        <div className="lhn-grid">
          <article className="lhn-panel">
            <div className="lhn-visual">
              <img src={img_Xq82Mk5S} alt="Floating library UI fragments with album art shapes, pill buttons, and frequency ribbon" />
            </div>
            <div className="lhn-copy">
              <span className="lhn-tag">THE LIBRARY</span>
              <h3>Hundreds of pre-built frequency journeys.</h3>
              <p>Curated stacks for focus, sleep, recovery, creativity, anxiety, and flow. Every journey is built on the same neuroscience research, sequenced and tested with the HFH community.</p>
            </div>
          </article>

          <article className="lhn-panel">
            <div className="lhn-visual">
              <img src={img_cdI1KKwk} alt="Floating community hub UI fragments with avatar orbs and connection lines" />
            </div>
            <div className="lhn-copy">
              <span className="lhn-tag">THE HUB</span>
              <h3>The community of frequency builders.</h3>
              <p>Share your stacks. Discover what other people are using to focus, sleep, and recover. The Hub is where the 100,000+ download community trades the protocols that actually work.</p>
            </div>
          </article>

          <article className="lhn-panel">
            <div className="lhn-visual">
              <img src={img_0NZ0CLru} alt="Floating network UI fragments with glowing globe and connection nodes" />
            </div>
            <div className="lhn-copy">
              <span className="lhn-tag">THE NETWORK</span>
              <h3>200+ countries. One frequency.</h3>
              <p>The HFH Network connects users across 200+ countries running the same protocols at the same time. Group sessions, synchronized meditations, global focus blocks. A planet-wide brainwave coherence experiment, live every day.</p>
            </div>
          </article>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="https://highfrequency.onelink.me/lwuw/mkogg00s" className="btn btn-purple btn-lg" target="_blank" rel="noopener noreferrer">
            Get Inside the Ecosystem <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LibraryHubNetwork;
