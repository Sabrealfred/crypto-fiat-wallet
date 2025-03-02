
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ArrowRightLeft, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import { MarketRatesCard } from "./components/fx/MarketRatesCard";
import { ExchangeOperationCard } from "./components/fx/ExchangeOperationCard";
import { FeatureInfoTab } from "./components/fx/FeatureInfoTab";
import { RiskExposureCard } from "./components/fx/RiskExposureCard";
import { RecentOperationsTable } from "./components/fx/RecentOperationsTable";
import { marketData } from "./data/marketData";

export default function FXOperations() {
  const [activeTab, setActiveTab] = useState("spot");

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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="spot">Spot Exchange</TabsTrigger>
            <TabsTrigger value="forward">Forward Contracts</TabsTrigger>
            <TabsTrigger value="swap">FX Swaps</TabsTrigger>
            <TabsTrigger value="options">FX Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spot" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Exchange Rate Card */}
              <MarketRatesCard marketData={getMarketData("EUR/USD")} />

              {/* FX Operation Card */}
              <ExchangeOperationCard currencies={currencies} />
            </div>
          </TabsContent>
          
          <TabsContent value="forward" className="mt-4">
            <FeatureInfoTab 
              title="Forward Contracts" 
              description="Secure future exchange rates for upcoming transactions" 
              icon={Clock} 
            />
          </TabsContent>
          
          <TabsContent value="swap" className="mt-4">
            <FeatureInfoTab 
              title="FX Swaps" 
              description="Simultaneously buy and sell currencies with different settlement dates" 
              icon={ArrowRightLeft} 
            />
          </TabsContent>
          
          <TabsContent value="options" className="mt-4">
            <FeatureInfoTab 
              title="FX Options" 
              description="Secure the right to exchange currencies at a specific rate without obligation" 
              icon={TrendingUp} 
            />
          </TabsContent>
        </Tabs>

        {/* FX Analytics */}
        <RiskExposureCard />

        {/* Recent Operations */}
        <RecentOperationsTable 
          operations={recentOperations} 
          formatCurrency={formatCurrency}
        />
      </div>
    </AppLayout>
  );
}
