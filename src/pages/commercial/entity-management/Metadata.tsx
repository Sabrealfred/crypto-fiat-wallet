
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, Search, Database, ExternalLink, Users, Map, Globe, 
  FileText, ArrowRight, Calendar, Activity
} from "lucide-react";
import { MetadataForm } from "./components/MetadataForm";

// Sample entity data for the dropdown
const entities = [
  { id: 1, name: "Acme Global Holdings Ltd" },
  { id: 2, name: "Acme Financial Services GmbH" },
  { id: 3, name: "Acme Tech Solutions Inc" },
  { id: 4, name: "Acme Asia Pacific Pte Ltd" },
  { id: 5, name: "Acme Investment Vehicles S.A." },
  { id: 6, name: "Acme Mexico Operations LLC" },
  { id: 7, name: "Acme Middle East Branch" },
  { id: 8, name: "Acme Digital Innovations LLC" },
];

export default function MetadataPage() {
  const [selectedEntityId, setSelectedEntityId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState("general");
  
  const selectedEntity = entities.find(entity => entity.id === selectedEntityId);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Metadata" 
          description="Manage detailed information about your legal entities"
          showBack={true}
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <Select 
              value={selectedEntityId.toString()} 
              onValueChange={(value) => setSelectedEntityId(parseInt(value))}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select an entity" />
              </SelectTrigger>
              <SelectContent>
                {entities.map(entity => (
                  <SelectItem key={entity.id} value={entity.id.toString()}>
                    {entity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <ExternalLink className="h-4 w-4" /> View in Structure
            </Button>
            <Button variant="outline" className="gap-1">
              <Database className="h-4 w-4" /> Export Data
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="general" 
          className="mb-6" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-4 overflow-auto">
            <TabsTrigger value="general" className="gap-2">
              <FileText className="h-4 w-4" /> General Information
            </TabsTrigger>
            <TabsTrigger value="classification" className="gap-2">
              <Activity className="h-4 w-4" /> Classification
            </TabsTrigger>
            <TabsTrigger value="governance" className="gap-2">
              <Users className="h-4 w-4" /> Governance
            </TabsTrigger>
            <TabsTrigger value="locations" className="gap-2">
              <Map className="h-4 w-4" /> Locations
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <Calendar className="h-4 w-4" /> Compliance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <MetadataForm entityId={selectedEntityId} entityName={selectedEntity?.name || ""} />
          </TabsContent>
          
          <TabsContent value="classification">
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Entity Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Legal Classification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Entity Type</span>
                            <span className="text-sm">Corporation</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Limited Liability</span>
                            <span className="text-sm">Yes</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Public/Private</span>
                            <span className="text-sm">Private</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">For Profit/Non-Profit</span>
                            <span className="text-sm">For Profit</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Legal Form</span>
                            <span className="text-sm">Limited Company</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Tax Classification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Tax Residency</span>
                            <span className="text-sm">United Kingdom</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Tax Entity Type</span>
                            <span className="text-sm">Corporation</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Tax Transparency</span>
                            <span className="text-sm">Non-transparent</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">VAT Registered</span>
                            <span className="text-sm">Yes</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Tax Group Membership</span>
                            <span className="text-sm">UK Tax Group</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Regulatory Classification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Regulated Entity</span>
                            <span className="text-sm">Yes</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Primary Regulator</span>
                            <span className="text-sm">Financial Conduct Authority (FCA)</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Secondary Regulators</span>
                            <span className="text-sm">Prudential Regulation Authority (PRA)</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Regulatory Licenses</span>
                            <span className="text-sm">Banking License, Investment Services</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Regulatory Status</span>
                            <span className="text-sm">Full Compliance</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Industry Classification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">Primary Industry</span>
                            <span className="text-sm">Financial Services</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">NAICS Code</span>
                            <span className="text-sm">522110</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">SIC Code</span>
                            <span className="text-sm">6021</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm font-medium">GICS Sector</span>
                            <span className="text-sm">Financials</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">GICS Industry</span>
                            <span className="text-sm">Banks</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="governance">
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Governance Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Board of Directors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Jane Smith", position: "Chairperson", appointmentDate: "2019-05-15" },
                            { name: "John Johnson", position: "Non-Executive Director", appointmentDate: "2020-03-22" },
                            { name: "Sarah Williams", position: "Executive Director", appointmentDate: "2018-11-10" },
                            { name: "Robert Chen", position: "Independent Director", appointmentDate: "2021-07-05" },
                          ].map((director, index) => (
                            <div key={index} className="flex justify-between items-center pb-2 border-b last:border-0 last:pb-0">
                              <div>
                                <div className="text-sm font-medium">{director.name}</div>
                                <div className="text-xs text-muted-foreground">{director.position}</div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Since {new Date(director.appointmentDate).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" size="sm" className="mt-2 px-0 flex items-center">
                          View All Board Members <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Executive Officers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Michael Johnson", position: "Chief Executive Officer", appointmentDate: "2017-08-12" },
                            { name: "Lisa Wong", position: "Chief Financial Officer", appointmentDate: "2018-02-15" },
                            { name: "David Müller", position: "Chief Operating Officer", appointmentDate: "2019-11-03" },
                            { name: "Sophia Martinez", position: "Chief Risk Officer", appointmentDate: "2020-06-22" },
                          ].map((officer, index) => (
                            <div key={index} className="flex justify-between items-center pb-2 border-b last:border-0 last:pb-0">
                              <div>
                                <div className="text-sm font-medium">{officer.name}</div>
                                <div className="text-xs text-muted-foreground">{officer.position}</div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Since {new Date(officer.appointmentDate).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" size="sm" className="mt-2 px-0 flex items-center">
                          View All Executive Officers <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Governance Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Articles of Association", lastUpdated: "2022-01-15", status: "Current" },
                            { name: "Board Charter", lastUpdated: "2021-11-30", status: "Current" },
                            { name: "Corporate Governance Framework", lastUpdated: "2023-03-10", status: "Current" },
                            { name: "Committee Terms of Reference", lastUpdated: "2021-09-05", status: "Under Review" },
                          ].map((document, index) => (
                            <div key={index} className="flex justify-between items-center pb-2 border-b last:border-0 last:pb-0">
                              <div>
                                <div className="text-sm font-medium">{document.name}</div>
                                <div className="text-xs text-muted-foreground">Last Updated: {new Date(document.lastUpdated).toLocaleDateString()}</div>
                              </div>
                              <div className="text-xs">
                                {document.status}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" size="sm" className="mt-2 px-0 flex items-center">
                          View Document Repository <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Authorized Signatories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Michael Johnson", position: "CEO", level: "A", limits: "Unlimited" },
                            { name: "Lisa Wong", position: "CFO", level: "A", limits: "Unlimited" },
                            { name: "David Müller", position: "COO", level: "B", limits: "Up to $5M" },
                            { name: "Richard Thompson", position: "Treasurer", level: "B", limits: "Up to $5M" },
                          ].map((signatory, index) => (
                            <div key={index} className="flex justify-between items-center pb-2 border-b last:border-0 last:pb-0">
                              <div>
                                <div className="text-sm font-medium">{signatory.name}</div>
                                <div className="text-xs text-muted-foreground">{signatory.position}</div>
                              </div>
                              <div>
                                <div className="text-sm text-right">Level {signatory.level}</div>
                                <div className="text-xs text-muted-foreground">{signatory.limits}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" size="sm" className="mt-2 px-0 flex items-center">
                          View Signatory Policy <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations">
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Locations & Global Presence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Primary Locations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              type: "Registered Office", 
                              address: "123 Financial Street, London, EC4N 8HL, United Kingdom",
                              contactInfo: "+44 20 7123 4567"
                            },
                            { 
                              type: "Principal Place of Business", 
                              address: "123 Financial Street, London, EC4N 8HL, United Kingdom",
                              contactInfo: "+44 20 7123 4567"
                            },
                            { 
                              type: "Tax Domicile", 
                              address: "United Kingdom",
                              contactInfo: ""
                            },
                          ].map((location, index) => (
                            <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                              <div className="font-medium text-sm mb-1">{location.type}</div>
                              <div className="text-sm">{location.address}</div>
                              {location.contactInfo && (
                                <div className="text-sm text-muted-foreground mt-1">{location.contactInfo}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Service Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              type: "Legal Notices", 
                              address: "Legal Department, 123 Financial Street, London, EC4N 8HL, United Kingdom",
                              contactInfo: "legal@acmeglobal.example.com"
                            },
                            { 
                              type: "Tax Correspondence", 
                              address: "Tax Department, 123 Financial Street, London, EC4N 8HL, United Kingdom",
                              contactInfo: "tax@acmeglobal.example.com"
                            },
                            { 
                              type: "Registered Agent", 
                              address: "Corporate Services Ltd, 456 Agent Street, London, EC2V 7DE, United Kingdom",
                              contactInfo: "+44 20 7456 7890"
                            },
                          ].map((address, index) => (
                            <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                              <div className="font-medium text-sm mb-1">{address.type}</div>
                              <div className="text-sm">{address.address}</div>
                              {address.contactInfo && (
                                <div className="text-sm text-muted-foreground mt-1">{address.contactInfo}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border border-blue-50 dark:border-blue-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Global Operations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg mb-6">
                        <div className="text-muted-foreground text-center">
                          <Globe className="h-10 w-10 mx-auto mb-3 text-muted-foreground/70" />
                          <p>Global operations map visualization would appear here</p>
                          <p className="text-sm">(Showing entity locations across jurisdictions)</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { region: "Europe", countries: ["United Kingdom", "Germany", "France", "Switzerland"], offices: 12 },
                          { region: "Americas", countries: ["United States", "Canada", "Mexico", "Brazil"], offices: 8 },
                          { region: "Asia Pacific", countries: ["Singapore", "Hong Kong", "Japan", "Australia"], offices: 6 },
                        ].map((region, index) => (
                          <Card key={index} className="border border-muted/40">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-2">{region.region}</h4>
                              <p className="text-sm text-muted-foreground mb-1">{region.offices} Offices</p>
                              <div className="text-sm">
                                {region.countries.map((country, i) => (
                                  <span key={i}>
                                    {country}{i < region.countries.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance">
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Compliance Calendar & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Upcoming Compliance Deadlines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left font-medium text-sm py-2">Filing/Requirement</th>
                                <th className="text-left font-medium text-sm py-2">Authority</th>
                                <th className="text-left font-medium text-sm py-2">Jurisdiction</th>
                                <th className="text-left font-medium text-sm py-2">Due Date</th>
                                <th className="text-left font-medium text-sm py-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { 
                                  requirement: "Annual Financial Statements", 
                                  authority: "Companies House",
                                  jurisdiction: "United Kingdom",
                                  dueDate: "2024-06-30",
                                  status: "Pending"
                                },
                                { 
                                  requirement: "Corporation Tax Return", 
                                  authority: "HMRC",
                                  jurisdiction: "United Kingdom",
                                  dueDate: "2024-07-31",
                                  status: "Pending"
                                },
                                { 
                                  requirement: "Confirmation Statement", 
                                  authority: "Companies House",
                                  jurisdiction: "United Kingdom",
                                  dueDate: "2024-08-15",
                                  status: "Not Started"
                                },
                                { 
                                  requirement: "Regulatory Capital Report", 
                                  authority: "FCA",
                                  jurisdiction: "United Kingdom",
                                  dueDate: "2024-05-15",
                                  status: "Completed"
                                },
                                { 
                                  requirement: "VAT Return (Q1)", 
                                  authority: "HMRC",
                                  jurisdiction: "United Kingdom",
                                  dueDate: "2024-04-30",
                                  status: "Completed"
                                },
                              ].map((filing, index) => (
                                <tr key={index} className="border-b last:border-0 hover:bg-muted/20">
                                  <td className="py-3 text-sm">{filing.requirement}</td>
                                  <td className="py-3 text-sm">{filing.authority}</td>
                                  <td className="py-3 text-sm">{filing.jurisdiction}</td>
                                  <td className="py-3 text-sm">{new Date(filing.dueDate).toLocaleDateString()}</td>
                                  <td className="py-3 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs
                                      ${filing.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                        filing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                      }
                                    `}>
                                      {filing.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <Button variant="link" size="sm" className="mt-4 px-0 flex items-center">
                          View Full Compliance Calendar <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">License & Permits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              name: "Banking License", 
                              authority: "Prudential Regulation Authority",
                              expiryDate: "2026-08-15",
                              status: "Active"
                            },
                            { 
                              name: "Investment Services Authorization", 
                              authority: "Financial Conduct Authority",
                              expiryDate: "2025-11-30",
                              status: "Active"
                            },
                            { 
                              name: "Payment Services Registration", 
                              authority: "Financial Conduct Authority",
                              expiryDate: "2025-03-22",
                              status: "Active"
                            },
                            { 
                              name: "Data Protection Registration", 
                              authority: "Information Commissioner's Office",
                              expiryDate: "2024-09-10",
                              status: "Active"
                            },
                          ].map((license, index) => (
                            <div key={index} className="flex justify-between items-center pb-2 border-b last:border-0 last:pb-0">
                              <div>
                                <div className="font-medium text-sm">{license.name}</div>
                                <div className="text-xs text-muted-foreground">{license.authority}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">Exp: {new Date(license.expiryDate).toLocaleDateString()}</div>
                                <div className="text-xs text-green-600 dark:text-green-400">{license.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-50 dark:border-blue-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Compliance Contacts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              role: "Compliance Officer", 
                              name: "Alex Thompson",
                              email: "alex.thompson@acmeglobal.example.com",
                              phone: "+44 20 7123 4567"
                            },
                            { 
                              role: "Money Laundering Reporting Officer", 
                              name: "Sarah Wilson",
                              email: "sarah.wilson@acmeglobal.example.com",
                              phone: "+44 20 7123 4568"
                            },
                            { 
                              role: "Data Protection Officer", 
                              name: "James Miller",
                              email: "james.miller@acmeglobal.example.com",
                              phone: "+44 20 7123 4569"
                            },
                            { 
                              role: "Legal Counsel", 
                              name: "Emma Davis",
                              email: "emma.davis@acmeglobal.example.com",
                              phone: "+44 20 7123 4570"
                            },
                          ].map((contact, index) => (
                            <div key={index} className="pb-2 border-b last:border-0 last:pb-0">
                              <div className="font-medium text-sm">{contact.role}</div>
                              <div className="text-sm">{contact.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{contact.email}</div>
                              <div className="text-xs text-muted-foreground">{contact.phone}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
