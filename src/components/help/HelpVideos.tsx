import { ExternalLink } from "lucide-react";

export type HelpVideo = { id: string; title: string };

/** Short YouTube walkthroughs embedded straight into the help center. */
export const VIDEO_WALKTHROUGHS: HelpVideo[] = [
  { id: "CXjLAr6SPmE", title: "Start here: what the headphones actually do" },
  { id: "BUUBmswVNRE", title: "Your first session, step by step" },
  { id: "ab0egzOwL4w", title: "Choosing the right frequency for you" },
  { id: "ZZc5cOMMu3A", title: "Fit, comfort, and getting the sound right" },
];

const HelpVideos = ({
  videos = VIDEO_WALKTHROUGHS,
  heading = "Watch the walkthrough",
  blurb = "Short videos that take you through setup, your first session, and how to pick a frequency.",
}: {
  videos?: HelpVideo[];
  heading?: string;
  blurb?: string;
}) => (
  <section style={{ marginBottom: 48 }}>
    <h2 style={{ marginBottom: 6 }}>{heading}</h2>
    <p className="hc-lead" style={{ fontSize: 15, marginBottom: 18 }}>
      {blurb}
    </p>
    <div className="hc-videos">
      {videos.map((v) => (
        <article key={v.id} className="hc-video">
          <div className="frame">
            <iframe
              src={`https://www.youtube.com/embed/${v.id}`}
              title={v.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="cap">{v.title}</p>
        </article>
      ))}
    </div>
    <p style={{ marginTop: 16, fontSize: 14 }}>
      <a
        className="hc-btn hc-btn-ghost"
        href="https://www.youtube.com/@highfrequencyhighway"
        target="_blank"
        rel="noopener noreferrer"
      >
        See every video on YouTube
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </p>
  </section>
);

export default HelpVideos;
