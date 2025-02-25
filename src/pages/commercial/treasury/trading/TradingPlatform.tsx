
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Filter
} from "lucide-react";

const marketData = [
  { time: '09:30', price: 150.25 },
  { time: '10:00', price: 151.50 },
  { time: '10:30', price: 151.75 },
  { time: '11:00', price: 152.00 },
  { time: '11:30', price: 151.25 },
  { time: '12:00', price: 152.50 }
];

const openOrders = [
  {
    id: "ORD001",
    symbol: "AAPL",
    type: "buy",
    quantity: 100,
    price: 150.25,
    status: "pending"
  },
  {
    id: "ORD002",
    symbol: "MSFT",
    type: "sell",
    quantity: 50,
    price: 285.75,
    status: "pending"
  }
];

const recentTrades = [
  {
    id: "TRD001",
    symbol: "GOOGL",
    type: "buy",
    quantity: 25,
    price: 2750.00,
    time: "10:15 AM"
  },
  {
    id: "TRD002",
    symbol: "AMZN",
    type: "sell",
    quantity: 30,
    price: 3150.25,
    time: "10:05 AM"
  }
];

export default function TradingPlatform() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Trading Platform" 
          description="Execute and monitor trading operations"
          showBack={true}
        />

        {/* Market Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">S&P 500</p>
              <h3 className="text-2xl font-bold mt-2">4,185.25</h3>
              <p className="text-sm text-green-500 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +1.2%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">NASDAQ</p>
              <h3 className="text-2xl font-bold mt-2">13,750.80</h3>
              <p className="text-sm text-green-500 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +0.8%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Available Cash</p>
              <h3 className="text-2xl font-bold mt-2">$1.2M</h3>
              <p className="text-sm text-muted-foreground mt-2">Ready to trade</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Open Orders</p>
              <h3 className="text-2xl font-bold mt-2">2</h3>
              <p className="text-sm text-yellow-500 mt-2">Pending execution</p>
            </CardContent>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Activity
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Time Range
                </Button>
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="time" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders and Trades */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Open Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {order.type.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.price}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                          {order.status.toUpperCase()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTrades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.id}</TableCell>
                      <TableCell>{trade.symbol}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trade.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>{trade.quantity}</TableCell>
                      <TableCell>${trade.price}</TableCell>
                      <TableCell>{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Market Alerts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Market Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'High volatility detected in tech sector' },
                { type: 'info', message: 'Earnings announcement for AAPL in 2 days' },
                { type: 'success', message: 'Order executed: Bought 100 MSFT @ $285.75' }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  alert.type === 'info' ? 'bg-blue-50 text-blue-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
