
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { 
  CreditCard, 
  Plus, 
  Lock, 
  ShieldAlert, 
  Key,
  Wallet,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function CardsPage() {
  const [cards, setCards] = useState([
    { 
      id: 1,
      type: "VISA",
      name: "Leonardo Cap",
      number: "**** **** **** 1890",
      balance: 32819.00,
      expiryDate: "05/26",
      color: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500",
      cvv: "***",
      isBlocked: false
    },
    { 
      id: 2,
      type: "Mastercard",
      name: "Leonardo Cap",
      number: "**** **** **** 7643",
      balance: 28450.75,
      expiryDate: "09/24",
      color: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
      cvv: "***",
      isBlocked: false
    },
    { 
      id: 3,
      type: "AMEX",
      name: "Leonardo Cap",
      number: "**** **** **** 9276",
      balance: 20640.25,
      expiryDate: "03/26",
      color: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
      cvv: "***",
      isBlocked: false
    }
  ]);

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

  const handleBlockCard = (cardId: number) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const newStatus = !card.isBlocked;
        toast.success(`Card ${card.number} has been ${newStatus ? 'blocked' : 'unblocked'}`);
        return { ...card, isBlocked: newStatus };
      }
      return card;
    }));
  };

  const handleChangePin = (cardNumber: string) => {
    // Simulación de cambio de PIN
    toast.success(`PIN change request sent for card ${cardNumber}`);
  };

  const handleReportLost = (cardNumber: string) => {
    toast.error(`Card ${cardNumber} has been reported as lost. A new card will be sent to your address.`);
  };

  return (
    <AppLayout>
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
            {cards.map((card) => (
              <div 
                key={card.id} 
                className={`${card.color} ${card.isBlocked ? 'opacity-75' : ''} p-6 rounded-2xl text-white relative min-w-[320px] shadow-lg transform transition-all hover:scale-105 group`}
              >
                {card.isBlocked && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className="mb-8">
                  <div className="flex justify-between items-start">
                    <p className="text-xl font-semibold">Card Balance</p>
                    <CreditCard className="h-6 w-6 text-white/80" />
                  </div>
                  <p className="text-3xl font-bold mt-2">${card.balance.toLocaleString()}</p>
                </div>

                {/* Chip y tipo de tarjeta */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-10 bg-yellow-300/90 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-400">
                      <div className="w-full h-[1px] bg-black/10 absolute top-2" />
                      <div className="w-full h-[1px] bg-black/10 absolute top-4" />
                      <div className="w-full h-[1px] bg-black/10 absolute top-6" />
                      <div className="w-full h-[1px] bg-black/10 absolute top-8" />
                    </div>
                  </div>
                  <span className="text-lg font-bold">{card.type}</span>
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
                {cards.map((card) => (
                  <div key={card.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Card ending in {card.number.slice(-4)}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        className="flex flex-col items-center h-auto py-4"
                        onClick={() => handleChangePin(card.number)}
                      >
                        <Key className="h-4 w-4 mb-1" />
                        <span className="text-xs">Change PIN</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className={`flex flex-col items-center h-auto py-4 ${card.isBlocked ? 'bg-red-50 text-red-500 hover:bg-red-50' : ''}`}
                        onClick={() => handleBlockCard(card.id)}
                      >
                        <Lock className="h-4 w-4 mb-1" />
                        <span className="text-xs">{card.isBlocked ? 'Unblock' : 'Block'}</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex flex-col items-center h-auto py-4"
                        onClick={() => handleReportLost(card.number)}
                      >
                        <ShieldAlert className="h-4 w-4 mb-1" />
                        <span className="text-xs">Report Lost</span>
                      </Button>
                    </div>
                  </div>
                ))}
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
    </AppLayout>
  );
}
