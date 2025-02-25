
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionTagFilter } from "./TransactionTagFilter";

interface TransactionFiltersProps {
  searchTerm: string;
  dateRange: { from: string; to: string };
  statusFilter: string;
  selectedTags: string[];
  onSearchChange: (value: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  onStatusChange: (value: string) => void;
  onTagSelect: (tag: string) => void;
}

export function TransactionFilters({
  searchTerm,
  dateRange,
  statusFilter,
  selectedTags,
  onSearchChange,
  onDateRangeChange,
  onStatusChange,
  onTagSelect,
}: TransactionFiltersProps) {
  return (
    <div className="space-y-4 mb-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <CalendarDateRangePicker
            date={{
              from: dateRange.from ? new Date(dateRange.from) : undefined,
              to: dateRange.to ? new Date(dateRange.to) : undefined,
            }}
            onDateChange={(range: DateRange | undefined) =>
              onDateRangeChange({
                from: range?.from?.toISOString().split('T')[0] || '',
                to: range?.to?.toISOString().split('T')[0] || '',
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TransactionTagFilter
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />
    </div>
  );
}
