
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        
        {description && (
          <p className="text-muted-foreground text-lg mb-8">{description}</p>
        )}
        
        <Card className="border-blue-100 dark:border-blue-900">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900">
            <CardTitle className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Under Construction</span>
            </CardTitle>
            <CardDescription>
              This page is currently being developed
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg inline-block mb-4">
              <Construction className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on implementing this feature. Check back soon for updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
