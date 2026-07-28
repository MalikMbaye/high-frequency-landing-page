import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HelpLayout from "@/components/help/HelpLayout";
import { StillStuck } from "@/components/help/HelpParts";
import { getArticle, helpMeta, sections } from "@/lib/helpCenter";

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
  }).filter(Boolean) as { path: string; section: (typeof sections)[number]; article: { slug: string; title: string } }[];

  return (
    <HelpLayout>
      <section className="hc-hero">
        <p className="hc-eyebrow">Support · Setup · Troubleshooting</p>
        <h1>{helpMeta.title}</h1>
        <p className="hc-lead" style={{ marginBottom: 22 }}>
          Everything about the headphones, the app, and how to actually use them.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) navigate(`/help/search?q=${encodeURIComponent(q.trim())}`);
          }}
          style={{ maxWidth: 560 }}
        >
          <input
            className="hc-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search across the help center"
            aria-label="Search across the help center"
          />
        </form>
      </section>

      {quickTiles.length > 0 && (
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ marginBottom: 14 }}>Start with these</h2>
          <div className="hc-grid">
            {quickTiles.map(({ path, section, article }) => (
              <Link key={path} to={`/help/${path}`} className="hc-card">
                <h3>{article.title}</h3>
                <p>{section.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ marginBottom: 14 }}>Browse every section</h2>
        <div className="hc-grid">
          {sections.map((s) => (
            <Link key={s.slug} to={`/help/${s.slug}`} className="hc-card">
              <h3>{s.title}</h3>
              {s.summary && <p>{s.summary}</p>}
              <span className="hc-count">
                {(s.articles?.length ?? 0)} article{(s.articles?.length ?? 0) === 1 ? "" : "s"}
                {(s.faqs?.length ?? 0) > 0 ? ` · ${s.faqs!.length} FAQs` : ""}
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
