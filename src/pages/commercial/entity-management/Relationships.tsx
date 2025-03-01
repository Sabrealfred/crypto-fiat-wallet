
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  ArrowLeft, 
  Search, 
  Plus, 
  ArrowRightLeft,
  Share2,
  UserCircle,
  AlertCircle,
  FileText,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample relationships data
const relationshipsData = [
  { 
    id: 1,
    sourceEntity: "Acme Holdings Ltd",
    targetEntity: "Acme Financial Services GmbH",
    relationshipType: "Ownership",
    details: "Direct ownership (100%)",
    status: "Active",
    critical: true
  },
  { 
    id: 2,
    sourceEntity: "Acme Holdings Ltd",
    targetEntity: "Acme Tech Solutions Inc",
    relationshipType: "Ownership",
    details: "Direct ownership (100%)",
    status: "Active",
    critical: true
  },
  { 
    id: 3,
    sourceEntity: "Acme Holdings Ltd",
    targetEntity: "Acme Asia Pacific Pte Ltd",
    relationshipType: "Ownership",
    details: "Direct ownership (100%)",
    status: "Active",
    critical: true
  },
  { 
    id: 4,
    sourceEntity: "Acme Asia Pacific Pte Ltd",
    targetEntity: "Acme APAC Japan KK",
    relationshipType: "Ownership",
    details: "Direct ownership (100%)",
    status: "Active",
    critical: false
  },
  { 
    id: 5,
    sourceEntity: "Acme Asia Pacific Pte Ltd",
    targetEntity: "Acme APAC Australia Pty Ltd",
    relationshipType: "Ownership",
    details: "Direct ownership (100%)",
    status: "Active",
    critical: false
  },
  { 
    id: 6,
    sourceEntity: "Acme Tech Solutions Inc",
    targetEntity: "Acme Financial Services GmbH",
    relationshipType: "Service",
    details: "IT Service Agreement",
    status: "Active",
    critical: false
  },
  { 
    id: 7,
    sourceEntity: "Acme Financial Services GmbH",
    targetEntity: "Acme Investment Vehicles SA",
    relationshipType: "Administration",
    details: "Fund Administration Services",
    status: "Active",
    critical: true
  },
  { 
    id: 8,
    sourceEntity: "Acme Holdings Ltd",
    targetEntity: "Third Party Vendor Co",
    relationshipType: "Vendor",
    details: "Critical business services",
    status: "Active",
    critical: true
  },
  { 
    id: 9,
    sourceEntity: "Acme Holdings Ltd",
    targetEntity: "Global Bank Corporation",
    relationshipType: "Financial",
    details: "Banking services provider",
    status: "Active",
    critical: true
  },
  { 
    id: 10,
    sourceEntity: "Acme Manufacturing Ltd",
    targetEntity: "Acme Tech Solutions Inc",
    relationshipType: "Customer",
    details: "Software licensing",
    status: "Active",
    critical: false
  }
];

// Sample key stakeholders
const keyStakeholders = [
  { id: 1, name: "John Smith", role: "Director", entities: ["Acme Holdings Ltd", "Acme Financial Services GmbH"], risk: "Low" },
  { id: 2, name: "Maria Rodriguez", role: "Director", entities: ["Acme Tech Solutions Inc", "Acme Asia Pacific Pte Ltd"], risk: "Low" },
  { id: 3, name: "David Johnson", role: "Beneficial Owner", entities: ["Acme Holdings Ltd"], risk: "Medium" },
  { id: 4, name: "Sarah Williams", role: "Director", entities: ["Acme Investment Vehicles SA"], risk: "Low" },
  { id: 5, name: "Michael Chen", role: "Beneficial Owner", entities: ["Acme Asia Pacific Pte Ltd"], risk: "Medium" },
];

export default function RelationshipsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [relationshipType, setRelationshipType] = useState<string>("all");
  const [criticalOnly, setCriticalOnly] = useState<boolean>(false);
  
  // Filter relationships based on search term and filters
  const filteredRelationships = relationshipsData.filter(rel => {
    const matchesSearch = 
      rel.sourceEntity.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rel.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.relationshipType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = relationshipType === "all" || rel.relationshipType === relationshipType;
    const matchesCritical = !criticalOnly || rel.critical;
    
    return matchesSearch && matchesType && matchesCritical;
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Relationships" 
          description="Manage relationships between corporate entities"
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

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search relationships..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={relationshipType} onValueChange={setRelationshipType}>
                <SelectTrigger>
                  <SelectValue placeholder="Relationship Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Ownership">Ownership</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="criticalOnly" 
                  checked={criticalOnly}
                  onChange={() => setCriticalOnly(!criticalOnly)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="criticalOnly" className="text-sm font-medium">
                  Critical Relationships Only
                </label>
              </div>
              
              <Button className="sm:justify-self-end" onClick={() => alert("Add relationship form would open here")}>
                <Plus className="mr-2 h-4 w-4" /> Add Relationship
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Entity Relationships
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Source Entity</th>
                      <th className="py-3 px-4 text-center font-medium w-20">
                        <ArrowRightLeft className="h-4 w-4 mx-auto" />
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Target Entity</th>
                      <th className="py-3 px-4 text-left font-medium">Relationship Type</th>
                      <th className="py-3 px-4 text-left font-medium">Details</th>
                      <th className="py-3 px-4 text-left font-medium">Critical</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRelationships.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-muted-foreground">
                          No relationships found matching your criteria
                        </td>
                      </tr>
                    ) : (
                      filteredRelationships.map((rel) => (
                        <tr key={rel.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{rel.sourceEntity}</td>
                          <td className="py-3 px-4 text-center">
                            <ArrowRightLeft className="h-4 w-4 mx-auto text-muted-foreground" />
                          </td>
                          <td className="py-3 px-4">{rel.targetEntity}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{rel.relationshipType}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{rel.details}</td>
                          <td className="py-3 px-4">
                            {rel.critical ? (
                              <Badge variant="destructive" className="font-medium">Yes</Badge>
                            ) : (
                              <Badge variant="outline" className="font-medium">No</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={rel.status === "Active" ? "default" : "outline"} className={rel.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}>
                              {rel.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => alert(`Edit relationship between ${rel.sourceEntity} and ${rel.targetEntity}`)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Relationship Risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Critical Service Dependencies
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Third Party Vendor Co provides critical business services to Acme Holdings Ltd with no redundancy.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    Concentration Risk
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Multiple entities have service relationships with Global Bank Corporation, creating potential concentration risk.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Share2 className="h-4 w-4 text-blue-600" />
                    Common Ownership
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    5 entities are under 100% control of Acme Holdings Ltd, creating strong regulatory oversight requirements.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Key Stakeholders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyStakeholders.map((person) => (
                  <div key={person.id} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <UserCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
                        <p className="text-xs text-muted-foreground">{person.entities.join(', ')}</p>
                      </div>
                    </div>
                    <Badge variant={person.risk === "Low" ? "outline" : "secondary"} className={person.risk !== "Low" ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
                      {person.risk} Risk
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full">
                  <UserCircle className="mr-2 h-4 w-4" />
                  View All Stakeholders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button 
            variant="outline"
            onClick={() => alert("Generate relationship report")}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          
          <Button 
            onClick={() => navigate("/commercial/entity-management/metadata")}
            className="flex items-center gap-2"
          >
            Manage Entity Metadata
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
