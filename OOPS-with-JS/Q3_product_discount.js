/**
 * Q3 - Product Discount System
 * 
 * This program demonstrates:
 * - Constructor functions (function-based OOP)
 * - Prototype methods
 * - Abstraction through simplified operations
 * - How prototypes allow shared methods across instances
 */

/**
 * Product Constructor Function
 * @param {string} name - Product name
 * @param {number} price - Original price
 */
function Product(name, price) {
  this.name = name;
  this.price = price;
}

/**
 * Prototype method to apply discount
 * This method is shared across all Product instances (memory efficient)
 * @param {number} percent - Discount percentage (0-100)
 * @returns {number} New price after discount
 */
Product.prototype.applyDiscount = function(percent) {
  // Validate discount percentage
  if (percent < 0 || percent > 100) {
    throw new Error("Discount percentage must be between 0 and 100");
  }

  // Calculate discounted price
  const discount = (this.price * percent) / 100;
  const newPrice = this.price - discount;
  
  return newPrice;
};

/**
 * Prototype method to display product details
 */
Product.prototype.displayInfo = function() {
  console.log(`\nProduct: ${this.name}`);
  console.log(`Original Price: ₹${this.price.toFixed(2)}`);
};

/**
 * Prototype method to display discounted price
 * Demonstrates abstraction - complex calculation hidden in simple method
 */
Product.prototype.displayDiscountedPrice = function(percent) {
  const newPrice = this.applyDiscount(percent);
  const savings = this.price - newPrice;
  
  console.log(`Discount: ${percent}%`);
  console.log(`Discounted Price: ₹${newPrice.toFixed(2)}`);
  console.log(`You Save: ₹${savings.toFixed(2)} 💰`);
  console.log("-".repeat(50));
};

// ==================== CREATE 3 PRODUCTS ====================

console.log("🛍️  PRODUCT DISCOUNT SYSTEM");
console.log("=".repeat(50));

// Product 1: Laptop
const laptop = new Product("Dell Inspiron Laptop", 45000);

// Product 2: Smartphone
const smartphone = new Product("Samsung Galaxy S23", 65000);

// Product 3: Headphones
const headphones = new Product("Sony WH-1000XM5 Headphones", 25000);

// ==================== APPLY DIFFERENT DISCOUNTS ====================

console.log("\n📦 PRODUCT 1: LAPTOP");
console.log("=".repeat(50));
laptop.displayInfo();
laptop.displayDiscountedPrice(15); // 15% discount

console.log("\n📱 PRODUCT 2: SMARTPHONE");
console.log("=".repeat(50));
smartphone.displayInfo();
smartphone.displayDiscountedPrice(20); // 20% discount

console.log("\n🎧 PRODUCT 3: HEADPHONES");
console.log("=".repeat(50));
headphones.displayInfo();
headphones.displayDiscountedPrice(10); // 10% discount

// ==================== DEMONSTRATE ABSTRACTION ====================

console.log("\n\n🎯 ABSTRACTION DEMONSTRATION");
console.log("=".repeat(50));
console.log("\n💡 Abstraction simplifies complex operations:");
console.log("\nInstead of manually calculating:");
console.log("  discount = (price * percent) / 100");
console.log("  newPrice = price - discount");
console.log("\nWe simply call:");
console.log("  product.applyDiscount(percent)");
console.log("\nThe complexity is hidden inside the method! ✨");

// Example of direct discount calculation (without abstraction)
console.log("\n\n📊 COMPARISON: With vs Without Abstraction");
console.log("=".repeat(50));

const testProduct = new Product("Test Product", 1000);

// WITHOUT ABSTRACTION (manual calculation)
console.log("\n❌ WITHOUT ABSTRACTION (Manual):");
const manualDiscount = (testProduct.price * 25) / 100;
const manualNewPrice = testProduct.price - manualDiscount;
console.log(`Original: ₹${testProduct.price}`);
console.log(`Discount: 25%`);
console.log(`Manual Calculation: ₹${manualNewPrice}`);
console.log("⚠️  Error-prone, repetitive, hard to maintain");

