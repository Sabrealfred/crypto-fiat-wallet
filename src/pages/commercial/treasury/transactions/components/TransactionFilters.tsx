
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionTagFilter } from "./TransactionTagFilter";
import { Dispatch, SetStateAction } from "react";

interface TransactionFiltersProps {
  searchTerm: string;
  dateRange: { from: string; to: string } | null;
  selectedFilters: {
    dateRange: { from: string; to: string } | null;
    status: string[];
    tags: string[];
  };
  onFilterChange: Dispatch<SetStateAction<{
    dateRange: { from: string; to: string } | null;
    status: string[];
    tags: string[];
  }>>;
}

export function TransactionFilters({
  searchTerm,
  dateRange,
  selectedFilters,
  onFilterChange,
}: TransactionFiltersProps) {
  return (
    <div className="space-y-4 mb-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => onFilterChange({
              ...selectedFilters,
              dateRange: selectedFilters.dateRange,
            })}
          />
        </div>
        
        <div className="space-y-2">
          <CalendarDateRangePicker
            date={{
              from: dateRange?.from ? new Date(dateRange.from) : undefined,
              to: dateRange?.to ? new Date(dateRange.to) : undefined,
            }}
            onDateChange={(range: DateRange | undefined) =>
              onFilterChange({
                ...selectedFilters,
                dateRange: range ? {
                  from: range.from?.toISOString().split('T')[0] || '',
                  to: range.to?.toISOString().split('T')[0] || '',
                } : null,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Select 
            value={selectedFilters.status[0] || "all"} 
            onValueChange={(value) => {
              onFilterChange({
                ...selectedFilters,
                status: value === "all" ? [] : [value],
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <TransactionTagFilter
            selectedTags={selectedFilters.tags}
            onTagSelect={(tag) => {
              onFilterChange({
                ...selectedFilters,
                tags: [tag],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
