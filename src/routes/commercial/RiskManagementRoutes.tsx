
import { Route } from "react-router-dom";
import RiskManagement from "@/pages/commercial/RiskManagement";
import MarketRiskPage from "@/pages/commercial/risk-management/Market";
import OperationalRiskPage from "@/pages/commercial/risk-management/Operational";
import CompliancePage from "@/pages/commercial/risk-management/Compliance";
import RiskReportsPage from "@/pages/commercial/risk-management/Reports";
import RiskSettingsPage from "@/pages/commercial/risk-management/Settings";
import LiquidityRiskPage from "@/pages/commercial/risk-management/Liquidity";
import CounterpartyRiskPage from "@/pages/commercial/risk-management/Counterparty";
import CountryRiskPage from "@/pages/commercial/risk-management/Country";
import LegalRiskPage from "@/pages/commercial/risk-management/Legal";
import ModelRiskPage from "@/pages/commercial/risk-management/Model";
import TradingRiskPage from "@/pages/commercial/risk-management/Trading";

export const RiskManagementRoutes = () => {
  return (
    <Route path="risk-management">
      <Route path="" element={<RiskManagement />} />
      <Route path="market" element={<MarketRiskPage />} />
      <Route path="operational" element={<OperationalRiskPage />} />
      <Route path="compliance" element={<CompliancePage />} />
      <Route path="reports" element={<RiskReportsPage />} />
      <Route path="settings" element={<RiskSettingsPage />} />
      <Route path="liquidity" element={<LiquidityRiskPage />} />
      <Route path="counterparty" element={<CounterpartyRiskPage />} />
      <Route path="country" element={<CountryRiskPage />} />
      <Route path="legal" element={<LegalRiskPage />} />
      <Route path="model" element={<ModelRiskPage />} />
      <Route path="trading" element={<TradingRiskPage />} />
      <Route path="liquidity-risk" element={<LiquidityRiskPage />} />
    </Route>
  );
};
