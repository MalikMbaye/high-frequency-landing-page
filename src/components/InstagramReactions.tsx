import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const instagramReactionPosts = [
  "https://www.instagram.com/reel/DMlrAnwyxKG/",
  "https://www.instagram.com/reel/DVez6jNgZI3/",
  "https://www.instagram.com/reel/DXhXhdtjv35/",
  "https://www.instagram.com/reel/DTBhx4wEsrb/",
  "https://www.instagram.com/reel/DNi8FsANvet/",
  "https://www.instagram.com/reel/DRh-5cRDpLE/",
  "https://www.instagram.com/reel/DPgsrw-DoZo/",
  "https://www.instagram.com/reel/DWCqPAKDqt2/",
  "https://www.instagram.com/reel/DYSxOeKSECn/",
  "https://www.instagram.com/p/DVReuxrkh5Q/",
  "https://www.instagram.com/reel/DQDA2QtkgIi/",
  "https://www.instagram.com/reel/DJnUJZay3Z6/",
  "https://www.instagram.com/p/DLVkmSYBoh1/",
  "https://www.instagram.com/reel/DJ-5fvgNbhB/",
  "https://www.instagram.com/reel/DTa1IxuD8A_/",
  "https://www.instagram.com/reel/DVmTciDkouw/",
  "https://www.instagram.com/reel/DXKihUZh1Vs/",
  "https://www.instagram.com/reel/DVwly9tkgZ5/",
];

const InstagramReactions = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const process = () => window.instgrm?.Embeds?.process();
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = process;
      document.body.appendChild(script);
    } else {
      process();
    }
  }, [visibleCount]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const visiblePosts = instagramReactionPosts.slice(0, visibleCount);

  return (
    <section
      className="section section-light"
      data-theme="light"
      id="reactions"
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="hfh-container">
        <h2 className="section-header">Watch the Shift Happen</h2>
        <p className="section-sub">
          Real reactions from real people the first time they put on High Frequency
          Headphones. Unscripted. Unpaid. Unprompted.
        </p>

        <div style={{ position: "relative", marginTop: 32 }}>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="ig-arrow ig-arrow-left"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="ig-arrow ig-arrow-right"
          >
            <ArrowRight size={20} />
          </button>

          <div
            ref={scrollerRef}
            className="ig-scroller"
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              padding: "8px 4px 24px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {visiblePosts.map((url) => (
              <div
                key={url}
                style={{
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                  width: "min(360px, 88vw)",
                  minHeight: 560,
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: "#fff",
                    border: 0,
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: "100%",
                    width: "100%",
                  }}
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    View on Instagram
                  </a>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {visibleCount < instagramReactionPosts.length && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() =>
                setVisibleCount((c) =>
                  Math.min(c + 6, instagramReactionPosts.length),
                )
              }
            >
              Load more reactions
            </button>
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 14,
            color: "var(--hfh-grey-text, #6B6B73)",
            fontStyle: "italic",
          }}
        >
          Real reactions and public Instagram posts from the High Frequency
          Highway community.
        </p>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a href="#order" className="btn btn-purple btn-lg">
            Try High Frequency Headphones <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <style>{`
        .ig-scroller::-webkit-scrollbar { height: 8px; }
        .ig-scroller::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        .ig-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          width: 44px; height: 44px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .ig-arrow:hover { transform: translateY(-50%) scale(1.05); }
        .ig-arrow-left { left: -8px; }
        .ig-arrow-right { right: -8px; }
        @media (max-width: 768px) {
          .ig-arrow { display: none; }
        }
      `}</style>
    </section>
  );
};

export default InstagramReactions;
