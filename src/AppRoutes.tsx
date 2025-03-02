
import { Routes, Route } from "react-router-dom";
import PersonalDashboard from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/Users";
import UserProfilesPage from "@/pages/admin/UserProfiles";
import AccountsPage from "@/pages/admin/Accounts";
import AdminTransactionsPage from "@/pages/admin/Transactions";
import ProductsPage from "@/pages/admin/Products";
import SupportPage from "@/pages/admin/Support";
import AdminSettingsPage from "@/pages/admin/Settings";
import WalletPage from "@/pages/Wallet";
import CardsPage from "@/pages/Cards";
import HistoryPage from "@/pages/History";
import MarketplacePage from "@/pages/Marketplace";
import SettingsPage from "@/pages/Settings";
import TransferPage from "@/pages/Transfer";
import BillsPage from "@/pages/Bills";
import TimeDepositsPage from "@/pages/TimeDeposits";
import SavingsPage from "@/pages/Savings";
import InvestmentsPage from "@/pages/Investments";
import DepositsPage from "@/pages/Deposits";
import BusinessDashboard from "@/pages/business/Dashboard";
import CommercialDashboard from "@/pages/commercial/Dashboard";
import RiskManagement from "@/pages/commercial/RiskManagement";
import PrivateBankingDashboard from "@/pages/private/Dashboard";
import DeveloperPortal from "@/pages/developers/Dashboard";
import TreasuryDashboard from "@/pages/commercial/treasury/Dashboard";
import CashFlowAnalysis from "@/pages/commercial/treasury/CashFlow";
import TransactionManagement from "@/pages/commercial/treasury/TransactionManagement";
import InvestmentManagement from "@/pages/commercial/treasury/InvestmentManagement";
import FXOperations from "@/pages/commercial/treasury/FXOperations";
import PayrollPage from "@/pages/commercial/Payroll";
import InvoicesPage from "@/pages/commercial/Invoices";
import ExpensesPage from "@/pages/commercial/Expenses";
import TradeFinancePage from "@/pages/commercial/TradeFinance";
import PaymentProcessorPage from "@/pages/commercial/PaymentProcessor";
import FundManagement from "@/pages/commercial/fund-management/Dashboard";
import Portfolios from "@/pages/commercial/fund-management/Portfolios";
import AIPortfolios from "@/pages/commercial/fund-management/AIPortfolios";
import OperationsDashboard from "@/pages/commercial/operations/Dashboard";
import CommercialPortal from "@/pages/CommercialPortal";
import CommercialLandingPage from "./pages/CommercialLandingPage";

// Analytics pages
import AnalyticsDashboard from "@/pages/commercial/analytics/Dashboard";
import MLModelsPage from "@/pages/commercial/analytics/MLModels";
import PredictiveAnalysisPage from "@/pages/commercial/analytics/PredictiveAnalysis";
import TrendVisualizationPage from "@/pages/commercial/analytics/TrendVisualization";

// Fund Management pages
import FundReportsPage from "@/pages/commercial/fund-management/Reports";
import TradePage from "@/pages/commercial/fund-management/Trade";

// Operations pages
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

// Risk Management pages
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

// AI Insights pages
import AIInsightsDashboardPage from "@/pages/commercial/fund-management/ai-insights/Dashboard";
import NLPPage from "@/pages/commercial/fund-management/ai-insights/NLP";
import CashInsightsPage from "@/pages/commercial/fund-management/ai-insights/Cash";
import AIRecommendationsPage from "@/pages/commercial/fund-management/ai-insights/Recommendations";

// Payment Processor pages
import RealtimePaymentsPage from "@/pages/commercial/payment-processor/Realtime";
import ACHProcessingPage from "@/pages/commercial/payment-processor/ACH";
import CrossBorderPage from "@/pages/commercial/payment-processor/CrossBorder";
import NewPaymentPage from "@/pages/commercial/payment-processor/NewPayment";
import BatchPaymentsPage from "@/pages/commercial/payment-processor/BatchPayments";
import PaymentStatusPage from "@/pages/commercial/payment-processor/Status";
import ReconciliationPage from "@/pages/commercial/payment-processor/Reconciliation";

// Entity Management pages
import EntityManagementDashboardPage from "@/pages/commercial/entity-management/Dashboard";
import SubsidiariesPage from "@/pages/commercial/entity-management/Subsidiaries";
import MetadataPage from "@/pages/commercial/entity-management/Metadata";
import RelationshipsPage from "@/pages/commercial/entity-management/Relationships";

// Import the landing page
import LandingPage from "@/pages/landing/HomePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      {/* Landing Page Route */}
      <Route path="/landing" element={<LandingPage />} />
      
      {/* Portal Entry Page */}
      <Route path="/" element={<CommercialPortal />} />
      
      <Route element={<ProtectedRoute />}>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="user-profiles" element={<UserProfilesPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Regular User Routes */}
        <Route path="/personal" element={<PersonalDashboard />} />
        
        {/* Business Routes */}
        <Route path="/business">
          <Route path="dashboard" element={<BusinessDashboard />} />
        </Route>

        {/* Commercial Banking Routes */}
        <Route path="/commercial">
          <Route path="" element={<CommercialDashboard />} />
          <Route path="dashboard" element={<CommercialDashboard />} />
          
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

          {/* Operations Routes */}
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
          
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="trade-finance" element={<TradeFinancePage />} />
          
          {/* Risk Management Routes */}
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

          {/* Payment Processor Routes */}
          <Route path="payment-processor">
            <Route path="" element={<PaymentProcessorPage />} />
            <Route path="real-time" element={<RealtimePaymentsPage />} />
            <Route path="ach" element={<ACHProcessingPage />} />
            <Route path="cross-border" element={<CrossBorderPage />} />
            <Route path="new-payment" element={<NewPaymentPage />} />
            <Route path="batch" element={<BatchPaymentsPage />} />
            <Route path="status" element={<PaymentStatusPage />} />
            <Route path="reconciliation" element={<ReconciliationPage />} />
          </Route>

          {/* Fund Management Routes */}
          <Route path="fund-management">
            <Route path="" element={<FundManagement />} />
            <Route path="portfolios" element={<Portfolios />} />
            <Route path="portfolios/ai" element={<AIPortfolios />} />
            <Route path="reports" element={<FundReportsPage />} />
            <Route path="trade" element={<TradePage />} />
            
            {/* AI Insights */}
            <Route path="ai-insights">
              <Route path="" element={<AIInsightsDashboardPage />} />
              <Route path="nlp" element={<NLPPage />} />
              <Route path="cash" element={<CashInsightsPage />} />
              <Route path="recommendations" element={<AIRecommendationsPage />} />
            </Route>
          </Route>

          {/* Entity Management Routes */}
          <Route path="entity-management">
            <Route path="" element={<EntityManagementDashboardPage />} />
            <Route path="subsidiaries" element={<SubsidiariesPage />} />
            <Route path="metadata" element={<MetadataPage />} />
            <Route path="relationships" element={<RelationshipsPage />} />
          </Route>

          {/* Additional Commercial Routes */}
          <Route path="cards" element={<CardsPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        {/* Private Banking Routes */}
        <Route path="/private">
          <Route path="dashboard" element={<PrivateBankingDashboard />} />
        </Route>

        {/* Developer Routes */}
        <Route path="/developer">
          <Route path="dashboard" element={<DeveloperPortal />} />
        </Route>

        {/* Shared Routes */}
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/time-deposits" element={<TimeDepositsPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/deposits" element={<DepositsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
