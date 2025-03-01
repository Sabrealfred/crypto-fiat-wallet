
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskAllocation {
  category: string;
  allocatedAmount: number;
  totalAllocated: number;
}

interface RiskAllocationCardProps {
  allocations: RiskAllocation[];
  calculateAllocationPercentage: (allocatedAmount: number, totalAllocated: number) => string;
}

export function RiskAllocationCard({ allocations, calculateAllocationPercentage }: RiskAllocationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allocations.map((allocation, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{allocation.category}</span>
                <span className="text-sm">${allocation.allocatedAmount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: calculateAllocationPercentage(allocation.allocatedAmount, allocation.totalAllocated) }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
