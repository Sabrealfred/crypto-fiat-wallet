
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export function QuickActionCard({ title, icon: Icon, description }: QuickActionCardProps) {
  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardContent className="pt-6">
        <div className="text-center">
          <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
