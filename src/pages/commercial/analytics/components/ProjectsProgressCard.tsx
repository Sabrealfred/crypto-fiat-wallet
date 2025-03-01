
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

interface Project {
  name: string;
  completed: number;
  total: number;
}

interface ProjectsProgressCardProps {
  projects: Project[];
  calculateTaskPercentage: (completed: number, total: number) => string;
}

export function ProjectsProgressCard({ projects, calculateTaskPercentage }: ProjectsProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects Progress</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{project.name}</span>
                <span className="text-sm">{project.completed}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: calculateTaskPercentage(project.completed, project.total) }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
