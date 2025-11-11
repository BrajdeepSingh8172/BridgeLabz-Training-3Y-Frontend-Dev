// Q8: Employee Salary Projection
// Compute 5-year salary projection using an annual increment rate.

let currentSalary = 55000; // base salary
const annualIncrementRate = 6; // percent per year

const projection = [];
for (let year = 1; year <= 5; year++) {
  // Apply increment
  currentSalary = currentSalary * (1 + annualIncrementRate / 100);
  // Round to nearest integer for yearly salary
  const rounded = Math.round(currentSalary);
  projection.push({ year: year, salary: rounded });
}

console.table(projection);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { startingSalary: 55000, annualIncrementRate, projection };
}
