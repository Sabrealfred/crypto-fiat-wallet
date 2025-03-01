
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  PlusCircle, 
  UsersRound, 
  Building2, 
  FileText, 
  Network, 
  FileCheck, 
  Download 
} from "lucide-react";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add New Entity",
      description: "Create a new corporate entity",
      icon: PlusCircle,
      action: () => navigate("/commercial/entity-management/create")
    },
    {
      title: "View Subsidiaries",
      description: "Manage subsidiary relationships",
      icon: Building2,
      action: () => navigate("/commercial/entity-management/subsidiaries")
    },
    {
      title: "Entity Relationships",
      description: "View and manage entity relationships",
      icon: Network,
      action: () => navigate("/commercial/entity-management/relationships")
    },
    {
      title: "Representatives",
      description: "Manage entity representatives",
      icon: UsersRound,
      action: () => navigate("/commercial/entity-management/representatives")
    },
    {
      title: "Compliance Documents",
      description: "Manage entity documentation",
      icon: FileCheck,
      action: () => navigate("/commercial/entity-management/compliance")
    },
    {
      title: "Generate Reports",
      description: "Create entity management reports",
      icon: FileText,
      action: () => navigate("/commercial/entity-management/reports")
    }
  ];

  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="justify-start h-auto py-3 px-4"
              onClick={action.action}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <action.icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{action.title}</span>
                  <span className="text-xs text-muted-foreground">{action.description}</span>
                </div>
              </div>
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 px-4 mt-4 border-dashed"
          >
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 mr-3">
                <Download className="h-5 w-5 text-green-700 dark:text-green-400" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium">Export Entity Data</span>
                <span className="text-xs text-muted-foreground">Download entity data in various formats</span>
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
