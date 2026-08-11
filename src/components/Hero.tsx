import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-headphones.mp4.asset.json";
import heroPoster from "@/assets/hero-headphones-poster.jpg.asset.json";


const Hero = () => {
  return (
    <section
      className="section section-light hero hero-tall"
      id="hero"
      data-theme="light"
    >
      <div className="ambient-particles" aria-hidden="true"></div>
      <div className="hfh-container hero-grid">
        <div className="hero-copy">
          <p className="pre-headline">Used by 100,000+ people in every country on earth. Inspired by decades of frequency research.</p>
          <h1 className="display-headline">FEEL A SHIFT IN UNDER 60 SECONDS</h1>
          <p className="subhead">Frequency headphones that help you shift your brain state on demand. Focus. Calm. Energy. Flow. No jitters. No crash. No subscription.</p>
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
          <video
            className="hero-video"
            src={heroVideo.url}
            poster={heroPoster.url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="High Frequency Headphones rotating on a light background"
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
