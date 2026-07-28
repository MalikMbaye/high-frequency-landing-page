import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import HelpLayout from "@/components/help/HelpLayout";
import { StillStuck } from "@/components/help/HelpParts";
import { Highlighted } from "@/components/help/SearchDialog";
import { searchHelp, snippet } from "@/lib/helpCenter";

const HelpSearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchHelp(q), [q]);

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
    <HelpLayout>
      <nav className="hc-breadcrumb" aria-label="Breadcrumb">
        <Link to="/help">Help Center</Link>
        <span aria-hidden="true">/</span>
        <span>Search</span>
      </nav>

      <h1>Results for “{q}”</h1>
      <p className="hc-lead" style={{ marginBottom: 28 }}>
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>

      {results.length === 0 ? (
        <p className="hc-lead">
          Nothing matched that. Try a shorter phrase, or browse the sections on the left.
        </p>
      ) : (
        grouped.map(([sectionTitle, list]) => (
          <section key={sectionTitle} style={{ marginBottom: 28 }}>
            <h2 style={{ marginBottom: 10 }}>{sectionTitle}</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {list.map((r) => (
                <Link key={r.href + r.title} to={r.href} className="hc-card">
                  <h3>
                    <Highlighted text={r.title} query={q} />
                  </h3>
                  <p>
                    <Highlighted text={snippet(r.text, q)} query={q} />
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}

      <StillStuck />
    </HelpLayout>
  );
};

export default HelpSearchPage;
