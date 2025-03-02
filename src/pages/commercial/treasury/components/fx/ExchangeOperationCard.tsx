
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ExchangeOperationCardProps {
  currencies: any[];
}

export function ExchangeOperationCard({ currencies }: ExchangeOperationCardProps) {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState("");
  const { toast } = useToast();

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

  return (
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
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="flex-1">
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
  );
}
