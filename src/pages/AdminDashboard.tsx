import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SiteNavbar from "@/components/SiteNavbar";
import AdminAddDish from "@/components/admin/AdminAddDish";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { ChefHat, ClipboardList, BarChart3 } from "lucide-react";

type Tab = "dishes" | "orders" | "analytics";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dishes");
  const { user } = useAuth();

  const tabs = [
    { id: "dishes" as Tab, label: "Manage Dishes", icon: ChefHat },
    { id: "orders" as Tab, label: "Orders", icon: ClipboardList },
    { id: "analytics" as Tab, label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:bg-secondary"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "dishes" && <AdminAddDish />}
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "analytics" && <AdminAnalytics />}
      </div>
    </div>
  );
};

export default AdminDashboard;
