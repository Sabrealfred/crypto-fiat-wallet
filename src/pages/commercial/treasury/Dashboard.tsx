
import { AppLayout } from "@/components/layout/app-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

import { TreasuryHeader } from "./components/TreasuryHeader";
import { OverviewTabContent } from "./components/TabContents/OverviewTabContent";
import { MarketTabContent } from "./components/TabContents/MarketTabContent";
import { OperationsTabContent } from "./components/TabContents/OperationsTabContent";
import { ReportsTabContent } from "./components/TabContents/ReportsTabContent";

export default function TreasuryDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <TreasuryHeader />

        <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <OverviewTabContent />
          </TabsContent>

          <TabsContent value="market" className="mt-4">
            <MarketTabContent />
          </TabsContent>
          
          <TabsContent value="operations" className="mt-4">
            <OperationsTabContent />
          </TabsContent>

          <TabsContent value="reports" className="mt-4">
            <ReportsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
