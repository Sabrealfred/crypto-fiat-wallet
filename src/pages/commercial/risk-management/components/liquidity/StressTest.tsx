
import { RiskChart } from "../RiskChart";
import { InfoPanel } from "../InfoPanel";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Line, 
  Cell 
} from "recharts";
import { AlertTriangle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const stressScenarioData = [
  { name: 'Baseline', value: 1.65 },
  { name: 'Mild Stress', value: 1.32 },
  { name: 'Moderate Stress', value: 1.08 },
  { name: 'Severe Stress', value: 0.85 },
];

interface StressTestProps {
  formatRatio: (value: number) => string;
}

export function StressTest({ formatRatio }: StressTestProps) {
  return (
    <div className="space-y-6">
      <RiskChart 
        title="Liquidity Stress Test Results"
        description="Impact of various stress scenarios on liquidity ratios"
      >
        <BarChart
          data={stressScenarioData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 2]} tickFormatter={value => `${value.toFixed(1)}x`} />
          <Tooltip formatter={value => [formatRatio(Number(value)), "Liquidity Ratio"]} />
          <Bar 
            dataKey="value" 
            name="Liquidity Ratio" 
            radius={[4, 4, 0, 0]}
          >
            {stressScenarioData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.value >= 1.5 ? '#22c55e' : 
                      entry.value >= 1.2 ? '#3b82f6' : 
                      entry.value >= 1.0 ? '#f59e0b' : '#ef4444'} 
              />
            ))}
          </Bar>
          {/* Reference line at 1.0x ratio */}
          <Line 
            type="monotone" 
            dataKey={() => 1} 
            stroke="#ef4444" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Minimum Required" 
          />
        </BarChart>
      </RiskChart>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoPanel title="Stress Test Scenarios">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium">Baseline Scenario</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Normal market conditions</li>
                <li>Standard cash flow patterns</li>
                <li>No significant market disruptions</li>
                <li>Current 1.65x liquidity ratio maintained</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Mild Stress Scenario</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>10% decrease in incoming payments</li>
                <li>5% increase in operational expenses</li>
                <li>30-day delay in accounts receivable</li>
                <li>Liquidity ratio falls to 1.32x</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="font-medium">Moderate Stress Scenario</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>25% decrease in incoming payments</li>
                <li>10% increase in operational expenses</li>
                <li>45-day delay in accounts receivable</li>
                <li>20% reduction in short-term investment liquidity</li>
                <li>Liquidity ratio falls to 1.08x</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium">Severe Stress Scenario</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>40% decrease in incoming payments</li>
                <li>15% increase in operational expenses</li>
                <li>60-day delay in accounts receivable</li>
                <li>50% reduction in short-term investment liquidity</li>
                <li>Limited access to credit facilities</li>
                <li>Liquidity ratio falls to 0.85x (below minimum)</li>
              </ul>
            </div>
          </div>
        </InfoPanel>

        <InfoPanel title="Contingency Planning">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
              <div className="font-medium mb-2">Mild Stress Response</div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Accelerate accounts receivable collection</li>
                <li>Optimize payment timing to vendors</li>
                <li>Temporary reduction in non-essential expenses</li>
                <li>Review and potentially defer capital expenditures</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-600">
              <div className="font-medium mb-2">Moderate Stress Response</div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Draw on committed credit facilities</li>
                <li>Implement accounts payable stretching strategy</li>
                <li>Reduce inventory levels</li>
                <li>Defer all non-critical capital expenditures</li>
                <li>Convert short-term investments to cash</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
              <div className="font-medium mb-2">Severe Stress Response</div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Activate emergency liquidity lines</li>
                <li>Negotiate emergency payment terms with major suppliers</li>
                <li>Consider factoring of accounts receivable</li>
                <li>Implement aggressive cost reduction measures</li>
                <li>Liquidate non-core assets</li>
                <li>Seek potential capital injections</li>
              </ul>
            </div>

            <div className="mt-4">
              <Button className="w-full">
                View Detailed Contingency Plan
              </Button>
            </div>
          </div>
        </InfoPanel>
      </div>
    </div>
  );
}
