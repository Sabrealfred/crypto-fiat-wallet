
import { Route } from "react-router-dom";
import FundManagement from "@/pages/commercial/fund-management/Dashboard";
import Portfolios from "@/pages/commercial/fund-management/Portfolios";
import AIPortfolios from "@/pages/commercial/fund-management/AIPortfolios";
import FundReportsPage from "@/pages/commercial/fund-management/Reports";
import TradePage from "@/pages/commercial/fund-management/Trade";
import AIInsightsDashboardPage from "@/pages/commercial/fund-management/ai-insights/Dashboard";
import NLPPage from "@/pages/commercial/fund-management/ai-insights/NLP";
import CashInsightsPage from "@/pages/commercial/fund-management/ai-insights/Cash";
import AIRecommendationsPage from "@/pages/commercial/fund-management/ai-insights/Recommendations";

export const FundManagementRoutes = () => {
  return (
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
  );
};
