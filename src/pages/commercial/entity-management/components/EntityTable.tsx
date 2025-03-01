
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, Search, Filter, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

export function EntityTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sample entity data
  const entities = [
    {
      id: 1,
      name: "Acme Global Holdings Ltd",
      jurisdiction: "United Kingdom",
      registrationNumber: "UK29384756",
      type: "Holding Company",
      status: "Active",
      riskLevel: "Low",
      lastReview: "2023-12-15",
    },
    {
      id: 2,
      name: "Acme Financial Services GmbH",
      jurisdiction: "Germany",
      registrationNumber: "DE839275612",
      type: "Operating Subsidiary",
      status: "Active",
      riskLevel: "Medium",
      lastReview: "2024-01-22",
    },
    {
      id: 3,
      name: "Acme Tech Solutions Inc",
      jurisdiction: "United States",
      registrationNumber: "US74659283",
      type: "Operating Subsidiary",
      status: "Active",
      riskLevel: "Low",
      lastReview: "2024-02-10",
    },
    {
      id: 4,
      name: "Acme Asia Pacific Pte Ltd",
      jurisdiction: "Singapore",
      registrationNumber: "SG92837465",
      type: "Regional Headquarters",
      status: "Active",
      riskLevel: "Low",
      lastReview: "2024-01-05",
    },
    {
      id: 5,
      name: "Acme Investment Vehicles SA",
      jurisdiction: "Switzerland",
      registrationNumber: "CH23867492",
      type: "Special Purpose Vehicle",
      status: "Inactive",
      riskLevel: "Medium",
      lastReview: "2023-11-30",
    },
    {
      id: 6,
      name: "Acme Manufacturing Ltd",
      jurisdiction: "United Kingdom",
      registrationNumber: "UK73629485",
      type: "Operating Subsidiary",
      status: "Active",
      riskLevel: "High",
      lastReview: "2024-03-01",
    },
  ];

  // Filter entities based on search term
  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort entities
  const sortedEntities = [...filteredEntities].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  // Handle sort
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Handle view details
  const handleViewDetails = (entityId) => {
    navigate(`/commercial/entity-management/metadata/${entityId}`);
  };

  return (
    <Card className="mb-6 border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl">Corporate Entities</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search entities..."
                className="pl-8 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th
                  className="text-left py-3 px-4 font-medium cursor-pointer hover:text-blue-600"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Entity Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium cursor-pointer hover:text-blue-600"
                  onClick={() => handleSort("jurisdiction")}
                >
                  <div className="flex items-center">
                    Jurisdiction
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium cursor-pointer hover:text-blue-600"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium cursor-pointer hover:text-blue-600"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium cursor-pointer hover:text-blue-600"
                  onClick={() => handleSort("riskLevel")}
                >
                  <div className="flex items-center">
                    Risk Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntities.map((entity) => (
                <tr key={entity.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{entity.name}</td>
                  <td className="py-3 px-4">{entity.jurisdiction}</td>
                  <td className="py-3 px-4">{entity.type}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant={entity.status === "Active" ? "outline" : "outline"}
                      className={
                        entity.status === "Active" 
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                      }
                    >
                      {entity.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant="outline"
                      className={
                        entity.riskLevel === "Low" 
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : entity.riskLevel === "Medium"
                            ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }
                    >
                      {entity.riskLevel}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(entity.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredEntities.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-muted-foreground">
                    No entities found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
