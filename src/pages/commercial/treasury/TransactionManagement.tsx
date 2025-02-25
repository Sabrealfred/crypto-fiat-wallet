
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function TransactionManagement() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Transaction Management" 
          description="Manage and track your treasury transactions"
        />
        {/* Content will be implemented in next phase */}
        <div className="p-4 border rounded-lg bg-muted">
          <p className="text-muted-foreground">Transaction Management dashboard coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
