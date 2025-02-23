import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  SendHorizontal,
  Bell,
  CreditCard,
  Calendar,
  Store,
  History,
  PieChart,
  ArrowUpRight,
  Wallet2,
  ChevronRight,
  Search,
  CircleUser,
  Timer,
  Coins,
  LightbulbIcon,
} from "lucide-react";

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
  const earningChange = ((currentEarning - previousEarning) / previousEarning) * 100;

  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;
  const spendingChange = ((currentSpending - previousSpending) / previousSpending) * 100;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Overview</h1>
                <p className="text-muted-foreground">Good morning Leonardo 👋</p>
              </div>
              <div className="flex gap-2">
                <Link to="/history">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Monthly Report
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl glass-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Monthly Earning</h3>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">${currentEarning.toLocaleString()}</p>
                <span className={`text-sm ${earningChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {earningChange >= 0 ? '↑' : '↓'} {Math.abs(earningChange).toFixed(1)}% vs last month
                </span>
              </div>
              <div className="p-6 rounded-2xl glass-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Monthly Spending</h3>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">${currentSpending.toLocaleString()}</p>
                <span className={`text-sm ${spendingChange >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {spendingChange >= 0 ? '↑' : '↓'} {Math.abs(spendingChange).toFixed(1)}% vs last month
                </span>
              </div>
            </div>

            <div className="relative glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Statistics</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-accent text-white">
                    Weekly
                  </Button>
                  <Button variant="outline" size="sm">
                    Monthly
                  </Button>
                  <Button variant="outline" size="sm">
                    Yearly
                  </Button>
                </div>
              </div>
              <div className="h-[200px] flex items-end justify-between gap-2">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center">
                    <div className="flex-1 w-full relative">
                      <div 
                        className="absolute bottom-0 w-full bg-accent/20 rounded-t-lg transition-all duration-300"
                        style={{ height: `${(data.earning / 25000) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute bottom-0 w-full bg-red-400/20 rounded-t-lg transition-all duration-300"
                        style={{ height: `${(data.spending / 25000) * 100}%`, width: '50%', left: '25%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {data.month.slice(0, 3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/bills" className="glass-card p-6 hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <LightbulbIcon className="h-5 w-5 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Pay Bills</h3>
                <p className="text-sm text-muted-foreground">Manage utility and service payments</p>
              </Link>

              <Link to="/time-deposits" className="glass-card p-6 hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Timer className="h-5 w-5 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Time Deposits</h3>
                <p className="text-sm text-muted-foreground">Earn interest with fixed terms</p>
              </Link>

              <Link to="/savings" className="glass-card p-6 hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Savings Plans</h3>
                <p className="text-sm text-muted-foreground">Set up automatic savings</p>
              </Link>
            </div>

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
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Mark all as read
                </Button>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-4 items-start p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0
                      ${notification.type === 'income' ? 'bg-green-100 text-green-600' : 
                        notification.type === 'bill' ? 'bg-amber-100 text-amber-600' : 
                        'bg-red-100 text-red-600'}`}
                    >
                      {notification.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> :
                       notification.type === 'bill' ? <Calendar className="h-5 w-5" /> :
                       <BarChart3 className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium truncate">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{notification.description}</p>
                      {notification.type === 'bill' && (
                        <Button size="sm" className="mt-2 h-8 text-xs">
                          Pay Now ${notification.amount}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
