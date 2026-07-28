import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import ShopifyInstalled from "./pages/ShopifyInstalled";
import Track from "./pages/Track";
import TrackResult from "./pages/TrackResult";
import NotFound from "./pages/NotFound";
import HelpHome from "./pages/help/HelpHome";
import HelpSectionPage from "./pages/help/HelpSectionPage";
import HelpArticlePage from "./pages/help/HelpArticlePage";
import HelpSearchPage from "./pages/help/HelpSearchPage";
import EmailCapturePopup from "./components/EmailCapturePopup";
import BackInStockSplash from "./components/BackInStockSplash";


const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/shopify-installed" element={<ShopifyInstalled />} />
        <Route path="/track" element={<Track />} />
        <Route path="/track/result" element={<TrackResult />} />
        <Route path="/help" element={<HelpHome />} />
        <Route path="/help/search" element={<HelpSearchPage />} />
        <Route path="/help/:sectionSlug" element={<HelpSectionPage />} />
        <Route path="/help/:sectionSlug/:articleSlug" element={<HelpArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <EmailCapturePopup />
      <BackInStockSplash />

    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
