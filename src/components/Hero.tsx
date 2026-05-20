import { ArrowRight, Loader2 } from "lucide-react";
import img_w2bSNIr2 from "@/assets/genspark/w2bSNIr2.jpg";
import { useBuyNow } from "@/hooks/useBuyNow";

const Hero = () => {
  const { buyNow, isLoading } = useBuyNow();
  return (
    <section
      className="section section-light hero hero-tall"
      id="hero"
      data-theme="light"
    >
      <div className="ambient-particles" aria-hidden="true"></div>
      <div className="hfh-container hero-grid">
        <div className="hero-copy">
          <p className="pre-headline">Used by 100,000+ people in every country on earth. Backed by decades of neuroscience research.</p>
          <h1 className="display-headline">RESETS YOUR BRAIN IN UNDER 60 SECONDS</h1>
          <p className="subhead">Frequency headphones that shift your brain state on demand. Focus. Calm. Energy. Flow. No pills. No crash. No dependency.</p>
          <button
            type="button"
            onClick={() => {
              document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-purple btn-lg"
          >
            <>Get Your Headphones <ArrowRight size={18} /></>
          </button>
        </div>
        <div className="hero-visual tier-2-visual">
          <div className="ambient-halo"></div>
          <div className="ambient-ribbon ribbon-purple"></div>
          <div className="ambient-ribbon ribbon-gold"></div>
          <img
            src={img_w2bSNIr2}
            alt="High Frequency Highway bone conduction headphones with purple glow"
            className="hero-image"
          />
          <span className="floating-pill pill-purple">FOCUS</span>
          <span className="floating-pill pill-gold">FLOW</span>
          <span className="floating-glyph">∞</span>
        </div>
      </div>
      <div className="hfh-container social-proof-strip">
        <div className="proof-item"><span className="proof-num">100K+</span><span className="proof-label">Users</span></div>
        <span className="proof-divider"></span>
        <div className="proof-item"><span className="proof-num">200+</span><span className="proof-label">Countries</span></div>
        <span className="proof-divider"></span>
        <div className="proof-item"><span className="proof-num">81%</span><span className="proof-label">Retention</span></div>
        <span className="proof-divider"></span>
        <div className="proof-item"><span className="proof-num">1M+</span><span className="proof-label">Followers</span></div>
      </div>
    </section>
  );
};

export default Hero;
