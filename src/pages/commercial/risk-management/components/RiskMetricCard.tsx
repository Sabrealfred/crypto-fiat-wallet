
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RiskMetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  progress?: {
    value: number;
    target: string;
    excellent: string;
  };
}

export function RiskMetricCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon,
  progress 
}: RiskMetricCardProps) {
  const bgColorClass = isPositive 
    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
    : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
  
  const textColorClass = isPositive 
    ? "text-blue-800 dark:text-blue-300" 
    : "text-amber-800 dark:text-amber-300";
  
  const iconColorClass = isPositive 
    ? "text-blue-600 dark:text-blue-400" 
    : "text-amber-600 dark:text-amber-400";
    
  const changeColorClass = isPositive 
    ? "text-green-700 dark:text-green-400" 
    : "text-amber-700 dark:text-amber-400";

  return (
    <Card className={bgColorClass}>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <p className={`text-sm font-medium ${textColorClass}`}>{title}</p>
          <Icon className={`h-5 w-5 ${iconColorClass}`} />
        </div>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        <p className={`text-sm mt-2 flex items-center ${changeColorClass}`}>
          {isPositive ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
              <line x1="7" y1="7" x2="17" y2="17"></line>
              <polyline points="17 7 17 17 7 17"></polyline>
            </svg>
          )}
          {change}
        </p>
        {progress && (
          <>
            <div className="mt-3 h-1 w-full bg-muted rounded">
              <div className="h-1 bg-blue-600 rounded" style={{ width: `${progress.value}%` }}></div>
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span>Target: {progress.target}</span>
              <span>Excellent: {progress.excellent}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
