
import { RiskChart } from "../RiskChart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from "recharts";

const liquidityRatioData = [
  { month: 'Jan', ratio: 1.65, benchmark: 1.50 },
  { month: 'Feb', ratio: 1.58, benchmark: 1.50 },
  { month: 'Mar', ratio: 1.72, benchmark: 1.50 },
  { month: 'Apr', ratio: 1.63, benchmark: 1.50 },
  { month: 'May', ratio: 1.51, benchmark: 1.50 },
  { month: 'Jun', ratio: 1.48, benchmark: 1.50 },
  { month: 'Jul', ratio: 1.55, benchmark: 1.50 },
  { month: 'Aug', ratio: 1.62, benchmark: 1.50 },
];

const assetLiquidityData = [
  { name: 'Cash & Equivalents', value: 35, color: '#22c55e' },
  { name: 'Short-Term Investments', value: 25, color: '#3b82f6' },
  { name: 'Accounts Receivable', value: 20, color: '#f59e0b' },
  { name: 'Marketable Securities', value: 12, color: '#8b5cf6' },
  { name: 'Other Liquid Assets', value: 8, color: '#ef4444' },
];

const maturityProfileData = [
  { month: '0-30d', amount: 2500000 },
  { month: '30-60d', amount: 1800000 },
  { month: '60-90d', amount: 1200000 },
  { month: '90-180d', amount: 2200000 },
  { month: '180-365d', amount: 3100000 },
  { month: '>365d', amount: 4200000 },
];

interface LiquidityOverviewProps {
  formatRatio: (value: number | string) => string;
  formatCurrency: (value: number | string) => string;
}

export function LiquidityOverview({ formatRatio, formatCurrency }: LiquidityOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Liquidity Ratio Trend */}
        <div className="md:col-span-2">
          <RiskChart 
            title="Liquidity Ratio Trend" 
            description="Historical liquidity ratio compared to benchmark"
          >
            <LineChart
              data={liquidityRatioData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis dataKey="month" />
              <YAxis domain={[1, 2]} tickFormatter={value => `${value.toFixed(1)}x`} />
              <Tooltip formatter={value => [formatRatio(value), "Ratio"]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ratio" 
                stroke="#3b82f6" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Current Ratio"
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Benchmark"
              />
            </LineChart>
          </RiskChart>
        </div>

        {/* Asset Liquidity Breakdown */}
        <div>
          <RiskChart 
            title="Asset Liquidity Breakdown" 
            description="Distribution of assets by liquidity"
          >
            <PieChart>
              <Pie
                data={assetLiquidityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {assetLiquidityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']} 
              />
            </PieChart>
          </RiskChart>
        </div>
      </div>

      {/* Maturity Profile */}
      <RiskChart 
        title="Liability Maturity Profile" 
        description="Breakdown of liabilities by maturity date"
      >
        <BarChart
          data={maturityProfileData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value/1000000}M`} />
          <Tooltip formatter={(value) => [formatCurrency(value), "Amount"]} />
          <Bar dataKey="amount" fill="#8884d8" name="Maturity Amount" />
        </BarChart>
      </RiskChart>
    </div>
  );
}
