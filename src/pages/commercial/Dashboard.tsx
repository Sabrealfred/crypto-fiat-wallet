
import { AppLayout } from "@/components/layout/app-layout";
import { DashboardHeader } from "./components/DashboardHeader";
import { QuickAccessSection } from "./components/QuickAccessSection";
import { EnterpriseSolutionsSection } from "./components/EnterpriseSolutionsSection";

export default function CommercialDashboard() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        <div className="grid gap-6">
          <EnterpriseSolutionsSection />
          <QuickAccessSection />
        </div>
      </div>
    </AppLayout>
  );
}
