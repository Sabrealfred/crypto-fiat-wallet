
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function CashFlowAnalysis() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Cash Flow Analysis" 
          description="Analyze and manage your cash flow operations"
        />
        {/* Content will be implemented in next phase */}
        <div className="p-4 border rounded-lg bg-muted">
          <p className="text-muted-foreground">Cash Flow Analysis dashboard coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
