import t38 from "@/assets/testimonials/testimonial_38.jpeg.asset.json";
import t39 from "@/assets/testimonials/testimonial_39.jpeg.asset.json";
import t40 from "@/assets/testimonials/testimonial_40.jpeg.asset.json";
import t42 from "@/assets/testimonials/testimonial_42.jpeg.asset.json";
import t44 from "@/assets/testimonials/testimonial_44.jpeg.asset.json";
import t45 from "@/assets/testimonials/testimonial_45.jpeg.asset.json";
import t46 from "@/assets/testimonials/testimonial_46.jpeg.asset.json";
import t47 from "@/assets/testimonials/testimonial_47.png.asset.json";
import t48 from "@/assets/testimonials/testimonial_48.png.asset.json";

type Item = { src: string; alt: string };

const items: Item[] = [
  { src: t42.url, alt: "It's the coolest technology!! Def legit I love mine." },
  { src: t38.url, alt: "I have it and loOove it!! Amazing product" },
  { src: t40.url, alt: "I love mine! Such a game changer" },
  { src: t44.url, alt: "I absolutely love mine. You are awesome to invented such a wonderful product." },
  { src: t45.url, alt: "Within 5 minutes my mindset is changed" },
  { src: t39.url, alt: "A positive showing of how tech should be created" },
  { src: t46.url, alt: "They exceeded my expectations! You can feel the beats and frequencies." },
  { src: t47.url, alt: "Something I've never experienced before. Hard to explain — you'll have to just see for yourself." },
  { src: t48.url, alt: "Nurse Bridget here to report your product is VERY COOL. Integrated it into morning meditations." },
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
          <div className="tg-grid-main">
            {items.slice(0, 8).map((item, i) => (
              <figure className="tg-card" key={i}>
                <div className="tg-card-inner">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  
                </div>
              </figure>
            ))}
          </div>
          <figure className="tg-card tg-card-feature">
            <div className="tg-card-inner">
              <img
                src={items[8].src}
                alt={items[8].alt}
                loading="lazy"
                decoding="async"
              />
              
            </div>
          </figure>
        </div>

        <p className="tg-footnote">
          Screenshots taken directly from Instagram, TikTok &amp; DMs. Nothing staged.
        </p>
      </div>
    </section>
  );
};

export default TestimonialGallery;
