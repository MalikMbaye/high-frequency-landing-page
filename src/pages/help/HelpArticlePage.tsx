import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HelpLayout from "@/components/help/HelpLayout";
import { Markdown, OrderTrackerCallout, StillStuck, TrackOrderNudge } from "@/components/help/HelpParts";
import { flatArticles, getArticle, mentionsOrders, slugify } from "@/lib/helpCenter";

const HelpArticlePage = () => {
  const { sectionSlug, articleSlug } = useParams();
  const { section, article } = getArticle(sectionSlug, articleSlug);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [rail, setRail] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [helpful, setHelpful] = useState<null | "yes" | "no">(null);

  const index = useMemo(
    () => flatArticles.findIndex((f) => f.section.slug === sectionSlug && f.article.slug === articleSlug),
    [sectionSlug, articleSlug]
  );

  // Pull the bold lead-ins out of the rendered markdown and use them as headings.
  useEffect(() => {
    setHelpful(null);
    setRail([]);
    setActiveId(null);
    const root = bodyRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("p > strong:first-child"));
    const found = nodes.map((n) => {
      const text = (n.textContent ?? "").replace(/[.:]\s*$/, "").trim();
      const id = slugify(text);
      (n.parentElement as HTMLElement).id = id;
      return { id, text };
    });
    setRail(found);

    if (found.length < 3) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-70px 0px -70% 0px", threshold: 0 }
    );
    found.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionSlug, articleSlug]);

  if (!section || !article) return <Navigate to="/help" replace />;

  const prev = index > 0 ? flatArticles[index - 1] : null;
  const next = index >= 0 && index < flatArticles.length - 1 ? flatArticles[index + 1] : null;

  return (
    <HelpLayout rail={rail} activeRailId={activeId}>
      <nav className="hc-breadcrumb" aria-label="Breadcrumb">
        <Link to="/help">Help Center</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/help/${section.slug}`}>{section.title}</Link>
        <span aria-hidden="true">/</span>
        <span>{article.title}</span>
      </nav>

      <h1>{article.title}</h1>

      <div ref={bodyRef} style={{ marginTop: 24 }}>
        <Markdown>{article.body}</Markdown>
        {mentionsOrders(article.title, article.body) && <TrackOrderNudge />}
      </div>

      <section className="hc-callout" aria-label="Was this helpful?">
        <h2 style={{ fontSize: 16 }}>Was this helpful?</h2>
        {helpful === null ? (
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="hc-btn hc-btn-ghost"
              onClick={() => {
                setHelpful("yes");
                // TODO: fire analytics event — article_feedback { article: article.slug, value: "yes" }
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="hc-btn hc-btn-ghost"
              onClick={() => {
                setHelpful("no");
                // TODO: fire analytics event — article_feedback { article: article.slug, value: "no" }
              }}
            >
              No
            </button>
          </div>
        ) : (
          <p style={{ margin: 0 }}>Thanks for the feedback.</p>
        )}
      </section>

      <nav className="hc-prevnext" aria-label="Article navigation">
        {prev ? (
          <Link className="hc-card" to={`/help/${prev.section.slug}/${prev.article.slug}`}>
            <span className="lbl">Previous</span>
            <h3 style={{ marginTop: 6 }}>{prev.article.title}</h3>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="hc-card" to={`/help/${next.section.slug}/${next.article.slug}`} style={{ textAlign: "right" }}>
            <span className="lbl">Next</span>
            <h3 style={{ marginTop: 6 }}>{next.article.title}</h3>
          </Link>
        )}
      </nav>

      {section.slug === "orders-shipping" && <OrderTrackerCallout />}
      <StillStuck />
    </HelpLayout>
  );
};

export default HelpArticlePage;
