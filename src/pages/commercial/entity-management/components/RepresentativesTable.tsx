
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, Plus, Edit, Trash2 } from "lucide-react";

interface Representative {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface RepresentativesTableProps {
  entityId: number;
  entityName: string;
}

const representatives: Representative[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Director",
    email: "john.smith@acme-global.example.com",
    phone: "+44 20 1234 5678",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Secretary",
    email: "sarah.johnson@acme-global.example.com",
    phone: "+44 20 2345 6789",
    status: "Active"
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "CFO",
    email: "michael.brown@acme-global.example.com",
    phone: "+44 20 3456 7890",
    status: "Active"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Legal Counsel",
    email: "david.wilson@acme-global.example.com",
    phone: "+44 20 4567 8901",
    status: "Inactive"
  }
];

export const RepresentativesTable = ({ entityId, entityName }: RepresentativesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRepresentatives = representatives.filter(rep =>
    rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Entity Representatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search representatives..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => alert("Add representative form would open here")}>
              <Plus className="mr-2 h-4 w-4" /> Add Representative
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepresentatives.map((rep) => (
                <TableRow key={rep.id}>
                  <TableCell className="font-medium">{rep.name}</TableCell>
                  <TableCell>{rep.role}</TableCell>
                  <TableCell>{rep.email}</TableCell>
                  <TableCell>{rep.phone}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={rep.status === "Active" ? "default" : "outline"}
                    >
                      {rep.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => alert(`Edit details for ${rep.name}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => alert(`Delete ${rep.name}?`)}
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
