
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DateRange } from "react-day-picker";

interface TagStatsFiltersProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  comparisonPeriod: string;
  onComparisonPeriodChange: (period: string) => void;
  showPercentages?: boolean;
  onShowPercentagesChange?: (show: boolean) => void;
}

export function TagStatsFilters({
  dateRange,
  onDateRangeChange,
  comparisonPeriod,
  onComparisonPeriodChange,
  showPercentages = false,
  onShowPercentagesChange
}: TagStatsFiltersProps) {
  return (
    <Card className="p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-2 block">Rango de Fechas</Label>
          <CalendarDateRangePicker
            date={dateRange}
            onDateChange={onDateRangeChange}
          />
        </div>
        <div>
          <Label className="mb-2 block">Comparar con</Label>
          <Select value={comparisonPeriod} onValueChange={onComparisonPeriodChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Período anterior</SelectItem>
              <SelectItem value="year">Mismo período año anterior</SelectItem>
              <SelectItem value="custom">Período personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4 pt-8">
          <Switch
            id="show-percentages"
            checked={showPercentages}
            onCheckedChange={onShowPercentagesChange}
          />
          <Label htmlFor="show-percentages">Mostrar variaciones porcentuales</Label>
        </div>
      </div>
    </Card>
  );
}
