import img_G1vHJv9R from "@/assets/genspark/G1vHJv9R.webp";
const Neuroplasticity = () => {
  return (
    <section className="section section-dark neuroplasticity" data-theme="dark">
      <div className="hfh-container">
        <div className="neuro-grid">
          <div>
            <h2 className="mega-headline">
              THE MORE<br />YOU USE IT,<br />THE <span className="hl-purple">LESS</span> YOU<br />NEED IT.
            </h2>
            <p className="subhead light">Every session helps train your brain. You're not renting a temporary state — you're building the habit of dropping into focus, calm, or flow on your own.</p>
            <p className="body-light">Stimulants tend to make you more dependent over time. This is designed to do the opposite — help your brain get better at finding these states on its own.</p>
          </div>
          <div className="neuro-visual">
            <img src={img_G1vHJv9R} alt="High Frequency Headphones frequency technology headphones on dark background" />
          </div>
        </div>
        <blockquote className="pull-quote">"Name one other product on the planet that works itself out of a job because it actually fixed the problem."</blockquote>
      </div>
    </section>
  );
};

export default Neuroplasticity;
