
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit, 
  FileText, 
  Network, 
  Globe, 
  ArrowRight, 
  BarChart,
  PieChart,
  UserCircle,
  HelpCircle,
  FileDigit
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample data
const entities = [
  { 
    id: 1, 
    name: "Acme Holdings Ltd", 
    type: "Parent", 
    jurisdiction: "United Kingdom", 
    registrationNumber: "UK29384756", 
    status: "Active", 
    incorporationDate: "2015-03-12",
    subsidiaries: 5
  },
  { 
    id: 2, 
    name: "Acme Financial Services GmbH", 
    type: "Subsidiary", 
    jurisdiction: "Germany", 
    registrationNumber: "DE839275612", 
    status: "Active", 
    incorporationDate: "2018-07-22",
    subsidiaries: 2
  },
  { 
    id: 3, 
    name: "Acme Tech Solutions Inc", 
    type: "Subsidiary", 
    jurisdiction: "United States", 
    registrationNumber: "US82736451", 
    status: "Active", 
    incorporationDate: "2019-01-15",
    subsidiaries: 0
  },
  { 
    id: 4, 
    name: "Acme Asia Pacific Pte Ltd", 
    type: "Subsidiary", 
    jurisdiction: "Singapore", 
    registrationNumber: "SG92837465", 
    status: "Active", 
    incorporationDate: "2020-11-05",
    subsidiaries: 3
  },
  { 
    id: 5, 
    name: "Acme Investment Vehicles SA", 
    type: "Subsidiary", 
    jurisdiction: "Switzerland", 
    registrationNumber: "CH74920183", 
    status: "Inactive", 
    incorporationDate: "2017-09-30",
    subsidiaries: 0
  },
];

// Sample compliance data
const complianceData = [
  { id: 1, entity: "Acme Holdings Ltd", requirement: "Annual Financial Statement", deadline: "2024-04-30", status: "Pending" },
  { id: 2, entity: "Acme Financial Services GmbH", requirement: "Tax Filing", deadline: "2024-03-15", status: "Complete" },
  { id: 3, entity: "Acme Tech Solutions Inc", requirement: "Business License Renewal", deadline: "2024-06-22", status: "Pending" },
  { id: 4, entity: "Acme Asia Pacific Pte Ltd", requirement: "Beneficial Ownership Update", deadline: "2024-05-10", status: "Pending" },
  { id: 5, entity: "Acme Holdings Ltd", requirement: "Anti-Money Laundering Certification", deadline: "2024-03-30", status: "Overdue" },
];

// Sample document data
const documents = [
  { id: 1, entityId: 1, name: "Articles of Incorporation", type: "Legal", uploadDate: "2023-12-10", expiryDate: "2025-12-10" },
  { id: 2, entityId: 1, name: "Certificate of Good Standing", type: "Compliance", uploadDate: "2024-01-15", expiryDate: "2025-01-15" },
  { id: 3, entityId: 2, name: "Operating License", type: "Regulatory", uploadDate: "2023-11-05", expiryDate: "2024-11-05" },
  { id: 4, entityId: 3, name: "Board Resolution", type: "Governance", uploadDate: "2024-02-20", expiryDate: null },
  { id: 5, entityId: 4, name: "Tax Identification Certificate", type: "Taxation", uploadDate: "2023-10-30", expiryDate: "2024-10-30" },
];

// Recent activity data
const recentActivity = [
  { id: 1, action: "Updated entity details", entity: "Acme Holdings Ltd", user: "John Smith", timestamp: "2024-02-28T14:30:00" },
  { id: 2, action: "Added new subsidiary", entity: "Acme Financial Services GmbH", user: "Maria Rodriguez", timestamp: "2024-02-27T09:45:00" },
  { id: 3, action: "Uploaded document", entity: "Acme Tech Solutions Inc", user: "David Johnson", timestamp: "2024-02-26T16:20:00" },
  { id: 4, action: "Changed entity status", entity: "Acme Investment Vehicles SA", user: "John Smith", timestamp: "2024-02-25T11:10:00" },
  { id: 5, action: "Updated compliance record", entity: "Acme Asia Pacific Pte Ltd", user: "Alice Williams", timestamp: "2024-02-24T13:55:00" },
];

