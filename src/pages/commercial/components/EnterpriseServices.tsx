
import { Link } from "react-router-dom";
import { Globe2, Briefcase, DollarSign, ChevronRight } from "lucide-react";

export function EnterpriseServices() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Enterprise Services</h2>
      <div className="space-y-3">
        <Link to="/commercial/treasury" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Treasury Management</h3>
              <p className="text-sm text-muted-foreground">Cash flow and liquidity</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/commercial/trade-finance" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Trade Finance</h3>
              <p className="text-sm text-muted-foreground">International operations</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/commercial/risk-management" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Risk Management</h3>
              <p className="text-sm text-muted-foreground">Hedging and analysis</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
