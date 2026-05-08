const Neuroplasticity = () => {
import img_G1vHJv9R from "@/assets/genspark/G1vHJv9R.jpg";
  return (
    <section className="section section-dark neuroplasticity" data-theme="dark">
      <div className="hfh-container">
        <div className="neuro-grid">
          <div>
            <h2 className="mega-headline">
              THE MORE<br />YOU USE IT,<br />THE <span className="hl-purple">LESS</span> YOU<br />NEED IT.
            </h2>
            <p className="subhead light">Every session builds neuroplasticity in your brain. You're not renting a temporary state. You're literally rewiring your brain's ability to focus, stay calm, and enter flow on its own.</p>
            <p className="body-light">Adderall makes you more dependent every month. Coffee makes you more dependent every morning. This does the opposite. It makes your brain stronger. And eventually, your brain can do it without help.</p>
          </div>
          <div className="neuro-visual">
            <img src={img_G1vHJv9R} alt="High Frequency Highway bone conduction headphones on dark background" />
          </div>
        </div>
        <blockquote className="pull-quote">"Name one other product on the planet that works itself out of a job because it actually fixed the problem."</blockquote>
      </div>
    </section>
  );
};

export default Neuroplasticity;
