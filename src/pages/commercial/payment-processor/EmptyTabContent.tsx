
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyTabContentProps {
  title: string;
  icon: LucideIcon;
  message: string;
}

export function EmptyTabContent({ title, icon: Icon, message }: EmptyTabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <Icon className="mx-auto h-12 w-12 mb-4" />
          <p>{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
