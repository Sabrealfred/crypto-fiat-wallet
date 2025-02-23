import { AppLayout } from "@/components/layout/app-layout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { NotificationsList } from "@/components/dashboard/NotificationsList";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, ArrowUpRight, Search, CreditCard, History } from "lucide-react";

export default function Index() {
  const quickContacts = [
    { id: 1, name: "Sarah Smith", avatar: "S", recent: true },
    { id: 2, name: "John Doe", avatar: "J", recent: true },
    { id: 3, name: "Michael Brown", avatar: "M", recent: false },
    { id: 4, name: "Emma Wilson", avatar: "E", recent: false },
  ];

  const notifications = [
    { 
      id: 1, 
      title: "Money Received", 
      description: "You received $500.00 from Sarah Smith",
      time: "2 min ago",
      amount: 500,
      type: "income"
    },
    { 
      id: 2, 
      title: "Water Bill", 
      description: "Pay before 25 July",
      time: "15 min ago",
      amount: 15,
      type: "bill"
    },
    { 
      id: 3, 
      title: "Spending Alert", 
      description: "You spent more than $5,000",
      time: "6h ago",
      amount: 5000,
      type: "spending"
    },
  ];

  const monthlyData = [
    { month: "September", earning: 18200, spending: 4800 },
    { month: "October", earning: 19500, spending: 5100 },
    { month: "November", earning: 20100, spending: 5300 },
    { month: "December", earning: 21500, spending: 5392 },
    { month: "January", earning: 22800, spending: 5450 },
    { month: "February", earning: 24100, spending: 5600 },
  ];

  const cards = [
    { 
      type: "VISA",
      name: "Leonardo Cap",
      number: "**** **** **** 1890",
      balance: 32819.00,
      expiryDate: "05/26",
      color: "bg-gradient-to-br from-violet-500 to-purple-500",
      cvv: "***"
    },
    { 
      type: "Mastercard",
      name: "Leonardo Cap",
      number: "**** **** **** 7643",
      balance: 28450.75,
      expiryDate: "09/24",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      cvv: "***"
    }
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
          <div className="space-y-6">
            <WelcomeHeader />
            <StatisticsCards 
              currentEarning={currentEarning}
              previousEarning={previousEarning}
              currentSpending={currentSpending}
              previousSpending={previousSpending}
            />
            <StatisticsChart monthlyData={monthlyData} />
            <QuickActions />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Quick Transfer</h2>
                  <div className="relative w-48">
                    <Input
                      type="text"
                      placeholder="Search contacts..."
                      className="pl-8 text-sm"
                    />
                    <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                  {quickContacts.map((contact) => (
                    <Button
                      key={contact.id}
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto min-w-[100px]"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold mb-2">
                        {contact.avatar}
                      </div>
                      <span className="text-sm whitespace-nowrap">{contact.name}</span>
                      {contact.recent && (
                        <span className="text-xs text-muted-foreground mt-1">Recent</span>
                      )}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-primary">
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Send Money
                  </Button>
                  <Button variant="outline">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Request
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Your Cards</h2>
                  <Link to="/cards">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {cards.slice(0, 1).map((card, index) => (
                    <div 
                      key={index} 
                      className={`${card.color} p-4 rounded-xl text-white relative shadow-lg`}
                    >
                      <div className="mb-4">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-white/90">Balance</p>
                          <CreditCard className="h-5 w-5 text-white/80" />
                        </div>
                        <p className="text-xl font-bold mt-1">${card.balance.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>{card.number}</span>
                        <span>{card.expiryDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <NotificationsList notifications={notifications} />
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <History className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {/* Recent activity items */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
