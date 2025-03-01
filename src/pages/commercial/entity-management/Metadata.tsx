
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ArrowLeft, 
  Plus, 
  Tag, 
  Table as TableIcon, 
  Edit,
  Trash2,
  Info,
  Settings,
  FileDigit,
  HelpCircle,
  Check,
  Download,
  Upload
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample metadata fields
const metadataFields = [
  { 
    id: 1,
    name: "Tax ID Number",
    fieldType: "Text",
    required: true,
    entityTypes: ["All"],
    description: "Government-assigned tax identification number",
    validation: "Alphanumeric",
    createdDate: "2023-05-10"
  },
  { 
    id: 2,
    name: "Risk Rating",
    fieldType: "Select",
    required: true,
    entityTypes: ["All"],
    description: "Internal risk classification",
    validation: "Options: Low, Medium, High",
    createdDate: "2023-05-10"
  },
  { 
    id: 3,
    name: "Fiscal Year End",
    fieldType: "Date",
    required: true,
    entityTypes: ["All"],
    description: "End date of fiscal year",
    validation: "Valid date",
    createdDate: "2023-06-15"
  },
  { 
    id: 4,
    name: "Primary Business Activity",
    fieldType: "Select",
    required: true,
    entityTypes: ["All"],
    description: "Main business activity of the entity",
    validation: "Predefined list of industry categories",
    createdDate: "2023-06-15"
  },
  { 
    id: 5,
    name: "Board Size",
    fieldType: "Number",
    required: false,
    entityTypes: ["Corporate"],
    description: "Number of board members",
    validation: "Integer > 0",
    createdDate: "2023-07-20"
  },
  { 
    id: 6,
    name: "Legal Counsel",
    fieldType: "Text",
    required: false,
    entityTypes: ["Corporate", "Partnership"],
    description: "Primary legal representation",
    validation: "None",
    createdDate: "2023-08-05"
  },
  { 
    id: 7,
    name: "Regulatory Licenses",
    fieldType: "MultiSelect",
    required: false,
    entityTypes: ["Financial"],
    description: "Active regulatory licenses",
    validation: "At least one selection for Financial entities",
    createdDate: "2023-09-12"
  },
  { 
    id: 8,
    name: "Capital Amount",
    fieldType: "Currency",
    required: true,
    entityTypes: ["Corporate", "Partnership"],
    description: "Authorized capital amount",
    validation: "Numeric, > 0",
    createdDate: "2023-10-18"
  }
];

// Sample templates
const templates = [
  { id: 1, name: "Standard Corporate Entity", fields: 12, lastUpdated: "2024-01-15" },
  { id: 2, name: "Financial Institution", fields: 18, lastUpdated: "2024-02-10" },
  { id: 3, name: "Holding Company", fields: 10, lastUpdated: "2023-12-05" },
  { id: 4, name: "Special Purpose Vehicle", fields: 14, lastUpdated: "2024-01-28" }
];

// Sample data dictionary categories
const dataCategories = [
  { id: 1, name: "Basic Information", fields: 8 },
  { id: 2, name: "Governance", fields: 10 },
  { id: 3, name: "Regulatory", fields: 15 },
  { id: 4, name: "Financial", fields: 12 },
  { id: 5, name: "Tax", fields: 9 },
  { id: 6, name: "Legal", fields: 7 }
];

