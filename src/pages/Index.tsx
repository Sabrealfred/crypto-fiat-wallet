
import { AppLayout } from "@/components/layout/app-layout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { NotificationsList } from "@/components/dashboard/NotificationsList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PersonalDashboard() {
  // Optimizar consulta de balance con React Query
  const { data: balanceData, isLoading: isBalanceLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        toast.error("Error loading balance data");
        throw error;
      }

      return {
        total: data?.total_balance || 45820.75,
        change: data?.change_percentage || 2.5,
        fiat: data?.fiat_balance || 32150.25,
        crypto: data?.crypto_balance || 13670.50
      };
    },
    staleTime: 30000, // Datos considerados frescos por 30 segundos
    cacheTime: 3600000, // Cache por 1 hora
  });

  // Optimizar consulta de notificaciones
  const { data: notifications, isLoading: isNotificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        toast.error("Error loading notifications");
        throw error;
      }

      return data || [
        {
          id: 1,
          title: "Payment Received",
          description: "You received $1,500 from John Doe",
          time: "Just now",
          type: "income",
          amount: 1500
        },
        {
          id: 2,
          title: "Bill Due",
          description: "Water bill payment due in 3 days",
          time: "15m ago",
          type: "bill",
          amount: 85
        },
        {
          id: 3,
          title: "Spending Alert",
          description: "You've spent more than $5,000 this month",
          time: "6h ago",
          type: "alert",
          amount: 5000
        }
      ];
    },
    staleTime: 60000, // Datos considerados frescos por 1 minuto
    cacheTime: 3600000, // Cache por 1 hora
  });

  if (isBalanceLoading || isNotificationsLoading) {
    return (
      <AppLayout>
        <div className="h-screen w-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <WelcomeHeader />
        
        <div className="grid gap-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceCard {...balanceData} />
            </div>
            <div>
              <NotificationsList notifications={notifications} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <QuickActions />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
