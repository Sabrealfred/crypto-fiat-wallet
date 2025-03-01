
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { EntityMetricsCards } from "./components/EntityMetricsCards";
import { EntityTable } from "./components/EntityTable";
import { EntityActivityCard } from "./components/EntityActivityCard";
import { QuickActions } from "./components/QuickActions";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EntityManagementDashboard() {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <CommercialHeader 
            title="Entity Management" 
            description="Manage corporate entities and their relationships"
            showBack={true}
          />
          <Button 
            onClick={() => navigate("/commercial")} 
            className="mt-4 md:mt-0"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Commercial Dashboard
          </Button>
        </div>

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
