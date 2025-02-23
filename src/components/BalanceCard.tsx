
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface BalanceCardProps {
  total: number;
  change: number;
  fiat: number;
  crypto: number;
}

export function BalanceCard({ total, change, fiat, crypto }: BalanceCardProps) {
  return (
    <Card className="p-6 glass-card fade-in">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Balance Total</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold">${total.toLocaleString()}</h2>
            <span className="text-accent text-sm">+{change}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Fiat</p>
            <p className="text-xl font-semibold">${fiat.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Crypto</p>
            <p className="text-xl font-semibold">${crypto.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Enviar
          </Button>
          <Button className="flex-1" variant="outline">
            <ArrowDownLeft className="mr-2 h-4 w-4" />
            Recibir
          </Button>
        </div>
      </div>
    </Card>
  );
}
