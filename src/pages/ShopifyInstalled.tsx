import { CheckCircle } from "lucide-react";

const ShopifyInstalled = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-[#00D4FF]" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 font-space-grotesk">
          App Installed
        </h1>
        <p className="text-gray-400 mb-8">
          High Frequency Headphones is now connected to your Shopify store. You're all set to capture emails directly into your customer list.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#00D4FF] text-[#0B0F19] font-semibold rounded-lg hover:bg-[#00D4FF]/90 transition-colors"
        >
          Back to Store
        </a>
      </div>
    </div>
  );
};

export default ShopifyInstalled;
