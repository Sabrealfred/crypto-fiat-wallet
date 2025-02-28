
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyTabContentProps {
  title: string;
  icon: LucideIcon;
  message: string;
}

export function EmptyTabContent({ title, icon: Icon, message }: EmptyTabContentProps) {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900">
        <CardTitle className="text-blue-900 dark:text-blue-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-blue-400 dark:text-blue-500">
          <Icon className="mx-auto h-16 w-16 mb-4 opacity-50" />
          <p className="text-gray-500 dark:text-gray-400">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
