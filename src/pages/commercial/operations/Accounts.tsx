
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Building2, FileText, Users, Filter, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Mock data for entities
const entities = [
  { 
    id: 1, 
    name: "Global HQ", 
    type: "Headquarters", 
    location: "New York, USA", 
    accounts: 12, 
    status: "active",
    subsidiaries: 8
  },
  { 
    id: 2, 
    name: "European Operations", 
    type: "Subsidiary", 
    location: "London, UK", 
    accounts: 8, 
    status: "active",
    subsidiaries: 3
  },
  { 
    id: 3, 
    name: "Asia Pacific Division", 
    type: "Branch", 
    location: "Singapore", 
    accounts: 6, 
    status: "active",
    subsidiaries: 4
  },
  { 
    id: 4, 
    name: "Latin America Office", 
    type: "Representative", 
    location: "São Paulo, Brazil", 
    accounts: 4, 
    status: "pending",
    subsidiaries: 0
  },
  { 
    id: 5, 
    name: "Tech Ventures", 
    type: "Subsidiary", 
    location: "San Francisco, USA", 
    accounts: 5, 
    status: "active",
    subsidiaries: 2
  },
  { 
    id: 6, 
    name: "Manufacturing Division", 
    type: "Subsidiary", 
    location: "Detroit, USA", 
    accounts: 7, 
    status: "active",
    subsidiaries: 0
  },
];

export default function OpAccountsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("entities");

  // Filter entities based on search term
  const filteredEntities = entities.filter(entity => 
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Management" 
          description="Manage corporate entities and financial accounts"
          showBack={true}
        />

        <Tabs defaultValue="entities" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="entities" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Entities</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Entity Users</span>
            </TabsTrigger>
          </TabsList>

          {/* Search and actions bar */}
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add {activeTab === "entities" ? "Entity" : activeTab === "documents" ? "Document" : "User"}
              </Button>
            </div>
          </div>

          <TabsContent value="entities">
            <div className="grid gap-4">
              {filteredEntities.map((entity) => (
                <Card key={entity.id} className="border-blue-100 dark:border-blue-800">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 dark:border-blue-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{entity.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{entity.type}</span>
                            <span>•</span>
                            <span>{entity.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={entity.status === "active" ? "outline" : "secondary"}
                        className={`${
                          entity.status === "active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40" 
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40"
                        }`}
                      >
                        {entity.status === "active" ? "Active" : "Pending"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 px-6 py-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Accounts</p>
                        <p className="font-medium">{entity.accounts}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Subsidiaries</p>
                        <p className="font-medium">{entity.subsidiaries}</p>
                      </div>
                      <div className="flex justify-end items-center">
                        <Button onClick={() => navigate(`/commercial/operations/accounts/${entity.id}`)}>
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredEntities.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No entities found matching your search criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Entity Documents</CardTitle>
                <CardDescription>
                  Manage legal and financial documents for all entities
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No documents selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select an entity to view associated documents or upload new ones
                    </p>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Entity Users</CardTitle>
                <CardDescription>
                  Manage user access and permissions by entity
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No users selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select an entity to view and manage users with access
                    </p>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
