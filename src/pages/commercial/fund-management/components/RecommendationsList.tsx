
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface RecommendationType {
  title: string;
  description: string;
  impact: string;
}

interface RecommendationsListProps {
  recommendations: RecommendationType[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg transition-all hover:shadow-md"
              >
                <h3 className="font-semibold text-lg">{rec.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {rec.description}
                </p>
                <p className="text-sm font-medium text-primary mt-2">
                  {rec.impact}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Run the AI analysis to get portfolio recommendations
          </div>
        )}
      </CardContent>
    </Card>
  );
}
