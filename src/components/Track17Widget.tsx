import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YQV5?: {
      trackSingle: (opts: {
        YQ_ContainerId: string;
        YQ_Height?: number;
        YQ_Fc?: string;
        YQ_Lang?: string;
        YQ_Num: string;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://www.17track.net/externalcall.js";
const CONTAINER_ID = "YQContainer";

const loadScript = () =>
  new Promise<void>((resolve, reject) => {
    if (window.YQV5) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("failed"));
    document.body.appendChild(s);
  });

type Props = { trackingNumber: string; height?: number };

/** Embeds the official 17TRACK widget and auto-tracks the order's number. */
const Track17Widget = ({ trackingNumber, height = 560 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const num = trackingNumber?.trim();
    if (!num) return;

    if (containerRef.current) containerRef.current.innerHTML = "";

    loadScript()
      .then(() => {
        if (cancelled || !window.YQV5) return;
        // Retry briefly in case the widget lib finishes initializing late.
        const run = (attempt = 0) => {
          try {
            window.YQV5!.trackSingle({
              YQ_ContainerId: CONTAINER_ID,
              YQ_Height: height,
              YQ_Fc: "0",
              YQ_Lang: "en",
              YQ_Num: num,
            });
          } catch {
            if (attempt < 3) setTimeout(() => run(attempt + 1), 400);
            else setFailed(true);
          }
        };
        run();
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, [trackingNumber, height]);

  if (failed) {
    return (
      <p className="trk-note" style={{ marginTop: 10 }}>
        Live carrier scans are temporarily unavailable. Your tracking number is{" "}
        <strong>{trackingNumber}</strong>.
      </p>
    );
  }

  return (
    <div className="trk-track-embed">
      <div id={CONTAINER_ID} ref={containerRef} />
    </div>
  );
};

export default Track17Widget;
