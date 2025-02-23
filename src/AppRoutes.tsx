
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
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
import PrivateBankingDashboard from "@/pages/private/Dashboard";
import DeveloperPortal from "@/pages/developers/Dashboard";

// Páginas comerciales
const PayrollPage = () => (
  <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-2xl font-semibold mb-4">Payroll Management</h1>
    <p className="text-muted-foreground">Coming soon...</p>
  </div>
);

const InvoicesPage = () => (
  <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-2xl font-semibold mb-4">Invoice Management</h1>
    <p className="text-muted-foreground">Coming soon...</p>
  </div>
);

const ExpensesPage = () => (
  <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-2xl font-semibold mb-4">Expense Tracking</h1>
    <p className="text-muted-foreground">Coming soon...</p>
  </div>
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/business" element={<BusinessDashboard />} />
      <Route path="/commercial" element={<CommercialDashboard />} />
      <Route path="/private" element={<PrivateBankingDashboard />} />
      <Route path="/developers" element={<DeveloperPortal />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/cards" element={<CardsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/bills" element={<BillsPage />} />
      <Route path="/time-deposits" element={<TimeDepositsPage />} />
      <Route path="/savings" element={<SavingsPage />} />
      <Route path="/investments" element={<InvestmentsPage />} />
      <Route path="/deposits" element={<DepositsPage />} />

      {/* Rutas comerciales */}
      <Route path="/payroll" element={<PayrollPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/expenses" element={<ExpensesPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
