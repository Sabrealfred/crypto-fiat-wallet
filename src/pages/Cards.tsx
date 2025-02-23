
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

export default function CardsPage() {
  const cards = [
    { 
      type: "VISA",
      name: "Leonardo Cap",
      number: "**** **** **** 1890",
      balance: 32819.00,
      expiryDate: "05/26",
      color: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500",
      cvv: "***"
    },
    { 
      type: "Mastercard",
      name: "Leonardo Cap",
      number: "**** **** **** 7643",
      balance: 28450.75,
      expiryDate: "09/24",
      color: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
      cvv: "***"
    },
    { 
      type: "AMEX",
      name: "Leonardo Cap",
      number: "**** **** **** 9276",
      balance: 20640.25,
      expiryDate: "03/26",
      color: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
      cvv: "***"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      merchant: "Amazon",
      amount: -156.00,
      date: "Today, 15:30",
      card: "*1890"
    },
    {
      id: 2,
      merchant: "Netflix",
      amount: -15.99,
      date: "Yesterday",
      card: "*7643"
    },
    {
      id: 3,
      merchant: "Uber",
      amount: -28.50,
      date: "Yesterday",
      card: "*1890"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">My Cards</h1>
          <p className="text-muted-foreground">Manage your credit and debit cards</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`${card.color} p-6 rounded-2xl text-white relative min-w-[320px] shadow-lg transform transition-transform hover:scale-105`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <p className="text-xl font-semibold">Card Balance</p>
                  <CreditCard className="h-6 w-6 text-white/80" />
                </div>
                <p className="text-3xl font-bold mt-2">${card.balance.toLocaleString()}</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/70">Card Name</p>
                    <p className="font-medium">{card.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Card No.</p>
                    <p className="font-medium">{card.number}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/70">CVV</p>
                    <p className="font-medium">{card.cvv}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Valid until</p>
                    <p className="font-medium">{card.expiryDate}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-6">
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Card Settings</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Change PIN
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Freeze Card
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Report Lost
              </Button>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.merchant}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date} • Card ending in {transaction.card}
                    </p>
                  </div>
                  <span className="font-medium text-red-500">
                    ${transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
