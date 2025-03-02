
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureInfoTabProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureInfoTab({ title, description, icon: Icon }: FeatureInfoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {title === "Forward Contracts" && "Lock in Future Rates"}
              {title === "FX Swaps" && "Flexible Cash Flow Management"}
              {title === "FX Options" && "Strategic Risk Management"}
            </h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <Button>
              {title === "Forward Contracts" && "Create Forward Contract"}
              {title === "FX Swaps" && "Create FX Swap"}
              {title === "FX Options" && "Explore FX Options"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
