import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/reel/DW4OGBPjad3/";

const VideoProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedReady, setEmbedReady] = useState(false);

  useEffect(() => {
    const processEmbeds = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
        // Instagram replaces the blockquote, so we check for iframe as signal
        const check = () => {
          const iframe = containerRef.current?.querySelector("iframe");
          if (iframe) {
            setEmbedReady(true);
          } else {
            setTimeout(check, 200);
          }
        };
        setTimeout(check, 400);
      }
    };

    const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existing) {
      const timer = setTimeout(processEmbeds, 100);
      return () => clearTimeout(timer);
    }

    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);

    return () => {};
  }, []);

  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Watch What Happens to Your Brain in 60 Seconds.</h2>
        <div
          ref={containerRef}
          className="instagram-embed-container"
          style={{
            margin: "0 auto 20px",
            maxWidth: 540,
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            minHeight: embedReady ? undefined : 420,
          }}
        >
          {/* Instagram official embed markup */}
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={INSTAGRAM_URL}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: 12,
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: 540,
              minWidth: 326,
              padding: 0,
              width: "calc(100% - 2px)",
              display: embedReady ? "block" : "none",
            }}
          >
            <div style={{ padding: 16 }}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#000" }}
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>

          {/* Fallback while embed loads or if blocked */}
          {!embedReady && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                background: "linear-gradient(180deg, var(--hfh-navy) 0%, var(--hfh-navy-deep) 100%)",
                color: "var(--hfh-white)",
                textAlign: "center",
                padding: 32,
                borderRadius: 12,
                border: "1.5px solid var(--hfh-gold)",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "3px solid rgba(212, 175, 55, 0.25)",
                  borderTopColor: "var(--hfh-gold)",
                  animation: "spin 0.9s linear infinite",
                }}
              />
              <div>
                <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "1rem" }}>
                  Loading Instagram Reel…
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--hfh-gold)",
                    textDecoration: "underline",
                    fontSize: "0.9rem",
                  }}
                >
                  Open on Instagram
                </a>
              </div>
            </div>
          )}
        </div>
        <p className="video-caption">
          Real EEG footage. No edits. No filters. Recorded with NYU students.
        </p>
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
