
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { RelationshipGraph } from "./components/RelationshipGraph";
import { RelationshipsTable } from "./components/RelationshipsTable";

export default function EntityRelationshipsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Relationships" 
          description="View and manage relationships between corporate entities"
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

        <RelationshipGraph />
        <RelationshipsTable />
      </div>
    </AppLayout>
  );
}
