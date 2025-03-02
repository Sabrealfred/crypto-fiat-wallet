
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { PaymentForm } from "./components/PaymentForm";
import { domesticInitialValues, internationalInitialValues } from "./schemas/paymentSchema";

export default function NewPaymentPage() {
  const [activeTab, setActiveTab] = useState("domestic");

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="New Payment" 
          description="Create a new outgoing payment" 
          showBack={true}
        />

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="domestic">Domestic Transfer</TabsTrigger>
            <TabsTrigger value="international">International Transfer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="domestic" className="mt-6">
            <Card>
              <PaymentForm 
                isInternational={false}
                initialValues={domesticInitialValues}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="international" className="mt-6">
            <Card>
              <PaymentForm 
                isInternational={true}
                initialValues={internationalInitialValues}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
