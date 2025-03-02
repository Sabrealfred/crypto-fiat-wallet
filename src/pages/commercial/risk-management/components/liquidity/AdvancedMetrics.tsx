
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoPanel } from "../InfoPanel";

const liquidityRatios = [
  { name: 'Current Ratio', value: 1.62, percentage: 82, status: 'good' },
  { name: 'Quick Ratio', value: 1.23, percentage: 75, status: 'good' },
  { name: 'Cash Ratio', value: 0.72, percentage: 58, status: 'warning' },
  { name: 'Operational Cash Flow Ratio', value: 1.15, percentage: 68, status: 'moderate' },
  { name: 'Defensive Interval Ratio', value: '98 days', percentage: 65, status: 'warning' },
];

interface AdvancedMetricsProps {
  formatRatio?: (value: number) => string;
}

export function AdvancedMetrics({ formatRatio }: AdvancedMetricsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'moderate': return 'bg-blue-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Liquidity Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liquidityRatios.map((ratio, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{ratio.name}</span>
                    <span className="font-medium">
                      {typeof ratio.value === 'number' ? formatRatio ? formatRatio(ratio.value) : ratio.value.toFixed(2) + 'x' : ratio.value}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`${getStatusColor(ratio.status)} h-2 rounded-full`} style={{ width: `${ratio.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Metric Definitions & Benchmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="pb-2 border-b">
                <h4 className="font-medium mb-1">Current Ratio</h4>
                <p className="text-sm text-muted-foreground mb-1">Current Assets ÷ Current Liabilities</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 1.5</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 1.0-1.5</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 1.0</span>
                </div>
              </div>
              
              <div className="pb-2 border-b">
                <h4 className="font-medium mb-1">Quick Ratio</h4>
                <p className="text-sm text-muted-foreground mb-1">(Current Assets - Inventory) ÷ Current Liabilities</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 1.0</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 0.7-1.0</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 0.7</span>
                </div>
              </div>
              
              <div className="pb-2 border-b">
                <h4 className="font-medium mb-1">Cash Ratio</h4>
                <p className="text-sm text-muted-foreground mb-1">Cash & Cash Equivalents ÷ Current Liabilities</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 0.75</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 0.5-0.75</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 0.5</span>
                </div>
              </div>
              
              <div className="pb-2 border-b">
                <h4 className="font-medium mb-1">Operational Cash Flow Ratio</h4>
                <p className="text-sm text-muted-foreground mb-1">Operating Cash Flow ÷ Current Liabilities</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 1.0</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 0.6-1.0</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 0.6</span>
                </div>
              </div>
              
              <div className="pb-2 border-b">
                <h4 className="font-medium mb-1">Defensive Interval Ratio</h4>
                <p className="text-sm text-muted-foreground mb-1">(Current Assets ÷ Daily Operational Expenditures)</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 90 days</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 60-90 days</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 60 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Industry Benchmarking</CardTitle>
          <CardDescription>Comparative analysis against industry peers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Metric</th>
                  <th className="text-center p-3 font-medium">Your Organization</th>
                  <th className="text-center p-3 font-medium">Industry Average</th>
                  <th className="text-center p-3 font-medium">Top Quartile</th>
                  <th className="text-center p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Current Ratio</td>
                  <td className="p-3 text-center font-mono">1.62x</td>
                  <td className="p-3 text-center">1.45x</td>
                  <td className="p-3 text-center">1.75x</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Above Average
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Quick Ratio</td>
                  <td className="p-3 text-center font-mono">1.23x</td>
                  <td className="p-3 text-center">1.10x</td>
                  <td className="p-3 text-center">1.40x</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Above Average
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Cash Ratio</td>
                  <td className="p-3 text-center font-mono">0.72x</td>
                  <td className="p-3 text-center">0.68x</td>
                  <td className="p-3 text-center">0.85x</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Average
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Days Cash on Hand</td>
                  <td className="p-3 text-center font-mono">98 days</td>
                  <td className="p-3 text-center">85 days</td>
                  <td className="p-3 text-center">120 days</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Above Average
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Operational CF Ratio</td>
                  <td className="p-3 text-center font-mono">1.15x</td>
                  <td className="p-3 text-center">1.05x</td>
                  <td className="p-3 text-center">1.30x</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Average
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline">
              Download Detailed Benchmark Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
