
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PlusCircle, 
  Settings, 
  Search,
  ArrowRight,
  Check,
  Clock,
  AlertTriangle,
  RefreshCw,
  FileText,
  Shield,
  Globe,
  CreditCard
} from "lucide-react";
import { useState } from "react";

// Mock data for banking services
const activeServices = [
  {
    id: 1,
    name: "Online Banking",
    description: "Secure access to accounts and transactions",
    status: "active",
    lastUpdated: "2024-02-15",
    category: "core"
  },
  {
    id: 2,
    name: "Wire Transfers",
    description: "High-value domestic and international transfers",
    status: "active",
    lastUpdated: "2024-02-10",
    category: "payments"
  },
  {
    id: 3,
    name: "ACH Processing",
    description: "Automated Clearing House payments and collections",
    status: "active",
    lastUpdated: "2024-02-20",
    category: "payments"
  },
  {
    id: 4,
    name: "Positive Pay",
    description: "Check fraud prevention service",
    status: "active",
    lastUpdated: "2024-01-30",
    category: "security"
  },
  {
    id: 5,
    name: "Lockbox Services",
    description: "Accelerated receivables processing",
    status: "active",
    lastUpdated: "2024-02-05",
    category: "receivables"
  }
];

const availableServices = [
  {
    id: 6,
    name: "Virtual Accounts",
    description: "Create virtual accounts for improved reconciliation",
    status: "available",
    category: "core"
  },
  {
    id: 7,
    name: "Integrated Payables",
    description: "Consolidated payment processing across methods",
    status: "available",
    category: "payments"
  },
  {
    id: 8,
    name: "Supply Chain Finance",
    description: "Optimize working capital across your supply chain",
    status: "available",
    category: "financing"
  },
  {
    id: 9,
    name: "FX Risk Management",
    description: "Tools to manage foreign exchange exposure",
    status: "available",
    category: "treasury"
  },
  {
    id: 10,
    name: "API Banking",
    description: "Direct system integration with bank services",
    status: "available",
    category: "technology"
  }
];

const pendingServices = [
  {
    id: 11,
    name: "Real-time Payments",
    description: "Instant payment processing and settlement",
    status: "pending",
    requestDate: "2024-03-10",
    category: "payments"
  },
  {
    id: 12,
    name: "Cross-border Payments",
    description: "Optimized international payment routing",
    status: "pending",
    requestDate: "2024-03-05",
    category: "payments"
  }
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  // Filter services based on search term
  const filteredActive = activeServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAvailable = availableServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPending = pendingServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get badge color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "core": return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300";
      case "payments": return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300";
      case "security": return "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300";
      case "receivables": return "bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-300";
      case "financing": return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300";
      case "treasury": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-800/20 dark:text-indigo-300";
      case "technology": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-800/20 dark:text-cyan-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300";
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Banking Services" 
          description="Manage and configure banking services"
          showBack={true}
        />

        {/* Service Management Overview */}
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Service Catalog
              </Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Request Service
              </Button>
            </div>
          </div>

          {/* Services Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  Active Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeServices.length}</div>
                <p className="text-sm text-muted-foreground">Services currently in use</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-amber-500" />
                  Pending Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingServices.length}</div>
                <p className="text-sm text-muted-foreground">Service activations in progress</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5 text-blue-500" />
                  Available Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{availableServices.length}</div>
                <p className="text-sm text-muted-foreground">Additional services you can add</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Notifications */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Service Update Available</AlertTitle>
            <AlertDescription>
              An update to Positive Pay service is available. New features include mobile approval and enhanced fraud detection.
            </AlertDescription>
          </Alert>

          {/* Service Tabs */}
          <Tabs defaultValue="active" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="active">Active Services</TabsTrigger>
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              <TabsTrigger value="available">Available Services</TabsTrigger>
            </TabsList>
            
            {/* Active Services Tab */}
            <TabsContent value="active" className="space-y-4">
              {filteredActive.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredActive.map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className={getCategoryColor(service.category)}>
                            {service.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Last updated: </span>
                          {service.lastUpdated}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          Service Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No matching services found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search terms</p>
                </div>
              )}
            </TabsContent>
            
            {/* Pending Requests Tab */}
            <TabsContent value="pending" className="space-y-4">
              {filteredPending.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPending.map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className={getCategoryColor(service.category)}>
                            {service.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <div className="text-sm">
                            <span className="text-muted-foreground">Requested on: </span>
                            {service.requestDate}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Check Status
                        </Button>
                        <Button variant="outline" size="sm">
                          Request Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No pending service requests</h3>
                  <p className="text-muted-foreground mt-2">All service requests have been processed</p>
                </div>
              )}
            </TabsContent>
            
            {/* Available Services Tab */}
            <TabsContent value="available" className="space-y-4">
              {filteredAvailable.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAvailable.map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className={getCategoryColor(service.category)}>
                            {service.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {service.category === 'core' && <div className="flex items-center text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-1 rounded"><Shield className="h-3 w-3 mr-1" /> Core Banking</div>}
                          {service.category === 'payments' && <div className="flex items-center text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded"><CreditCard className="h-3 w-3 mr-1" /> Payments</div>}
                          {service.category === 'treasury' && <div className="flex items-center text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 px-2 py-1 rounded"><Globe className="h-3 w-3 mr-1" /> Treasury</div>}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Request Service
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No matching services found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search terms</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
