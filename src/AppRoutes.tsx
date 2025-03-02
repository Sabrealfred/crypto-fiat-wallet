import { Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import CommercialPortal from "@/pages/CommercialPortal";

// Import route components 
import { AdminRoutes } from "@/routes/AdminRoutes";
import { CommercialRoutes } from "@/routes/CommercialRoutes";
import { PersonalRoutes } from "@/routes/PersonalRoutes";
import { OtherRoutes } from "@/routes/OtherRoutes";

// Import the landing pages
import LandingPage from "@/pages/landing/HomePage";
import CardsPage from "@/pages/Cards";
import HistoryPage from "@/pages/History";

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
        {AdminRoutes()}

        {/* Personal User Routes */}
        {PersonalRoutes()}
        
        {/* Commercial Banking Routes */}
        {CommercialRoutes()}

        {/* Other Routes - Business, Private Banking, Developer */}
        {OtherRoutes()}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
