
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  onClick?: () => void;
}

export function QuickActionCard({ title, icon: Icon, description, onClick }: QuickActionCardProps) {
  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-primary-foreground mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