// WITH ABSTRACTION (using method)
console.log("\n✅ WITH ABSTRACTION (Using Method):");
const abstractedPrice = testProduct.applyDiscount(25);
console.log(`Original: ₹${testProduct.price}`);
console.log(`Discount: 25%`);
console.log(`Method Call: ₹${abstractedPrice}`);
console.log("✨ Clean, reusable, easy to maintain");

// ==================== PROTOTYPE CHAIN DEMONSTRATION ====================

console.log("\n\n🔗 PROTOTYPE CHAIN VERIFICATION");
console.log("=".repeat(50));

console.log("\n1. Check if applyDiscount is on prototype:");
console.log(`   ${Product.prototype.hasOwnProperty('applyDiscount')}`); // true

console.log("\n2. All products share the same prototype method:");
console.log(`   laptop.applyDiscount === smartphone.applyDiscount: ${laptop.applyDiscount === smartphone.applyDiscount}`);
console.log(`   laptop.applyDiscount === headphones.applyDiscount: ${laptop.applyDiscount === headphones.applyDiscount}`);

console.log("\n3. Memory efficiency - one method for all instances:");
console.log("   Instead of each product having its own copy,");
console.log("   they all share the prototype method! 🚀");

// ==================== ABSTRACTION BENEFITS ====================

console.log("\n\n📚 HOW ABSTRACTION HELPS:");
console.log("=".repeat(50));
console.log(`
1. SIMPLIFICATION:
   - Hide complex discount calculation logic
   - User just calls applyDiscount(percent)
   - No need to know the internal formula

2. REUSABILITY:
   - Same method works for all products
   - No code duplication
   - Consistent behavior

3. MAINTAINABILITY:
   - Change formula in one place
   - All products automatically get the update
   - Reduces bugs

4. ENCAPSULATION:
   - Implementation details are hidden
   - Only expose what's necessary
   - Clean interface for users

5. ERROR HANDLING:
   - Centralized validation
   - Consistent error messages
   - Easier to debug
`);

// ==================== BATCH DISCOUNT EXAMPLE ====================

console.log("\n💰 BATCH DISCOUNT EXAMPLE");
console.log("=".repeat(50));

const products = [laptop, smartphone, headphones];
const seasonalDiscount = 12;

console.log(`\nApplying ${seasonalDiscount}% seasonal discount to all products:\n`);

products.forEach((product, index) => {
  const discountedPrice = product.applyDiscount(seasonalDiscount);
  console.log(`${index + 1}. ${product.name.padEnd(30)} ₹${product.price} → ₹${discountedPrice.toFixed(2)}`);
});

console.log("\n✅ Abstraction made this operation simple and clean!");

/**
 * CONSTRUCTOR FUNCTION vs CLASS:
 * ===============================
 * 
 * Constructor Function (ES5):
 * ---------------------------
 * function Product(name, price) {
 *   this.name = name;
 *   this.price = price;
 * }
 * Product.prototype.applyDiscount = function(percent) { ... }
 * 
 * 
 * Equivalent Class (ES6):
 * ----------------------
 * class Product {
 *   constructor(name, price) {
 *     this.name = name;
 *     this.price = price;
 *   }
 *   applyDiscount(percent) { ... }
 * }
 * 
 * Both work the same way internally!
 * Classes are syntactic sugar over constructor functions.
 * 
 * 
 * ABSTRACTION IN ACTION:
 * ======================
 * Complex calculation:
 *   discount = (price * percent) / 100
 *   newPrice = price - discount
 *   savings = price - newPrice
 * 
 * Abstracted to:
 *   applyDiscount(percent)
 * 
 * User doesn't need to know HOW, just WHAT it does!
 */
