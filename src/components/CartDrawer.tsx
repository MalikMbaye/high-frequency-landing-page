import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const { items, isLoading, isSyncing, isDrawerOpen, openDrawer, closeDrawer, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  // Sync cart with Shopify when drawer opens (catches edge cases)
  useEffect(() => { if (isDrawerOpen) syncCart(); }, [isDrawerOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      closeDrawer();
    }
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(o) => (o ? openDrawer() : closeDrawer())}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-current hover:bg-transparent" onClick={() => openDrawer()}>
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-cyan-400 text-black">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background text-foreground border-l border-zinc-800">
        <SheetHeader className="flex-shrink-0 text-left">
          <SheetTitle className="text-white">Shopping Cart</SheetTitle>
          <SheetDescription className="text-zinc-400">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-500">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2 rounded-lg bg-zinc-900/50">
                      <div className="w-16 h-16 bg-zinc-900 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-white">{item.product.node.title}</h4>
                        <p className="text-sm text-zinc-400">{item.selectedOptions.map(option => option.value).join(' • ')}</p>
                        <p className="font-semibold text-cyan-400">{item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6 border-zinc-700 bg-transparent text-white" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6 border-zinc-700 bg-transparent text-white" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-zinc-800 bg-background mt-auto">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">{items[0]?.price.currencyCode || '$'} {totalPrice.toFixed(2)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold" size="lg" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" />Checkout with Shopify</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
