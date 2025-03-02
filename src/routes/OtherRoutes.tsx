
import { Route } from "react-router-dom";
import BusinessDashboard from "@/pages/business/Dashboard";
import PrivateBankingDashboard from "@/pages/private/Dashboard";
import DeveloperPortal from "@/pages/developers/Dashboard";

export const OtherRoutes = () => {
  return (
    <>
      {/* Business Routes */}
      <Route path="/business">
        <Route path="dashboard" element={<BusinessDashboard />} />
      </Route>

      {/* Private Banking Routes */}
      <Route path="/private">
        <Route path="dashboard" element={<PrivateBankingDashboard />} />
      </Route>

      {/* Developer Routes */}
      <Route path="/developer">
        <Route path="dashboard" element={<DeveloperPortal />} />
      </Route>
    </>
  );
};
