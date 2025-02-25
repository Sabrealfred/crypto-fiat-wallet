
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function FXOperations() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="FX Operations" 
          description="Manage foreign exchange operations"
        />
        {/* Content will be implemented in next phase */}
        <div className="p-4 border rounded-lg bg-muted">
          <p className="text-muted-foreground">FX Operations dashboard coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
