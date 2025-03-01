
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Building2, Search, Plus, Filter, Download, Link2, Database, 
  Briefcase, Globe, FileText, Users, Activity, ChevronRight, 
  Settings, BarChart3, FileClock, MoreHorizontal, Map
} from "lucide-react";
import { EntityCard } from "./components/EntityCard";
import { EntityStructureChart } from "./components/EntityStructureChart";

const entityTypes = [
  { value: "all", label: "All Types" },
  { value: "corporation", label: "Corporation" },
  { value: "llc", label: "Limited Liability Company" },
  { value: "partnership", label: "Partnership" },
  { value: "branch", label: "Branch Office" },
  { value: "representative", label: "Representative Office" },
];

const jurisdictions = [
  { value: "all", label: "All Jurisdictions" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "eu", label: "European Union" },
  { value: "asia", label: "Asia Pacific" },
  { value: "latam", label: "Latin America" },
];

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending Approval" },
  { value: "dissolving", label: "Dissolving" },
];

// Sample entity data
const entities = [
  {
    id: 1,
    name: "Acme Global Holdings Ltd",
    type: "corporation",
    jurisdiction: "uk",
    status: "active",
    registrationNumber: "UK12345678",
    taxId: "GB987654321",
    incorporationDate: "2010-06-15",
    address: "123 Financial Street, London, UK",
    industry: "Financial Services",
    subsidiaries: 12,
    description: "Global headquarters and primary holding company for all Acme operations worldwide."
  },
  {
    id: 2,
    name: "Acme Financial Services GmbH",
    type: "corporation",
    jurisdiction: "eu",
    status: "active",
    registrationNumber: "DE67890123",
    taxId: "DE123456789",
    incorporationDate: "2012-08-22",
    address: "Finanzstraße 45, Frankfurt, Germany",
    industry: "Financial Services",
    subsidiaries: 5,
    description: "European financial services hub handling banking, lending, and investment operations across the EU."
  },
  {
    id: 3,
    name: "Acme Tech Solutions Inc",
    type: "corporation",
    jurisdiction: "us",
    status: "active",
    registrationNumber: "US87654321",
    taxId: "98-7654321",
    incorporationDate: "2015-03-10",
    address: "555 Innovation Drive, San Francisco, CA, USA",
    industry: "Technology",
    subsidiaries: 3,
    description: "Technology and digital innovation division developing fintech solutions for the group."
  },
  {
    id: 4,
    name: "Acme Asia Pacific Pte Ltd",
    type: "corporation",
    jurisdiction: "asia",
    status: "active",
    registrationNumber: "SG20211234",
    taxId: "S1234567A",
    incorporationDate: "2016-11-08",
    address: "88 Market Street, Singapore",
    industry: "Financial Services",
    subsidiaries: 7,
    description: "Regional headquarters coordinating operations across the Asia-Pacific region."
  },
  {
    id: 5,
    name: "Acme Investment Vehicles S.A.",
    type: "corporation",
    jurisdiction: "eu",
    status: "inactive",
    registrationNumber: "LU12345678",
    taxId: "LU98765432",
    incorporationDate: "2014-04-30",
    address: "2 Boulevard Royal, Luxembourg City, Luxembourg",
    industry: "Investment Management",
    subsidiaries: 0,
    description: "Special purpose investment vehicle for European private equity investments."
  },
  {
    id: 6,
    name: "Acme Mexico Operations LLC",
    type: "llc",
    jurisdiction: "latam",
    status: "active",
    registrationNumber: "MX87654321",
    taxId: "MX76543210",
    incorporationDate: "2019-05-12",
    address: "Avenida Reforma 222, Mexico City, Mexico",
    industry: "Financial Services",
    subsidiaries: 1,
    description: "Mexican operations center providing financial services across Latin America."
  },
  {
    id: 7,
    name: "Acme Middle East Branch",
    type: "branch",
    jurisdiction: "other",
    status: "active",
    registrationNumber: "AE98765432",
    taxId: "AE12345678",
    incorporationDate: "2018-09-20",
    address: "Financial Center Road, Dubai, UAE",
    industry: "Financial Services",
    subsidiaries: 0,
    description: "Middle East branch office managing regional banking relationships and operations."
  },
  {
    id: 8,
    name: "Acme Digital Innovations LLC",
    type: "llc",
    jurisdiction: "us",
    status: "active",
    registrationNumber: "US55443322",
    taxId: "87-6543210",
    incorporationDate: "2020-01-15",
    address: "222 Tech Parkway, Austin, TX, USA",
    industry: "Technology",
    subsidiaries: 0,
    description: "Research and development entity focused on blockchain and digital ledger technologies."
  }
];

