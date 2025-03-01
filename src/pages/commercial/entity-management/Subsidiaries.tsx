
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Network, 
  Search, 
  Plus, 
  Building2, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  History,
  Link2,
  UserPlus
} from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

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
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Parent Entities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parentEntities.map(entity => (
                <button
                  key={entity.id}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedParentId === entity.id 
                      ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedParentId(entity.id)}
                >
                  <p className="font-medium">{entity.name}</p>
                  <p className="text-sm text-muted-foreground">{entity.jurisdiction}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {selectedParent 
                  ? `Subsidiaries of ${selectedParent.name}` 
                  : "Select a parent entity"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedParent ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search subsidiaries..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button onClick={() => alert("Add subsidiary form would open here")}>
                      <Plus className="mr-2 h-4 w-4" /> Add Subsidiary
                    </Button>
                  </div>

                  {filteredSubsidiaries.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Jurisdiction</TableHead>
                          <TableHead>Ownership</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubsidiaries.map((subsidiary) => (
                          <TableRow key={subsidiary.id}>
                            <TableCell className="font-medium">{subsidiary.name}</TableCell>
                            <TableCell>{subsidiary.jurisdiction}</TableCell>
                            <TableCell>{subsidiary.ownershipPercentage}%</TableCell>
                            <TableCell>
                              <Badge variant={subsidiary.status === "Active" ? "success" : "warning"}>
                                {subsidiary.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => alert(`Edit details for ${subsidiary.name}`)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => alert(`Delete ${subsidiary.name}?`)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <Network className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-lg mb-2">No subsidiaries found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "Try a different search term" : "This entity has no subsidiaries yet"}
                      </p>
                      <Button onClick={() => alert("Add subsidiary form would open here")}>
                        <Plus className="mr-2 h-4 w-4" /> Add Subsidiary
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">No parent entity selected</h3>
                  <p className="text-muted-foreground mb-4">
                    Select a parent entity from the list to view its subsidiaries
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Recent Relationship Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relationshipChanges.map((change) => (
                  <div key={change.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{change.entity}</p>
                        <p className="text-sm text-muted-foreground">{change.change}</p>
                        <p className="text-xs text-muted-foreground">Previous: {change.previousValue}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{new Date(change.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/commercial/entity-management/relationships")}
                >
                  <Network className="mr-2 h-4 w-4" />
                  View Entity Relationships
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert("Create entity relationship")}
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Create Entity Relationship
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert("Add representative")}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Entity Representative
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert("Generate relationship report")}
                >
                  <History className="mr-2 h-4 w-4" />
                  Generate Relationship Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
