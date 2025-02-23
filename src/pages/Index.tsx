import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { Link } from "react-router-dom";
import {
  BarChart3,
  SendHorizontal,
  Download,
  Bell,
  CreditCard,
  Calendar,
  ShoppingCart,
  History,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Store,
  Wallet2,
} from "lucide-react";

export default function Index() {
  const monthlyData = [
    { month: "September", earning: 18200, spending: 4800 },
    { month: "October", earning: 19500, spending: 5100 },
    { month: "November", earning: 20100, spending: 5300 },
    { month: "December", earning: 21500, spending: 5392 },
    { month: "January", earning: 22800, spending: 5450 },
    { month: "February", earning: 24100, spending: 5600 },
  ];

  const marketplaceActivity = [
    { type: "NFT Purchase", time: "2 mins ago", amount: -328, icon: Store },
    { type: "Token Sale", time: "25 mins ago", amount: 1200, icon: DollarSign },
    { type: "NFT Sale", time: "2 hours ago", amount: 2500, icon: Store },
    { type: "Token Purchase", time: "5 hours ago", amount: -850, icon: DollarSign },
  ];

  const recentTransactions = [
    { type: "Send to James", time: "Today, 12:30 PM", amount: -150, icon: SendHorizontal },
    { type: "Received from Sarah", time: "Today, 10:15 AM", amount: 500, icon: Download },
    { type: "Send to Michael", time: "Yesterday, 3:45 PM", amount: -75, icon: SendHorizontal },
    { type: "Received from John", time: "Yesterday, 1:30 PM", amount: 300, icon: Download },
  ];

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

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const earningChange = ((currentEarning - previousEarning) / previousEarning) * 100;

  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;
  const spendingChange = ((currentSpending - previousSpending) / previousSpending) * 100;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr,400px] gap-6">
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
                <Link to="/marketplace">
                  <Button variant="outline" size="sm">
                    <Store className="h-4 w-4 mr-2" />
                    Marketplace
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Monthly Earning</h3>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">${currentEarning.toLocaleString()}</p>
                <span className={`text-sm ${earningChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {earningChange >= 0 ? '↑' : '↓'} {Math.abs(earningChange).toFixed(1)}% vs last month
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Monthly Spending</h3>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">${currentSpending.toLocaleString()}</p>
                <span className={`text-sm ${spendingChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {spendingChange >= 0 ? '↑' : '↓'} {Math.abs(spendingChange).toFixed(1)}% vs last month
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Transfer</h2>
              <div className="grid grid-cols-4 gap-4">
                <Link to="/wallet">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto w-full">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <ArrowUpRight className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm">Send</span>
                  </Button>
                </Link>
                <Link to="/wallet">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto w-full">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <ArrowDownLeft className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-sm">Receive</span>
                  </Button>
                </Link>
                <Link to="/cards">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto w-full">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm">Cards</span>
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto w-full">
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                      <ShoppingCart className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-sm">Shop</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Monthly Payments</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-accent text-white">
                    Income
                  </Button>
                  <Button variant="outline" size="sm">
                    Expenses
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

            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Cards</h2>
                <Link to="/cards">
                  <Button variant="outline" size="sm">Add Card +</Button>
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4">
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
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Your Card Section</h2>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Your Balance</p>
                  <h3 className="text-3xl font-bold">$81,910.00</h3>
                  <p className="text-sm opacity-90">↑ 12.81% this month</p>
                </div>
                <CreditCard className="h-6 w-6 text-white/80" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/wallet">
                  <Button className="bg-white/20 hover:bg-white/30 text-white">
                    <Wallet2 className="mr-2 h-4 w-4" />
                    Add Money
                  </Button>
                </Link>
                <Link to="/cards">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                    <CreditCard className="mr-2 h-4 w-4" />
                    My Cards
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Marketplace Activity</h2>
                <Link to="/marketplace">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {marketplaceActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.amount > 0 ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        <activity.icon className={`h-5 w-5 ${
                          activity.amount > 0 ? 'text-green-500' : 'text-purple-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <span className={`font-medium ${
                      activity.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {activity.amount > 0 ? '+' : ''}{activity.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        <transaction.icon className={`h-5 w-5 ${
                          transaction.amount > 0 ? 'text-green-500' : 'text-orange-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                    <span className={`font-medium ${
                      transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="card-gradient p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm opacity-90 mb-1">Your Balance</p>
                  <h3 className="text-3xl font-bold">$81,910.00</h3>
                  <p className="text-sm opacity-90">↑ 12.81% this month</p>
                </div>
                <CreditCard className="h-6 w-6 text-white/80" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/wallet">
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white">
                    <Wallet2 className="mr-2 h-4 w-4" />
                    Add Money
                  </Button>
                </Link>
                <Link to="/cards">
                  <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                    <CreditCard className="mr-2 h-4 w-4" />
                    My Cards
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
