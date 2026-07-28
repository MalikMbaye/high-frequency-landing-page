import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import HelpLayout from "@/components/help/HelpLayout";
import { StillStuck } from "@/components/help/HelpParts";
import { getArticle, sections } from "@/lib/helpCenter";

const QUICK = [
  "orders-shipping/track-your-order",
  "start-here/first-session",
  "start-here/sounds-vs-frequencies",
  "troubleshooting/no-vibration",
];


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
      <svg
        className="hc-bg-wave"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hcWaveFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--hc-accent)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--hc-accent)" stopOpacity="1" />
            <stop offset="75%" stopColor="var(--hc-signal)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--hc-signal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 200 Q 75 60 150 200 T 300 200 T 450 200 T 600 200 T 750 200 T 900 200 T 1050 200 T 1200 200" />
        <path d="M0 200 Q 100 320 200 200 T 400 200 T 600 200 T 800 200 T 1000 200 T 1200 200" />
        <path d="M0 200 Q 150 20 300 200 T 600 200 T 900 200 T 1200 200" />
      </svg>

      <section className="hc-landing-hero">
        <p className="hc-eyebrow">
          <span className="hc-dot" aria-hidden="true" /> Support · tuned to your questions
        </p>
        <h1>Help Center</h1>
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



      <section className="hc-video">
        <div className="hc-video-inner">
          <p className="hc-eyebrow">
            <span className="hc-dot" aria-hidden="true" /> Quick walkthrough
          </p>
          <h2>See the headphones in action</h2>
          <div className="hc-video-frame">
            <iframe
              src="https://www.youtube.com/embed/Y_Y9F2JBrkE?rel=0&modestbranding=1&playsinline=1"
              title="High Frequency Headphones walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
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
