import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentProcessorPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Payment Processor"
          description="Process and manage commercial payments"
          showBack={true}
        />
        <Card>
          <CardHeader>
            <CardTitle>Payment Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the payment processor page.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
