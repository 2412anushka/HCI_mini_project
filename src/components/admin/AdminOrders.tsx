import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, CheckCircle, Truck, XCircle } from "lucide-react";
import { toast } from "sonner";

interface OrderWithItems {
  id: string;
  status: string;
  total: number;
  delivery_name: string | null;
  delivery_address: string | null;
  created_at: string;
  user_id: string;
  items: { item_name: string; quantity: number; item_price: number }[];
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!ordersData) { setLoading(false); return; }

    const ordersWithItems: OrderWithItems[] = [];
    for (const order of ordersData) {
      const { data: itemsData } = await supabase
        .from("order_items")
        .select("item_name, quantity, item_price")
        .eq("order_id", order.id);
      ordersWithItems.push({ ...order, items: itemsData || [] });
    }
    setOrders(ordersWithItems);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    if (error) {
      toast.error("Failed to update order status");
      return;
    }
    toast.success(`Order marked as ${newStatus}`);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (loading) return <p className="text-muted-foreground">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
        <p className="text-lg text-muted-foreground">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <p className="font-medium text-foreground">Order #{order.id.slice(0, 8)}</p>
              <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
              {order.delivery_name && (
                <p className="text-xs text-muted-foreground mt-1">{order.delivery_name} — {order.delivery_address}</p>
              )}
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor[order.status] || "bg-secondary text-secondary-foreground"}`}>
                {order.status}
              </span>
              <p className="text-lg font-bold text-primary mt-1">${Number(order.total).toFixed(2)}</p>
            </div>
          </div>

          <div className="border-t border-border pt-3 space-y-1">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.item_name} × {item.quantity}</span>
                <span className="text-foreground">${(Number(item.item_price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
            {order.status === "pending" && (
              <>
                <button
                  onClick={() => updateStatus(order.id, "approved")}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <CheckCircle className="h-3.5 w-3.5" /> Approve for Delivery
                </button>
                <button
                  onClick={() => updateStatus(order.id, "cancelled")}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <XCircle className="h-3.5 w-3.5" /> Cancel
                </button>
              </>
            )}
            {order.status === "approved" && (
              <button
                onClick={() => updateStatus(order.id, "delivered")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Truck className="h-3.5 w-3.5" /> Mark as Delivered
              </button>
            )}
            {(order.status === "delivered" || order.status === "cancelled") && (
              <span className="text-xs text-muted-foreground italic">No actions available</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
