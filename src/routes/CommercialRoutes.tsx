
import { Route } from "react-router-dom";
import CommercialDashboard from "@/pages/commercial/Dashboard";
import RiskManagement from "@/pages/commercial/RiskManagement";
import PayrollPage from "@/pages/commercial/Payroll";
import InvoicesPage from "@/pages/commercial/Invoices";
import ExpensesPage from "@/pages/commercial/Expenses";
import TradeFinancePage from "@/pages/commercial/TradeFinance";
import PaymentProcessorPage from "@/pages/commercial/PaymentProcessor";
import CommercialLandingPage from "@/pages/CommercialLandingPage";

// Treasury routes
import TreasuryDashboard from "@/pages/commercial/treasury/Dashboard";
import CashFlowAnalysis from "@/pages/commercial/treasury/CashFlow";
import TransactionManagement from "@/pages/commercial/treasury/TransactionManagement";
import InvestmentManagement from "@/pages/commercial/treasury/InvestmentManagement";
import FXOperations from "@/pages/commercial/treasury/FXOperations";

// Analytics routes
import AnalyticsDashboard from "@/pages/commercial/analytics/Dashboard";
import MLModelsPage from "@/pages/commercial/analytics/MLModels";
import PredictiveAnalysisPage from "@/pages/commercial/analytics/PredictiveAnalysis";
import TrendVisualizationPage from "@/pages/commercial/analytics/TrendVisualization";

// Import other commercial subroutes
import { OperationsRoutes } from './commercial/OperationsRoutes';
import { FundManagementRoutes } from './commercial/FundManagementRoutes';
import { RiskManagementRoutes } from './commercial/RiskManagementRoutes';
import { PaymentProcessorRoutes } from './commercial/PaymentProcessorRoutes';
import { EntityManagementRoutes } from './commercial/EntityManagementRoutes';

export const CommercialRoutes = () => {
  return (
    <Route path="/commercial">
      <Route path="" element={<CommercialDashboard />} />
      <Route path="dashboard" element={<CommercialDashboard />} />
      <Route path="landing" element={<CommercialLandingPage />} />
      
      {/* Treasury Routes */}
      <Route path="treasury">
        <Route path="" element={<TreasuryDashboard />} />
        <Route path="cash-flow" element={<CashFlowAnalysis />} />
        <Route path="transactions" element={<TransactionManagement />} />
        <Route path="investments" element={<InvestmentManagement />} />
        <Route path="fx" element={<FXOperations />} />
      </Route>

      {/* Analytics Routes */}
      <Route path="analytics">
        <Route path="" element={<AnalyticsDashboard />} />
        <Route path="ml-models" element={<MLModelsPage />} />
        <Route path="predictive" element={<PredictiveAnalysisPage />} />
        <Route path="trends" element={<TrendVisualizationPage />} />
      </Route>

      {/* Nested route components */}
      {OperationsRoutes()}
      {RiskManagementRoutes()}
      {PaymentProcessorRoutes()}
      {FundManagementRoutes()}
      {EntityManagementRoutes()}
      
      {/* Direct commercial routes */}
      <Route path="payroll" element={<PayrollPage />} />
      <Route path="invoices" element={<InvoicesPage />} />
      <Route path="expenses" element={<ExpensesPage />} />
      <Route path="trade-finance" element={<TradeFinancePage />} />
      <Route path="cards" element={<CardsPage />} />
      <Route path="history" element={<HistoryPage />} />
    </Route>
  );
};
