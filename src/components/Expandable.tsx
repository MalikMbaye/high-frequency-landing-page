import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  children: ReactNode;
  /** Collapsed height in px on mobile. Desktop shows full content. */
  collapsedHeight?: number;
  /** Force expandable behavior on all viewports */
  alwaysCollapse?: boolean;
  readMoreLabel?: string;
  readLessLabel?: string;
}

/**
 * Wraps long-form content. On mobile (or when alwaysCollapse), clips the content
 * with a fade and a "Read more" button. On desktop, renders children as-is.
 */
const Expandable = ({
  children,
  collapsedHeight = 280,
  alwaysCollapse = false,
  readMoreLabel = "Read more",
  readLessLabel = "Show less",
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [needsClip, setNeedsClip] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    setNeedsClip(ref.current.scrollHeight > collapsedHeight + 24);
  }, [collapsedHeight, children]);

  const shouldClip = (alwaysCollapse || isMobile) && !expanded && needsClip;

  return (
    <div className="expandable">
      <div
        ref={ref}
        style={{
          maxHeight: shouldClip ? collapsedHeight : "none",
          overflow: "hidden",
          position: "relative",
          transition: "max-height 0.4s ease",
          maskImage: shouldClip
            ? "linear-gradient(to bottom, black 70%, transparent 100%)"
            : "none",
          WebkitMaskImage: shouldClip
            ? "linear-gradient(to bottom, black 70%, transparent 100%)"
            : "none",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
      {(alwaysCollapse || isMobile) && needsClip && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "1px solid currentColor",
              color: "inherit",
              padding: "8px 18px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              opacity: 0.85,
            }}
          >
            {expanded ? readLessLabel : readMoreLabel}
            <ChevronDown
              size={16}
              style={{
                transition: "transform 0.2s ease",
                transform: expanded ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Expandable;
