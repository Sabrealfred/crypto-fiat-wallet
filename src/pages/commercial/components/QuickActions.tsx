
import { Link } from "react-router-dom";
import { Users, FileText, Briefcase, ChevronRight } from "lucide-react";

export function QuickActions() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <Link to="/payroll" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Payroll Management</h3>
              <p className="text-sm text-muted-foreground">Process employee payments</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/invoices" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Invoice Management</h3>
              <p className="text-sm text-muted-foreground">Create and manage invoices</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/expenses" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Expense Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor business expenses</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
