
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AdditionalRisk } from "./types";

interface AdditionalRiskCardProps {
  risk: AdditionalRisk;
}

export function AdditionalRiskCard({ risk }: AdditionalRiskCardProps) {
  return (
    <Card className="hover:bg-accent/50 transition-all cursor-pointer hover:shadow-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <risk.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">
              {risk.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {risk.description}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
