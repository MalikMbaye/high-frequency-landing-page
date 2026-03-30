import { Headphones, Zap, Waves } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "Hi-Res Audio",
    description: "40kHz extended frequency range captures every detail the artist intended.",
  },
  {
    icon: Zap,
    title: "Active Noise Cancellation",
    description: "Adaptive ANC that learns your environment for total immersion.",
  },
  {
    icon: Headphones,
    title: "50hr Battery",
    description: "Marathon listening sessions with fast USB-C charging. 5 minutes = 3 hours.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 border-t border-border/50">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase">Why Choose Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Built for the <span className="gradient-text">Obsessed</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:box-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
