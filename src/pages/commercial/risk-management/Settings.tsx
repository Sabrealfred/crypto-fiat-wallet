
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Save, 
  AlertTriangle, 
  Bell, 
  Users, 
  Shield, 
  Lock, 
  BarChart, 
  LineChart
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

export default function RiskSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Risk management settings saved successfully");
    }, 1500);
  };

  const form = useForm({
    defaultValues: {
      varConfidence: "99",
      varHoldingPeriod: "1",
      liquidityWarningThreshold: "85",
      counterpartyExposure: "5000000",
      enableRiskAlerts: true,
      enableDailyReports: true,
      enableLimitBreachNotifications: true,
      enableAutomaticApprovals: false
    }
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Risk Management Settings" 
          description="Configure risk management parameters and thresholds"
          showBack={true}
        />

        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save All Settings"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Users className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="models">
              <BarChart className="h-4 w-4 mr-2" />
              Models
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveSettings)}>
              {/* General Settings Tab */}
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      General Risk Parameters
                    </CardTitle>
                    <CardDescription>
                      Configure the main risk management thresholds and calculation parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="varConfidence"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VaR Confidence Level (%)</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select confidence level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="95">95%</SelectItem>
                                <SelectItem value="97.5">97.5%</SelectItem>
                                <SelectItem value="99">99%</SelectItem>
                                <SelectItem value="99.5">99.5%</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Sets the confidence level for Value at Risk calculations
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="varHoldingPeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VaR Holding Period (days)</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select holding period" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 day</SelectItem>
                                <SelectItem value="5">5 days</SelectItem>
                                <SelectItem value="10">10 days</SelectItem>
                                <SelectItem value="20">20 days</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Sets the time horizon for Value at Risk calculations
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="liquidityWarningThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Liquidity Warning Threshold (%)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormDescription>
                              Percentage threshold for liquidity warning triggers
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="counterpartyExposure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Counterparty Exposure ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormDescription>
                              Maximum allowed exposure to a single counterparty
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Risk Calculation Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-blue-50 dark:border-blue-900/50">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                <BarChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Historical Simulation</h4>
                                <p className="text-xs text-muted-foreground">
                                  Based on historical market data
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-blue-50 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Monte Carlo Simulation</h4>
                                <p className="text-xs text-muted-foreground">
                                  Random scenarios based on volatility
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-blue-50 dark:border-blue-900/50">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                <BarChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Parametric VaR</h4>
                                <p className="text-xs text-muted-foreground">
                                  Based on normal distribution assumption
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Regulatory Compliance Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Basel III Compliance Mode</h3>
                          <p className="text-sm text-muted-foreground">
                            Apply stricter risk management rules according to Basel III
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">FRTB Compliance Mode</h3>
                          <p className="text-sm text-muted-foreground">
                            Apply Fundamental Review of the Trading Book standards
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Dodd-Frank Compliance</h3>
                          <p className="text-sm text-muted-foreground">
                            Apply US regulatory compliance rules
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Configure risk alerts and notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="enableRiskAlerts"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Risk Alerts</FormLabel>
                              <FormDescription>
                                Receive alerts for significant risk events and threshold breaches
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="enableDailyReports"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Daily Risk Reports</FormLabel>
                              <FormDescription>
                                Receive automated daily risk summary reports via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="enableLimitBreachNotifications"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Limit Breach Notifications</FormLabel>
                              <FormDescription>
                                Receive immediate notifications for any risk limit breaches
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="enableAutomaticApprovals"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Automatic Approvals</FormLabel>
                              <FormDescription>
                                Allow system to automatically approve low-risk exceptions
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-3">Alert Recipients</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Risk Management Team</span>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Trading Desk Heads</span>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Executive Committee</span>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Alert Thresholds
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <FormLabel>Market Risk Alert Level (%)</FormLabel>
                        <Select defaultValue="80">
                          <SelectTrigger>
                            <SelectValue placeholder="Select threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="70">70% of limit</SelectItem>
                            <SelectItem value="80">80% of limit</SelectItem>
                            <SelectItem value="90">90% of limit</SelectItem>
                            <SelectItem value="95">95% of limit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FormLabel>Credit Risk Alert Level (%)</FormLabel>
                        <Select defaultValue="85">
                          <SelectTrigger>
                            <SelectValue placeholder="Select threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="70">70% of limit</SelectItem>
                            <SelectItem value="80">80% of limit</SelectItem>
                            <SelectItem value="85">85% of limit</SelectItem>
                            <SelectItem value="90">90% of limit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FormLabel>Liquidity Risk Alert Level (%)</FormLabel>
                        <Select defaultValue="75">
                          <SelectTrigger>
                            <SelectValue placeholder="Select threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="70">70% of requirement</SelectItem>
                            <SelectItem value="75">75% of requirement</SelectItem>
                            <SelectItem value="80">80% of requirement</SelectItem>
                            <SelectItem value="85">85% of requirement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FormLabel>Operational Risk Alert Level</FormLabel>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Severity</SelectItem>
                            <SelectItem value="medium">Medium Severity</SelectItem>
                            <SelectItem value="high">High Severity Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Access Control
                    </CardTitle>
                    <CardDescription>
                      Manage role-based access to risk management functions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Role</th>
                              <th className="text-left py-3 px-4 font-medium">View Reports</th>
                              <th className="text-left py-3 px-4 font-medium">Edit Settings</th>
                              <th className="text-left py-3 px-4 font-medium">Approve Exceptions</th>
                              <th className="text-left py-3 px-4 font-medium">Set Limits</th>
                              <th className="text-left py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { 
                                role: "Risk Manager", 
                                viewReports: true, 
                                editSettings: true, 
                                approveExceptions: true, 
                                setLimits: true
                              },
                              { 
                                role: "Trading Desk Head", 
                                viewReports: true, 
                                editSettings: false, 
                                approveExceptions: true, 
                                setLimits: false
                              },
                              { 
                                role: "Trader", 
                                viewReports: true, 
                                editSettings: false, 
                                approveExceptions: false, 
                                setLimits: false
                              },
                              { 
                                role: "Compliance Officer", 
                                viewReports: true, 
                                editSettings: false, 
                                approveExceptions: false, 
                                setLimits: false
                              },
                              { 
                                role: "Executive", 
                                viewReports: true, 
                                editSettings: false, 
                                approveExceptions: true, 
                                setLimits: true
                              },
                            ].map((role, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4 font-medium">{role.role}</td>
                                <td className="py-3 px-4">
                                  <Switch checked={role.viewReports} />
                                </td>
                                <td className="py-3 px-4">
                                  <Switch checked={role.editSettings} />
                                </td>
                                <td className="py-3 px-4">
                                  <Switch checked={role.approveExceptions} />
                                </td>
                                <td className="py-3 px-4">
                                  <Switch checked={role.setLimits} />
                                </td>
                                <td className="py-3 px-4">
                                  <Button variant="outline" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Button variant="outline">Add New Role</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Approval Workflows
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
                        <div>
                          <h3 className="text-sm font-medium">Limit Exception Approval</h3>
                          <p className="text-sm text-muted-foreground">
                            Workflow for approving limit exceptions
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Select defaultValue="two_level">
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select workflow" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single Approver</SelectItem>
                              <SelectItem value="two_level">Two-Level Approval</SelectItem>
                              <SelectItem value="committee">Committee Approval</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
                        <div>
                          <h3 className="text-sm font-medium">New Risk Model Approval</h3>
                          <p className="text-sm text-muted-foreground">
                            Workflow for approving new risk models
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Select defaultValue="committee">
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select workflow" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single Approver</SelectItem>
                              <SelectItem value="two_level">Two-Level Approval</SelectItem>
                              <SelectItem value="committee">Committee Approval</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <h3 className="text-sm font-medium">Parameter Change Approval</h3>
                          <p className="text-sm text-muted-foreground">
                            Workflow for approving risk parameter changes
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Select defaultValue="two_level">
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select workflow" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single Approver</SelectItem>
                              <SelectItem value="two_level">Two-Level Approval</SelectItem>
                              <SelectItem value="committee">Committee Approval</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Models Tab */}
              <TabsContent value="models" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Risk Models Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure risk calculation models and parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <FormLabel>Market Risk Model</FormLabel>
                          <Select defaultValue="historical">
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="historical">Historical Simulation</SelectItem>
                              <SelectItem value="monte_carlo">Monte Carlo Simulation</SelectItem>
                              <SelectItem value="parametric">Parametric VaR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <FormLabel>Credit Risk Model</FormLabel>
                          <Select defaultValue="credit_metrics">
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="credit_metrics">CreditMetrics</SelectItem>
                              <SelectItem value="kvm">KMV Model</SelectItem>
                              <SelectItem value="creditrisk_plus">CreditRisk+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <FormLabel>Operational Risk Model</FormLabel>
                          <Select defaultValue="loss_distribution">
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="loss_distribution">Loss Distribution Approach</SelectItem>
                              <SelectItem value="scenario_analysis">Scenario Analysis</SelectItem>
                              <SelectItem value="scorecard">Scorecard Approach</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <FormLabel>Liquidity Risk Model</FormLabel>
                          <Select defaultValue="cash_flow">
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash_flow">Cash Flow Analysis</SelectItem>
                              <SelectItem value="liquidity_gap">Liquidity Gap Analysis</SelectItem>
                              <SelectItem value="stress_testing">Stress Testing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Historical Data Configuration</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <FormLabel>Historical Data Range</FormLabel>
                            <Select defaultValue="two_years">
                              <SelectTrigger>
                                <SelectValue placeholder="Select data range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="one_year">1 Year</SelectItem>
                                <SelectItem value="two_years">2 Years</SelectItem>
                                <SelectItem value="three_years">3 Years</SelectItem>
                                <SelectItem value="five_years">5 Years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <FormLabel>Data Weighting Method</FormLabel>
                            <Select defaultValue="exponential">
                              <SelectTrigger>
                                <SelectValue placeholder="Select weighting method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="uniform">Uniform Weighting</SelectItem>
                                <SelectItem value="exponential">Exponential Weighting</SelectItem>
                                <SelectItem value="custom">Custom Weighting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Model Validation Schedule</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <FormLabel>Market Risk Models</FormLabel>
                            <Select defaultValue="monthly">
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <FormLabel>Credit Risk Models</FormLabel>
                            <Select defaultValue="quarterly">
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <FormLabel>Operational Risk Models</FormLabel>
                            <Select defaultValue="quarterly">
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="semi_annually">Semi-Annually</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </div>
    </AppLayout>
  );
}
