
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

const mockAnomalyData = [
  { date: "Jun 15", amount: 25000, isAnomaly: false },
  { date: "Jun 22", amount: 32000, isAnomaly: false },
  { date: "Jun 29", amount: 28000, isAnomaly: false },
  { date: "Jul 06", amount: 30000, isAnomaly: false },
  { date: "Jul 13", amount: 26000, isAnomaly: false },
  { date: "Jul 20", amount: 58000, isAnomaly: true },
  { date: "Jul 27", amount: 24000, isAnomaly: false },
  { date: "Aug 03", amount: 27000, isAnomaly: false },
  { date: "Aug 10", amount: 29000, isAnomaly: false },
];

const mockAnomalies = [
  {
    id: 1,
    date: "Jul 20, 2023",
    amount: 58000,
    expectedAmount: "25000-35000",
    confidence: 98.5,
    details: "Unusual spike in outflows to vendor 'TechSupplies Inc.'",
    status: "pending"
  },
  {
    id: 2,
    date: "May 05, 2023",
    amount: 42000,
    expectedAmount: "20000-30000",
    confidence: 95.2,
    details: "Multiple identical transactions to unknown recipient",
    status: "resolved"
  },
  {
    id: 3,
    date: "Apr 12, 2023",
    amount: 500,
    expectedAmount: "15000-25000",
    confidence: 97.8,
    details: "Unusually low transaction volume compared to historical pattern",
    status: "resolved"
  }
];

export function AnomalyDetectionCard() {
  const pendingAnomalies = mockAnomalies.filter(a => a.status === "pending");
  
  return (
    <Card className="border border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          Transaction Anomaly Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="text-sm font-medium">
                {pendingAnomalies.length === 0 ? (
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4" /> No anomalies detected
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> {pendingAnomalies.length} anomalies detected
                  </span>
                )}
              </span>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockAnomalyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Amount"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="amount" name="Transaction Amount">
                  {mockAnomalyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isAnomaly ? "#f97316" : "#3b82f6"} 
                    />
                  ))}
                </Bar>
                <ReferenceLine y={35000} stroke="#9ca3af" strokeDasharray="3 3" />
                <ReferenceLine y={25000} stroke="#9ca3af" strokeDasharray="3 3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 mt-2">
            <h3 className="text-sm font-medium">Recent Anomalies</h3>
            {mockAnomalies.map(anomaly => (
              <div 
                key={anomaly.id} 
                className={`p-3 rounded-lg border ${
                  anomaly.status === "pending" 
                    ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" 
                    : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{anomaly.date}</div>
                    <div className="text-sm">${anomaly.amount.toLocaleString()} <span className="text-muted-foreground">(Expected: ${anomaly.expectedAmount})</span></div>
                    <div className="text-sm text-muted-foreground mt-1">{anomaly.details}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-xs px-2 py-1 rounded-full mb-2 font-medium whitespace-nowrap 
                      ${anomaly.status === 'pending' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {anomaly.status === "pending" ? "Needs review" : "Resolved"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {anomaly.confidence}% confidence
                    </div>
                  </div>
                </div>
                
                {anomaly.status === "pending" && (
                  <div className="flex gap-2 mt-3 justify-end">
                    <Button variant="outline" size="sm">Dismiss</Button>
                    <Button size="sm">Investigate</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm">View All Anomalies</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
