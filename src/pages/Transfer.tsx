import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TransferForm } from "@/components/transfers/TransferForm";
import { CurrencyExchange } from "@/components/transfers/CurrencyExchange";
import { TransferMethods } from "@/components/transfers/TransferMethods";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building, CreditCard, Globe, ArrowLeftRight, Wallet, Users } from "lucide-react";
import type { TransferType, Currency } from "@/types/transfers";

const transferCategories = [
  {
    id: "domestic",
    name: "Domestic",
    icon: Building,
    description: "Send money within your country",
    color: "text-blue-500",
  },
  {
    id: "international",
    name: "International",
    icon: Globe,
    description: "Send money worldwide",
    color: "text-green-500",
  },
  {
    id: "cards",
    name: "Cards",
    icon: CreditCard,
    description: "Transfer between cards",
    color: "text-purple-500",
  },
  {
    id: "internal",
    name: "Internal",
    icon: ArrowLeftRight,
    description: "Between your accounts",
    color: "text-orange-500",
  },
  {
    id: "wallet",
    name: "E-Wallet",
    icon: Wallet,
    description: "To digital wallets",
    color: "text-pink-500",
  },
  {
    id: "p2p",
    name: "To Friends",
    icon: Users,
    description: "Send to contacts",
    color: "text-indigo-500",
  },
];

export default function TransferPage() {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [destinationCurrency, setDestinationCurrency] = useState("USD");
  const [selectedCategory, setSelectedCategory] = useState("domestic");

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

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ['user-accounts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      setAmount(data.amount);
      toast.success("Transfer initiated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredTransferTypes = transferTypes?.filter(type => 
    type.code.startsWith(selectedCategory)
  );

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Transfer Money</h1>
          <p className="text-muted-foreground">Choose a transfer method and send money securely</p>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {transferCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-lg text-left transition-all ${
                          selectedCategory === category.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted/50 border-transparent"
                        } border-2`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${category.color}`} />
                        <h3 className="font-medium mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue={selectedCategory} value={selectedCategory} className="w-full">
              <TabsList className="w-full justify-start mb-4">
                {transferCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {transferCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <TransferForm
                    transferTypes={filteredTransferTypes}
                    currencies={currencies}
                    onSubmit={handleSubmit}
                  />
                </TabsContent>
              ))}
            </Tabs>
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
