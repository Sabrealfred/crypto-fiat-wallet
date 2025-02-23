
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { Currency } from "@/types/transfers";

interface CurrencyExchangeProps {
  currencies?: Currency[];
  sourceCurrency: string;
  destinationCurrency: string;
  amount: string;
  onDestinationCurrencyChange: (currency: string) => void;
}

export function CurrencyExchange({
  currencies,
  sourceCurrency,
  destinationCurrency,
  amount,
  onDestinationCurrencyChange
}: CurrencyExchangeProps) {
  const calculateExchangeRate = () => {
    if (!currencies) return 1;
    const sourceRate = currencies.find(c => c.code === sourceCurrency)?.exchange_rate || 1;
    const destRate = currencies.find(c => c.code === destinationCurrency)?.exchange_rate || 1;
    return destRate / sourceRate;
  };

  const exchangeRate = calculateExchangeRate();
  const convertedAmount = Number(amount) * exchangeRate;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Currency Exchange</h3>
      <div className="space-y-4">
        <Select value={destinationCurrency} onValueChange={onDestinationCurrencyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select target currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies?.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Exchange Rate</span>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-lg font-semibold">
            1 {sourceCurrency} = {exchangeRate.toFixed(4)} {destinationCurrency}
          </div>
          {amount && (
            <div className="mt-2 text-sm text-muted-foreground">
              {Number(amount).toLocaleString()} {sourceCurrency} =
              <br />
              {convertedAmount.toLocaleString()} {destinationCurrency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
