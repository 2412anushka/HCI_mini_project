import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart } from "lucide-react";

interface ItemStat {
  item_name: string;
  total_qty: number;
  total_revenue: number;
}

const AdminAnalytics = () => {
  const [stats, setStats] = useState<ItemStat[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: orderItems } = await supabase.from("order_items").select("item_name, quantity, item_price");
      const { count } = await supabase.from("orders").select("*", { count: "exact", head: true });

      setTotalOrders(count || 0);

      if (orderItems) {
        const map = new Map<string, ItemStat>();
        let rev = 0;
        for (const oi of orderItems) {
          const existing = map.get(oi.item_name) || { item_name: oi.item_name, total_qty: 0, total_revenue: 0 };
          existing.total_qty += oi.quantity;
          existing.total_revenue += Number(oi.item_price) * oi.quantity;
          rev += Number(oi.item_price) * oi.quantity;
          map.set(oi.item_name, existing);
        }
        setStats(Array.from(map.values()).sort((a, b) => b.total_qty - a.total_qty));
        setTotalRevenue(rev);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading analytics...</p>;

  const topItem = stats[0];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Most Popular</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{topItem?.item_name || "N/A"}</p>
          {topItem && <p className="text-sm text-muted-foreground">{topItem.total_qty} orders</p>}
        </div>
      </div>

      {/* Chart */}
      {stats.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Items by Quantity Sold</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="item_name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="total_qty" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Quantity Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      {stats.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Item Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Rank</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Item</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Qty Sold</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s, i) => (
                  <tr key={s.item_name} className="border-b border-border last:border-0">
                    <td className="py-2 text-foreground">{i + 1}</td>
                    <td className="py-2 text-foreground font-medium">{s.item_name}</td>
                    <td className="py-2 text-right text-foreground">{s.total_qty}</td>
                    <td className="py-2 text-right text-primary font-bold">${s.total_revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
