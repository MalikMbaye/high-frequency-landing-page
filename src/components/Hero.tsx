import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-headphones.mp4.asset.json";
import heroPoster from "@/assets/hero-headphones-poster.jpg.asset.json";


const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // React does not render `muted` as a real attribute, and iOS Safari
    // refuses to autoplay unless the attribute is present. Set it manually.
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.playbackRate = 0.5;

    let cancelled = false;
    const tryPlay = () => {
      if (cancelled || !el.paused) return;
      const p = el.play();
      if (p) p.catch(() => {});
    };

    tryPlay();

    const events = ["loadeddata", "canplay", "loadedmetadata", "stalled"] as const;
    events.forEach((e) => el.addEventListener(e, tryPlay));

    // Retry on any first user gesture and when the tab/section becomes visible.
    const gestures = ["touchstart", "pointerdown", "click", "scroll"] as const;
    gestures.forEach((e) =>
      document.addEventListener(e, tryPlay, { passive: true })
    );
    document.addEventListener("visibilitychange", tryPlay);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && tryPlay()),
      { threshold: 0.1 }
    );
    io.observe(el);

    // Safety net: a few retries in case decoding lags behind first paint.
    const timers = [400, 1200, 2500].map((ms) => window.setTimeout(tryPlay, ms));

    return () => {
      cancelled = true;
      events.forEach((e) => el.removeEventListener(e, tryPlay));
      gestures.forEach((e) => document.removeEventListener(e, tryPlay));
      document.removeEventListener("visibilitychange", tryPlay);
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);


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
          <h1 className="display-headline">ALL OF THE HIGH. NONE OF THE SIDE EFFECTS.</h1>
          <p className="subhead">No substance, same shift. Frequency headphones that influence your brain waves to focus, calm, energy, or flow in under 60 seconds.</p>
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
            {/* Native poster covers the first paint and is replaced by the
                first decoded frame automatically — no overlay, no blending. */}
            <video
              className="hero-video"
              src={heroVideo.url}
              poster={heroPoster.url}
              autoPlay
              loop
              muted
              playsInline
              disableRemotePlayback
              preload="auto"
              ref={videoRef}
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
