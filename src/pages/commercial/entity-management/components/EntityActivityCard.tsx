
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

interface Activity {
  id: number;
  date: string;
  entity: string;
  action: string;
  user: string;
}

const recentActivities: Activity[] = [
  {
    id: 1,
    date: "2023-04-12",
    entity: "Acme Global Holdings Ltd",
    action: "Updated registration details",
    user: "John Smith"
  },
  {
    id: 2,
    date: "2023-04-10",
    entity: "Acme Financial Services GmbH",
    action: "Added new subsidiary relationship",
    user: "Sarah Johnson"
  },
  {
    id: 3,
    date: "2023-04-08",
    entity: "Acme Tech Solutions Inc",
    action: "Added new representative",
    user: "Michael Brown"
  },
  {
    id: 4,
    date: "2023-04-05",
    entity: "Acme Investment Vehicles SA",
    action: "Changed status to Inactive",
    user: "David Wilson"
  }
];

export const EntityActivityCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{activity.entity}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">By: {activity.user}</p>
                </div>
                <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
