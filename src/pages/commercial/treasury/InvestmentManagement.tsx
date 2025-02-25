
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function InvestmentManagement() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Investment Management" 
          description="Manage your investment portfolio"
        />
        {/* Content will be implemented in next phase */}
        <div className="p-4 border rounded-lg bg-muted">
          <p className="text-muted-foreground">Investment Management dashboard coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
