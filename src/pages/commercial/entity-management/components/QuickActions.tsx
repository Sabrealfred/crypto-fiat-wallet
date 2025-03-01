
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Network, UserPlus, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate("/commercial/entity-management/relationships")}
          >
            <Network className="mr-2 h-4 w-4" />
            View Entity Relationships
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => alert("Create entity relationship")}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Create Entity Relationship
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => alert("Add representative")}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Entity Representative
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => alert("Generate relationship report")}
          >
            <History className="mr-2 h-4 w-4" />
            Generate Relationship Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