export default function EntityManagementDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entityTypeFilter, setEntityTypeFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentView, setCurrentView] = useState("grid");
  const [showAddEntityDialog, setShowAddEntityDialog] = useState(false);

  const handleAddEntity = () => {
    toast.success("New entity created successfully");
    setShowAddEntityDialog(false);
  };

  const handleExport = () => {
    toast.success("Entity data exported successfully");
  };

  // Filter entities based on search term and dropdown filters
  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = entityTypeFilter === "all" || entity.type === entityTypeFilter;
    const matchesJurisdiction = jurisdictionFilter === "all" || entity.jurisdiction === jurisdictionFilter;
    const matchesStatus = statusFilter === "all" || entity.status === statusFilter;
    
    return matchesSearch && matchesType && matchesJurisdiction && matchesStatus;
  });

  const getStatusBadgeColors = (status: string) => {
    switch (status) {
      case 'active':
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case 'inactive':
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'dissolving':
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Management" 
          description="Create, manage, and monitor your global organizational structure"
          showBack={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Entities</p>
                  <h3 className="text-2xl font-bold mt-2">{entities.length}</h3>
                  <p className="text-sm text-green-500 mt-1">+2 in last quarter</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jurisdictions</p>
                  <h3 className="text-2xl font-bold mt-2">5</h3>
                  <p className="text-sm text-muted-foreground mt-1">Across 3 continents</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Relationships</p>
                  <h3 className="text-2xl font-bold mt-2">28</h3>
                  <p className="text-sm text-muted-foreground mt-1">Parent-subsidiary & partnerships</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex-1 w-full sm:w-auto relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entities..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                {entityTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={jurisdictionFilter} onValueChange={setJurisdictionFilter}>
              <SelectTrigger className="w-[160px]">
                <Map className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                {jurisdictions.map(jurisdiction => (
                  <SelectItem key={jurisdiction.value} value={jurisdiction.value}>{jurisdiction.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Activity className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport} className="flex items-center gap-1">
                <Download className="h-4 w-4" /> Export
              </Button>
              
              <Dialog open={showAddEntityDialog} onOpenChange={setShowAddEntityDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Add Entity
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Entity</DialogTitle>
                    <DialogDescription>
                      Add a new legal entity to your organizational structure
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Entity Name</label>
                        <Input placeholder="Enter legal entity name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Entity Type</label>
                        <Select defaultValue="corporation">
                          <SelectTrigger>
                            <SelectValue placeholder="Select entity type" />
                          </SelectTrigger>
                          <SelectContent>
                            {entityTypes.slice(1).map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Jurisdiction</label>
                        <Select defaultValue="us">
                          <SelectTrigger>
                            <SelectValue placeholder="Select jurisdiction" />
                          </SelectTrigger>
                          <SelectContent>
                            {jurisdictions.slice(1).map(jurisdiction => (
                              <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                                {jurisdiction.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Registration Number</label>
                        <Input placeholder="Official registration number" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Tax ID</label>
                        <Input placeholder="Tax identification number" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Incorporation Date</label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Registered Address</label>
                      <Input placeholder="Official address" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Description</label>
                      <Input placeholder="Brief description of the entity's purpose" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddEntityDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddEntity}>Create Entity</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-6" onValueChange={(value) => setCurrentView(value)}>
          <TabsList className="mb-4">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="structure">Org Structure</TabsTrigger>
          </TabsList>
          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntities.map((entity) => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>
            
            {filteredEntities.length === 0 && (
              <Card className="border-dashed border-2 border-gray-200 dark:border-gray-700">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Building2 className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No entities found</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    No entities match your current filter criteria. Try adjusting your filters or create a new entity.
                  </p>
                  <Button onClick={() => setShowAddEntityDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add New Entity
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="table">
            <Card>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Jurisdiction</TableHead>
                      <TableHead>Reg. Number</TableHead>
                      <TableHead>Inc. Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Subsidiaries</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntities.length > 0 ? (
                      filteredEntities.map((entity) => (
                        <TableRow key={entity.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{entity.name}</TableCell>
                          <TableCell>
                            {entityTypes.find(t => t.value === entity.type)?.label || entity.type}
                          </TableCell>
                          <TableCell>
                            {jurisdictions.find(j => j.value === entity.jurisdiction)?.label || entity.jurisdiction}
                          </TableCell>
                          <TableCell>{entity.registrationNumber}</TableCell>
                          <TableCell>{new Date(entity.incorporationDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={getStatusBadgeColors(entity.status)}
                            >
                              {entity.status.charAt(0).toUpperCase() + entity.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{entity.subsidiaries}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No entities found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="structure">
            <Card>
              <CardHeader>
                <CardTitle>Organizational Structure</CardTitle>
                <CardDescription>
                  Visual representation of your corporate structure showing parent-subsidiary relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EntityStructureChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Entity Compliance Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    entity: "Acme Global Holdings Ltd",
                    task: "Annual Financial Filing",
                    dueDate: "2024-04-30",
                    priority: "high"
                  },
                  {
                    entity: "Acme Tech Solutions Inc",
                    task: "Corporate Tax Return",
                    dueDate: "2024-05-15",
                    priority: "high"
                  },
                  {
                    entity: "Acme Financial Services GmbH",
                    task: "Regulatory Compliance Review",
                    dueDate: "2024-06-10",
                    priority: "medium"
                  },
                  {
                    entity: "Acme Asia Pacific Pte Ltd",
                    task: "Board Meeting",
                    dueDate: "2024-06-22",
                    priority: "low"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <p className="text-sm text-muted-foreground">{item.entity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(item.dueDate).toLocaleDateString()}</p>
                      <Badge 
                        variant="outline" 
                        className={
                          item.priority === "high" 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
                            : item.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        }
                      >
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-4 flex items-center justify-center">
                View Full Compliance Calendar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Acme Global Holdings - Board Resolution",
                    entity: "Acme Global Holdings Ltd",
                    date: "2024-03-15",
                    type: "resolution"
                  },
                  {
                    title: "Acme Financial Services GmbH - Operating License",
                    entity: "Acme Financial Services GmbH",
                    date: "2024-03-10",
                    type: "license"
                  },
                  {
                    title: "Acme Tech Solutions - Annual Report",
                    entity: "Acme Tech Solutions Inc",
                    date: "2024-03-05",
                    type: "report"
                  },
                  {
                    title: "Acme Asia Pacific - Shareholder Agreement",
                    entity: "Acme Asia Pacific Pte Ltd",
                    date: "2024-02-28",
                    type: "agreement"
                  }
                ].map((doc, index) => (
                  <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.entity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(doc.date).toLocaleDateString()}</p>
                      <Badge variant="outline">
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-4 flex items-center justify-center">
                View Document Repository <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100 dark:border-blue-800 mb-6">
          <CardHeader>
            <CardTitle>Entity Management Tools</CardTitle>
            <CardDescription>
              Access tools and features to streamline your entity management workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 mb-4">
                      <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Entity Relationships</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Map and visualize legal entity relationships and ownership structures.
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-auto">
                      Manage Relationships
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 mb-4">
                      <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Entity Metadata</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage critical entity data, registration details, and classifications.
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-auto">
                      View Metadata
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 mb-4">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Officer Management</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Track directors, officers, and signatories across your legal entities.
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-auto">
                      Manage Officers
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 mb-4">
                      <FileClock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Compliance Tracker</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Monitor filing deadlines and regulatory requirements across jurisdictions.
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-auto">
                      View Compliance Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-100 dark:border-blue-800 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Entity Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground text-center">
                  Entity analytics visualization would appear here<br/>
                  (Distribution by type, jurisdiction, status, etc.)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Quick Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Entity filing reminders</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">Data Export</p>
                  <p className="text-sm text-muted-foreground">Export formats</p>
                </div>
                <Button variant="outline" size="sm">Settings</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">User Access</p>
                  <p className="text-sm text-muted-foreground">Permission controls</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">Integrations</p>
                  <p className="text-sm text-muted-foreground">Connected systems</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
