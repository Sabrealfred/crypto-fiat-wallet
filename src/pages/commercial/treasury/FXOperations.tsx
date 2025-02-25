
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function FXOperations() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleExchange = async () => {
    setIsLoading(true);
    try {
      // Simular el proceso de cambio por ahora
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="FX Operations" 
          description="Manage foreign exchange operations"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Exchange Rate Card */}
          <Card>
            <CardHeader>
              <CardTitle>Current Exchange Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currencies.slice(0, 5).map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center">
                    <span>{currency.code}</span>
                    <span className="font-mono">{currency.exchange_rate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FX Operation Card */}
          <Card>
            <CardHeader>
              <CardTitle>New FX Operation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSwapCurrencies}
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>

                  <Select value={toCurrency} onValueChange={setToCurrency}>
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
                </div>

                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

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

        {/* Recent Operations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              No recent operations to display
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
