
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, RefreshCw } from "lucide-react";

interface BankConnectionsCardProps {
  bankIntegrations: Array<{
    type: string;
    system: string;
    status: 'active' | 'inactive' | 'pending';
    lastSync: string;
    frequency: string;
    syncCount: number;
  }>;
}

export const BankConnectionsCard = ({ bankIntegrations }: BankConnectionsCardProps) => {
  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Bank Connections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bankIntegrations.map((bank, i) => (
            <div key={i} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{bank.system}</div>
                <Badge variant="outline" className="capitalize">
                  {bank.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Last sync: {bank.lastSync}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-muted-foreground">
                  {bank.frequency}
                </div>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync Now
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            Add Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
