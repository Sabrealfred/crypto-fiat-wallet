
// Market data for currency exchange rates charts
export const marketData = {
  eurUsd: [
    { date: 'Aug 10', value: 1.08 },
    { date: 'Aug 11', value: 1.09 },
    { date: 'Aug 12', value: 1.085 },
    { date: 'Aug 13', value: 1.095 },
    { date: 'Aug 14', value: 1.1 },
    { date: 'Aug 15', value: 1.092 },
    { date: 'Aug 16', value: 1.088 },
    { date: 'Aug 17', value: 1.078 },
    { date: 'Aug 18', value: 1.082 },
  ],
  usdGbp: [
    { date: 'Aug 10', value: 0.78 },
    { date: 'Aug 11', value: 0.775 },
    { date: 'Aug 12', value: 0.77 },
    { date: 'Aug 13', value: 0.765 },
    { date: 'Aug 14', value: 0.76 },
    { date: 'Aug 15', value: 0.77 },
    { date: 'Aug 16', value: 0.775 },
    { date: 'Aug 17', value: 0.78 },
    { date: 'Aug 18', value: 0.782 },
  ],
  usdCad: [
    { date: 'Aug 10', value: 1.35 },
    { date: 'Aug 11', value: 1.36 },
    { date: 'Aug 12', value: 1.355 },
    { date: 'Aug 13', value: 1.358 },
    { date: 'Aug 14', value: 1.35 },
    { date: 'Aug 15', value: 1.345 },
    { date: 'Aug 16', value: 1.35 },
    { date: 'Aug 17', value: 1.355 },
    { date: 'Aug 18', value: 1.36 },
  ],
  creditDefault: [
    { date: 'Aug 10', value: 50 },
    { date: 'Aug 11', value: 52 },
    { date: 'Aug 12', value: 51 },
    { date: 'Aug 13', value: 50 },
    { date: 'Aug 14', value: 48 },
    { date: 'Aug 15', value: 50 },
    { date: 'Aug 16', value: 53 },
    { date: 'Aug 17', value: 55 },
    { date: 'Aug 18', value: 58 },
  ]
};

// Cash flow data
export const cashFlowData = [
  { month: 'Jan', inflow: 4000, outflow: 2400 },
  { month: 'Feb', inflow: 3000, outflow: 1398 },
  { month: 'Mar', inflow: 2000, outflow: 9800 },
  { month: 'Apr', inflow: 2780, outflow: 3908 },
  { month: 'May', inflow: 1890, outflow: 4800 },
  { month: 'Jun', inflow: 2390, outflow: 3800 }
];

// Liquidity data
export const liquidityData = [
  { name: 'Week 1', value: 4000 },
  { name: 'Week 2', value: 3000 },
  { name: 'Week 3', value: 5000 },
  { name: 'Week 4', value: 2780 },
  { name: 'Week 5', value: 1890 },
  { name: 'Week 6', value: 2390 }
];

// Balance allocation data
export const balanceAllocationData = [
  { name: 'USD (40%)', value: 40, color: '#3b82f6' },
  { name: 'EUR (25%)', value: 25, color: '#8b5cf6' },
  { name: 'GBP (15%)', value: 15, color: '#ec4899' },
  { name: 'JPY (10%)', value: 10, color: '#f97316' },
  { name: 'CAD (5%)', value: 5, color: '#22c55e' },
  { name: 'AUD (5%)', value: 5, color: '#eab308' },
];

// Bank connections for the integrations card
export const bankIntegrations = [
  {
    type: "banking",
    system: "Chase Bank API",
    status: "active" as const,
    lastSync: "2023-11-25 09:30:22",
    frequency: "Every 1 hour",
    syncCount: 152
  },
  {
    type: "banking",
    system: "Wells Fargo",
    status: "active" as const,
    lastSync: "2023-11-25 08:45:10",
    frequency: "Every 3 hours",
    syncCount: 98
  },
  {
    type: "erp",
    system: "Oracle NetSuite",
    status: "active" as const,
    lastSync: "2023-11-25 07:15:45",
    frequency: "Every 6 hours",
    syncCount: 64
  }
];
