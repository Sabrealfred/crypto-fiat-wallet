
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  SendHorizontal,
  Building,
  CreditCard,
  Globe,
  ArrowRightLeft,
  RefreshCw,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type TransferType = {
  id: string;
  name: string;
  code: string;
  description: string;
  requirements: Record<string, string>;
};

type Currency = {
  code: string;
  name: string;
  symbol: string;
  exchange_rate: number;
};

export default function TransferPage() {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [destinationCurrency, setDestinationCurrency] = useState("USD");
  const [selectedTransferType, setSelectedTransferType] = useState<string>("");
  const [transferDetails, setTransferDetails] = useState<Record<string, string>>({});

  // Fetch transfer types
  const { data: transferTypes } = useQuery({
    queryKey: ["transferTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transfer_types")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      return data as TransferType[];
    }
  });

  // Fetch currencies
  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("currencies")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      return data as Currency[];
    }
  });

  // Get current transfer type requirements
  const currentTransferType = transferTypes?.find(t => t.id === selectedTransferType);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aquí iría la lógica de envío de la transferencia
      toast.success("Transfer initiated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const calculateExchangeRate = () => {
    if (!currencies) return 1;
    const sourceRate = currencies.find(c => c.code === sourceCurrency)?.exchange_rate || 1;
    const destRate = currencies.find(c => c.code === destinationCurrency)?.exchange_rate || 1;
    return destRate / sourceRate;
  };

  const exchangeRate = calculateExchangeRate();
  const convertedAmount = Number(amount) * exchangeRate;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Transfer Money</h1>
          <p className="text-muted-foreground">Send money locally or internationally</p>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Transfer Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Transfer Type</label>
                    <Select value={selectedTransferType} onValueChange={setSelectedTransferType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transfer type" />
                      </SelectTrigger>
                      <SelectContent>
                        {transferTypes?.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-3 text-muted-foreground">
                          {currencies?.find(c => c.code === sourceCurrency)?.symbol}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Currency</label>
                      <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies?.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {currentTransferType?.requirements && (
                    <div className="space-y-4">
                      {Object.entries(currentTransferType.requirements).map(([field, required]) => (
                        <div key={field}>
                          <label className="text-sm font-medium mb-2 block capitalize">
                            {field.replace(/_/g, ' ')}
                            {required === 'required' && <span className="text-red-500">*</span>}
                          </label>
                          <Input
                            value={transferDetails[field] || ''}
                            onChange={(e) => setTransferDetails(prev => ({
                              ...prev,
                              [field]: e.target.value
                            }))}
                            required={required === 'required'}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    <SendHorizontal className="w-4 h-4 mr-2" />
                    Send Transfer
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Currency Exchange</h3>
              <div className="space-y-4">
                <Select value={destinationCurrency} onValueChange={setDestinationCurrency}>
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

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Transfer Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Building className="w-5 h-5 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Bank Transfer (SWIFT)</p>
                    <p className="text-muted-foreground">International transfers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Card to Card</p>
                    <p className="text-muted-foreground">Instant transfer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">SPEI (Mexico)</p>
                    <p className="text-muted-foreground">Local Mexican transfers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
