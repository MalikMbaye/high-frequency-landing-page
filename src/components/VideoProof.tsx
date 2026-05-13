import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/reel/DW4OGBPjad3/";
const INSTAGRAM_EMBED_URL = "https://www.instagram.com/reel/DW4OGBPjad3/embed/";

const VideoProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Instagram embed script approach
    const processEmbeds = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existing) {
      // Script already present — process after React renders
      const timer = setTimeout(processEmbeds, 100);
      return () => clearTimeout(timer);
    }

    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);

    return () => {
      // Don't remove script — shared across page
    };
  }, []);

  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Watch What Happens to Your Brain in 60 Seconds.</h2>
        <div ref={containerRef} className="instagram-embed-container" style={{ margin: "0 auto 20px", maxWidth: 540, minHeight: loaded ? undefined : 400 }}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={INSTAGRAM_URL}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: 12,
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: 540,
              minWidth: 326,
              padding: 0,
              width: "calc(100% - 2px)",
            }}
          >
            <div style={{ padding: 16 }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                View this post on Instagram
              </a>
            </div>
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
