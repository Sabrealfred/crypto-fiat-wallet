
import { Route } from "react-router-dom";
import PersonalDashboard from "@/pages/Index";
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

export const PersonalRoutes = () => {
  return (
    <>
      <Route path="/personal" element={<PersonalDashboard />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/bills" element={<BillsPage />} />
      <Route path="/time-deposits" element={<TimeDepositsPage />} />
      <Route path="/savings" element={<SavingsPage />} />
      <Route path="/investments" element={<InvestmentsPage />} />
      <Route path="/deposits" element={<DepositsPage />} />
    </>
  );
};
