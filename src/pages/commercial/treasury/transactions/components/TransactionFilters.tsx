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
              dateRange: dateRange,
              status: selectedFilters.status,
              tags: selectedFilters.tags,
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
                dateRange: {
                  from: range?.from?.toISOString().split('T')[0] || '',
                  to: range?.to?.toISOString().split('T')[0] || '',
                },
                status: selectedFilters.status,
                tags: selectedFilters.tags,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Select value={selectedFilters.status.join(',')} onValueChange={(value) => {
            const status = value.split(',').map(status => status.trim());
            onFilterChange({
              dateRange: selectedFilters.dateRange,
              status: status,
              tags: selectedFilters.tags,
            });
          }}>
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
        selectedTags={selectedFilters.tags}
        onTagSelect={(tag) => {
          onFilterChange({
            dateRange: selectedFilters.dateRange,
            status: selectedFilters.status,
            tags: [tag],
          });
        }}
      />
    </div>
  );
}
