
export type TransferType = {
  id: string;
  name: string;
  code: string;
  description: string;
  requirements: Record<string, string>;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
  exchange_rate: number;
};
