import { useState } from "react";
import { ArrowRight } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/reel/DW4OGBPjad3/";
const INSTAGRAM_EMBED_URL = "https://www.instagram.com/reel/DW4OGBPjad3/embed/";

const VideoProof = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Watch What Happens to Your Brain in 60 Seconds.</h2>
        <div
          style={{
            margin: "0 auto 20px",
            maxWidth: 540,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 12px 36px rgba(13, 13, 18, 0.10)",
            background: loaded ? "transparent" : "var(--hfh-navy)",
            minHeight: loaded ? undefined : 400,
            position: "relative",
          }}
        >
          <iframe
            src={INSTAGRAM_EMBED_URL}
            width="100%"
            height={loaded ? 680 : 0}
            style={{
              border: 0,
              display: loaded ? "block" : "none",
              minHeight: loaded ? 680 : 0,
            }}
            onLoad={() => setLoaded(true)}
            allowTransparency
          />
          {!loaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 16,
                color: "var(--hfh-white)",
                textAlign: "center",
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "3px solid rgba(212, 175, 55, 0.3)",
                  borderTopColor: "var(--hfh-gold)",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Loading Instagram Reel…</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--hfh-gold)", textDecoration: "underline", fontSize: "0.85rem" }}
              >
                View on Instagram
              </a>
            </div>
          )}
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
