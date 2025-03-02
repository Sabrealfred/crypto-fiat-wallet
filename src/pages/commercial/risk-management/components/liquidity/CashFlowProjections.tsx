
import { RiskChart } from "../RiskChart";
import { InfoPanel } from "../InfoPanel";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

const cashProjectionData = [
  { month: 'Sep', inflow: 2400000, outflow: 1800000, net: 600000 },
  { month: 'Oct', inflow: 2600000, outflow: 2200000, net: 400000 },
  { month: 'Nov', inflow: 3100000, outflow: 2700000, net: 400000 },
  { month: 'Dec', inflow: 3500000, outflow: 3200000, net: 300000 },
  { month: 'Jan', inflow: 2800000, outflow: 2600000, net: 200000 },
  { month: 'Feb', inflow: 2500000, outflow: 2200000, net: 300000 },
];

interface CashFlowProjectionsProps {
  formatCurrency: (value: number) => string;
}

export function CashFlowProjections({ formatCurrency }: CashFlowProjectionsProps) {
  return (
    <div className="space-y-6">
      <RiskChart 
        title="Cash Flow Projections"
        description="Six-month forecast of cash inflows and outflows"
        height={400}
      >
        <ComposedChart
          data={cashProjectionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value/1000000}M`} />
          <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Amount"]} />
          <Legend />
          <Bar dataKey="inflow" fill="#22c55e" name="Cash Inflow" stackId="a" />
          <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" stackId="b" />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            dot={{ fill: '#3b82f6', r: 5 }}
            name="Net Cash Flow" 
          />
        </ComposedChart>
      </RiskChart>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoPanel title="Key Cash Flow Assumptions">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-medium">Average Collection Period</span>
              <span>45 days</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-medium">Average Payment Period</span>
              <span>30 days</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-medium">Projected Revenue Growth</span>
              <span>8% YoY</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-medium">Projected Expense Growth</span>
              <span>5% YoY</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-medium">Expected Cash Conversion Cycle</span>
              <span>60 days</span>
            </div>
          </div>
        </InfoPanel>

        <InfoPanel title="Liquidity Gap Analysis">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Short-term Gap (0-30 days)</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Low Risk</span>
              </div>
              <div className="text-2xl font-bold mb-1">+$1.2M</div>
              <div className="text-sm text-muted-foreground">Surplus of liquid assets</div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Medium-term Gap (30-90 days)</span>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Medium Risk</span>
              </div>
              <div className="text-2xl font-bold mb-1">+$0.8M</div>
              <div className="text-sm text-muted-foreground">Diminishing surplus</div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Long-term Gap (90+ days)</span>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Medium Risk</span>
              </div>
              <div className="text-2xl font-bold mb-1">+$0.4M</div>
              <div className="text-sm text-muted-foreground">Strategic planning recommended</div>
            </div>
          </div>
        </InfoPanel>
      </div>
    </div>
  );
}
