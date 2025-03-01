
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, CardContent, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Building2, Search, Plus, Edit, ArrowUpDown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Entity {
  id: number;
  name: string;
  type: string;
  jurisdiction: string;
  registrationNumber: string;
  status: string;
  relationships: number;
}

const entities: Entity[] = [
  {
    id: 1,
    name: "Acme Global Holdings Ltd",
    type: "Parent",
    jurisdiction: "United Kingdom",
    registrationNumber: "UK1234567",
    status: "Active",
    relationships: 12
  },
  {
    id: 2,
    name: "Acme Financial Services GmbH",
    type: "Subsidiary",
    jurisdiction: "Germany",
    registrationNumber: "DE7654321",
    status: "Active",
    relationships: 4
  },
  {
    id: 3,
    name: "Acme Tech Solutions Inc",
    type: "Subsidiary",
    jurisdiction: "United States",
    registrationNumber: "US8765432",
    status: "Active",
    relationships: 6
  },
  {
    id: 4,
    name: "Acme Asia Pacific Pte Ltd",
    type: "Subsidiary",
    jurisdiction: "Singapore",
    registrationNumber: "SG2345678",
    status: "Active",
    relationships: 8
  },
  {
    id: 5,
    name: "Acme Investment Vehicles SA",
    type: "Subsidiary",
    jurisdiction: "Switzerland",
    registrationNumber: "CH3456789",
    status: "Inactive",
    relationships: 2
  }
];

export const EntityTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Entity Registry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entities..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => navigate("/commercial/entity-management/create")}>
              <Plus className="mr-2 h-4 w-4" /> Add Entity
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Registration #</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Relationships</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntities.map((entity) => (
                <TableRow key={entity.id}>
                  <TableCell className="font-medium">{entity.name}</TableCell>
                  <TableCell>{entity.type}</TableCell>
                  <TableCell>{entity.jurisdiction}</TableCell>
                  <TableCell>{entity.registrationNumber}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={entity.status === "Active" ? "default" : "outline"}
                    >
                      {entity.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{entity.relationships}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => navigate(`/commercial/entity-management/edit/${entity.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => navigate(`/commercial/entity-management/subsidiaries?id=${entity.id}`)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
