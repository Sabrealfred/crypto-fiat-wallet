
import { DashboardSection } from "../DashboardSection";
import { MetricCard } from "../MetricCard";
import { RiskAllocationCard } from "../RiskAllocationCard";
import { Activity, Settings } from "lucide-react";
import { riskAllocations } from "../../data/dashboardData";
import { calculateAllocationPercentage } from "../../utils/calculationUtils";

export function RiskAnalysisTab() {
  return (
    <>
      <DashboardSection>
        <MetricCard
          title="Risk Score"
          value="72/100"
          change="+3 points from last assessment"
          icon={Activity}
        />
        <MetricCard
          title="Compliance Rating"
          value="A+"
          change="No change from last assessment"
          icon={Settings}
        />
        <MetricCard
          title="Outstanding Issues"
          value="3"
          change="-2 issues from last month"
          icon={Activity}
        />
      </DashboardSection>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <RiskAllocationCard 
          allocations={riskAllocations}
          calculateAllocationPercentage={calculateAllocationPercentage}
        />
      </div>
    </>
  );
}
