
export const calculateProgressWidth = (value: number, max: number): string => {
  return Math.floor((value / max) * 100) + '%';
};

export const calculateTaskPercentage = (completed: number, total: number): string => {
  return Math.floor((completed / total) * 100) + '%';
};

export const calculateAllocationPercentage = (allocatedAmount: number, totalAllocated: number): string => {
  return Math.floor((allocatedAmount / totalAllocated) * 100) + '%';
};
