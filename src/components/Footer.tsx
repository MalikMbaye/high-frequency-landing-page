export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="gradient-text font-semibold">HF Headphones</span>. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
};
