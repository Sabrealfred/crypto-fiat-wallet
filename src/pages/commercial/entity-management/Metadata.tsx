
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MetadataForm } from "./components/MetadataForm";
import { RepresentativesTable } from "./components/RepresentativesTable";

export default function EntityMetadataPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const entityId = id ? parseInt(id) : 1; // Fallback to 1 if no ID provided
  const entityName = "Acme Global Holdings Ltd"; // In a real app, this would be fetched

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Metadata" 
          description="View and manage entity details and representatives"
          showBack={true}
        />

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

        <MetadataForm entityId={entityId} entityName={entityName} />
        
        <RepresentativesTable entityId={entityId} entityName={entityName} />
      </div>
    </AppLayout>
  );
}
