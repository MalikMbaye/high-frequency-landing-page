import { Star, MessageSquare } from "lucide-react";

const testimonialSlots = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export const Testimonials = () => {
  return (
    <section className="py-24 border-t border-border/50">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase">
            What People Say
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Customer <span className="gradient-text">Reviews</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonialSlots.map((slot) => (
            <div
              key={slot.id}
              className="rounded-xl bg-card border border-border/50 p-8 space-y-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-muted-foreground/30"
                  />
                ))}
              </div>
              <p className="text-muted-foreground italic text-sm leading-relaxed">
                No review yet
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-muted-foreground/50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground/50">
                    —
                  </p>
                  <p className="text-xs text-muted-foreground/30">
                    Awaiting review
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Reviews will appear here from verified customers.
        </p>
      </div>
    </section>
  );
};
