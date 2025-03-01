
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { MetadataForm } from "./components/MetadataForm";
import { RelationshipGraph } from "./components/RelationshipGraph";
import { RelationshipsTable } from "./components/RelationshipsTable";
import { EntityIntegrations } from "./components/EntityIntegrations";
import { AIInsightsPanel } from "./components/AIInsightsPanel";
import {
  Building2,
  ArrowLeft,
  FileText,
  Network,
  RefreshCw,
  Download,
  Database,
  PieChart,
  Share2,
  Zap,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

export default function EntityProfilePage() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // In a real application, this would come from an API call
  const entityData = {
    id: Number(entityId) || 1,
    name: "Acme Global Holdings Ltd.",
    type: "Corporation",
    status: "Active",
    country: "United Kingdom",
    createdAt: "2020-05-15",
    riskScore: "Low",
    lastUpdated: "2023-12-10",
    hasIntegrations: true,
    hasAIInsights: true
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Entity data refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="pl-0" 
            onClick={() => navigate("/commercial/entity-management")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Entity Management
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{entityData.name}</h1>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {entityData.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {entityData.type} • {entityData.country} • ID: {entityData.id}
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Entity Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <h3 className="text-lg font-medium mt-1">{entityData.type}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <h3 className="text-lg font-medium mt-1">{entityData.createdAt}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <h3 className="text-lg font-medium mt-1">{entityData.riskScore}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <h3 className="text-lg font-medium mt-1">{entityData.lastUpdated}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="metadata" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="metadata" className="gap-2">
              <Database className="h-4 w-4" /> Metadata
            </TabsTrigger>
            <TabsTrigger value="relationships" className="gap-2">
              <Network className="h-4 w-4" /> Relationships
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Share2 className="h-4 w-4" /> Integrations
            </TabsTrigger>
            <TabsTrigger value="aiInsights" className="gap-2">
              <Zap className="h-4 w-4" /> AI Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metadata">
            <MetadataForm entityId={entityData.id} entityName={entityData.name} />
          </TabsContent>
          
          <TabsContent value="relationships">
            <Card className="mb-6 border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Entity Relationships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <RelationshipGraph />
                </div>
                <RelationshipsTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <EntityIntegrations entityId={entityData.id} entityName={entityData.name} />
          </TabsContent>
          
          <TabsContent value="aiInsights">
            <AIInsightsPanel entityId={entityData.id} entityName={entityData.name} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
