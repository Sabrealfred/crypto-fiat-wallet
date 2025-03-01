
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Settings,
  Bell,
  RefreshCw,
  Shield,
  Database,
  Globe,
  Code,
  BarChart,
  Server,
  ArrowRight
} from "lucide-react";

export default function OperationsServicesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Service status refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Business Services" 
          description="Manage and configure enterprise business services and operations"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Service Management Console</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Status
            </Button>
          </div>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="col-span-4 md:col-span-1 border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">24</h3>
                <p className="text-sm text-muted-foreground mt-2">Total Services</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-1 border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-green-600 dark:text-green-400">22</h3>
                <p className="text-sm text-muted-foreground mt-2">Operational</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-1 border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">2</h3>
                <p className="text-sm text-muted-foreground mt-2">Degraded</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-1 border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-red-600 dark:text-red-400">0</h3>
                <p className="text-sm text-muted-foreground mt-2">Outages</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Services */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Core Enterprise Services
            </CardTitle>
            <CardDescription>
              Critical business services supporting core operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-4 pb-2 font-medium text-sm">
                <div className="col-span-4">Service Name</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Uptime (30d)</div>
                <div className="col-span-1"></div>
              </div>
              
              {[
                { 
                  name: "Payment Processing System", 
                  category: "Financial Operations", 
                  status: "Operational", 
                  uptime: "99.99%",
                  statusVariant: "outline",
                  statusBg: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                },
                { 
                  name: "Treasury Management Platform", 
                  category: "Financial Operations", 
                  status: "Operational", 
                  uptime: "99.98%",
                  statusVariant: "outline",
                  statusBg: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                },
                { 
                  name: "Risk Assessment Engine", 
                  category: "Risk Management", 
                  status: "Degraded Performance", 
                  uptime: "99.52%",
                  statusVariant: "outline",
                  statusBg: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                },
                { 
                  name: "Regulatory Reporting System", 
                  category: "Compliance", 
                  status: "Operational", 
                  uptime: "99.97%",
                  statusVariant: "outline",
                  statusBg: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                },
                { 
                  name: "Investment Management Platform", 
                  category: "Financial Operations", 
                  status: "Operational", 
                  uptime: "99.99%",
                  statusVariant: "outline",
                  statusBg: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                },
                { 
                  name: "Multi-Bank Integration Service", 
                  category: "Integration", 
                  status: "Degraded Performance", 
                  uptime: "98.73%",
                  statusVariant: "outline",
                  statusBg: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                },
              ].map((service, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b text-sm">
                  <div className="col-span-4 font-medium">{service.name}</div>
                  <div className="col-span-3">{service.category}</div>
                  <div className="col-span-2">
                    <Badge variant="outline" className={service.statusBg}>
                      {service.status}
                    </Badge>
                  </div>
                  <div className="col-span-2">{service.uptime}</div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Data Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    name: "Database Cluster", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "ETL Pipeline", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Data Warehouse", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Real-time Analytics", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                ].map((service, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium">{service.name}</span>
                    <span className={service.statusColor}>{service.status}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">Manage Data Services</Button>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Network Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    name: "Secure VPN", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "API Gateway", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Load Balancer", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Content Delivery", 
                    status: "Operational",

                    statusColor: "text-green-500"
                  },
                ].map((service, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium">{service.name}</span>
                    <span className={service.statusColor}>{service.status}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">Manage Network</Button>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Security Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    name: "Identity Provider", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Firewall", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Intrusion Detection", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                  { 
                    name: "Encryption Service", 
                    status: "Operational", 
                    statusColor: "text-green-500"
                  },
                ].map((service, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium">{service.name}</span>
                    <span className={service.statusColor}>{service.status}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">Manage Security</Button>
            </CardContent>
          </Card>
        </div>

        {/* Service Operations */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    service: "Risk Assessment Engine", 
                    alert: "Performance degradation detected",
                    time: "2 hours ago",
                    severity: "Medium",
                    severityColor: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                  },
                  { 
                    service: "Multi-Bank Integration", 
                    alert: "API rate limiting affecting response times",
                    time: "5 hours ago",
                    severity: "Medium",
                    severityColor: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                  },
                  { 
                    service: "Payment Processing System", 
                    alert: "Scheduled maintenance completed successfully",
                    time: "1 day ago",
                    severity: "Info",
                    severityColor: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  },
                  { 
                    service: "Database Cluster", 
                    alert: "Automatic scaling event triggered",
                    time: "2 days ago",
                    severity: "Info",
                    severityColor: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start justify-between pb-3 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{alert.service}</div>
                      <div className="text-sm text-muted-foreground">{alert.alert}</div>
                      <div className="text-xs text-slate-400 mt-1">{alert.time}</div>
                    </div>
                    <Badge variant="outline" className={alert.severityColor}>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Service Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    service: "Payment Processing", 
                    metric: "Response Time",
                    value: "45ms",
                    threshold: "< 100ms",
                    status: "Good",
                    statusColor: "text-green-500"
                  },
                  { 
                    service: "Treasury Management", 
                    metric: "Throughput",
                    value: "1,240 ops/min",
                    threshold: "> 1,000 ops/min",
                    status: "Good",
                    statusColor: "text-green-500"
                  },
                  { 
                    service: "Risk Assessment", 
                    metric: "Response Time",
                    value: "320ms",
                    threshold: "< 200ms",
                    status: "Degraded",
                    statusColor: "text-yellow-500"
                  },
                  { 
                    service: "Multi-Bank Integration", 
                    metric: "Availability",
                    value: "98.73%",
                    threshold: "> 99.9%",
                    status: "Degraded",
                    statusColor: "text-yellow-500"
                  },
                ].map((perf, i) => (
                  <div key={i} className="grid grid-cols-5 gap-2 pb-3 border-b last:border-0 last:pb-0">
                    <div className="col-span-2">
                      <div className="font-medium">{perf.service}</div>
                      <div className="text-xs text-muted-foreground">{perf.metric}</div>
                    </div>
                    <div className="col-span-1 text-center">{perf.value}</div>
                    <div className="col-span-1 text-center text-xs text-muted-foreground">
                      {perf.threshold}
                    </div>
                    <div className={`col-span-1 text-right ${perf.statusColor}`}>
                      {perf.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Management */}
        <Card className="border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Service Management</CardTitle>
            <CardDescription>
              Configure and deploy enterprise business services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-medium">Service Provisioning</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Deploy and configure new business services to meet operational needs.
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-auto">
                    Deploy Service
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-medium">Service Configuration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Modify existing service settings and parameters for optimal performance.
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-auto">
                    Configure Services
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-medium">API Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Manage API keys, rate limits, and endpoint access controls for your services.
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-auto">
                    Manage APIs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            View Service Catalog
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
