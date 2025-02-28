
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Activity,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

// Mock audit data
const auditLogs = [
  { 
    id: "AUD-001", 
    timestamp: "2023-11-12 09:23:45", 
    user: "Maria Rodriguez", 
    action: "Login", 
    resource: "System", 
    status: "Success",
    ip: "192.168.1.1",
    details: "Standard login" 
  },
  { 
    id: "AUD-002", 
    timestamp: "2023-11-12 10:15:22", 
    user: "John Smith", 
    action: "Transfer Initiated", 
    resource: "Payment System", 
    status: "Success",
    ip: "192.168.1.45",
    details: "Transfer $5,000 to Account #4582" 
  },
  { 
    id: "AUD-003", 
    timestamp: "2023-11-12 11:05:33", 
    user: "Admin System", 
    action: "Configuration Change", 
    resource: "Security Settings", 
    status: "Success",
    ip: "192.168.1.100",
    details: "Updated password policy" 
  },
  { 
    id: "AUD-004", 
    timestamp: "2023-11-12 13:45:11", 
    user: "Sarah Johnson", 
    action: "Data Export", 
    resource: "Customer Database", 
    status: "Success",
    ip: "192.168.1.22",
    details: "Exported customer list" 
  },
  { 
    id: "AUD-005", 
    timestamp: "2023-11-12 14:22:09", 
    user: "Thomas Williams", 
    action: "User Creation", 
    resource: "User Management", 
    status: "Failed",
    ip: "192.168.1.87",
    details: "Insufficient permissions" 
  },
  { 
    id: "AUD-006", 
    timestamp: "2023-11-12 15:18:54", 
    user: "API Service", 
    action: "API Request", 
    resource: "External API", 
    status: "Success",
    ip: "192.168.1.200",
    details: "Retrieved market data" 
  },
  { 
    id: "AUD-007", 
    timestamp: "2023-11-12 16:42:30", 
    user: "Robert Brown", 
    action: "Permission Change", 
    resource: "Role Management", 
    status: "Success",
    ip: "192.168.1.65",
    details: "Updated role permissions" 
  },
];

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter logs based on search term
  const filteredLogs = auditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Audit Trail" 
          description="Track and review operation audit logs"
          showBack={true}
        />

        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Audit Log Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Actions</p>
                      <p className="text-2xl font-bold">534</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                      <User className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unique Users</p>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last 24 Hours</p>
                      <p className="text-2xl font-bold">87</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Failed Actions</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Audit Logs</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.id}</TableCell>
                      <TableCell className="text-xs">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "Success" ? "success" : "destructive"}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
