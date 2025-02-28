
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export function QuickActionCard({ title, icon: Icon, description }: QuickActionCardProps) {
  return (
    <Card className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer border border-blue-100 dark:border-blue-800">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center">
            <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
