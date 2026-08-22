import { useState } from "react";
import { Play } from "lucide-react";

interface Props {
  videoId: string;
  title: string;
  /** Aspect ratio of the frame, e.g. "9 / 16" for Shorts */
  aspectRatio?: string;
  className?: string;
  /** Eager-load the thumbnail (use for the first visible video only) */
  priority?: boolean;
}

/**
 * Lightweight YouTube "facade": renders only a thumbnail + play button until
 * the user taps. The real iframe (and ~1-2MB of YouTube player JS) is loaded
 * on demand, which keeps page load fast even with a dozen videos on the page.
 */
const YouTubeFacade = ({
  videoId,
  title,
  aspectRatio = "9 / 16",
  className,
  priority = false,
}: Props) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: 0,
            border: 0,
            cursor: "pointer",
            background: "#000",
          }}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            width={480}
            height={360}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.15), rgba(0,0,0,0.45))",
            }}
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
              }}
            >
              <Play size={28} style={{ marginLeft: 3 }} fill="#111" color="#111" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default YouTubeFacade;
