
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Crypto-Fiat Wallet</h1>
        </div>
        <div className="grid gap-6">
          {/* Panel de balance */}
          <div className="p-6 rounded-lg bg-card border shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Balance Total</h2>
            <div className="text-3xl font-bold">$1,234.56</div>
          </div>

          {/* Acciones rápidas */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-24 text-lg">
              Depositar
            </Button>
            <Button className="h-24 text-lg" variant="outline">
              Retirar
            </Button>
          </div>

          {/* Últimas transacciones */}
          <div className="p-6 rounded-lg bg-card border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Últimas Transacciones</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">Depósito</div>
                  <div className="text-sm text-muted-foreground">23 Feb 2024</div>
                </div>
                <div className="text-green-600">+$500.00</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">Retiro</div>
                  <div className="text-sm text-muted-foreground">22 Feb 2024</div>
                </div>
                <div className="text-red-600">-$150.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
