import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EntityMetricsCards } from "./components/EntityMetricsCards";
import { EntityTable } from "./components/EntityTable";
import { EntityStructureChart } from "./components/EntityStructureChart";
import { RecentChanges } from "./components/RecentChanges";
import { EntityActivityCard } from "./components/EntityActivityCard";
import { EntityCard } from "./components/EntityCard";
import { OnboardingOptions } from "./components/OnboardingOptions";
import { useState } from "react";
import { Plus, Filter, ArrowDownUp, Building2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type EntityType = {
  id: number;
  name: string;
  type: string;
  jurisdiction: string;
  status: string;
  registrationNumber: string;
  taxId: string;
  incorporationDate: string;
  address: string;
  industry: string;
  subsidiaries: number;
  description: string;
};

export default function EntityManagementDashboardPage() {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [entityFilter, setEntityFilter] = useState("all");
  const navigate = useNavigate();

  // Sample data for entity cards
  const entities: EntityType[] = [
    {
      id: 1,
      name: "Global Holdings Corp",
      type: "corporation",
      jurisdiction: "us",
      status: "active",
      registrationNumber: "US10293847",
      taxId: "98-7654321",
      incorporationDate: "2010-03-15",
      address: "1100 Corporate Way, New York, NY",
      industry: "Financial Services",
      subsidiaries: 5,
      description: "Primary holding company for North American operations"
    },
    {
      id: 2,
      name: "European Ventures Ltd",
      type: "corporation",
      jurisdiction: "uk",
      status: "active",
      registrationNumber: "UK20384756",
      taxId: "87-6543210",
      incorporationDate: "2012-07-22",
      address: "25 Financial Square, London",
      industry: "Investment Services",
      subsidiaries: 3,
      description: "European headquarters managing EU investments and operations"
    },
    {
      id: 3,
      name: "Pacific Partners LLC",
      type: "llc",
      jurisdiction: "asia",
      status: "active",
      registrationNumber: "SG30475869",
      taxId: "76-5432109",
      incorporationDate: "2015-11-08",
      address: "888 Harbour View, Singapore",
      industry: "Technology",
      subsidiaries: 2,
      description: "APAC technology investment and development division"
    },
    {
      id: 4,
      name: "Emerging Markets SA",
      type: "corporation",
      jurisdiction: "latam",
      status: "pending",
      registrationNumber: "BR40567980",
      taxId: "65-4321098",
      incorporationDate: "2020-01-30",
      address: "Avenida Paulista 1000, São Paulo",
      industry: "Retail Banking",
      subsidiaries: 0,
      description: "South American retail banking and microfinance operations"
    },
    {
      id: 5,
      name: "Northern Investments GmbH",
      type: "corporation",
      jurisdiction: "eu",
      status: "active",
      registrationNumber: "DE50678091",
      taxId: "54-3210987",
      incorporationDate: "2014-05-17",
      address: "Leopoldstraße 100, Munich",
      industry: "Asset Management",
      subsidiaries: 1,
      description: "German asset management and investment banking subsidiary"
    },
    {
      id: 6,
      name: "Desert Finance LLC",
      type: "llc",
      jurisdiction: "other",
      status: "inactive",
      registrationNumber: "AE60789102",
      taxId: "43-2109876",
      incorporationDate: "2016-09-12",
      address: "Financial Tower, Dubai",
      industry: "Investment Banking",
      subsidiaries: 0,
      description: "Middle East investment banking operations (inactive)"
    },
    {
      id: 7,
      name: "Canada Financial Services",
      type: "corporation",
      jurisdiction: "us",
      status: "active",
      registrationNumber: "CA70891023",
      taxId: "32-1098765",
      incorporationDate: "2011-08-05",
      address: "200 Bay Street, Toronto",
      industry: "Financial Services",
      subsidiaries: 2,
      description: "Canadian financial services and wealth management"
    },
    {
      id: 8,
      name: "Oceania Branch Office",
      type: "branch",
      jurisdiction: "other",
      status: "active",
      registrationNumber: "AU80912034",
      taxId: "21-0987654",
      incorporationDate: "2018-04-23",
      address: "100 Collins Street, Melbourne",
      industry: "Commercial Banking",
      subsidiaries: 0,
      description: "Australian branch office for commercial banking operations"
    },
    {
      id: 9,
      name: "Nordic Representative Office",
      type: "representative",
      jurisdiction: "eu",
      status: "active",
      registrationNumber: "SE90123045",
      taxId: "10-9876543",
      incorporationDate: "2019-11-19",
      address: "Stureplan 4C, Stockholm",
      industry: "Financial Services",
      subsidiaries: 0,
      description: "Representative office for Nordic market development"
    },
    {
      id: 10,
      name: "South Asia Operations",
      type: "branch",
      jurisdiction: "asia",
      status: "dissolving",
      registrationNumber: "IN01234056",
      taxId: "09-8765432",
      incorporationDate: "2013-12-01",
      address: "Bandra Kurla Complex, Mumbai",
      industry: "Fintech",
      subsidiaries: 0,
      description: "South Asian fintech operations in consolidation phase"
    }
  ];

  const handleStarOnboarding = () => {
    setIsOnboarding(true);
  };

  const filteredEntities = entities.filter(entity => {
    if (entityFilter === "all") return true;
    if (entityFilter === "active") return entity.status === "active";
    if (entityFilter === "inactive") return entity.status === "inactive";
    if (entityFilter === "pending") return entity.status === "pending";
    if (entityFilter === "dissolving") return entity.status === "dissolving";
    return true;
  });

  const handleAddNewEntity = () => {
    navigate("/commercial/entity-management/metadata");
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <CommercialHeader 
          title="Entity Management"
          description="Manage your corporate entities, subsidiaries, and legal structure"
        />

        {isOnboarding ? (
          <div className="mt-6">
            <OnboardingOptions />
          </div>
        ) : (
          <>
            <Tabs defaultValue="dashboard" className="w-full mt-6">
              <TabsList className="mb-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="entities">Entities</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <EntityMetricsCards />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    <EntityStructureChart entities={entities.slice(0, 5)} />
                  </div>
                  <div className="space-y-6">
                    <RecentChanges 
                      relationshipChanges={[
                        {
                          id: 1,
                          date: "2023-03-20",
                          entity: "Global Finance Corp",
                          type: "Parent Added",
                          user: "John Smith",
                          details: "Added TechVest Inc as parent entity"
                        },
                        {
                          id: 2,
                          date: "2023-03-18",
                          entity: "InnoTech Solutions",
                          type: "Subsidiary Added",
                          user: "Maria Rodriguez",
                          details: "Added Digital Systems LLC as subsidiary"
                        },
                        {
                          id: 3,
                          date: "2023-03-15",
                          entity: "European Holdings",
                          type: "Relationship Modified",
                          user: "David Chen",
                          details: "Updated ownership percentage to 60%"
                        },
                        {
                          id: 4,
                          date: "2023-03-10",
                          entity: "Oceania Partners",
                          type: "Relationship Removed",
                          user: "Sarah Johnson",
                          details: "Removed strategic partnership with Asian Markets Ltd"
                        }
                      ]}
                    />
                    <EntityActivityCard />
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Corporate Structure</h2>
                    <Button onClick={handleStarOnboarding} className="gap-2">
                      <Building2 className="h-4 w-4" />
                      Setup Entity Structure
                    </Button>
                  </div>
                  <EntityTable />
                </div>
              </TabsContent>
              
              <TabsContent value="entities">
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <select 
                      className="border rounded-md px-3 py-2 bg-background" 
                      value={entityFilter}
                      onChange={(e) => setEntityFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active Only</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="dissolving">Dissolving</option>
                    </select>
                    <Button variant="outline" className="gap-2">
                      <ArrowDownUp className="h-4 w-4" />
                      Sort
                    </Button>
                  </div>
                  <Button onClick={handleAddNewEntity}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Entity
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEntities.map((entity) => (
                    <EntityCard key={entity.id} entity={entity} />
                  ))}
                </div>
                
                {filteredEntities.length === 0 && (
                  <div className="text-center py-12 border rounded-lg">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No entities found</h3>
                    <p className="text-muted-foreground mb-4">
                      No entities match your current filter criteria
                    </p>
                    <Button onClick={() => setEntityFilter("all")}>
                      Show All Entities
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="structure">
                <div className="border rounded-lg p-6">
                  <EntityStructureChart fullSize={true} entities={entities} />
                </div>
              </TabsContent>
              
              <TabsContent value="compliance">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Compliance Calendar</h3>
                      
                      <div className="space-y-4">
                        {[
                          { 
                            entity: "Global Holdings Corp", 
                            task: "Annual Report Filing", 
                            dueDate: "2024-04-15", 
                            status: "Pending",
                            type: "Regulatory" 
                          },
                          { 
                            entity: "European Ventures Ltd", 
                            task: "VAT Filing", 
                            dueDate: "2024-03-31", 
                            status: "Complete",
                            type: "Tax" 
                          },
                          { 
                            entity: "Pacific Partners LLC", 
                            task: "Board Meeting", 
                            dueDate: "2024-05-10", 
                            status: "Upcoming",
                            type: "Governance" 
                          },
                          { 
                            entity: "Northern Investments GmbH", 
                            task: "Regulatory Compliance Audit", 
                            dueDate: "2024-06-22", 
                            status: "Upcoming",
                            type: "Audit" 
                          },
                          { 
                            entity: "Canada Financial Services", 
                            task: "Quarterly Tax Filing", 
                            dueDate: "2024-04-30", 
                            status: "Pending",
                            type: "Tax" 
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{item.task}</h4>
                              <p className="text-sm text-muted-foreground">{item.entity}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                                  {item.type}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Due: {new Date(item.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div>
                              {item.status === "Complete" ? (
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>Complete</span>
                                </div>
                              ) : item.status === "Pending" ? (
                                <Button size="sm" variant="outline">Mark Complete</Button>
                              ) : (
                                <span className="text-sm text-muted-foreground">Upcoming</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Compliance Status</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Overall Compliance</span>
                            <span className="text-sm font-bold">87%</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Tax Compliance</span>
                            <span className="text-sm font-bold">92%</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Regulatory Filings</span>
                            <span className="text-sm font-bold">78%</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Governance Requirements</span>
                            <span className="text-sm font-bold">95%</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Governance Structure</h3>
                      
                      <div className="space-y-4">
                        {[
                          { title: "Board of Directors", count: 8, lastMeeting: "2024-02-15" },
                          { title: "Audit Committee", count: 4, lastMeeting: "2024-03-01" },
                          { title: "Risk Committee", count: 5, lastMeeting: "2024-03-10" },
                          { title: "Compliance Committee", count: 3, lastMeeting: "2024-02-22" },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border-b last:border-0">
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {item.count} members • Last meeting: {new Date(item.lastMeeting).toLocaleDateString()}
                              </p>
                            </div>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
}
