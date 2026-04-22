import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const AdminAddDish = () => {
  const [items, setItems] = useState<Tables<"menu_items">[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => {
    setName(""); setDescription(""); setPrice(""); setCategory("Breakfast"); setImage(""); setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dishData = {
      name,
      description,
      price: parseFloat(price),
      category,
      image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    };

    if (editingId) {
      const { error } = await supabase.from("menu_items").update(dishData).eq("id", editingId);
      if (error) toast.error(error.message);
      else { toast.success("Dish updated!"); resetForm(); }
    } else {
      const { error } = await supabase.from("menu_items").insert(dishData);
      if (error) toast.error(error.message);
      else { toast.success("Dish added!"); resetForm(); }
    }
    setLoading(false);
    fetchItems();
  };

  const handleEdit = (item: Tables<"menu_items">) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(String(item.price));
    setCategory(item.category);
    setImage(item.image);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Dish deleted!"); fetchItems(); }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-4 h-fit">
        <h2 className="font-display text-xl font-bold text-foreground">
          {editingId ? "Edit Dish" : "Add New Dish"}
        </h2>
        <div>
          <Label htmlFor="dishName">Name</Label>
          <Input id="dishName" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Dish name" />
        </div>
        <div>
          <Label htmlFor="dishDesc">Description</Label>
          <Input id="dishDesc" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dishPrice">Price ($)</Label>
            <Input id="dishPrice" type="number" step="0.01" min="0" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="9.99" />
          </div>
          <div>
            <Label htmlFor="dishCategory">Category</Label>
            <select
              id="dishCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Desserts</option>
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="dishImage">Image URL</Label>
          <Input id="dishImage" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading} className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            {editingId ? "Update Dish" : "Add Dish"}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-bold text-foreground">Current Menu ({items.length})</h2>
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 bg-card rounded-lg border border-border p-3">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.category}</p>
              <p className="text-sm font-bold text-primary">${Number(item.price).toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => handleEdit(item)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAddDish;
