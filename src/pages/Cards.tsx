
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { 
  CreditCard, 
  Plus, 
  Lock, 
  ShieldAlert, 
  Key,
  Wallet,
  ChevronRight,
  Banknote,
  Building,
  TrendingUp,
  Home,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

  const loans = [
    {
      id: 1,
      type: "Personal Loan",
      amount: 25000,
      remainingBalance: 18500,
      interestRate: "12.5%",
      monthlyPayment: 750,
      nextPayment: "2024-03-15"
    },
    {
      id: 2,
      type: "Auto Loan",
      amount: 35000,
      remainingBalance: 28000,
      interestRate: "8.9%",
      monthlyPayment: 650,
      nextPayment: "2024-03-20"
    }
  ];

  const investments = [
    {
      id: 1,
      type: "Investment Account",
      portfolio: "Growth",
      balance: 75000,
      returns: "+15.8%",
      allocation: {
        stocks: "70%",
        bonds: "20%",
        cash: "10%"
      }
    },
    {
      id: 2,
      type: "Retirement Account",
      portfolio: "Conservative",
      balance: 150000,
      returns: "+8.2%",
      allocation: {
        stocks: "40%",
        bonds: "50%",
        cash: "10%"
      }
    }
  ];

  const mortgages = [
    {
      id: 1,
      type: "Fixed Rate Mortgage",
      propertyAddress: "123 Main St, City",
      originalAmount: 350000,
      remainingBalance: 285000,
      interestRate: "4.5%",
      monthlyPayment: 1800,
      nextPayment: "2024-03-01"
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

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Financial Products</h1>
            <p className="text-muted-foreground">Manage your cards, loans, investments, and mortgages</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        <Tabs defaultValue="cards" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-4 bg-muted p-1">
            <TabsTrigger value="cards" className="data-[state=active]:bg-background">
              <CreditCard className="h-4 w-4 mr-2" />
              Cards
            </TabsTrigger>
            <TabsTrigger value="loans" className="data-[state=active]:bg-background">
              <Banknote className="h-4 w-4 mr-2" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-background">
              <TrendingUp className="h-4 w-4 mr-2" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="mortgages" className="data-[state=active]:bg-background">
              <Home className="h-4 w-4 mr-2" />
              Mortgages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
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
                        <ChevronRight className="h-4 w-4" />
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

              <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Available Card Products</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Premium Credit Card</p>
                        <p className="text-sm text-muted-foreground">2% cashback on all purchases</p>
                      </div>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Travel Rewards Card</p>
                        <p className="text-sm text-muted-foreground">3x miles on travel expenses</p>
                      </div>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Business Credit Card</p>
                        <p className="text-sm text-muted-foreground">5x points on business expenses</p>
                      </div>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="loans" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {loans.map((loan) => (
                <div key={loan.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{loan.type}</h3>
                      <p className="text-muted-foreground">Original Amount: ${loan.amount.toLocaleString()}</p>
                    </div>
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining Balance</p>
                      <p className="text-2xl font-bold">${loan.remainingBalance.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{loan.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">${loan.monthlyPayment}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payment Due</p>
                      <p className="font-medium">{new Date(loan.nextPayment).toLocaleDateString()}</p>
                    </div>
                    <Button className="w-full">Make Payment</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {investments.map((investment) => (
                <div key={investment.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{investment.type}</h3>
                      <p className="text-muted-foreground">{investment.portfolio} Portfolio</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="text-2xl font-bold">${investment.balance.toLocaleString()}</p>
                      <p className="text-green-600">{investment.returns} YTD</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Asset Allocation</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-muted/50 p-2 rounded">
                          <p className="text-sm text-muted-foreground">Stocks</p>
                          <p className="font-medium">{investment.allocation.stocks}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded">
                          <p className="text-sm text-muted-foreground">Bonds</p>
                          <p className="font-medium">{investment.allocation.bonds}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded">
                          <p className="text-sm text-muted-foreground">Cash</p>
                          <p className="font-medium">{investment.allocation.cash}</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mortgages" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mortgages.map((mortgage) => (
                <div key={mortgage.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{mortgage.type}</h3>
                      <p className="text-muted-foreground">{mortgage.propertyAddress}</p>
                    </div>
                    <Home className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Amount</p>
                      <p className="text-2xl font-bold">${mortgage.originalAmount.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Remaining Balance</p>
                        <p className="font-medium">${mortgage.remainingBalance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{mortgage.interestRate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">${mortgage.monthlyPayment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Payment</p>
                        <p className="font-medium">{new Date(mortgage.nextPayment).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button className="w-full">Make Payment</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
