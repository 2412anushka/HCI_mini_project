import { useState, useMemo, useEffect } from "react";
import SiteNavbar from "@/components/SiteNavbar";
import CategoryFilter from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import { supabase } from "@/integrations/supabase/client";
import { UtensilsCrossed, Search } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const MenuPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState<Tables<"menu_items">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data } = await supabase.from("menu_items").select("*").eq("available", true).order("category");
      if (data) setMenuItems(data);
      setLoading(false);
    };
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory, menuItems]);

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteNavbar />
      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Our Menu</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Browse our carefully curated selection of dishes, crafted with love and the finest ingredients.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        <div className="mb-10">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground py-20">Loading menu...</p>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={Number(item.price)}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg">No dishes found. Try a different search or category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuPage;
