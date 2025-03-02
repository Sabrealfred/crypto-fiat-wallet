
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { MetricsSummary } from "./components/liquidity/MetricsSummary";
import { LiquidityHeader } from "./components/liquidity/LiquidityHeader";
import { LiquidityOverview } from "./components/liquidity/LiquidityOverview";
import { CashFlowProjections } from "./components/liquidity/CashFlowProjections";
import { StressTest } from "./components/liquidity/StressTest";
import { AdvancedMetrics } from "./components/liquidity/AdvancedMetrics";

export default function LiquidityRiskPage() {
  const [timeFrame, setTimeFrame] = useState("1y");
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  const formatRatio = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toFixed(2) + 'x';
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Risk Management"
          description="Monitor and manage liquidity positions and risk exposure"
          showBack={true}
        />

        <LiquidityHeader timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
        
        {/* Summary Cards */}
        <MetricsSummary />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow Projections</TabsTrigger>
            <TabsTrigger value="stress">Stress Testing</TabsTrigger>
            <TabsTrigger value="metrics">Advanced Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <LiquidityOverview formatRatio={formatRatio} formatCurrency={formatCurrency} />
          </TabsContent>

          <TabsContent value="cashflow">
            <CashFlowProjections formatCurrency={formatCurrency} />
          </TabsContent>

          <TabsContent value="stress">
            <StressTest formatRatio={formatRatio} />
          </TabsContent>

          <TabsContent value="metrics">
            <AdvancedMetrics formatRatio={formatRatio} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
