import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import img_WXZ9J1Qx from "@/assets/genspark/WXZ9J1Qx.png";

const VideoProof = () => {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const el = frameRef.current;
    if (!el) return;
    el.style.transition = "transform 0.18s ease";
    el.style.transform = "scale(0.985)";
    setTimeout(() => {
      el.style.transform = "";
    }, 180);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Watch What Happens to Your Brain in 60 Seconds.</h2>
        <div
          ref={frameRef}
          className="video-frame"
          role="button"
          tabIndex={0}
          aria-label="Play EEG demonstration video"
          onClick={handleClick}
          onKeyDown={handleKey}
        >
          <img src={img_WXZ9J1Qx} alt="Bone conduction frequency headphones EEG demonstration" />
          <div className="play-overlay">
            <Play fill="currentColor" />
          </div>
        </div>
        <p className="video-caption">Real EEG footage. No edits. No filters. Recorded with NYU students.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="#order" className="btn btn-purple btn-lg">
            Get Your Headphones <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoProof;
