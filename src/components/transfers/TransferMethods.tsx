
import { Building, CreditCard, Globe } from "lucide-react";

export function TransferMethods() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Transfer Methods</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Building className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">Bank Transfer (SWIFT)</p>
            <p className="text-muted-foreground">International transfers</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <CreditCard className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">Card to Card</p>
            <p className="text-muted-foreground">Instant transfer</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">SPEI (Mexico)</p>
            <p className="text-muted-foreground">Local Mexican transfers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
