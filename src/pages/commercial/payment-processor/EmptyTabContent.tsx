
import { LucideIcon } from "lucide-react";

interface EmptyTabContentProps {
  title: string;
  icon: LucideIcon;
  message: string;
}

export function EmptyTabContent({ title, icon: Icon, message }: EmptyTabContentProps) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
