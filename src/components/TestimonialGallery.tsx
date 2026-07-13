import t38 from "@/assets/testimonials/testimonial_38.jpeg.asset.json";
import t39 from "@/assets/testimonials/testimonial_39.jpeg.asset.json";
import t40 from "@/assets/testimonials/testimonial_40.jpeg.asset.json";
import t42 from "@/assets/testimonials/testimonial_42.jpeg.asset.json";
import t44 from "@/assets/testimonials/testimonial_44.jpeg.asset.json";
import t45 from "@/assets/testimonials/testimonial_45.jpeg.asset.json";
import t46 from "@/assets/testimonials/testimonial_46.jpeg.asset.json";

type Item = { src: string; alt: string; source: "Instagram" | "DM" | "TikTok" };

const items: Item[] = [
  { src: t42.url, alt: "It's the coolest technology!! Def legit I love mine.", source: "Instagram" },
  { src: t38.url, alt: "I have it and loOove it!! Amazing product", source: "Instagram" },
  { src: t40.url, alt: "I love mine! Such a game changer", source: "Instagram" },
  { src: t44.url, alt: "I absolutely love mine. You are awesome to invented such a wonderful product.", source: "Instagram" },
  { src: t45.url, alt: "Within 5 minutes my mindset is changed", source: "TikTok" },
  { src: t39.url, alt: "A positive showing of how tech should be created", source: "Instagram" },
  { src: t46.url, alt: "They exceeded my expectations! You can feel the beats and frequencies.", source: "TikTok" },
];

const TestimonialGallery = () => {
  return (
    <section className="tg-section" data-theme="dark" id="testimonials">
      <div className="tg-container">
        <header className="tg-header">
          <span className="tg-eyebrow">Unsolicited · Unpaid · Unfiltered</span>
          <h2 className="tg-headline">
            The Receipts.
          </h2>
          <p className="tg-sub">
            Real DMs. Real comments. Real people who tried it and came back to tell us.
          </p>
        </header>

        <div className="tg-grid">
          {items.map((item, i) => (
            <figure className="tg-card" key={i}>
              <div className="tg-card-inner">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="tg-badge">{item.source}</span>
              </div>
            </figure>
          ))}
        </div>

        <p className="tg-footnote">
          Screenshots taken directly from Instagram, TikTok &amp; DMs. Nothing staged.
        </p>
      </div>
    </section>
  );
};

export default TestimonialGallery;
