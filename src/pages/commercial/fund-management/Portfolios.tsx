
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function Portfolios() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Portfolio Management" 
          description="Manage and analyze your investment portfolios"
        />
        {/* Content will be implemented in next phase */}
        <div className="p-4 border rounded-lg bg-muted">
          <p className="text-muted-foreground">Portfolio Management dashboard coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
