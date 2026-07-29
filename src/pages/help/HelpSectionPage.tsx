import { Link, Navigate, useParams } from "react-router-dom";
import HelpLayout from "@/components/help/HelpLayout";
import { FaqAccordion, OrderTrackerCallout, StillStuck } from "@/components/help/HelpParts";
import { getSection, mentionsOrders } from "@/lib/helpCenter";

const HelpSectionPage = () => {
  const { sectionSlug } = useParams();
  const section = getSection(sectionSlug);

  if (!section) return <Navigate to="/help" replace />;

  return (
    <HelpLayout>
      <nav className="hc-breadcrumb" aria-label="Breadcrumb">
        <Link to="/help">Help Center</Link>
        <span aria-hidden="true">/</span>
        <span>{section.title}</span>
      </nav>

      <h1>{section.title}</h1>
      {section.summary && <p className="hc-lead" style={{ marginBottom: 32 }}>{section.summary}</p>}

      {(section.articles?.length ?? 0) > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 14 }}>Articles</h2>
          <div className="hc-grid">
            {section.articles!.map((a) => (
              <Link key={a.slug} to={`/help/${section.slug}/${a.slug}`} className="hc-card">
                <h3>{a.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(section.faqs?.length ?? 0) > 0 && (
        <section>
          <h2 style={{ marginBottom: 14 }}>Frequently asked</h2>
          <FaqAccordion faqs={section.faqs!} />
        </section>
      )}

      {section.slug === "orders-shipping" && <OrderTrackerCallout />}
      <StillStuck />
    </HelpLayout>
  );
};

export default HelpSectionPage;
