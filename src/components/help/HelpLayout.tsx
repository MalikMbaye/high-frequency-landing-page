import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { helpMeta, sections } from "@/lib/helpCenter";
import Waveform from "./Waveform";
import SearchDialog from "./SearchDialog";
import "./help.css";

type Props = {
  children: ReactNode;
  /** Table of contents for the right rail: [{ id, text }] */
  rail?: { id: string; text: string }[];
  activeRailId?: string | null;
};

const HelpLayout = ({ children, rail, activeRailId }: Props) => {
  const { sectionSlug, articleSlug } = useParams();
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(sectionSlug ?? null);

  useEffect(() => {
    setExpanded(sectionSlug ?? null);
    setDrawerOpen(false);
  }, [sectionSlug, pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showRail = !!rail && rail.length >= 3;

  return (
    <div className="hc">
      <a className="hc-skip" href="#hc-main">
        Skip to content
      </a>

      <header className="hc-topbar">
        <div className="hc-topbar-inner">
          <button
            type="button"
            className="hc-menubtn"
            aria-label={drawerOpen ? "Close help navigation" : "Open help navigation"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link to="/help" className="hc-logo">
            HIGH FREQUENCY HIGHWAY <span>Help Center</span>
          </Link>
          <button type="button" className="hc-searchbtn" onClick={() => setSearchOpen(true)}>
            <Search size={15} aria-hidden="true" />
            Search across the help center
            <span className="hc-kbd">⌘K</span>
          </button>
        </div>
        <Waveform />
      </header>

      <div className={`hc-shell ${showRail ? "with-rail" : ""}`}>
        {drawerOpen && <div className="hc-scrim" onClick={() => setDrawerOpen(false)} />}

        <nav className={`hc-sidebar ${drawerOpen ? "open" : ""}`} aria-label="Help center sections">
          {sections.map((s) => {
            const isCurrent = s.slug === sectionSlug;
            const isOpen = expanded === s.slug || isCurrent;
            return (
              <div key={s.slug}>
                <button
                  type="button"
                  className={`hc-sec-btn ${isCurrent ? "active" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen && !isCurrent ? null : s.slug)}
                >
                  {s.title}
                  <ChevronDown className={`chev ${isOpen ? "open" : ""}`} size={15} aria-hidden="true" />
                </button>
                {isOpen && (s.articles?.length ?? 0) > 0 && (
                  <ul className="hc-sub">
                    <li>
                      <Link
                        to={`/help/${s.slug}`}
                        className={isCurrent && !articleSlug ? "active" : ""}
                      >
                        Overview
                      </Link>
                    </li>
                    {s.articles!.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`/help/${s.slug}/${a.slug}`}
                          className={isCurrent && articleSlug === a.slug ? "active" : ""}
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <main className="hc-main" id="hc-main">
          {children}
        </main>

        {showRail && (
          <aside className={`hc-rail ${showRail ? "show" : ""}`} aria-label="On this page">
            <h2>On this page</h2>
            {rail!.map((h) => (
              <a key={h.id} href={`#${h.id}`} className={activeRailId === h.id ? "active" : ""}>
                {h.text}
              </a>
            ))}
          </aside>
        )}
      </div>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
      <span className="sr-only">{helpMeta.title}</span>
    </div>
  );
};

export default HelpLayout;
