import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function TradeFinancePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Trade Finance"
          description="Manage international trade transactions and financing"
          showBack={true}
        />
      </div>
    </AppLayout>
  );
}
