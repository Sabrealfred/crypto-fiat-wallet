
import { Button } from "@/components/ui/button";
import { BarChart3, SendHorizontal, Download, Bell } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr,400px] gap-6">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Header y bienvenida */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">Overview</h1>
              <p className="text-muted-foreground">Good morning Leonardo 👋</p>
            </div>

            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Earning</h3>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">$21,500.00</p>
                <span className="text-sm text-green-600">↑ 12%</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm text-muted-foreground">Spending</h3>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-2">$5,392.00</p>
                <span className="text-sm text-red-500">↓ 8%</span>
              </div>
            </div>

            {/* Gráfico estadístico */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Statistic</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-accent text-white">
                    Earning
                  </Button>
                  <Button variant="outline" size="sm">
                    Spending
                  </Button>
                </div>
              </div>
              <div className="h-[200px] flex items-end justify-between">
                {/* Aquí iría el gráfico real, por ahora es solo visual */}
                <div className="w-full h-full bg-gradient-to-b from-accent/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Leonardo C</h2>
                <p className="text-sm text-muted-foreground">leonardo@gmail.com</p>
              </div>
              <div className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </div>
            </div>

            <div className="card-gradient p-6">
              <div className="mb-4">
                <p className="text-sm opacity-90 mb-1">Total balance</p>
                <h3 className="text-3xl font-bold">$81,910.00</h3>
                <p className="text-sm opacity-90">↑ 12.81%</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-white/20 hover:bg-white/30 text-white">
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Download className="mr-2 h-4 w-4" />
                  Receive
                </Button>
              </div>
            </div>

            {/* Últimas transacciones */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
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
