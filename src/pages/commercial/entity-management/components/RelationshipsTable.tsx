
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Search, Plus, Edit, Trash2 } from "lucide-react";

interface Relationship {
  id: number;
  sourceEntity: string;
  targetEntity: string;
  relationshipType: string;
  ownershipPercentage: number;
  startDate: string;
  status: string;
}

const relationships: Relationship[] = [
  {
    id: 1,
    sourceEntity: "Acme Global Holdings Ltd",
    targetEntity: "Acme Financial Services GmbH",
    relationshipType: "Parent-Subsidiary",
    ownershipPercentage: 100,
    startDate: "2015-03-12",
    status: "Active"
  },
  {
    id: 2,
    sourceEntity: "Acme Global Holdings Ltd",
    targetEntity: "Acme Tech Solutions Inc",
    relationshipType: "Parent-Subsidiary",
    ownershipPercentage: 100,
    startDate: "2016-05-22",
    status: "Active"
  },
  {
    id: 3,
    sourceEntity: "Acme Global Holdings Ltd",
    targetEntity: "Acme Asia Pacific Pte Ltd",
    relationshipType: "Parent-Subsidiary",
    ownershipPercentage: 100,
    startDate: "2017-09-15",
    status: "Active"
  },
  {
    id: 4,
    sourceEntity: "Acme Global Holdings Ltd",
    targetEntity: "Acme Investment Vehicles SA",
    relationshipType: "Parent-Subsidiary",
    ownershipPercentage: 75,
    startDate: "2018-11-30",
    status: "Inactive"
  },
  {
    id: 5,
    sourceEntity: "Acme Financial Services GmbH",
    targetEntity: "Acme Financial Services Austria GmbH",
    relationshipType: "Parent-Subsidiary",
    ownershipPercentage: 100,
    startDate: "2019-02-18",
    status: "Active"
  }
];

export const RelationshipsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRelationships = relationships.filter(rel =>
    rel.sourceEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rel.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rel.relationshipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Entity Relationships
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search relationships..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => alert("Add relationship form would open here")}>
              <Plus className="mr-2 h-4 w-4" /> Add Relationship
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Entity</TableHead>
                <TableHead>Target Entity</TableHead>
                <TableHead>Relationship Type</TableHead>
                <TableHead>Ownership %</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelationships.map((rel) => (
                <TableRow key={rel.id}>
                  <TableCell className="font-medium">{rel.sourceEntity}</TableCell>
                  <TableCell>{rel.targetEntity}</TableCell>
                  <TableCell>{rel.relationshipType}</TableCell>
                  <TableCell>{rel.ownershipPercentage}%</TableCell>
                  <TableCell>{new Date(rel.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={rel.status === "Active" ? "default" : "outline"}
                    >
                      {rel.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => alert(`Edit details for relationship ${rel.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => alert(`Delete relationship ${rel.id}?`)}
                      >
                        <Trash2 className="h-4 w-4" />
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
