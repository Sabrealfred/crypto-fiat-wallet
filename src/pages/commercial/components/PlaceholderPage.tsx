
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <CommercialHeader 
          title={title}
          description={description}
          showBack={true}
        />
        
        <Card className="mt-8 border border-dashed border-blue-300 dark:border-blue-700">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-4">
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
            <p className="text-sm text-muted-foreground mb-6">This feature is under development and will be available soon.</p>
            <Button>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
