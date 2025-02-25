
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TransactionFiltersProps {
  searchTerm: string;
  dateRange: { from: string; to: string };
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  onStatusChange: (status: string) => void;
}

export function TransactionFilters({
  searchTerm,
  dateRange,
  statusFilter,
  onSearchChange,
  onDateRangeChange,
  onStatusChange,
}: TransactionFiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Transaction Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div>
            <Input
              type="date"
              placeholder="From Date"
              value={dateRange.from}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
            />
          </div>
          
          <div>
            <Input
              type="date"
              placeholder="To Date"
              value={dateRange.to}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
            />
          </div>
          
          <div>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
