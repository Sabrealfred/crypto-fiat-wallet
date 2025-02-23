
import { Button } from "@/components/ui/button";
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
  Wallet
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr,400px] gap-6">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Header y bienvenida */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Overview</h1>
                <p className="text-muted-foreground">Good morning Leonardo 👋</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Monthly Report
                </Button>
                <Button variant="outline" size="sm">
                  <Store className="h-4 w-4 mr-2" />
                  Marketplace
                </Button>
              </div>
            </div>

            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Monthly Earning</h3>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">$21,500.00</p>
                <span className="text-sm text-green-600">↑ 12% vs last month</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Monthly Spending</h3>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">$5,392.00</p>
                <span className="text-sm text-red-500">↓ 8% vs last month</span>
              </div>
            </div>

            {/* Quick Transfer Section */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Transfer</h2>
              <div className="grid grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <ArrowUpRight className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm">Send</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <ArrowDownLeft className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm">Receive</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm">Cards</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                    <ShoppingCart className="h-6 w-6 text-orange-600" />
                  </div>
                  <span className="text-sm">Shop</span>
                </Button>
              </div>
            </div>

            {/* Gráfico de pagos mensuales */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-6">
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
              <div className="h-[200px] flex items-end justify-between">
                <div className="w-full h-full bg-gradient-to-b from-accent/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Header con notificaciones */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Leonardo C</h2>
                <p className="text-sm text-muted-foreground">leonardo@gmail.com</p>
              </div>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>

            {/* Your Card Section */}
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
                <Button className="bg-white/20 hover:bg-white/30 text-white">
                  <Wallet className="mr-2 h-4 w-4" />
                  Add Money
                </Button>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <CreditCard className="mr-2 h-4 w-4" />
                  My Cards
                </Button>
              </div>
            </div>

            {/* Marketplace Activity */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Marketplace Activity</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Store className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">NFT Purchase</p>
                      <p className="text-sm text-muted-foreground">2 mins ago</p>
                    </div>
                  </div>
                  <span className="text-red-500 font-medium">-$328.00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Token Sale</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">+$1,200.00</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <SendHorizontal className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">Send to James</p>
                      <p className="text-sm text-muted-foreground">Today, 12:30 PM</p>
                    </div>
                  </div>
                  <span className="text-red-500 font-medium">-$150.00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Download className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Received from Sarah</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">+$500.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
