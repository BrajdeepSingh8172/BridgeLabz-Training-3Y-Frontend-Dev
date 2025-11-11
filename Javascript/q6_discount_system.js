// Q6: Progressive Discount System
// Applies discount tiers and prints original total, discount %, and final price.

// Sample input
const purchaseTotal = 7389; // adjust to test

let discountPercent = 0;
if (purchaseTotal >= 10000) {
  discountPercent = 25;
} else if (purchaseTotal >= 5000) {
  discountPercent = 15;
} else if (purchaseTotal >= 2000) {
  discountPercent = 5;
} else {
  discountPercent = 0;
}

const discountAmount = (purchaseTotal * discountPercent) / 100;
const finalPrice = Math.round(purchaseTotal - discountAmount);

console.log(`Original total: $${purchaseTotal}`);
console.log(`Discount percentage: ${discountPercent}%`);
console.log(`Final price after discount: $${finalPrice}`);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { purchaseTotal, discountPercent, discountAmount, finalPrice };
}
