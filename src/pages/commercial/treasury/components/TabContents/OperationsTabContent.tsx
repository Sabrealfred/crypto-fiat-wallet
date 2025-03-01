
import { OperationsCard } from "../OperationsCard";
import { BankConnectionsCard } from "../BankConnectionsCard";
import { bankIntegrations } from "../../data/marketData";

export const OperationsTabContent = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <OperationsCard />
      <BankConnectionsCard bankIntegrations={bankIntegrations} />
    </div>
  );
};