export default function MetadataPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("fields");
  const [fieldType, setFieldType] = useState<string>("all");
  
  // Filter metadata fields based on search term and field type
  const filteredFields = metadataFields.filter(field => {
    const matchesSearch = 
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      field.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = fieldType === "all" || field.fieldType === fieldType;
    
    return matchesSearch && matchesType;
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Entity Metadata" 
          description="Manage custom data attributes for entities"
          showBack={true}
        />

        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="pl-0" 
            onClick={() => navigate("/commercial/entity-management")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Entity Management
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="fields" className="flex items-center gap-1">
              <Tag className="h-4 w-4 md:mr-1" />
              <span className="md:block">Metadata Fields</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-1">
              <TableIcon className="h-4 w-4 md:mr-1" />
              <span className="md:block">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="dictionary" className="flex items-center gap-1">
              <FileText className="h-4 w-4 md:mr-1" />
              <span className="md:block">Data Dictionary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fields">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Custom Metadata Fields
                  </CardTitle>
                  <Button onClick={() => alert("Add new metadata field")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Field
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search fields..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="w-full sm:w-64">
                    <Select value={fieldType} onValueChange={setFieldType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Field Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Field Types</SelectItem>
                        <SelectItem value="Text">Text</SelectItem>
                        <SelectItem value="Number">Number</SelectItem>
                        <SelectItem value="Date">Date</SelectItem>
                        <SelectItem value="Select">Select</SelectItem>
                        <SelectItem value="MultiSelect">Multi-Select</SelectItem>
                        <SelectItem value="Currency">Currency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Field Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Entity Types</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFields.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No metadata fields found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredFields.map((field) => (
                          <TableRow key={field.id}>
                            <TableCell className="font-medium">{field.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{field.fieldType}</Badge>
                            </TableCell>
                            <TableCell>
                              {field.required ? (
                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Yes</Badge>
                              ) : (
                                <Badge variant="outline">No</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {field.entityTypes.map((type, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate" title={field.description}>
                              {field.description}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => alert(`Edit field: ${field.name}`)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => alert(`Delete field: ${field.name}?`)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredFields.length} of {metadataFields.length} fields
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => alert("Import fields from CSV")}>
                      <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => alert("Export fields to CSV")}>
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <TableIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Entity Templates
                  </CardTitle>
                  <Button onClick={() => alert("Create new template")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="border border-muted">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{template.name}</h3>
                          <Badge variant="outline">{template.fields} Fields</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Last updated: {new Date(template.lastUpdated).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => alert(`View template: ${template.name}`)}
                          >
                            <FileText className="mr-2 h-4 w-4" /> View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => alert(`Edit template: ${template.name}`)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => alert(`Apply template: ${template.name}`)}
                          >
                            <Check className="mr-2 h-4 w-4" /> Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <Card className="border border-dashed border-muted bg-muted/30">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium mb-1">Create Custom Template</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Design a new template with custom fields for specific entity types
                      </p>
                      <Button onClick={() => alert("Create new template")}>
                        Create Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dictionary">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Data Dictionary
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => alert("Export data dictionary")}>
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button onClick={() => alert("Add new category")}>
                      <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      Categories
                    </h3>
                    <div className="space-y-4">
                      {dataCategories.map((category) => (
                        <div 
                          key={category.id} 
                          className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                          onClick={() => alert(`View category: ${category.name}`)}
                        >
                          <div className="flex items-center gap-3">
                            <FileDigit className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="outline">{category.fields} Fields</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      About the Data Dictionary
                    </h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        The Data Dictionary provides standardized definitions for all metadata fields used across the entity management system.
                      </p>
                      <p>
                        It ensures consistency in data collection, validation, and reporting across all entities in your organization.
                      </p>
                      <p>
                        Use the categories on the left to browse fields by type, or export the full dictionary for reference.
                      </p>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Key Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                          <li>Standardized data collection across entities</li>
                          <li>Improved data quality and consistency</li>
                          <li>Enhanced reporting capabilities</li>
                          <li>Simplified compliance processes</li>
                          <li>Better integration with other systems</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => alert("View data dictionary documentation")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Dictionary Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/commercial/entity-management/subsidiaries")}
            className="flex items-center gap-2"
          >
            <TableIcon className="h-4 w-4" />
            Manage Subsidiaries
          </Button>
          
          <Button 
            onClick={() => navigate("/commercial/entity-management/relationships")}
            className="flex items-center gap-2"
          >
            View Entity Relationships
            <Network className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
