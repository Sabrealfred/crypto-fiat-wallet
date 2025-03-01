
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

interface AnomalyDetectionPanelProps {
  anomalyDetectionData: any[];
}

export const AnomalyDetectionPanel: React.FC<AnomalyDetectionPanelProps> = ({ anomalyDetectionData }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={anomalyDetectionData}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (payload.isAnomaly) {
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={6} 
                        fill="#ef4444" 
                        stroke="none" 
                      />
                    );
                  }
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill="#8884d8" 
                      stroke="none" 
                    />
                  );
                }}
              />
              <Line 
                type="monotone" 
                dataKey="threshold" 
                stroke="#ff7300" 
                strokeDasharray="5 5" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Anomaly Detection Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <p className="font-medium text-red-800 dark:text-red-300 mb-1">Detected Anomalies:</p>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>
                      <span className="font-medium">Jan 6:</span> Transaction value 53% above normal threshold
                    </li>
                    <li>
                      <span className="font-medium">Jan 7:</span> Continued elevated activity, 40% above threshold
                    </li>
                    <li>
                      <span className="font-medium">Jan 14:</span> Spike of 100% above normal activity
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                  <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Potential Causes:</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Unusual large transaction patterns</li>
                    <li>Potential duplicate transactions</li>
                    <li>Inconsistent recording procedures</li>
                    <li>Possible unauthorized activity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <p className="text-sm flex items-start gap-2">
          <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
          <span>
            <strong>AI Anomaly Analysis:</strong> The system has detected three significant anomalies in the transaction 
            patterns. The most severe occurred on January 14th with a 100% deviation from normal patterns. 
            Recommended action: Review transactions from Jan 6-7 and Jan 14 for potential irregularities.
          </span>
        </p>
      </div>
    </div>
  );
};
