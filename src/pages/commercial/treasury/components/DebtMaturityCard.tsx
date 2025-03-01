
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DebtMaturityCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Debt Maturity Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-muted-foreground">Active debts</div>
          </div>
          <div>
            <div className="text-2xl font-bold">$14.9M</div>
            <div className="text-sm text-muted-foreground">Total debt</div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-between mt-2"
          onClick={() => navigate("/commercial/treasury/debt")}
        >
          <span>View Debt Portfolio</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
