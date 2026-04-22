import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteNavbar from "@/components/SiteNavbar";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background font-body">
        <SiteNavbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some delicious items from our menu!</p>
          <Link to="/menu">
            <Button>Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteNavbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Your Cart ({totalItems} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card rounded-xl border border-border p-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                  <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full" size="lg">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
