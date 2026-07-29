import { useEffect } from "react";

const StockBanner = () => {
  useEffect(() => {
    document.body.classList.add("has-banner");
    return () => document.body.classList.remove("has-banner");
  }, []);

  return (
    <a href="#buy" className="stock-banner" aria-label="Back in stock — order now for expedited shipping">
      <span className="stock-banner-pulse" aria-hidden="true" />
      <span className="stock-banner-label">BACK IN STOCK</span>
      <span className="stock-banner-text">
        <span className="stock-banner-desktop">Back in stock — order now for expedited shipping</span>
        <span className="stock-banner-mobile">Back in stock — expedited shipping</span>
      </span>
    </a>
  );
};

export default StockBanner;
