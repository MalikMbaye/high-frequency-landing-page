import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          <span className="gradient-text">HF</span>
          <span className="text-foreground"> Headphones</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
