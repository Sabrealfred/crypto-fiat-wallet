
import { ReportsCard } from "../ReportsCard";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { ArrowUpRight, FileBarChart, FileText, Package } from "lucide-react";

const transactionReportData = [
  { name: "Payments", value: 45 },
  { name: "Transfers", value: 30 },
  { name: "FX", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const cashflowReportData = [
  { month: "Jan", inflow: 4000, outflow: 3400 },
  { month: "Feb", inflow: 3500, outflow: 3200 },
  { month: "Mar", inflow: 4500, outflow: 3800 },
  { month: "Apr", inflow: 5000, outflow: 4200 },
  { month: "May", inflow: 4800, outflow: 4000 },
  { month: "Jun", inflow: 5200, outflow: 4500 },
];

export const ReportsTabContent = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <ReportsCard />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Transaction Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionReportData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {transactionReportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-blue-600" />
            Cash Flow Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashflowReportData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inflow" fill="#22c55e" name="Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
