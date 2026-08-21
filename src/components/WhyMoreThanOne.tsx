import "./why-more-than-one.css";
import contextsImg from "@/assets/packs/packs-contexts.webp";
import giftImg from "@/assets/packs/packs-gift.webp";
import coupleImg from "@/assets/packs/packs-couple.webp";

const blocks = [
  {
    image: contextsImg,
    alt: "High Frequency Headphones resting on a desk, a car console, and a nightstand",
    header: "One for work. One for home.",
    body: "Focus lives at your desk. Calm lives on your nightstand. Keep a set in each place and the shift is always 60 seconds away. No packing it, no forgetting it, no going without it.",
    caption: "The Sync Pack. Never more than an arm's reach from a reset.",
  },
  {
    image: giftImg,
    alt: "One person handing a set of High Frequency Headphones to a friend across a kitchen table",
    header: "The best gift you can give someone is a higher frequency.",
    body: "Every time someone tries this device for the first time, they feel it. We have recorded over 300 of those first reactions on camera. The eyes widen. The spine straightens. So we welcome it. Hand your second set to a friend, a parent, a colleague. Watch their face. That moment is the whole reason we built this.",
    caption: "The Sync Pack. One for you. One for someone you love.",
  },
  {
    image: coupleImg,
    alt: "A couple relaxing on a sofa in the evening, both wearing High Frequency Headphones",
    header: "Two people. One frequency.",
    body: "Couples use these together at the end of the day. Same session, same state, same room. Ten minutes on Calm changes the entire tone of an evening. One of you shifting is good. Both of you shifting is better.",
    caption: "",
  },
];

const WhyMoreThanOne = () => (
  <section className="section wmo-section" id="why-more-than-one" data-theme="dark">
    <div className="hfh-container">
      <header className="wmo-head">
        <p className="wmo-eyebrow">MOST ORDERS DON'T STOP AT ONE</p>
        <h2 className="wmo-headline">One Changes Your State. Then You Realize Where Else You Need It.</h2>
        <p className="wmo-subhead">
          The moment you need a reset is rarely the moment your headphones are within reach. That is why we built the
          Sync Pack.
        </p>
      </header>

      <div className="wmo-blocks">
        {blocks.map((b, i) => (
          <article key={b.header} className={`wmo-block ${i % 2 === 1 ? "is-reversed" : ""}`}>
            <figure className="wmo-media">
              <img src={b.image} alt={b.alt} loading="lazy" decoding="async" />
              {b.caption && <figcaption>{b.caption}</figcaption>}
            </figure>
            <div className="wmo-copy">
              <h3>{b.header}</h3>
              <p>{b.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="wmo-teams">
        <p>
          Sports teams, personal trainers, business owners, and companies order these in sets for their people. If your
          team needs to shift states on demand, reach out and we will put a group order together.
        </p>
        <a className="wmo-teams-link" href="/contact">
          Ordering for a larger group? →
        </a>
      </div>

      <div className="wmo-cta-wrap">
        <a className="wmo-cta" href="#buy">
          Choose Your Pack →
        </a>
        <p className="wmo-guarantee">30-Day Money-Back Guarantee on every pack. Ships Worldwide.</p>
      </div>
    </div>
  </section>
);

export default WhyMoreThanOne;
