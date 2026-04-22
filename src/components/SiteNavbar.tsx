import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UtensilsCrossed, ShoppingCart, LogIn, LogOut, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const SiteNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, role, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">Savory Bites</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/menu" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Menu</Link>
            {role === "admin" && (
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" /> Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user && role !== "admin" && (
              <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <button onClick={signOut} className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/menu" className="text-sm font-medium text-muted-foreground hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
            {user && role !== "admin" && (
              <Link to="/cart" className="text-sm font-medium text-muted-foreground hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Cart ({totalItems})</Link>
            )}
            {role === "admin" && (
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
            )}
            {user ? (
              <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-sm font-medium text-muted-foreground hover:text-primary py-1 text-left">Sign Out</button>
            ) : (
              <Link to="/login" className="text-sm font-medium text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default SiteNavbar;
