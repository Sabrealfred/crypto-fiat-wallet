
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

import { ParentEntityList } from "./components/ParentEntityList";
import { SubsidiaryList } from "./components/SubsidiaryList";
import { RecentChanges } from "./components/RecentChanges";
import { QuickActions } from "./components/QuickActions";

// Sample parent entities
const parentEntities = [
  { 
    id: 1, 
    name: "Acme Holdings Ltd", 
    jurisdiction: "United Kingdom", 
    registrationNumber: "UK29384756"
  },
  { 
    id: 2, 
    name: "Acme Financial Services GmbH", 
    jurisdiction: "Germany", 
    registrationNumber: "DE839275612"
  },
  { 
    id: 4, 
    name: "Acme Asia Pacific Pte Ltd", 
    jurisdiction: "Singapore", 
    registrationNumber: "SG92837465"
  },
];

// Sample subsidiaries data
const allSubsidiaries = [
  { 
    id: 101, 
    parentId: 1, 
    name: "Acme Financial Services GmbH", 
    jurisdiction: "Germany", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 102, 
    parentId: 1, 
    name: "Acme Tech Solutions Inc", 
    jurisdiction: "United States", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 103, 
    parentId: 1, 
    name: "Acme Asia Pacific Pte Ltd", 
    jurisdiction: "Singapore", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 104, 
    parentId: 1, 
    name: "Acme Investment Vehicles SA", 
    jurisdiction: "Switzerland", 
    ownershipPercentage: 75, 
    status: "Inactive",
    relationship: "Direct",
  },
  { 
    id: 105, 
    parentId: 1, 
    name: "Acme Manufacturing Ltd", 
    jurisdiction: "United Kingdom", 
    ownershipPercentage: 51, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 201, 
    parentId: 2, 
    name: "Acme Financial Services Austria GmbH", 
    jurisdiction: "Austria", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 202, 
    parentId: 2, 
    name: "Acme Financial Services France SARL", 
    jurisdiction: "France", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 401, 
    parentId: 4, 
    name: "Acme APAC Japan KK", 
    jurisdiction: "Japan", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 402, 
    parentId: 4, 
    name: "Acme APAC Australia Pty Ltd", 
    jurisdiction: "Australia", 
    ownershipPercentage: 100, 
    status: "Active",
    relationship: "Direct",
  },
  { 
    id: 403, 
    parentId: 4, 
    name: "Acme APAC China Ltd", 
    jurisdiction: "China", 
    ownershipPercentage: 70, 
    status: "Active",
    relationship: "Direct",
  },
];

// Recent relationship changes
const relationshipChanges = [
  { id: 1, date: "2024-02-15", entity: "Acme Financial Services GmbH", change: "Ownership increased to 100%", previousValue: "85%" },
  { id: 2, date: "2024-01-20", entity: "Acme Manufacturing Ltd", change: "Added as subsidiary", previousValue: "N/A" },
  { id: 3, date: "2023-12-05", entity: "Acme Investment Vehicles SA", change: "Status changed to Inactive", previousValue: "Active" },
  { id: 4, date: "2023-11-12", entity: "Acme Asia Pacific Pte Ltd", change: "Relationship type changed to Direct", previousValue: "Indirect" },
];

export default function SubsidiariesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentIdParam = searchParams.get('id');
  const [selectedParentId, setSelectedParentId] = useState<number | null>(parentIdParam ? parseInt(parentIdParam) : null);
  const [searchTerm, setSearchTerm] = useState("");
  const [subsidiaries, setSubsidiaries] = useState<any[]>([]);
  
  // Set the selected parent entity when the component loads or when the URL parameter changes
  useEffect(() => {
    if (parentIdParam) {
      setSelectedParentId(parseInt(parentIdParam));
    }
  }, [parentIdParam]);

  // Filter subsidiaries based on selected parent
  useEffect(() => {
    if (selectedParentId) {
      setSubsidiaries(allSubsidiaries.filter(sub => sub.parentId === selectedParentId));
    } else {
      setSubsidiaries([]);
    }
  }, [selectedParentId]);

  // Get the selected parent entity
  const selectedParent = parentEntities.find(p => p.id === selectedParentId);

  // Filter subsidiaries based on search term
  const filteredSubsidiaries = subsidiaries.filter(
    sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           sub.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelectParent = (parentId: number) => {
    setSelectedParentId(parentId);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Subsidiaries Management" 
          description="Manage corporate subsidiaries and affiliates"
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

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <ParentEntityList 
            parentEntities={parentEntities}
            selectedParentId={selectedParentId}
            onSelectParent={handleSelectParent}
          />

          <SubsidiaryList 
            selectedParent={selectedParent}
            subsidiaries={filteredSubsidiaries}
            searchTerm={searchTerm}
            onSearch={handleSearchChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <RecentChanges relationshipChanges={relationshipChanges} />
          <QuickActions />
        </div>
      </div>
    </AppLayout>
  );
}
