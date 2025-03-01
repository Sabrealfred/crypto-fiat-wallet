
import { MarketDataCard } from "../MarketDataCard";
import { marketData } from "../../data/marketData";
import { MarketSummaryCard } from "../MarketSummaryCard";
import { MarketAlertsCard } from "../MarketAlertsCard";

export const MarketTabContent = () => {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Currency Exchange Rates</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MarketDataCard 
            title="EUR/USD Spot" 
            code="EUR/USD" 
            data={marketData.eurUsd} 
            color="#8b5cf6" 
          />
          <MarketDataCard 
            title="USD/GBP Spot" 
            code="USD/GBP" 
            data={marketData.usdGbp} 
            color="#ec4899" 
          />
          <MarketDataCard 
            title="USD/CAD Spot" 
            code="USD/CAD" 
            data={marketData.usdCad} 
            color="#f97316" 
          />
          <MarketDataCard 
            title="USD 10 YR Credit Default Swap" 
            code="USD 10YR CDS" 
            data={marketData.creditDefault} 
            color="#22c55e" 
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <MarketSummaryCard />
        <MarketAlertsCard />
      </div>
    </>
  );
};
