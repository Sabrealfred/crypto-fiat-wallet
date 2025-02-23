
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Bell,
  CreditCard,
  Settings,
} from "lucide-react";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionHistory } from "@/components/TransactionHistory";
import { QuickActions } from "@/components/QuickActions";

export default function Index() {
  const [balance] = useState({
    total: 81910.00,
    change: 12.81,
    fiat: 49091.00,
    crypto: 32819.00,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-background p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <img src="/placeholder.svg" alt="User" />
          </Avatar>
          <div className="text-left">
            <h1 className="text-2xl font-bold">Buenos días</h1>
            <p className="text-muted-foreground">Bienvenido de vuelta</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="space-y-6">
        <section className="grid md:grid-cols-2 gap-6">
          <BalanceCard
            total={balance.total}
            change={balance.change}
            fiat={balance.fiat}
            crypto={balance.crypto}
          />
          <QuickActions />
        </section>

        <section>
          <Card className="p-6 glass-card">
            <h2 className="text-xl font-semibold mb-4">Transacciones Recientes</h2>
            <TransactionHistory />
          </Card>
        </section>
      </main>
    </div>
  );
}
