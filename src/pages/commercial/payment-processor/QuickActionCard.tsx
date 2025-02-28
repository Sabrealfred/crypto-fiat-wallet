
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  showDemo?: boolean;
}

export function QuickActionCard({ 
  title, 
  icon: Icon, 
  description, 
  showDemo = true 
}: QuickActionCardProps) {
  return (
    <Card className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer border border-blue-100 dark:border-blue-800">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="relative">
            <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center">
              <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            {showDemo && (
              <Badge 
                variant="enterprise" 
                className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 text-xs flex items-center gap-1"
              >
                <Info className="h-3 w-3" />
                <span>Enterprise</span>
              </Badge>
            )}
          </div>
          <h3 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
