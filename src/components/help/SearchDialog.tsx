import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { highlight, searchHelp, snippet } from "@/lib/helpCenter";

const Highlighted = ({ text, query }: { text: string; query: string }) => (
  <>
    {highlight(text, query).map((p, i) => (p.match ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>))}
  </>
);

const SearchDialog = ({ onClose }: { onClose: () => void }) => {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => searchHelp(q, 20), [q]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    for (const r of results) {
      const list = map.get(r.sectionTitle) ?? [];
      list.push(r);
      map.set(r.sectionTitle, list);
    }
    return Array.from(map.entries());
  }, [results]);

  return (
    <div className="hc-overlay" role="dialog" aria-modal="true" aria-label="Search the help center" onMouseDown={onClose}>
      <div className="hc-dialog" onMouseDown={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) {
              onClose();
              navigate(`/help/search?q=${encodeURIComponent(q.trim())}`);
            }
          }}
          placeholder="Search across the help center"
          aria-label="Search across the help center"
        />
        <div className="hc-results">
          {q.trim().length > 1 && results.length === 0 && (
            <p style={{ padding: 16, color: "var(--hc-mute)", fontSize: 14 }}>
              Nothing matched that. Try a shorter phrase, or browse the sections on the left.
            </p>
          )}
          {grouped.map(([sectionTitle, list]) => (
            <div key={sectionTitle}>
              <div className="hc-group-label">{sectionTitle}</div>
              {list.map((r) => (
                <a
                  key={r.href + r.title}
                  className="hc-result"
                  href={r.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    navigate(r.href);
                  }}
                >
                  <span className="t">
                    <Highlighted text={r.title} query={q} />
                  </span>
                  <span className="s" style={{ display: "block" }}>
                    <Highlighted text={snippet(r.text, q, 140)} query={q} />
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
export { Highlighted };
