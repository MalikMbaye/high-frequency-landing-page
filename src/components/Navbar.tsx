import { useState, useEffect } from "react";

const HEADPHONES_URL = "https://www.highfrequencyhw.com/products/high-frequency-headphones";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-[72px] px-5 md:px-10">
        <a href="#" className={`font-display text-[13px] md:text-[15px] font-semibold tracking-[0.18em] uppercase transition-colors duration-500 ${
          scrolled ? "text-gray-900" : "text-white/90"
        }`}>
          High Frequency Highway
        </a>
        <a
          href={HEADPHONES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 md:h-11 px-5 md:px-7 bg-brand text-white font-display font-semibold text-[13px] md:text-sm rounded-full transition-all duration-300 hover:bg-brand-light active:scale-[0.97]"
        >
          Get Headphones
        </a>
      </div>
    </nav>
  );
};
