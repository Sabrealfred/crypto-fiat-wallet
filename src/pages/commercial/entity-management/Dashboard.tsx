
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { EntityMetricsCards } from "./components/EntityMetricsCards";
import { EntityTable } from "./components/EntityTable";
import { EntityActivityCard } from "./components/EntityActivityCard";
import { QuickActions } from "./components/QuickActions";

export default function EntityManagementDashboard() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Management" 
          description="Manage corporate entities and their relationships"
          showBack={true}
        />

        <EntityMetricsCards />
        
        <EntityTable />
        
        <div className="grid md:grid-cols-2 gap-6">
          <EntityActivityCard />
          <QuickActions />
        </div>
      </div>
    </AppLayout>
  );
}
