
import { ArrowUpRight, BarChart3, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  amount: number;
  type: string;
}

interface NotificationsListProps {
  notifications: Notification[];
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Mark all as read
        </Button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-4 items-start p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0
              ${notification.type === 'income' ? 'bg-green-100 text-green-600' : 
                notification.type === 'bill' ? 'bg-amber-100 text-amber-600' : 
                'bg-red-100 text-red-600'}`}
            >
              {notification.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> :
               notification.type === 'bill' ? <Calendar className="h-5 w-5" /> :
               <BarChart3 className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium truncate">{notification.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{notification.description}</p>
              {notification.type === 'bill' && (
                <Button size="sm" className="mt-2 h-8 text-xs">
                  Pay Now ${notification.amount}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
