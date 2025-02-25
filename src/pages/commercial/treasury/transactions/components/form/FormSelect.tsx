
import { Label } from "@/components/ui/label";

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

export function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
