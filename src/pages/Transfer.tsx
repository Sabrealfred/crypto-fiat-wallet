import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TransferForm } from "@/components/transfers/TransferForm";
import { CurrencyExchange } from "@/components/transfers/CurrencyExchange";
import { TransferMethods } from "@/components/transfers/TransferMethods";
import type { TransferType, Currency } from "@/types/transfers";

export default function TransferPage() {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [destinationCurrency, setDestinationCurrency] = useState("USD");

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
  
  const handleSubmit = async (data: any) => {
    try {
      setAmount(data.amount);
      // Aquí iría la lógica de envío de la transferencia
      toast.success("Transfer initiated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Transfer Money</h1>
          <p className="text-muted-foreground">Send money locally or internationally</p>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <TransferForm
              transferTypes={transferTypes}
              currencies={currencies}
              onSubmit={handleSubmit}
            />
          </div>

          <div className="space-y-6">
            <CurrencyExchange
              currencies={currencies}
              sourceCurrency={sourceCurrency}
              destinationCurrency={destinationCurrency}
              amount={amount}
              onDestinationCurrencyChange={setDestinationCurrency}
            />
            <TransferMethods />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
