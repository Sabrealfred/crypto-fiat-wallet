
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  LineChart, 
  DollarSign, 
  Search,
  BarChart3,
  RefreshCw
} from "lucide-react";

// Mock data for recent trades
const recentTrades = [
  { id: "TR001", security: "AAPL", type: "buy", quantity: 200, price: 173.45, value: 34690, date: "2024-02-27", status: "completed" },
  { id: "TR002", security: "MSFT", type: "sell", quantity: 150, price: 410.27, value: 61540.5, date: "2024-02-27", status: "completed" },
  { id: "TR003", security: "GOOGL", type: "buy", quantity: 50, price: 138.22, value: 6911, date: "2024-02-26", status: "completed" },
  { id: "TR004", security: "NVDA", type: "buy", quantity: 100, price: 820.30, value: 82030, date: "2024-02-25", status: "completed" },
  { id: "TR005", security: "AMZN", type: "sell", quantity: 75, price: 178.75, value: 13406.25, date: "2024-02-24", status: "completed" },
];

// Mock data for watchlist
const watchlistSecurities = [
  { symbol: "AAPL", name: "Apple Inc.", price: 173.45, change: 1.25, changePercent: 0.72 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 410.27, change: -2.85, changePercent: -0.69 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.22, change: 0.57, changePercent: 0.41 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 820.30, change: 15.70, changePercent: 1.95 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.75, change: -0.32, changePercent: -0.18 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 202.64, change: 3.45, changePercent: 1.73 },
];

export default function TradePage() {
  const [activeTab, setActiveTab] = useState("new-trade");
  const [securityType, setSecurityType] = useState("equity");
  const [tradeType, setTradeType] = useState("market");
  const [orderType, setOrderType] = useState("buy");
  const [isLoading, setIsLoading] = useState(false);

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Trade order submitted successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Trade Securities" 
          description="Execute and manage investment trades"
          showBack={true}
        />

        <div className="grid gap-6">
          {/* Market Overview Section */}
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Market Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">S&P 500</span>
                    <span className="text-green-500 flex items-center text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      0.72%
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-2">5,078.23</p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Nasdaq</span>
                    <span className="text-green-500 flex items-center text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      1.14%
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-2">16,091.92</p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dow Jones</span>
                    <span className="text-red-500 flex items-center text-sm">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      0.22%
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-2">39,056.39</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="new-trade">New Trade</TabsTrigger>
              <TabsTrigger value="recent-trades">Recent Trades</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="orders">Open Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="new-trade" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleTradeSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Security Type</label>
                        <Select value={securityType} onValueChange={setSecurityType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equity">Equity</SelectItem>
                            <SelectItem value="etf">ETF</SelectItem>
                            <SelectItem value="mutual-fund">Mutual Fund</SelectItem>
                            <SelectItem value="bond">Bond</SelectItem>
                            <SelectItem value="option">Option</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Order Type</label>
                        <Select value={orderType} onValueChange={setOrderType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="buy">Buy</SelectItem>
                            <SelectItem value="sell">Sell</SelectItem>
                            <SelectItem value="sell-short">Sell Short</SelectItem>
                            <SelectItem value="buy-to-cover">Buy to Cover</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Trade Type</label>
                        <Select value={tradeType} onValueChange={setTradeType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trade type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market</SelectItem>
                            <SelectItem value="limit">Limit</SelectItem>
                            <SelectItem value="stop">Stop</SelectItem>
                            <SelectItem value="stop-limit">Stop Limit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Symbol</label>
                        <div className="relative">
                          <Input placeholder="Enter symbol" />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Quantity</label>
                        <Input type="number" placeholder="Quantity" min="1" />
                      </div>
                      
                      {tradeType !== "market" && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Price</label>
                          <Input type="number" placeholder="Price" step="0.01" min="0.01" />
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Account</label>
                        <Select defaultValue="investment">
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="investment">Main Investment Account</SelectItem>
                            <SelectItem value="retirement">Retirement Account</SelectItem>
                            <SelectItem value="trading">Trading Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <Select defaultValue="day">
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Day Only</SelectItem>
                            <SelectItem value="gtc">Good Till Cancelled</SelectItem>
                            <SelectItem value="gtd">Good Till Date</SelectItem>
                            <SelectItem value="fok">Fill Or Kill</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                      <Button type="button" variant="outline">
                        Reset
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Submit Order
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Security Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Enter a symbol above to view security details.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent-trades">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Security</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTrades.map((trade) => (
                        <TableRow key={trade.id}>
                          <TableCell className="font-medium">{trade.id}</TableCell>
                          <TableCell>{trade.security}</TableCell>
                          <TableCell>
                            <Badge variant={trade.type === "buy" ? "default" : "destructive"}>
                              {trade.type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{trade.quantity.toLocaleString()}</TableCell>
                          <TableCell>${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                          <TableCell>${trade.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                          <TableCell>{trade.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {trade.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="watchlist">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Change %</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watchlistSecurities.map((security) => (
                        <TableRow key={security.symbol}>
                          <TableCell className="font-medium">{security.symbol}</TableCell>
                          <TableCell>{security.name}</TableCell>
                          <TableCell>${security.price.toFixed(2)}</TableCell>
                          <TableCell className={security.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {security.change >= 0 ? "+" : ""}{security.change.toFixed(2)}
                          </TableCell>
                          <TableCell className={security.changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                            {security.changePercent >= 0 ? "+" : ""}{security.changePercent.toFixed(2)}%
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8">
                                Buy
                              </Button>
                              <Button size="sm" variant="outline" className="h-8">
                                Sell
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="py-12">
                    <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Open Orders</h3>
                    <p className="text-muted-foreground mb-6">You don't have any open orders at this time.</p>
                    <Button onClick={() => setActiveTab("new-trade")}>Place an Order</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
