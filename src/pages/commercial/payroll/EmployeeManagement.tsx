
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UserPlus,
  Filter,
  Download,
  Mail,
  Phone,
  Building,
  UserCheck,
  Calendar
} from "lucide-react";

const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    position: "Senior Developer",
    department: "Engineering",
    salary: 85000,
    status: "active",
    startDate: "2023-01-15"
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    position: "Marketing Manager",
    department: "Marketing",
    salary: 75000,
    status: "active",
    startDate: "2023-03-01"
  }
];

export default function EmployeeManagementPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Employee Management" 
          description="Manage employee records and information"
          showBack={true}
        />

        {/* Employee Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <h3 className="text-2xl font-bold mt-2">150</h3>
              <p className="text-sm text-green-500 mt-2">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Average Salary</p>
              <h3 className="text-2xl font-bold mt-2">$75,000</h3>
              <p className="text-sm text-muted-foreground mt-2">Annual</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Departments</p>
              <h3 className="text-2xl font-bold mt-2">8</h3>
              <p className="text-sm text-muted-foreground mt-2">Active teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">New Hires</p>
              <h3 className="text-2xl font-bold mt-2">12</h3>
              <p className="text-sm text-blue-500 mt-2">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Employee Directory</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="default" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>${employee.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {employee.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>{employee.startDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Time & Attendance</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Building className="h-5 w-5" />
            <span>Department Management</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Phone className="h-5 w-5" />
            <span>Contact Directory</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <UserCheck className="h-5 w-5" />
            <span>Performance Reviews</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
