import type { MenuItem } from "@/data/menuItems";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MenuCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const MenuCard = ({ id, name, description, price, category, image }: MenuCardProps) => {
  const { addToCart } = useCart();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate("/login");
      return;
    }
    if (role === "admin") {
      toast.info("Admins manage the menu. Switch to a customer account to order.");
      return;
    }
    const numericId = typeof id === "string" ? Math.abs(id.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 0)) : id;
    addToCart({ id: numericId, menuItemId: String(id), name, description, price, category, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden h-48">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
          <span className="text-primary font-bold text-lg whitespace-nowrap">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
        {role !== "admin" && (
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              added
                ? "bg-accent text-accent-foreground"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {added ? <><Check className="h-4 w-4" /> Added!</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
