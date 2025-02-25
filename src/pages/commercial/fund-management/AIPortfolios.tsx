
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function AIPortfolios() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="AI Portfolio Management" 
          description="AI-driven portfolio analysis and rebalancing"
        />
        {/* Content will be implemented in next phase */}
        <div className="p-4 border rounded-lg bg-muted">
          <p className="text-muted-foreground">AI Portfolio Management dashboard coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
