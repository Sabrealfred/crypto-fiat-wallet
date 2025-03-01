
import { Card, CardContent } from "@/components/ui/card";
import { AdditionalRisk } from "./types";

interface AdditionalRiskCardProps {
  risk: AdditionalRisk;
  onClick?: () => void;
}

export function AdditionalRiskCard({ risk, onClick }: AdditionalRiskCardProps) {
  return (
    <Card 
      className={`hover:bg-accent/50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <risk.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium">{risk.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{risk.description}</p>
      </CardContent>
    </Card>
  );
}
