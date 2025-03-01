
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  AlertTriangle, 
  AlertCircle, 
  Activity, 
  ArrowRight,
  Search,
  Clock,
  Calendar
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Anomaly detection sample data
const anomalyData = [
  { date: "2023-01-01", value: 8500, expected: 8500, anomaly: false },
  { date: "2023-01-02", value: 8700, expected: 8600, anomaly: false },
  { date: "2023-01-03", value: 8800, expected: 8700, anomaly: false },
  { date: "2023-01-04", value: 8900, expected: 8800, anomaly: false },
  { date: "2023-01-05", value: 8600, expected: 8900, anomaly: false },
  { date: "2023-01-06", value: 8700, expected: 9000, anomaly: false },
  { date: "2023-01-07", value: 9200, expected: 9100, anomaly: false },
  { date: "2023-01-08", value: 12500, expected: 9200, anomaly: true }, // Anomaly
  { date: "2023-01-09", value: 9300, expected: 9300, anomaly: false },
  { date: "2023-01-10", value: 9400, expected: 9400, anomaly: false },
  { date: "2023-01-11", value: 5500, expected: 9500, anomaly: true }, // Anomaly
  { date: "2023-01-12", value: 9600, expected: 9600, anomaly: false },
  { date: "2023-01-13", value: 9700, expected: 9700, anomaly: false },
  { date: "2023-01-14", value: 9800, expected: 9800, anomaly: false },
];

// Format date for display
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Recent anomalies list
const recentAnomalies = [
  { id: 1, title: "Cash Flow Spike", date: "2023-01-08", severity: "high", metric: "Cash Flow", value: "$12,500", expected: "$9,200", deviation: "+36%" },
  { id: 2, title: "Revenue Drop", date: "2023-01-11", severity: "critical", metric: "Daily Revenue", value: "$5,500", expected: "$9,500", deviation: "-42%" },
  { id: 3, title: "Transaction Volume Surge", date: "2023-01-15", severity: "medium", metric: "Transaction Count", value: "1,248", expected: "850", deviation: "+47%" },
  { id: 4, title: "Processing Delay", date: "2023-01-18", severity: "low", metric: "Processing Time", value: "4.5s", expected: "2.8s", deviation: "+61%" },
];

export function AnomalyDetectionTab() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  // Filter anomalies based on severity
  const filteredAnomalies = selectedSeverity === "all" 
    ? recentAnomalies 
    : recentAnomalies.filter(anomaly => anomaly.severity === selectedSeverity);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Active Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">3</span>
              <Badge variant="destructive" className="ml-2">+1 today</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all monitored systems</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Detection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">98.2%</span>
              <Badge variant="outline" className="text-green-600 border-green-600 ml-2">+2.5%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Accuracy of anomaly detection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Avg. Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">4.2m</span>
              <Badge variant="outline" className="text-blue-600 border-blue-600 ml-2">-18%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Time to detect anomalies</p>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly visualization chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Anomaly Visualization
          </CardTitle>
          <CardDescription>Real-time anomaly detection with expected values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={anomalyData}>
                <defs>
                  <linearGradient id="expectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  className="text-xs"
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={value => `Date: ${formatDate(value)}`}
                  formatter={(value, name) => {
                    if (name === "value") return ["Actual Value", `$${value}`];
                    if (name === "expected") return ["Expected Value", `$${value}`];
                    return [name, value];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="url(#expectedGradient)" 
                  name="expected"
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    if (payload.anomaly) {
                      return (
                        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red">
                          <circle cx="10" cy="10" r="8" stroke="#ef4444" strokeWidth="2" fill="#fee2e2" />
                          <path d="M7,7 L13,13 M13,7 L7,13" stroke="#ef4444" strokeWidth="2" />
                        </svg>
                      );
                    }
                    return <circle cx={cx} cy={cy} r={4} fill="#ef4444" />;
                  }}
                  name="value"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent anomalies */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Recent Anomalies
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={selectedSeverity === "all" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setSelectedSeverity("all")}
              >
                All
              </Button>
              <Button 
                variant={selectedSeverity === "critical" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity("critical")}
              >
                Critical
              </Button>
              <Button 
                variant={selectedSeverity === "high" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity("high")}
              >
                High
              </Button>
            </div>
          </div>
          <CardDescription>Detected anomalies requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anomaly</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actual vs Expected</TableHead>
                <TableHead>Deviation</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnomalies.map((anomaly) => (
                <TableRow key={anomaly.id}>
                  <TableCell className="font-medium">{anomaly.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{formatDate(anomaly.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        anomaly.severity === "critical" ? "destructive" :
                        anomaly.severity === "high" ? "default" :
                        anomaly.severity === "medium" ? "secondary" : "outline"
                      }
                    >
                      {anomaly.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{anomaly.value}</span>
                      <span className="text-muted-foreground"> vs </span>
                      <span className="text-muted-foreground">{anomaly.expected}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={
                      anomaly.deviation.startsWith("+") ? "text-red-500" : "text-blue-500"
                    }>
                      {anomaly.deviation}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Investigate</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Button variant="outline" className="w-full mt-4" size="sm">
            View All Anomalies
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
