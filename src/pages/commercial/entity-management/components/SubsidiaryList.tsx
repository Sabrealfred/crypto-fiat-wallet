import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, Search, Plus, Edit, Trash2, Building2 } from "lucide-react";

interface Subsidiary {
  id: number;
  parentId: number;
  name: string;
  jurisdiction: string;
  ownershipPercentage: number;
  status: string;
  relationship: string;
}

interface ParentEntity {
  id: number;
  name: string;
  jurisdiction: string;
  registrationNumber: string;
}

interface SubsidiaryListProps {
  selectedParent: ParentEntity | undefined;
  subsidiaries: Subsidiary[];
  onSearch: (term: string) => void;
  searchTerm: string;
}

export const SubsidiaryList = ({
  selectedParent,
  subsidiaries,
  onSearch,
  searchTerm
}: SubsidiaryListProps) => {
  if (!selectedParent) {
    return (
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Select a parent entity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg mb-2">No parent entity selected</h3>
            <p className="text-muted-foreground mb-4">
              Select a parent entity from the list to view its subsidiaries
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          {`Subsidiaries of ${selectedParent.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subsidiaries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button onClick={() => alert("Add subsidiary form would open here")}>
              <Plus className="mr-2 h-4 w-4" /> Add Subsidiary
            </Button>
          </div>

          {subsidiaries.length > 0 ? (
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
                {subsidiaries.map((subsidiary) => (
                  <TableRow key={subsidiary.id}>
                    <TableCell className="font-medium">{subsidiary.name}</TableCell>
                    <TableCell>{subsidiary.jurisdiction}</TableCell>
                    <TableCell>{subsidiary.ownershipPercentage}%</TableCell>
                    <TableCell>
                      <Badge 
                        variant={subsidiary.status === "Active" ? "default" : "outline"} 
                        className={subsidiary.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                      >
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
      </CardContent>
    </Card>
  );
};
