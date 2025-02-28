
import { AppLayout } from "@/components/layout/app-layout";
import { DashboardHeader } from "./components/DashboardHeader";
import { QuickAccessSection } from "./components/QuickAccessSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, ArrowDownRight, ChevronRight, Clock, 
  BarChart3, DollarSign, TrendingUp, Bell, CheckCircle2, 
  AlertCircle, Info, Briefcase, LineChart, Globe, ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useState } from "react";

// Sample data for charts
const financialTrendsData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 34000, profit: 18000 },
  { month: 'Mar', revenue: 48000, expenses: 36000, profit: 12000 },
  { month: 'Apr', revenue: 61000, expenses: 40000, profit: 21000 },
  { month: 'May', revenue: 55000, expenses: 39000, profit: 16000 },
  { month: 'Jun', revenue: 67000, expenses: 44000, profit: 23000 },
];

const areaPerformanceData = [
  { name: 'Treasury', value: 38 },
  { name: 'Operations', value: 27 },
  { name: 'Investment', value: 22 },
  { name: 'Risk', value: 13 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const pendingTasks = [
  { id: 1, task: 'Review quarterly treasury report', priority: 'high', due: '2 days' },
  { id: 2, task: 'Approve vendor payment batch', priority: 'urgent', due: 'Today' },
  { id: 3, task: 'Update currency hedging strategy', priority: 'medium', due: '5 days' },
  { id: 4, task: 'Complete risk assessment survey', priority: 'low', due: '1 week' },
];

const notifications = [
  { id: 1, title: 'Payment Batch Approved', type: 'success', time: '10 min ago' },
  { id: 2, title: 'Risk Threshold Exceeded', type: 'warning', time: '2 hours ago' },
  { id: 3, title: 'New Treasury Report Available', type: 'info', time: '1 day ago' },
  { id: 4, title: 'System Maintenance Scheduled', type: 'info', time: '2 days ago' },
];

export default function CommercialDashboard() {
  const navigate = useNavigate();
  const [activeMetrics, setActiveMetrics] = useState("financial");

  // Key performance metrics
  const metrics = {
    financial: [
      { title: "Cash Position", value: "$8.4M", change: "+2.3%", trend: "up", icon: DollarSign },
      { title: "Monthly Turnover", value: "$12.1M", change: "+5.1%", trend: "up", icon: TrendingUp },
      { title: "Available Credit", value: "$15M", change: "-3.2%", trend: "down", icon: BarChart3 },
      { title: "YTD Performance", value: "+8.7%", change: "+1.2%", trend: "up", icon: LineChart }
    ],
    risk: [
      { title: "Risk Score", value: "Medium", change: "No change", trend: "neutral", icon: ShieldCheck },
      { title: "Compliance", value: "97%", change: "+2%", trend: "up", icon: CheckCircle2 },
      { title: "Open Issues", value: "3", change: "-2", trend: "up", icon: AlertCircle },
      { title: "Audit Status", value: "On Track", change: "No change", trend: "neutral", icon: CheckCircle2 }
    ],
    global: [
      { title: "Market Exposure", value: "$3.2M", change: "+0.5%", trend: "up", icon: Globe },
      { title: "FX Positions", value: "€2.1M", change: "+1.8%", trend: "up", icon: Globe },
      { title: "Cross-border", value: "$5.4M", change: "+3.2%", trend: "up", icon: Briefcase },
      { title: "SWIFT Msgs", value: "124", change: "+7", trend: "up", icon: Globe }
    ]
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        {/* KPI Metrics */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
            <div className="flex space-x-2">
              <Button 
                variant={activeMetrics === "financial" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setActiveMetrics("financial")}
              >
                Financial
              </Button>
              <Button 
                variant={activeMetrics === "risk" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setActiveMetrics("risk")}
              >
                Risk
              </Button>
              <Button 
                variant={activeMetrics === "global" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setActiveMetrics("global")}
              >
                Global Markets
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics[activeMetrics].map((metric, index) => (
              <Card key={index} className="border-blue-100 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                      <p className={`text-sm flex items-center mt-1 ${
                        metric.trend === 'up' ? 'text-green-500' : 
                        metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        {metric.trend === 'up' ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : metric.trend === 'down' ? (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        ) : null}
                        {metric.change}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/40">
                      <metric.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Financial Analytics and Area Performance */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Financial Highlights - Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLineChart data={financialTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" strokeWidth={2} />
                  </RechartLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Area Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={areaPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {areaPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access section */}
        <QuickAccessSection />

        {/* Notifications and Tasks */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Recent Notifications & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      notification.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      notification.type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {notification.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> :
                       notification.type === 'warning' ? <AlertCircle className="h-5 w-5" /> :
                       <Info className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'urgent' ? 'bg-red-500' :
                        task.priority === 'high' ? 'bg-amber-500' :
                        task.priority === 'medium' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`} />
                      <span>{task.task}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Due: {task.due}</span>
                      <Button variant="outline" size="sm">Action</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
