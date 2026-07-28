import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import HelpLayout from "@/components/help/HelpLayout";
import { StillStuck } from "@/components/help/HelpParts";
import { getArticle, helpMeta, sections } from "@/lib/helpCenter";

const QUICK = [
  "orders-shipping/track-your-order",
  "start-here/first-session",
  "start-here/sounds-vs-frequencies",
  "troubleshooting/no-vibration",
];

/** Deterministic pseudo-equalizer so each card gets its own frequency signature. */
const bars = (seed: string, count = 22) =>
  Array.from({ length: count }, (_, i) => {
    const n = (seed.charCodeAt(i % seed.length) * (i + 7)) % 100;
    return 18 + (n / 100) * 82;
  });

const HelpHome = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const quickTiles = QUICK.map((path) => {
    const [sectionSlug, articleSlug] = path.split("/");
    const { section, article } = getArticle(sectionSlug, articleSlug);
    return section && article ? { path, section, article } : null;
  }).filter(Boolean) as {
    path: string;
    section: (typeof sections)[number];
    article: { slug: string; title: string };
  }[];

  return (
    <HelpLayout hideSidebar>
      <section className="hc-landing-hero">
        <div className="hc-hero-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="hc-eyebrow">
          <span className="hc-dot" aria-hidden="true" /> Support · tuned to your questions
        </p>
        <h1>{helpMeta.title}</h1>
        <p className="hc-lead">
          Everything about the headphones, the app, and how to actually use them — dialed in
          section by section.
        </p>

        <form
          className="hc-hero-search"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) navigate(`/help/search?q=${encodeURIComponent(q.trim())}`);
          }}
        >
          <Search size={17} aria-hidden="true" />
          <input
            className="hc-hero-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search across the help center"
            aria-label="Search across the help center"
          />
          <button type="submit" className="hc-btn">
            Search
          </button>
        </form>

        {quickTiles.length > 0 && (
          <div className="hc-chips">
            <span className="hc-chips-label">Popular</span>
            {quickTiles.map(({ path, article }) => (
              <Link key={path} to={`/help/${path}`} className="hc-chip">
                {article.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="hc-sections">
        <div className="hc-section-head">
          <h2>Browse every section</h2>
          <span className="hc-hz">{sections.length} channels</span>
        </div>

        <div className="hc-wall">
          {sections.map((s, idx) => (
            <Link key={s.slug} to={`/help/${s.slug}`} className="hc-tile">
              <span className="hc-tile-index">{String(idx + 1).padStart(2, "0")}</span>
              <span className="hc-eq" aria-hidden="true">
                {bars(s.slug).map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </span>
              <h3>{s.title}</h3>
              {s.summary && <p>{s.summary}</p>}
              <span className="hc-tile-foot">
                <span className="hc-count">
                  {s.articles?.length ?? 0} article{(s.articles?.length ?? 0) === 1 ? "" : "s"}
                  {(s.faqs?.length ?? 0) > 0 ? ` · ${s.faqs!.length} FAQs` : ""}
                </span>
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <StillStuck />
    </HelpLayout>
  );
};

export default HelpHome;
