
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";

interface Portfolio {
  id: string;
  name: string;
  type: string;
  value: number;
  return: number;
  risk: string;
}

const portfolios: Portfolio[] = [
  { 
    id: "1", 
    name: "Growth Fund", 
    type: "Equity", 
    value: 125000000, 
    return: 15.4, 
    risk: "Moderate"
  },
  { 
    id: "2", 
    name: "Income Portfolio", 
    type: "Fixed Income", 
    value: 85000000, 
    return: 8.2, 
    risk: "Low"
  },
  { 
    id: "3", 
    name: "Balanced Fund", 
    type: "Mixed", 
    value: 150000000, 
    return: 12.8, 
    risk: "Moderate"
  },
  { 
    id: "4", 
    name: "High Yield", 
    type: "Fixed Income", 
    value: 65000000, 
    return: -2.4, 
    risk: "High"
  },
];

export default function Portfolios() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Portfolio Management" 
          description="Manage and analyze your investment portfolios"
        />

        <div className="flex justify-end mb-6">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Portfolio
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Portfolios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Portfolio Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Return</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolios.map((portfolio) => (
                  <TableRow key={portfolio.id}>
                    <TableCell className="font-medium">{portfolio.name}</TableCell>
                    <TableCell>{portfolio.type}</TableCell>
                    <TableCell className="text-right">
                      ${(portfolio.value / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end">
                        {portfolio.return >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={portfolio.return >= 0 ? "text-green-500" : "text-red-500"}>
                          {portfolio.return}%
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>{portfolio.risk}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
