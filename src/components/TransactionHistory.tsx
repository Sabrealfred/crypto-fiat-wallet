
import { Avatar } from "@/components/ui/avatar";

export function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      name: "José Akbar",
      amount: 510.00,
      type: "received",
      date: "Justo ahora",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Factura de Agua",
      amount: 15.00,
      type: "pending",
      date: "Hace 15m",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Mercado",
      amount: 85.00,
      type: "sent",
      date: "Hace 6h",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <img src={transaction.avatar} alt={transaction.name} />
            </Avatar>
            <div>
              <p className="font-medium">{transaction.name}</p>
              <p className="text-sm text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <p className={`font-semibold ${
            transaction.type === "received" ? "text-accent" :
            transaction.type === "sent" ? "text-destructive" :
            "text-muted-foreground"
          }`}>
            {transaction.type === "received" ? "+" : "-"}
            ${transaction.amount.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
