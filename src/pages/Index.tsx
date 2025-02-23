
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Bell, Settings, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const [balance] = useState({
    total: 81910.00,
    change: 12.81,
    earning: 21500.00,
    spending: 5392.00,
  });

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <img src="/placeholder.svg" alt="Leonardo C" />
          </Avatar>
          <div className="text-left">
            <h1 className="text-2xl font-bold">Good morning Leonardo</h1>
            <p className="text-muted-foreground">Welcome back</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 glass-card">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">Earning</p>
                  <p className="text-2xl font-bold">${balance.earning.toLocaleString()}</p>
                  <p className="text-sm text-accent">↑ 12%</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">Spending</p>
                  <p className="text-2xl font-bold">${balance.spending.toLocaleString()}</p>
                  <p className="text-sm text-destructive">↓ 8%</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Statistics</h2>
              <div className="h-[200px] bg-muted/20 rounded-2xl flex items-center justify-center text-muted-foreground">
                Graph placeholder
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your card</h2>
              <Button variant="outline" size="sm" className="rounded-full">
                Add card +
              </Button>
            </div>
            
            <div className="card-gradient p-6 mb-6">
              <p className="text-sm opacity-90 mb-2">Card balance</p>
              <p className="text-3xl font-bold mb-4">$32,819.00</p>
              <div className="flex justify-between items-end">
                <p className="text-sm opacity-90">**** **** **** 1890</p>
                <p className="text-sm opacity-90">05/26</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Quick transfer</h3>
                <div className="flex gap-2">
                  {[1,2,3,4].map((i) => (
                    <Avatar key={i} className="h-12 w-12 ring-2 ring-white">
                      <img src="/placeholder.svg" alt={`Contact ${i}`} />
                    </Avatar>
                  ))}
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 rounded-full bg-accent hover:bg-accent/90">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button className="flex-1 rounded-full" variant="outline">
                  <ArrowDownLeft className="mr-2 h-4 w-4" />
                  Receive
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionHistory />
        </Card>
      </main>
    </div>
  );
}
