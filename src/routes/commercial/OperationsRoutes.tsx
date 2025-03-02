
import { Route } from "react-router-dom";
import OperationsDashboard from "@/pages/commercial/operations/Dashboard";
import OpAccountsPage from "@/pages/commercial/operations/Accounts";
import ServicesPage from "@/pages/commercial/operations/Services";
import OperationsSettingsPage from "@/pages/commercial/operations/Settings";
import LiquidityPage from "@/pages/commercial/operations/Liquidity";
import CashPage from "@/pages/commercial/operations/Cash";
import OperationsCompliancePage from "@/pages/commercial/operations/Compliance";
import AuditPage from "@/pages/commercial/operations/Audit";
import OperationsReportsPage from "@/pages/commercial/operations/Reports";
import OperationsAnalyticsPage from "@/pages/commercial/operations/Analytics";
import CustomReportsPage from "@/pages/commercial/operations/CustomReports";
import NotFound from "@/pages/NotFound"; // Fixed import

export const OperationsRoutes = () => {
  return (
    <Route path="operations">
      <Route path="" element={<OperationsDashboard />} />
      <Route path="integration" element={<NotFound />} />
      <Route path="real-time" element={<NotFound />} />
      <Route path="normalization" element={<NotFound />} />
      <Route path="accounts" element={<OpAccountsPage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="settings" element={<OperationsSettingsPage />} />
      <Route path="liquidity" element={<LiquidityPage />} />
      <Route path="cash" element={<CashPage />} />
      <Route path="compliance" element={<OperationsCompliancePage />} />
      <Route path="audit" element={<AuditPage />} />
      <Route path="reports" element={<OperationsReportsPage />} />
      <Route path="analytics" element={<OperationsAnalyticsPage />} />
      <Route path="custom-reports" element={<CustomReportsPage />} />
    </Route>
  );
};
