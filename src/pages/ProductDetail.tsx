import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product;
    },
    enabled: !!handle,
  });

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIndex]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="font-display text-2xl font-bold">Product not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to shop</Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const currentImage = images[selectedImageIndex]?.node;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl bg-card border border-border/50 overflow-hidden">
              {currentImage ? (
                <img src={currentImage.url} alt={currentImage.altText || product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImageIndex ? 'border-primary box-glow' : 'border-border/50'}`}
                  >
                    <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold">{product.title}</h1>
              <p className="text-3xl font-display font-bold text-primary">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variant selection */}
            {product.variants.edges.length > 1 && (
              <div className="space-y-3">
                <label className="font-display text-sm font-semibold">Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((v: { node: { id: string; title: string; availableForSale: boolean } }, i: number) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIndex(i)}
                      disabled={!v.node.availableForSale}
                      className={`px-4 py-2 rounded-lg border text-sm font-display transition-all ${
                        i === selectedVariantIndex
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/50 hover:border-primary/30'
                      } ${!v.node.availableForSale ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="w-full box-glow text-base"
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
            >
              {cartLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
