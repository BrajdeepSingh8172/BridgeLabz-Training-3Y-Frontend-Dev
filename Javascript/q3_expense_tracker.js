// Q3: Monthly Expense Tracker
// Tracks 5 expense categories, computes total, average, adds 10% tax to total.

const expenses = [
  { category: 'food', amount: 450.5 },
  { category: 'travel', amount: 150.25 },
  { category: 'rent', amount: 1200.0 },
  { category: 'bills', amount: 230.75 },
  { category: 'leisure', amount: 99.99 }
];

// Sum amounts
const total = expenses.reduce((sum, e) => sum + e.amount, 0);
// Average across categories
const average = total / expenses.length;
// Add 10% tax to total
const taxRate = 0.10;
const finalAmount = total + total * taxRate;

// Use toFixed(2) for display
console.log('Expense Breakdown:');
expenses.forEach(e => console.log(`${e.category}: $${e.amount.toFixed(2)}`));
console.log(`Total: $${total.toFixed(2)}`);
console.log(`Average per category: $${average.toFixed(2)}`);
console.log(`Final amount after ${taxRate * 100}% tax: $${finalAmount.toFixed(2)}`);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { expenses, total, average, taxRate, finalAmount };
}
