
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      name: "Josep Akbar",
      amount: 510.00,
      type: "received",
      date: "Just now",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Water bill",
      amount: 15.00,
      type: "pending",
      date: "15m ago",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Spending",
      amount: 85.00,
      type: "sent",
      date: "6h ago",
      avatar: "/placeholder.svg",
      description: "You spent more than $5,000"
    }
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <img src={transaction.avatar} alt={transaction.name} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{transaction.name}</p>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>
              {transaction.description && (
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.type === "received" ? "text-accent" :
              transaction.type === "sent" ? "text-destructive" :
              "text-muted-foreground"
            }`}>
              {transaction.type === "received" ? "+" : "-"}
              ${transaction.amount.toFixed(2)}
            </p>
            {transaction.type === "pending" && (
              <Button size="sm" className="mt-1 h-8 rounded-full text-xs">
                Pay now
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