export default function EntityManagementDashboardPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEntities = entities.filter(
    entity => entity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              entity.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Management" 
          description="Manage corporate entities, subsidiaries, and compliance"
          showBack={true}
        />

        <div className="mb-6 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex w-full sm:w-auto space-x-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entities..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => alert("Entity creation form would open here")}>
            <Plus className="mr-2 h-4 w-4" /> Add Entity
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Entity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Entities</span>
                  <span className="font-semibold">{entities.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Entities</span>
                  <span className="font-semibold text-green-600">
                    {entities.filter(e => e.status === "Active").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Inactive Entities</span>
                  <span className="font-semibold text-yellow-600">
                    {entities.filter(e => e.status === "Inactive").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Jurisdictions</span>
                  <span className="font-semibold">
                    {new Set(entities.map(e => e.jurisdiction)).size}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Compliance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Requirements</span>
                  <span className="font-semibold">{complianceData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-600">
                    {complianceData.filter(c => c.status === "Complete").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {complianceData.filter(c => c.status === "Pending").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Overdue</span>
                  <span className="font-semibold text-red-600">
                    {complianceData.filter(c => c.status === "Overdue").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Jurisdictional Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(entities.map(e => e.jurisdiction))).map(jurisdiction => {
                  const count = entities.filter(e => e.jurisdiction === jurisdiction).length;
                  const percentage = Math.round((count / entities.length) * 100);
                  
                  return (
                    <div key={jurisdiction} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{jurisdiction}</span>
                        <span>{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-blue-100 dark:bg-blue-950 h-2 rounded-full">
                        <div 
                          className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="entities" className="space-y-6">
          <TabsList>
            <TabsTrigger value="entities">Entities</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="entities">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Jurisdiction</TableHead>
                      <TableHead>Registration No.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subsidiaries</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntities.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No entities found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEntities.map((entity) => (
                        <TableRow key={entity.id}>
                          <TableCell className="font-medium">{entity.name}</TableCell>
                          <TableCell>{entity.type}</TableCell>
                          <TableCell>{entity.jurisdiction}</TableCell>
                          <TableCell>{entity.registrationNumber}</TableCell>
                          <TableCell>
                            <Badge variant={entity.status === "Active" ? "success" : "warning"}>
                              {entity.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{entity.subsidiaries}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => navigate(`/commercial/entity-management/subsidiaries?id=${entity.id}`)}
                              >
                                <Network className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => alert(`View details for ${entity.name}`)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => alert(`Delete ${entity.name}?`)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.entity}</TableCell>
                        <TableCell>{item.requirement}</TableCell>
                        <TableCell>{new Date(item.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              item.status === "Complete" ? "success" : 
                              item.status === "Overdue" ? "destructive" : 
                              "warning"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => alert(`Update compliance status for ${item.requirement}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => {
                      const entity = entities.find(e => e.id === doc.entityId);
                      return (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>{entity?.name}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => alert(`Download ${doc.name}`)}
                              >
                                <FileDigit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => alert(`Delete ${doc.name}?`)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.action}</TableCell>
                        <TableCell>{activity.entity}</TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>
                          {new Date(activity.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Entity Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <PieChart className="h-16 w-16 mx-auto text-blue-600 dark:text-blue-400" />
                  <p className="text-muted-foreground">Entity growth chart visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                  onClick={() => navigate("/commercial/entity-management/metadata")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Entity Metadata
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert("Generate entity report")}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Generate Entity Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert("Contact support")}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={() => navigate("/commercial/entity-management/subsidiaries")}
            className="flex items-center gap-2"
          >
            Manage Subsidiaries
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
