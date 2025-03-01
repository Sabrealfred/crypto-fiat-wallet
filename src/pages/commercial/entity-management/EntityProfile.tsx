import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EntityIntegrations } from "./components/integrations/EntityIntegrations";
import { AIInsightsPanel } from "./components/ai-insights/AIInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EntityProfile = () => {
  const { id } = useParams();
  const entityId = parseInt(id || "0");
  
  // Mock entity data
  const entity = {
    id: entityId,
    name: "Acme Corporation",
    description: "Leading provider of innovative solutions.",
    industry: "Technology",
    location: "San Francisco, CA",
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">{entity.name}</h1>
        <p className="text-muted-foreground">{entity.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Entity Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Industry:</strong> {entity.industry}</p>
            <p><strong>Location:</strong> {entity.location}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Revenue:</strong> $10M</p>
            <p><strong>Employees:</strong> 250</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and edit the entity's profile information.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Explore and manage the entity's metadata.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visualize and manage the entity's relationships with other entities.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <EntityIntegrations entityId={entityId} entityName={entity.name} />
          <AIInsightsPanel entityId={entityId} entityName={entity.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EntityProfile;
