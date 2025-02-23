
import { Link } from "react-router-dom";
import { ChevronRight, LightbulbIcon, Timer, Coins } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Link to="/bills" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <LightbulbIcon className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Pay Bills</h3>
        <p className="text-sm text-muted-foreground">Manage utility and service payments</p>
      </Link>

      <Link to="/time-deposits" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Timer className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Time Deposits</h3>
        <p className="text-sm text-muted-foreground">Earn interest with fixed terms</p>
      </Link>

      <Link to="/savings" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Savings Plans</h3>
        <p className="text-sm text-muted-foreground">Set up automatic savings</p>
      </Link>
    </div>
  );
}
