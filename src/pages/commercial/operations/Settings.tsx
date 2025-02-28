
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  Settings, Users, Bell, Shield, Database, Globe, Building2, 
  Lock, CreditCard, BellRing, Eye, EyeOff, Sliders
} from "lucide-react";
import { useState } from "react";

export default function MultiAccountSettingsPage() {
  const navigate = useNavigate();
  const [isApiVisible, setIsApiVisible] = useState(false);
  
  const accounts = [
    { id: "acc1", name: "Operating Account", type: "Primary", status: "Active" },
    { id: "acc2", name: "Treasury Account", type: "Savings", status: "Active" },
    { id: "acc3", name: "Investment Fund", type: "Investment", status: "Active" },
    { id: "acc4", name: "Operations Account", type: "Expense", status: "Inactive" },
  ];
  
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Multi-Account Settings" 
          description="Configure and manage multiple business accounts"
          showBack={true}
        />
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          {/* General Settings Tab */}
          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Organization Settings</CardTitle>
                  <CardDescription>
                    Manage your organization details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input id="org-name" defaultValue="Global Enterprises Ltd." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org-id">Organization ID</Label>
                        <Input id="org-id" defaultValue="GEL-12345" readOnly className="bg-muted" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-currency">Primary Currency</Label>
                        <Input id="primary-currency" defaultValue="USD" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fiscal-year">Fiscal Year End</Label>
                      <Input id="fiscal-year" defaultValue="December 31" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Display Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="date-format">Date Format</Label>
                          <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
                        </div>
                        <Input id="date-format" defaultValue="MM/DD/YYYY" className="w-[180px]" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="number-format">Number Format</Label>
                          <p className="text-sm text-muted-foreground">Select how numbers should be displayed</p>
                        </div>
                        <Input id="number-format" defaultValue="1,234.56" className="w-[180px]" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compact-view">Compact View</Label>
                          <p className="text-sm text-muted-foreground">Show compact view in reports and dashboards</p>
                        </div>
                        <Switch id="compact-view" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">API Settings</CardTitle>
                  <CardDescription>
                    Manage your API keys and settings for programmatic access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>API Access</Label>
                      <p className="text-sm text-muted-foreground">Enable API access for your organization</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="api-key">API Key</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsApiVisible(!isApiVisible)}
                      >
                        {isApiVisible ? (
                          <EyeOff className="h-4 w-4 mr-2" />
                        ) : (
                          <Eye className="h-4 w-4 mr-2" />
                        )}
                        {isApiVisible ? "Hide" : "Show"}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        id="api-key" 
                        type={isApiVisible ? "text" : "password"} 
                        value={isApiVisible ? "pk_live_51MzT5oBQPzJfXxQwFbVFGwZ" : "••••••••••••••••••••••••••••"}
                        readOnly 
                        className="pr-24" 
                      />
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="absolute right-1 top-1"
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Keep your API key secure. Don't share it in publicly accessible areas.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rate Limits</Label>
                    <div className="flex items-center gap-4">
                      <Input defaultValue="1000" className="w-24" />
                      <span className="text-sm text-muted-foreground">requests per minute</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Generate New API Key</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Accounts Tab */}
          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Connected Accounts</CardTitle>
                <CardDescription>
                  Manage all business accounts connected to your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-medium">{account.name}</h3>
                        <p className="text-sm text-muted-foreground">{account.type}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          account.status === "Active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                        }`}>
                          {account.status}
                        </span>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Connect New Account</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Account Permissions</CardTitle>
                <CardDescription>
                  Configure role-based access for different accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 font-medium p-2">
                    <div>Role</div>
                    <div>View</div>
                    <div>Edit</div>
                    <div>Approve</div>
                  </div>
                  {["Administrator", "Treasury Manager", "Accountant", "Analyst"].map((role) => (
                    <div key={role} className="grid grid-cols-4 gap-4 items-center p-2 border-b">
                      <div>{role}</div>
                      <div><Switch defaultChecked /></div>
                      <div><Switch defaultChecked={["Administrator", "Treasury Manager"].includes(role)} /></div>
                      <div><Switch defaultChecked={role === "Administrator"} /></div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset Defaults</Button>
                <Button>Save Permissions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure security policies for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multi-Factor Authentication (MFA)</Label>
                      <p className="text-sm text-muted-foreground">Require MFA for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Single Sign-On (SSO)</Label>
                      <p className="text-sm text-muted-foreground">Enable SSO with your identity provider</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <div className="flex items-center gap-4">
                      <Input id="session-timeout" defaultValue="30" className="w-24" />
                      <span className="text-sm text-muted-foreground">minutes</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password-length">Minimum Password Length</Label>
                    <div className="flex items-center gap-4">
                      <Input id="password-length" defaultValue="12" className="w-24" />
                      <span className="text-sm text-muted-foreground">characters</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Special Characters</Label>
                      <p className="text-sm text-muted-foreground">At least one special character required</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Password Expiry</Label>
                      <p className="text-sm text-muted-foreground">Require password change every 90 days</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">IP Restrictions</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Allow List</Label>
                      <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                    <Input id="allowed-ips" placeholder="192.168.1.1, 10.0.0.1" />
                    <p className="text-sm text-muted-foreground">
                      Enter IP addresses separated by commas
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Bank Integrations</CardTitle>
                <CardDescription>
                  Manage connections to financial institutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Global Banking Corp", status: "Connected", type: "API" },
                    { name: "National Financial Services", status: "Connected", type: "SFTP" },
                    { name: "Eastern Trust Bank", status: "Pending", type: "API" },
                    { name: "International Finance", status: "Disconnected", type: "SWIFT" }
                  ].map((bank, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40">
                          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{bank.name}</h3>
                          <p className="text-sm text-muted-foreground">Connection: {bank.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bank.status === "Connected" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : bank.status === "Pending"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                        }`}>
                          {bank.status}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          {bank.status === "Connected" ? "Configure" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add New Integration</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Payment Gateways</CardTitle>
                <CardDescription>
                  Manage payment processing integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Global Payments", status: "Active", default: true },
                    { name: "Secure Transfer", status: "Active", default: false },
                    { name: "Quick Payments", status: "Inactive", default: false }
                  ].map((gateway, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40">
                          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{gateway.name}</h3>
                            {gateway.default && (
                              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Gateway ID: GW-{1000 + i}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          gateway.status === "Active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                        }`}>
                          {gateway.status}
                        </span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add Payment Gateway</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure alerts and notifications for all users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Account Activity</Label>
                          <p className="text-sm text-muted-foreground">Login attempts and security alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Maintenance</Label>
                          <p className="text-sm text-muted-foreground">Planned maintenance and system updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Feature Updates</Label>
                          <p className="text-sm text-muted-foreground">New features and improvements</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Transaction Alerts</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Large Transactions</Label>
                          <p className="text-sm text-muted-foreground">Alert for transactions above threshold</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="transaction-threshold">Transaction Threshold</Label>
                        <div className="flex items-center gap-4">
                          <Input id="transaction-threshold" defaultValue="10000" className="w-28" />
                          <span className="text-sm text-muted-foreground">USD</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Payment Approvals</Label>
                          <p className="text-sm text-muted-foreground">Alert for payment approval requests</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Failed Transactions</Label>
                          <p className="text-sm text-muted-foreground">Alert for failed or rejected transactions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send alerts to registered email addresses</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send text alerts to registered phone numbers</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>In-App Notifications</Label>
                          <p className="text-sm text-muted-foreground">Show notifications in the application</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
