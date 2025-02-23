
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { 
  CreditCard, 
  Plus, 
  Lock, 
  ShieldAlert, 
  Key,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function CardsPage() {
  const [cards, setCards] = useState([
    { 
      id: 1,
      type: "Credit Card",
      name: "Leonardo Cap",
      number: "**** **** **** 1890",
      balance: 32819.00,
      availableCredit: 50000.00,
      expiryDate: "05/26",
      color: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500",
      cvv: "***",
      isBlocked: false,
      rewards: {
        cashback: "2%",
        miles: 15000,
        points: 25000
      }
    },
    { 
      id: 2,
      type: "Debit Card",
      name: "Leonardo Cap",
      number: "**** **** **** 7643",
      balance: 28450.75,
      expiryDate: "09/24",
      color: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
      cvv: "***",
      isBlocked: false
    }
  ]);

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

        <div className="space-y-8">
          <div className="flex gap-6 overflow-x-auto pb-4">
            {cards.map((card) => (
              <div 
                key={card.id} 
                className={`${card.color} ${card.isBlocked ? 'opacity-75' : ''} p-6 rounded-2xl text-white relative min-w-[320px] shadow-lg transform transition-all hover:scale-105`}
              >
                {card.isBlocked && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className="mb-8">
                  <div className="flex justify-between items-start">
                    <p className="text-xl font-semibold">{card.type}</p>
                    <CreditCard className="h-6 w-6 text-white/80" />
                  </div>
                  <p className="text-3xl font-bold mt-2">${card.balance.toLocaleString()}</p>
                  {card.type === "Credit Card" && (
                    <p className="text-sm text-white/80 mt-1">
                      Available Credit: ${card.availableCredit?.toLocaleString()}
                    </p>
                  )}
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
                  {card.rewards && (
                    <div className="mt-4 bg-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4" />
                        <span className="font-medium">Rewards</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-white/70">Cashback</p>
                          <p>{card.rewards.cashback}</p>
                        </div>
                        <div>
                          <p className="text-white/70">Miles</p>
                          <p>{card.rewards.miles.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/70">Points</p>
                          <p>{card.rewards.points.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        className="flex flex-col items-center h-auto py-4"
                        onClick={() => toast.info("PIN change request sent")}
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
                        onClick={() => toast.error(`Card ${card.number} has been reported as lost`)}
                      >
                        <ShieldAlert className="h-4 w-4 mb-1" />
                        <span className="text-xs">Report Lost</span>
                      </Button>
                    </div>
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
