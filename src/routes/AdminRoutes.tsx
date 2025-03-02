
import { Route } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/Users";
import UserProfilesPage from "@/pages/admin/UserProfiles";
import AccountsPage from "@/pages/admin/Accounts";
import AdminTransactionsPage from "@/pages/admin/Transactions";
import ProductsPage from "@/pages/admin/Products";
import SupportPage from "@/pages/admin/Support";
import AdminSettingsPage from "@/pages/admin/Settings";

export const AdminRoutes = () => {
  return (
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
  );
};
