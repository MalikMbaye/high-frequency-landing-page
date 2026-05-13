import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/reel/DW4OGBPjad3/";

const VideoProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existing) {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Watch What Happens to Your Brain in 60 Seconds.</h2>
        <div ref={containerRef} className="instagram-embed-container">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={INSTAGRAM_URL}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "0 auto",
              maxWidth: "540px",
              minWidth: "326px",
              padding: 0,
              width: "99.375%",
            }}
          >
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              View this post on Instagram
            </a>
          </blockquote>
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
