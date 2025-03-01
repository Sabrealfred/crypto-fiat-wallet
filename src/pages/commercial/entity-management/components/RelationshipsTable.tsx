
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Search, Plus, Edit, Trash2, Filter, Download, Eye } from "lucide-react";
import { toast } from "sonner";

interface Relationship {
  id: number;
  sourceEntity: string;
  targetEntity: string;
  relationshipType: string;
  ownershipPercentage: number;
  startDate: string;
  status: string;
}

// Sample data for relationships
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
  },
  {
    id: 6,
    sourceEntity: "Acme Tech Solutions Inc",
    targetEntity: "Acme Digital Innovations LLC",
    relationshipType: "Parent-Subsidiary",
    ownershipPercentage: 80,
    startDate: "2020-08-05",
    status: "Active"
  },
  {
    id: 7,
    sourceEntity: "Acme Asia Pacific Pte Ltd",
    targetEntity: "Acme China Operations Ltd",
    relationshipType: "Strategic Partnership",
    ownershipPercentage: 51,
    startDate: "2021-04-12",
    status: "Active"
  }
];

// Define relationship types for filtering
const relationshipTypes = ["All Types", "Parent-Subsidiary", "Strategic Partnership", "Joint Venture", "Affiliate"];

export const RelationshipsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  // Handle actions
  const handleView = (id: number) => {
    toast.info(`Viewing relationship details for ID: ${id}`);
  };
  
  const handleEdit = (id: number) => {
    toast.info(`Editing relationship ID: ${id}`);
  };
  
  const handleDelete = (id: number) => {
    toast.success(`Relationship ID: ${id} removed successfully`);
  };
  
  const handleExport = () => {
    toast.success("Relationships data exported successfully");
  };
  
  const handleAddRelationship = () => {
    toast.info("Add relationship form would open here");
  };

  // Filter relationships based on search term, type and status
  const filteredRelationships = relationships.filter(rel => {
    const matchesSearch = 
      rel.sourceEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.relationshipType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All Types" || rel.relationshipType === selectedType;
    const matchesStatus = selectedStatus === "All" || rel.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Card className="border border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Entity Relationships
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filters Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:w-auto relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search relationships..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
              
              <Button onClick={handleAddRelationship} className="gap-2">
                <Plus className="h-4 w-4" /> Add Relationship
              </Button>
            </div>
          </div>

          {/* Relationships Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Entity</TableHead>
                <TableHead>Target Entity</TableHead>
                <TableHead>Relationship Type</TableHead>
                <TableHead className="text-right">Ownership %</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelationships.length > 0 ? (
                filteredRelationships.map((rel) => (
                  <TableRow key={rel.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{rel.sourceEntity}</TableCell>
                    <TableCell>{rel.targetEntity}</TableCell>
                    <TableCell>{rel.relationshipType}</TableCell>
                    <TableCell className="text-right">{rel.ownershipPercentage}%</TableCell>
                    <TableCell>{new Date(rel.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={rel.status === "Active" ? "default" : "outline"}
                        className={rel.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400" : ""}
                      >
                        {rel.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleView(rel.id)}
                          className="h-8 w-8 p-0"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEdit(rel.id)}
                          className="h-8 w-8 p-0"
                          title="Edit relationship"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(rel.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          title="Delete relationship"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No relationships found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Relationship Count Summary */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredRelationships.length} of {relationships.length} relationships
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
