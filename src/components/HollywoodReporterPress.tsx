import thrHero from "@/assets/thr-hero.webp.asset.json";
import { ExternalLink, Mail } from "lucide-react";
import "./press-feature.css";


const HollywoodReporterPress = () => {
  return (
    <section className="section press-feature" data-theme="light">
      <div className="hfh-container press-feature-inner">
        <div className="press-banner">
          <span className="press-banner-label">As seen in</span>
          <div className="thr-logo" aria-label="The Hollywood Reporter">
            <span className="thr-the">THE</span>
            <span className="thr-hollywood">Hollywood</span>
            <span className="thr-reporter">REPORTER</span>
          </div>
        </div>

        <div className="press-feature-grid">
          <div className="press-feature-copy">
            <h2 className="press-feature-headline">
              High Frequency Highway Appears in The Hollywood Reporter
            </h2>
            <p className="press-feature-dek">
              September 2, 2026 — the Harvard Lampoon takeover issue.
            </p>
            <p className="press-feature-body">
              The Harvard Lampoon took over the September 2 issue for a full
              parody edition, its first in eighteen years. Our full-page ad runs
              inside: nine numbered items on a steel evidence table. Eight of
              them have side effects.
            </p>
            <div className="press-feature-ctas">
              <a
                href="https://www.hollywoodreporter.com/news/general-news/editors-letter-thr-staff-awards-1236653231/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-purple"
              >
                Read the editor&apos;s letter <ExternalLink size={16} />
              </a>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("buy")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn btn-outline"
              >
                See the ad <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="press-feature-visual">
            <img
              src={thrHero.url}
              alt="The Harvard Lampoon parody edition of The Hollywood Reporter, September 2, 2026, open to the High Frequency Highway advertisement."
              loading="lazy"
              width={1600}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HollywoodReporterPress;
