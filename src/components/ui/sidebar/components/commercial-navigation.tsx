
import { TreasurySection } from "./commercial/TreasurySection";
import { AnalyticsSection } from "./commercial/AnalyticsSection";
import { OperationsSection } from "./commercial/OperationsSection";
import { InvestmentSection } from "./commercial/InvestmentSection";
import { RiskManagementSection } from "./commercial/RiskManagementSection";
import { PaymentSection } from "./commercial/PaymentSection";
import { EntityManagementSection } from "./commercial/EntityManagementSection";
import { AIInsightsSection } from "./commercial/AIInsightsSection";
import { SharedServicesSection } from "./commercial/SharedServicesSection";

interface CommercialNavigationProps {
  isCollapsed: boolean;
}

export function CommercialNavigation({ isCollapsed }: CommercialNavigationProps) {
  return (
    <nav className="space-y-1">
      {/* Treasury & Cash Management Section */}
      <TreasurySection isCollapsed={isCollapsed} />
      
      {/* Analysis & Forecasting */}
      <AnalyticsSection isCollapsed={isCollapsed} />
      
      {/* Data Automation & Integration */}
      <OperationsSection isCollapsed={isCollapsed} />

      {/* Investment Management Section */}
      <InvestmentSection isCollapsed={isCollapsed} />

      {/* Risk Management */}
      <RiskManagementSection isCollapsed={isCollapsed} />

      {/* Payment Processing */}
      <PaymentSection isCollapsed={isCollapsed} />

      {/* Entity Management */}
      <EntityManagementSection isCollapsed={isCollapsed} />

      {/* AI Insights */}
      <AIInsightsSection isCollapsed={isCollapsed} />

      {/* Shared Services */}
      <SharedServicesSection isCollapsed={isCollapsed} />
    </nav>
  );
}
