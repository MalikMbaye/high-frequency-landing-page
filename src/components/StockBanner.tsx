import { useEffect } from "react";

const StockBanner = () => {
  useEffect(() => {
    document.body.classList.add("has-banner");
    return () => document.body.classList.remove("has-banner");
  }, []);

  return (
    <a href="#buy" className="stock-banner" aria-label="Back in stock — now shipping">
      <span className="stock-banner-pulse" aria-hidden="true" />
      <span className="stock-banner-label">BACK IN STOCK</span>
      <span className="stock-banner-text">
        <span className="stock-banner-desktop">High Frequency Headphones are shipping again — now shipping</span>
        <span className="stock-banner-mobile">Now shipping</span>
      </span>
    </a>
  );
};

export default StockBanner;
