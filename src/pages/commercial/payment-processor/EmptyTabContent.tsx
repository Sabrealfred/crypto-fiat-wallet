
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, Plus } from "lucide-react";

interface EmptyTabContentProps {
  title: string;
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyTabContent({ 
  title, 
  icon: Icon, 
  message, 
  actionLabel, 
  onAction 
}: EmptyTabContentProps) {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900">
        <CardTitle className="text-blue-900 dark:text-blue-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-blue-400 dark:text-blue-500">
          <Icon className="mx-auto h-16 w-16 mb-4 opacity-50" />
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">{message}</p>
          
          {actionLabel && onAction && (
            <Button 
              onClick={onAction}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
