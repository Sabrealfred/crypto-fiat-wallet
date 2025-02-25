
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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { 
  ChartPie,
  AlertTriangle,
  DollarSign,
  Filter
} from "lucide-react";

const currentAllocation = [
  { name: 'US Equity', current: 48, target: 45 },
  { name: 'Int\'l Equity', current: 22, target: 25 },
  { name: 'Fixed Income', current: 20, target: 20 },
  { name: 'Cash', current: 10, target: 10 }
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

const rebalancingActions = [
  {
    asset: "US Equity",
    action: "sell",
    amount: 150000,
    reason: "Over target allocation"
  },
  {
    asset: "Int'l Equity",
    action: "buy",
    amount: 150000,
    reason: "Under target allocation"
  }
];

export default function RebalancingEngine() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Portfolio Rebalancing" 
          description="Optimize your portfolio allocation"
          showBack={true}
        />

        {/* Allocation Overview */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartPie className="h-5 w-5" />
                Current Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentAllocation}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="current"
                    >
                      {currentAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {currentAllocation.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allocation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Class</TableHead>
                    <TableHead>Current %</TableHead>
                    <TableHead>Target %</TableHead>
                    <TableHead>Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAllocation.map((item) => {
                    const variance = item.current - item.target;
                    return (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.current}%</TableCell>
                        <TableCell>{item.target}%</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            Math.abs(variance) <= 2 ? 'bg-green-100 text-green-700' :
                            Math.abs(variance) <= 5 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {variance > 0 ? '+' : ''}{variance}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Rebalancing Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recommended Actions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Execute All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Class</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rebalancingActions.map((action, index) => (
                  <TableRow key={index}>
                    <TableCell>{action.asset}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        action.action === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {action.action.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>${action.amount.toLocaleString()}</TableCell>
                    <TableCell>{action.reason}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Execute</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Risk Warnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'Large rebalancing may impact market prices' },
                { type: 'info', message: 'Consider tax implications of sales' },
                { type: 'success', message: 'All trades comply with investment policy' }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  alert.type === 'info' ? 'bg-blue-50 text-blue-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
