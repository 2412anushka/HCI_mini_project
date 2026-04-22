import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import SiteNavbar from "@/components/SiteNavbar";
import { CheckCircle } from "lucide-react";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: totalPrice,
        delivery_name: `${firstName} ${lastName}`,
        delivery_address: address,
        delivery_phone: phone,
      })
      .select()
      .single();

    if (orderError || !order) {
      toast.error("Failed to place order. Please try again.");
      setLoading(false);
      return;
    }

    // Fetch menu items to map names to IDs
    const { data: dbMenuItems } = await supabase.from("menu_items").select("id, name");
    const menuMap = new Map((dbMenuItems || []).map(m => [m.name, m.id]));

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menuItemId || menuMap.get(item.name) || order.id,
      item_name: item.name,
      item_price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      toast.error("Order created but items failed to save.");
    } else {
      toast.success("Order placed successfully!");
    }

    setSubmitted(true);
    clearCart();
    setLoading(false);
  };

  if (cartItems.length === 0 && !submitted) {
    navigate("/cart");
    return null;
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background font-body">
        <SiteNavbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">Thank you for your order. Your food is being prepared.</p>
          <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteNavbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Delivery Details</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Payment Details</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" required placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" required placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" required placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" required placeholder="123" maxLength={4} type="password" />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Placing Order..." : `Place Order — $${totalPrice.toFixed(2)}`}
            </Button>
          </form>

          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
