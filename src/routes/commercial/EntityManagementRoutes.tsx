
import { Route } from "react-router-dom";
import EntityManagementDashboardPage from "@/pages/commercial/entity-management/Dashboard";
import SubsidiariesPage from "@/pages/commercial/entity-management/Subsidiaries";
import MetadataPage from "@/pages/commercial/entity-management/Metadata";
import RelationshipsPage from "@/pages/commercial/entity-management/Relationships";

export const EntityManagementRoutes = () => {
  return (
    <Route path="entity-management">
      <Route index element={<EntityManagementDashboardPage />} />
      <Route path="subsidiaries" element={<SubsidiariesPage />} />
      <Route path="metadata" element={<MetadataPage />} />
      <Route path="relationships" element={<RelationshipsPage />} />
    </Route>
  );
};
