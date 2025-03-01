
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ArrowRightLeft, RefreshCw, LineChart, TrendingUp, ChevronDown, Clock, AlertCircle, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketData } from "./data/marketData";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export default function FXOperations() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("spot");
  const [receiveAmount, setReceiveAmount] = useState("");
  const { toast } = useToast();

  const { data: currencies = [] } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .order('code');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: recentOperations = [] } = useQuery({
    queryKey: ['recentFXOperations'],
    queryFn: async () => {
      // In a real implementation, this would fetch from the database
      return [
        { id: 1, date: "2024-05-01", fromCurrency: "USD", toCurrency: "EUR", amount: 10000, rate: 0.91, status: "completed" },
        { id: 2, date: "2024-05-03", fromCurrency: "USD", toCurrency: "GBP", amount: 5000, rate: 0.78, status: "completed" },
        { id: 3, date: "2024-05-05", fromCurrency: "EUR", toCurrency: "USD", amount: 7500, rate: 1.09, status: "pending" },
      ];
    }
  });

  const handleExchange = async () => {
    setIsLoading(true);
    try {
      // Simulate the exchange process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate received amount based on exchange rate (simplified)
      const fromCurrObj = currencies.find(c => c.code === fromCurrency);
      const toCurrObj = currencies.find(c => c.code === toCurrency);
      
      if (fromCurrObj && toCurrObj) {
        const exchangeRate = toCurrObj.exchange_rate / fromCurrObj.exchange_rate;
        setReceiveAmount((parseFloat(amount) * exchangeRate).toFixed(2));
      }
      
      toast({
        title: "FX Operation Successful",
        description: `Exchanged ${amount} ${fromCurrency} to ${toCurrency}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process FX operation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setReceiveAmount("");
  };

  const getMarketData = (pair) => {
    switch(pair) {
      case "EUR/USD": return marketData.eurUsd;
      case "USD/GBP": return marketData.usdGbp;
      case "USD/CAD": return marketData.usdCad;
      default: return marketData.eurUsd;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="FX Operations" 
          description="Manage foreign exchange operations"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="spot">Spot Exchange</TabsTrigger>
            <TabsTrigger value="forward">Forward Contracts</TabsTrigger>
            <TabsTrigger value="swap">FX Swaps</TabsTrigger>
            <TabsTrigger value="options">FX Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spot" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Exchange Rate Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-600" />
                    Market Exchange Rates
                  </CardTitle>
                  <CardDescription>Live rates from global markets</CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getMarketData("EUR/USD")}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0088FE" 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">EUR/USD</span>
                        <span className="text-sm text-muted-foreground">Euro/US Dollar</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">1.0914</span>
                        <span className="text-xs text-green-600">+0.12%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">GBP/USD</span>
                        <span className="text-sm text-muted-foreground">British Pound/US Dollar</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">1.2745</span>
                        <span className="text-xs text-red-600">-0.05%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">USD/JPY</span>
                        <span className="text-sm text-muted-foreground">US Dollar/Japanese Yen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">157.28</span>
                        <span className="text-xs text-green-600">+0.31%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FX Operation Card */}
              <Card>
                <CardHeader>
                  <CardTitle>New FX Operation</CardTitle>
                  <CardDescription>Execute a foreign exchange transaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">From Currency</label>
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                          <SelectTrigger>
                            <SelectValue placeholder="From" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">To Currency</label>
                        <div className="flex space-x-2">
                          <Select value={toCurrency} onValueChange={setToCurrency} className="flex-1">
                            <SelectTrigger>
                              <SelectValue placeholder="To" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency.code} value={currency.code}>
                                  {currency.code} - {currency.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={handleSwapCurrencies}
                            className="h-10 w-10"
                          >
                            <ArrowRightLeft className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount to Exchange</label>
                      <div className="flex">
                        <div className="bg-muted rounded-l-md px-3 flex items-center text-sm font-medium">
                          {fromCurrency}
                        </div>
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    {receiveAmount && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">You'll receive:</span>
                          <span className="font-medium">{receiveAmount} {toCurrency}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Exchange rate:</span>
                          <span className="text-sm">1 {fromCurrency} = {(Number(receiveAmount) / Number(amount)).toFixed(4)} {toCurrency}</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      onClick={handleExchange}
                      disabled={isLoading || !amount}
                    >
                      {isLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                      )}
                      Execute FX Operation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="forward" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Forward Contracts</CardTitle>
                <CardDescription>Secure future exchange rates for upcoming transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  <div className="text-center max-w-md">
                    <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Lock in Future Rates</h3>
                    <p className="text-muted-foreground mb-4">
                      Hedge against currency fluctuations by securing exchange rates for future settlements.
                      Forward contracts help mitigate FX risk for upcoming payments or receivables.
                    </p>
                    <Button>Create Forward Contract</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="swap" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>FX Swaps</CardTitle>
                <CardDescription>Simultaneously buy and sell currencies with different settlement dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  <div className="text-center max-w-md">
                    <ArrowRightLeft className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Flexible Cash Flow Management</h3>
                    <p className="text-muted-foreground mb-4">
                      FX swaps allow for efficient liquidity management by exchanging currencies now and 
                      reversing the transaction at a future date at a pre-agreed rate.
                    </p>
                    <Button>Create FX Swap</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="options" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>FX Options</CardTitle>
                <CardDescription>Secure the right to exchange currencies at a specific rate without obligation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  <div className="text-center max-w-md">
                    <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Strategic Risk Management</h3>
                    <p className="text-muted-foreground mb-4">
                      FX options provide the right but not the obligation to exchange currencies at a predetermined 
                      rate, offering protection against adverse moves while preserving upside potential.
                    </p>
                    <Button>Explore FX Options</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FX Analytics */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              FX Risk Exposure
            </CardTitle>
            <CardDescription>Current currency exposure breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">EUR Exposure</span>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Medium Risk</span>
                </div>
                <div className="text-2xl font-bold mb-1">€4.5M</div>
                <div className="flex items-center text-sm">
                  <ChevronDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">12% from last month</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">GBP Exposure</span>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">High Risk</span>
                </div>
                <div className="text-2xl font-bold mb-1">£2.8M</div>
                <div className="flex items-center text-sm">
                  <ChevronDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-600">8% from last month</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">JPY Exposure</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Low Risk</span>
                </div>
                <div className="text-2xl font-bold mb-1">¥350M</div>
                <div className="flex items-center text-sm">
                  <ChevronDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">5% from last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Operations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOperations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">From</th>
                      <th className="text-left py-3 px-4 font-medium">To</th>
                      <th className="text-right py-3 px-4 font-medium">Amount</th>
                      <th className="text-right py-3 px-4 font-medium">Rate</th>
                      <th className="text-right py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOperations.map((op) => (
                      <tr key={op.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{op.date}</td>
                        <td className="py-3 px-4">{op.fromCurrency}</td>
                        <td className="py-3 px-4">{op.toCurrency}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(op.amount)}</td>
                        <td className="py-3 px-4 text-right">{op.rate}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${op.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                            }`}>
                            {op.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No recent operations to display
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end border-t p-4">
            <Button variant="outline" size="sm">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
