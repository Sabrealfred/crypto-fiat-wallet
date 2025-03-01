
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface WorkflowRowProps {
  name: string;
  description: string;
  date: string;
}

export const WorkflowTableRow = ({ name, description, date }: WorkflowRowProps) => (
  <tr className="border-b last:border-0">
    <td className="py-3">
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
        {name}
      </div>
    </td>
    <td className="py-3 text-muted-foreground">{description}</td>
    <td className="py-3 text-muted-foreground">{date}</td>
    <td className="py-3 text-right">
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </td>
  </tr>
);
