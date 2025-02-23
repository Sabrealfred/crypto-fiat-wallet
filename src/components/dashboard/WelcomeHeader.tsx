
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function WelcomeHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Overview</h1>
        <p className="text-muted-foreground">Good morning Leonardo 👋</p>
      </div>
      <div className="flex gap-2">
        <Link to="/history">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Monthly Report
          </Button>
        </Link>
      </div>
    </div>
  );
}
