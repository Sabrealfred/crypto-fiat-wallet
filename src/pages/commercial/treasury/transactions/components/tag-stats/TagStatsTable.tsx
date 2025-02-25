
import { Card } from "@/components/ui/card";
import { TagStats } from "../types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

export interface TagStatsTableProps {
  statsArray: TagStats[];
  top5Tags: string[];
  anomalies: Record<string, number[]>;
  showPercentages?: boolean;
}

export function TagStatsTable({ 
  statsArray, 
  top5Tags, 
  anomalies,
  showPercentages = false 
}: TagStatsTableProps) {
  return (
    <Card className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tag</TableHead>
            <TableHead>Transacciones</TableHead>
            <TableHead>Monto Total</TableHead>
            <TableHead>Promedio</TableHead>
            {showPercentages && <TableHead>Variación %</TableHead>}
            <TableHead>Tendencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statsArray.map((stat) => (
            <TableRow key={stat.tag}>
              <TableCell>{stat.tag}</TableCell>
              <TableCell>{stat.count}</TableCell>
              <TableCell>${stat.totalAmount.toLocaleString()}</TableCell>
              <TableCell>${stat.averageAmount.toLocaleString()}</TableCell>
              {showPercentages && (
                <TableCell>
                  <span className={stat.percentageChange > 0 ? 'text-green-500' : 'text-red-500'}>
                    {stat.percentageChange > 0 ? '+' : ''}{stat.percentageChange?.toFixed(1)}%
                  </span>
                </TableCell>
              )}
              <TableCell>
                {stat.trend === 'up' && <TrendingUp className="text-green-500" />}
                {stat.trend === 'down' && <TrendingDown className="text-red-500" />}
                {stat.trend === 'stable' && <Minus className="text-gray-500" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
