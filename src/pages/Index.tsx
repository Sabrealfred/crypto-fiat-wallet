
import { AppLayout } from "@/components/layout/app-layout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { NotificationsList, DashboardNotification } from "@/components/dashboard/NotificationsList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface WalletBalance {
  total: number;
  change: number;
  fiat: number;
  crypto: number;
}

export default function PersonalDashboard() {
  const { data: balanceData, isLoading: isBalanceLoading } = useQuery<WalletBalance>({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error("No authenticated user found");
      }

      const { data: wallets, error } = await supabase
        .from("wallets")
        .select("balance, currency_code")
        .eq("user_id", user.id);

      if (error) {
        toast.error("Error loading balance data");
        throw error;
      }

      const totalBalance = wallets?.reduce((acc, wallet) => acc + (wallet.balance || 0), 0) || 0;
      const fiatBalance = wallets?.reduce((acc, wallet) => 
        wallet.currency_code === 'FIAT' ? acc + (wallet.balance || 0) : acc, 0) || 0;
      const cryptoBalance = wallets?.reduce((acc, wallet) => 
        wallet.currency_code === 'CRYPTO' ? acc + (wallet.balance || 0) : acc, 0) || 0;
      
      return {
        total: totalBalance,
        change: 2.5,
        fiat: fiatBalance,
        crypto: cryptoBalance
      };
    },
    staleTime: 30000,
    gcTime: 3600000,
    retry: false,
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Error loading balance data");
    }
  });

  const { data: notifications, isLoading: isNotificationsLoading } = useQuery<DashboardNotification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error("No authenticated user found");
      }

      const { data: dbNotifications, error } = await supabase
        .from("notifications")
        .select("id, title, description, created_at, type, amount, user_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        toast.error("Error loading notifications");
        throw error;
      }

      if (!dbNotifications?.length) {
        return [{
          id: "welcome",
          title: "Welcome!",
          description: "Welcome to your new banking dashboard",
          time: "Just now",
          type: "info",
          amount: 0
        }];
      }

      return dbNotifications.map(notification => ({
        id: notification.id,
        title: notification.title,
        description: notification.description,
        time: new Date(notification.created_at).toLocaleString(),
        type: notification.type || 'info',
        amount: Number(notification.amount) || 0
      }));
    },
    staleTime: 60000,
    gcTime: 3600000,
    retry: false,
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Error loading notifications");
    }
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
              <BalanceCard 
                total={balanceData?.total || 0}
                change={balanceData?.change || 0}
                fiat={balanceData?.fiat || 0}
                crypto={balanceData?.crypto || 0}
              />
            </div>
            <div>
              <NotificationsList notifications={notifications || []} />
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
