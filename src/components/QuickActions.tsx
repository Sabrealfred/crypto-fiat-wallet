
import { Card } from "@/components/ui/card";
import { CreditCard, Wallet, ArrowLeftRight } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Tarjetas",
      description: "Gestiona tus tarjetas",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Billetera",
      description: "Ver todas tus cuentas",
    },
    {
      icon: <ArrowLeftRight className="h-6 w-6" />,
      title: "Intercambiar",
      description: "Cambiar entre monedas",
    },
  ];

  return (
    <Card className="p-6 glass-card fade-in">
      <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="p-4 rounded-lg hover:bg-secondary transition-colors text-center"
          >
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
              {action.icon}
            </div>
            <h3 className="font-medium">{action.title}</h3>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </Card>
  );
}
