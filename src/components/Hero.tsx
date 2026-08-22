import { useState } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-headphones.mp4.asset.json";
import heroPoster from "@/assets/hero-headphones-poster.jpg.asset.json";


const Hero = () => {
  const [videoReady, setVideoReady] = useState(false);

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
          <div className="hero-video-frame">
            {/* Poster shows instantly and stays until the video can actually
                play, so the hero never renders as an empty box. */}
            <img
              src={heroPoster.url}
              alt="High Frequency Headphones"
              className="hero-video-poster"
              fetchPriority="high"
              decoding="async"
              aria-hidden={videoReady}
            />
            {!videoReady && <span className="hero-video-spinner" aria-hidden="true" />}
            <video
              className="hero-video"
              src={heroVideo.url}
              poster={heroPoster.url}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ opacity: videoReady ? 1 : 0 }}
              onCanPlay={() => setVideoReady(true)}
              onPlaying={() => setVideoReady(true)}
              ref={(el) => {
                if (!el) return;
                el.playbackRate = 0.5;
                el.muted = true;
                const tryPlay = () => el.play().catch(() => {});
                tryPlay();
                el.addEventListener("loadeddata", tryPlay, { once: true });
                document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
                if (el.readyState >= 3) setVideoReady(true);
              }}
              aria-label="High Frequency Headphones rotating on a light background"
            />
          </div>
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
