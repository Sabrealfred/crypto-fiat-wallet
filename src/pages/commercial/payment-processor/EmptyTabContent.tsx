
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, Plus, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmptyTabContentProps {
  title: string;
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  showDemo?: boolean;
}

export function EmptyTabContent({ 
  title, 
  icon: Icon, 
  message, 
  actionLabel, 
  onAction,
  showDemo = true
}: EmptyTabContentProps) {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900">
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-900 dark:text-blue-100">{title}</CardTitle>
          {showDemo && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              <span>Demo</span>
            </Badge>
          )}
        </div>
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
