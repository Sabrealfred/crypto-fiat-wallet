
// Fix for line 135, 317, and 426
// Converting string to number before arithmetic operations

// For line 135:
const calculatedWidth = Math.floor(Number(item.value) / Number(item.max) * 100) + '%';

// For line 317:
const percentComplete = Math.floor(Number(taskData.completed) / Number(taskData.total) * 100) + '%';

// For line 426:
const percentAllocated = Math.floor(Number(item.allocatedAmount) / Number(totalAllocated) * 100) + '%';
