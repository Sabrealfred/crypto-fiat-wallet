
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileEdit, 
  FilePlus, 
  UserPlus, 
  Building2, 
  ShieldCheck,
  CalendarCheck
} from "lucide-react";

export function EntityActivityCard() {
  // Sample activity data
  const activities = [
    {
      id: 1,
      type: "edit",
      entity: "Acme Tech Solutions Inc",
      action: "Updated registration details",
      user: "John Smith",
      time: "Today at 10:32 AM",
      icon: FileEdit
    },
    {
      id: 2,
      type: "create",
      entity: "Acme Digital Ventures Ltd",
      action: "Created new entity",
      user: "Sarah Johnson",
      time: "Yesterday at 3:15 PM",
      icon: FilePlus
    },
    {
      id: 3,
      type: "representative",
      entity: "Acme Financial Services GmbH",
      action: "Added new representative",
      user: "Michael Brown",
      time: "Mar 14, 2024 at 11:40 AM",
      icon: UserPlus
    },
    {
      id: 4,
      type: "structure",
      entity: "Acme Asia Pacific Pte Ltd",
      action: "Modified ownership structure",
      user: "Jennifer Lee",
      time: "Mar 13, 2024 at 9:22 AM",
      icon: Building2
    },
    {
      id: 5,
      type: "compliance",
      entity: "Acme Global Holdings Ltd",
      action: "Completed annual compliance review",
      user: "Robert Chen",
      time: "Mar 10, 2024 at 2:45 PM",
      icon: ShieldCheck
    },
    {
      id: 6,
      type: "review",
      entity: "Acme Manufacturing Ltd",
      action: "Scheduled quarterly board meeting",
      user: "Elizabeth Taylor",
      time: "Mar 8, 2024 at 4:30 PM",
      icon: CalendarCheck
    }
  ];

  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader>
        <CardTitle>Recent Entity Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg 
                ${activity.type === 'edit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                ${activity.type === 'create' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                ${activity.type === 'representative' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                ${activity.type === 'structure' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                ${activity.type === 'compliance' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : ''}
                ${activity.type === 'review' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : ''}
              `}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{activity.entity}</p>
                  <time className="text-xs text-muted-foreground">{activity.time}</time>
                </div>
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
