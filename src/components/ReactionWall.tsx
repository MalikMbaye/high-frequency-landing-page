import { ArrowRight, Play } from "lucide-react";

type Tile = { strong: string; sub: string };

const tiles: Tile[] = [
  { strong: "Mind-Blown!", sub: "— Marcus, Austin" },
  { strong: "Instant Focus.", sub: "— Priya, NYC" },
  { strong: "Best Sleep Ever.", sub: "— David, LA" },
  { strong: "Incredible Clarity.", sub: "— Sara, Miami" },
  { strong: "Stress Gone.", sub: "— Jordan, Chicago" },
  { strong: "Game Changer.", sub: "— Alex, Seattle" },
];

const ReactionWall = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transition = "transform 0.18s ease";
    el.style.transform = "scale(0.985)";
    setTimeout(() => {
      el.style.transform = "";
    }, 180);
  };

  return (
    <section className="section section-dark reaction-wall" id="reviews" data-theme="dark">
      <div className="hfh-container">
        <h2 className="section-header light">300+ People Have Had This Reaction on Camera. Watch.</h2>
        <p className="section-sub light">This reaction isn't scripted. It happens every single time someone puts these on for the first time. The spine straightens. The eyes widen. They say the same thing: "whoa." We've recorded it over 300 times.</p>
        <div className="reaction-grid">
          {tiles.map((t) => (
            <div
              key={t.strong}
              className="reaction-tile"
              role="button"
              tabIndex={0}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  (e.currentTarget as HTMLElement).click();
                }
              }}
            >
              <div className="play-overlay"><Play fill="currentColor" /></div>
              <div className="r-caption">
                <strong>{t.strong}</strong>
                <span>{t.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="reaction-foot"><em>Real reactions. Real footage. Captured live. Unscripted, unpaid, unprompted.</em></p>
        <div style={{ textAlign: "center" }}>
          <a href="#order" className="btn btn-gold btn-lg">
            Now Imagine That's You <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReactionWall;
