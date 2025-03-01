
import { MetricCard } from "../MetricCard";
import { CashFlowChart } from "../CashFlowChart";
import { CurrencyAllocationChart } from "../CurrencyAllocationChart";
import { DebtMaturityCard } from "../DebtMaturityCard";
import { MyDaySection } from "../MyDaySection";
import { FavoriteWorkflowsCard } from "../FavoriteWorkflowsCard";
import { IntegrationMetadataCard } from "@/pages/commercial/entity-management/components/IntegrationMetadataCard";
import { cashFlowData, balanceAllocationData, bankIntegrations } from "../../data/marketData";
import { DollarSign, TrendingUp, Globe, CreditCard, RefreshCw, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OverviewTabContent = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Treasury Balance"
          value="$2.4M"
          change="+14.2% vs last month"
          icon={Wallet}
          trend="up"
        />
        <MetricCard
          title="Working Capital"
          value="$890K"
          change="-5.1% vs last month"
          icon={RefreshCw}
          trend="down"
        />
        <MetricCard
          title="FX Exposure"
          value="$340K"
          change="+2.3% vs last month"
          icon={Globe}
          trend="up"
        />
        <MetricCard
          title="Credit Utilization"
          value="65%"
          change="+3.5% vs last month"
          icon={CreditCard}
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <CashFlowChart data={cashFlowData} />

        <div className="grid grid-cols-1 gap-6">
          <CurrencyAllocationChart data={balanceAllocationData} />
          <DebtMaturityCard />
        </div>
      </div>

      {/* My Day - Quick Actions */}
      <MyDaySection />

      {/* Integration Status */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Connected Systems</h3>
          <button 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            onClick={() => navigate("/commercial/entity-management/integrations")}
          >
            <ExternalLink className="h-4 w-4" />
            Manage Connections
          </button>
        </div>
        <IntegrationMetadataCard integrations={bankIntegrations} />
      </div>
      
      {/* Favorite Workflows */}
      <FavoriteWorkflowsCard />
    </>
  );
};

// Import needed for the button
import { ExternalLink } from "lucide-react";
