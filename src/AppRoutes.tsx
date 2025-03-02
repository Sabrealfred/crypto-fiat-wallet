
import { Routes, Route } from 'react-router-dom';
import PersonalDashboard from './pages/Index';
import LandingPage from './pages/Landing';
import Auth from './pages/Auth';
import Transfer from './pages/Transfer';
import Cards from './pages/Cards';
import Wallet from './pages/Wallet';
import Bills from './pages/Bills';
import Deposits from './pages/Deposits';
import History from './pages/History';
import Savings from './pages/Savings';
import TimeDeposits from './pages/TimeDeposits';
import Investments from './pages/Investments';
import Marketplace from './pages/Marketplace';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import CommercialPortal from './pages/CommercialPortal';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalDashboard />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/deposits" element={<Deposits />} />
      <Route path="/history" element={<History />} />
      <Route path="/savings" element={<Savings />} />
      <Route path="/time-deposits" element={<TimeDeposits />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/commercial/*" element={<CommercialPortal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
