import { Link } from "react-router-dom";
import { Loader2, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useShopifyProducts();
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);

  const handleAddToCart = async (product: (typeof products)[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title });
  };

  return (
    <section id="products" className="py-24 border-t border-border/50">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase">Collection</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Our <span className="gradient-text">Products</span>
          </h2>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            <p>Failed to load products. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && products && products.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <Package className="w-16 h-16 text-muted-foreground mx-auto" />
            <h3 className="font-display text-xl font-semibold text-muted-foreground">No products yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Products will appear here once they're added to the store.
            </p>
          </div>
        )}

        {products && products.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const image = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              return (
                <Link
                  key={product.node.id}
                  to={`/product/${product.node.handle}`}
                  className="group rounded-xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:box-glow"
                >
                  <div className="aspect-square bg-secondary overflow-hidden">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || product.node.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.node.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-display font-bold text-primary">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={cartLoading}
                        className="box-glow"
                      >
                        {cartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-1" /> Add</>}
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
