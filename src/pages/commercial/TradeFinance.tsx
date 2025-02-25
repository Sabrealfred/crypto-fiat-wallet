
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Globe, 
  FileText, 
  ShieldCheck, 
  Building,
  DollarSign,
  BarChart,
  FileSearch
} from "lucide-react";
import { useState } from "react";

export default function TradeFinancePage() {
  const [activeTab, setActiveTab] = useState("services");

  const tradeServices = [
    {
      title: "Letters of Credit",
      description: "Issue and manage international letters of credit",
      icon: FileText,
    },
    {
      title: "Trade Guarantees",
      description: "Secure your international trade operations",
      icon: ShieldCheck,
    },
    {
      title: "Import/Export Financing",
      description: "Access working capital for international trade",
      icon: Globe,
    },
    {
      title: "Supply Chain Finance",
      description: "Optimize your supply chain financing",
      icon: Building,
    },
  ];

  const additionalFeatures = [
    {
      title: "Trade Analytics",
      description: "Analyze your trade operations and performance",
      icon: BarChart,
    },
    {
      title: "Document Management",
      description: "Centralized trade document processing",
      icon: FileSearch,
    },
    {
      title: "Working Capital Solutions",
      description: "Optimize your working capital cycle",
      icon: DollarSign,
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Trade Finance</h1>
            <p className="text-muted-foreground">
              Comprehensive solutions for international trade operations
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tradeServices.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <service.icon className="h-5 w-5 text-primary" />
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Access Service
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Additional Features</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {additionalFeatures.map((feature, index) => (
                  <Card key={index} className="hover:bg-accent/50 transition-all cursor-pointer">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-semibold">
                            {feature.title}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Trade Transactions</h3>
                <p className="text-muted-foreground">
                  View and manage your trade finance transactions.
                </p>
                <Button className="mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Document Center</h3>
                <p className="text-muted-foreground">
                  Manage all your trade finance related documents.
                </p>
                <Button className="mt-4">
                  Access Documents
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Trade Analytics</h3>
                <p className="text-muted-foreground">
                  Analyze your trade finance operations and performance.
                </p>
                <Button className="mt-4">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
