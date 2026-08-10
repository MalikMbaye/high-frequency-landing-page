/**
 * Back-in-stock announcement banner.
 * Rendered as the first child of the fixed header so it sits above the menu.
 */
const StockBanner = () => {
  return (
    <div className="stock-banner" role="status">
      <span className="stock-banner-dot" aria-hidden="true" />
      <span className="stock-banner-text">
        Back in stock — order now for expedited shipping
      </span>
    </div>
  );
};

export default StockBanner;
