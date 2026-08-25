interface Props {
  videoId: string;
  title: string;
  /** Aspect ratio of the frame, e.g. "9 / 16" for Shorts */
  aspectRatio?: string;
  className?: string;
  /** Kept for compatibility; all YouTube embeds now load eagerly. */
  priority?: boolean;
  /** Kept for compatibility; the real YouTube iframe always renders. */
  facade?: boolean;
}

/** Real YouTube embed that renders immediately and waits for user click to play. */
const YouTubeFacade = ({
  videoId,
  title,
  aspectRatio = "9 / 16",
  className,
}: Props) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        background: "#000",
        overflow: "hidden",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="eager"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </div>
  );
};

export default YouTubeFacade;
