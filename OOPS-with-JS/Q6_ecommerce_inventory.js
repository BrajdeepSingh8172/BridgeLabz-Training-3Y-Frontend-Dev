/**
 * Q6 - E-Commerce Inventory System
 * 
 * This program demonstrates:
 * - Array manipulation methods (filter, sort, reduce)
 * - Object grouping using reduce
 * - Real-world inventory management
 * - Multiple array operations
 */

// Sample inventory data
const inventory = [
  { id: 1, name: "Laptop", category: "Electronics", price: 45000, stock: 5 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 25000, stock: 12 },
  { id: 3, name: "Headphones", category: "Electronics", price: 2500, stock: 8 },
  { id: 4, name: "T-Shirt", category: "Clothing", price: 500, stock: 3 },
  { id: 5, name: "Jeans", category: "Clothing", price: 1500, stock: 15 },
  { id: 6, name: "Running Shoes", category: "Footwear", price: 3500, stock: 7 },
  { id: 7, name: "Watch", category: "Accessories", price: 8000, stock: 2 },
  { id: 8, name: "Backpack", category: "Accessories", price: 1200, stock: 20 },
  { id: 9, name: "Gaming Mouse", category: "Electronics", price: 1500, stock: 4 },
  { id: 10, name: "Formal Shirt", category: "Clothing", price: 1000, stock: 6 },
  { id: 11, name: "Sneakers", category: "Footwear", price: 2500, stock: 10 },
  { id: 12, name: "Tablet", category: "Electronics", price: 18000, stock: 1 },
  { id: 13, name: "Sunglasses", category: "Accessories", price: 2000, stock: 5 },
  { id: 14, name: "Belt", category: "Accessories", price: 800, stock: 2 }
];

/**
 * Function 1: Get products with low stock (stock <= 5)
 * Uses filter() method
 */
function getLowStockProducts(products, threshold = 5) {
  return products.filter(product => product.stock <= threshold);
}

/**
 * Function 2: Sort products by price
 * Uses sort() method
 */
function sortProductsByPrice(products, order = 'asc') {
  // Create a copy to avoid mutating original array
  const sortedProducts = [...products];
  
  return sortedProducts.sort((a, b) => {
    if (order === 'asc') {
      return a.price - b.price; // Ascending order
    } else {
      return b.price - a.price; // Descending order
    }
  });
}

/**
 * Function 3: Calculate total inventory value
 * Uses reduce() method
 */
function calculateTotalInventoryValue(products) {
  return products.reduce((total, product) => {
    const productValue = product.price * product.stock;
    return total + productValue;
  }, 0);
}

/**
 * Function 4: Group products by category
 * Uses reduce() with object grouping
 */
function groupByCategory(products) {
  return products.reduce((grouped, product) => {
    const category = product.category;
    
    // If category doesn't exist in grouped object, create it
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    // Add product to the category array
    grouped[category].push(product);
    
    return grouped;
  }, {});
}

// ==================== TESTING ALL FUNCTIONS ====================

console.log("🏪 E-COMMERCE INVENTORY MANAGEMENT SYSTEM");
console.log("=".repeat(70));

// Display all inventory
console.log("\n📦 COMPLETE INVENTORY:");
console.log("-".repeat(70));
console.table(inventory);

// ==================== FUNCTION 1: LOW STOCK PRODUCTS ====================

console.log("\n\n⚠️  FUNCTION 1: LOW STOCK PRODUCTS (Stock ≤ 5)");
console.log("=".repeat(70));

const lowStockProducts = getLowStockProducts(inventory);
console.log(`\nFound ${lowStockProducts.length} products with low stock:\n`);
console.table(lowStockProducts);

console.log("\n💡 Alert: These products need restocking!");
lowStockProducts.forEach(product => {
  console.log(`   • ${product.name} - Only ${product.stock} units left`);
});

// ==================== FUNCTION 2: SORT BY PRICE ====================

console.log("\n\n💰 FUNCTION 2: PRODUCTS SORTED BY PRICE");
console.log("=".repeat(70));

// Sort ascending
console.log("\n📊 Sorted by Price (Lowest to Highest):");
const sortedAsc = sortProductsByPrice(inventory, 'asc');
console.log("\nTop 5 Cheapest Products:");
sortedAsc.slice(0, 5).forEach((product, index) => {
  console.log(`${index + 1}. ${product.name.padEnd(20)} - ₹${product.price}`);
});

// Sort descending
console.log("\n📊 Sorted by Price (Highest to Lowest):");
const sortedDesc = sortProductsByPrice(inventory, 'desc');
console.log("\nTop 5 Most Expensive Products:");
sortedDesc.slice(0, 5).forEach((product, index) => {
  console.log(`${index + 1}. ${product.name.padEnd(20)} - ₹${product.price}`);
});

// ==================== FUNCTION 3: TOTAL INVENTORY VALUE ====================

console.log("\n\n💵 FUNCTION 3: TOTAL INVENTORY VALUE");
console.log("=".repeat(70));

const totalValue = calculateTotalInventoryValue(inventory);
console.log(`\n🎯 Total Inventory Value: ₹${totalValue.toLocaleString('en-IN')}`);

// Calculate value per category
console.log("\n📊 Value Breakdown by Category:");
const categoryGroups = groupByCategory(inventory);
Object.keys(categoryGroups).forEach(category => {
  const categoryValue = calculateTotalInventoryValue(categoryGroups[category]);
  const percentage = ((categoryValue / totalValue) * 100).toFixed(2);
  console.log(`   ${category.padEnd(15)} - ₹${categoryValue.toLocaleString('en-IN').padStart(10)} (${percentage}%)`);
});

// ==================== FUNCTION 4: GROUP BY CATEGORY ====================

console.log("\n\n📁 FUNCTION 4: PRODUCTS GROUPED BY CATEGORY");
console.log("=".repeat(70));

const groupedProducts = groupByCategory(inventory);

Object.keys(groupedProducts).forEach(category => {
  console.log(`\n🏷️  ${category.toUpperCase()} (${groupedProducts[category].length} products):`);
  console.log("-".repeat(70));
  
  groupedProducts[category].forEach(product => {
    console.log(`   • ${product.name.padEnd(20)} - ₹${String(product.price).padStart(6)} | Stock: ${product.stock}`);
  });
});

// ==================== ADVANCED ANALYTICS ====================

console.log("\n\n📈 ADVANCED ANALYTICS");
console.log("=".repeat(70));

// 1. Average price per category
console.log("\n💰 Average Price per Category:");
Object.keys(groupedProducts).forEach(category => {
  const products = groupedProducts[category];
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  console.log(`   ${category.padEnd(15)} - ₹${avgPrice.toFixed(2)}`);
});

// 2. Stock summary per category
console.log("\n📦 Total Stock per Category:");
Object.keys(groupedProducts).forEach(category => {
  const products = groupedProducts[category];
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  console.log(`   ${category.padEnd(15)} - ${totalStock} units`);
});

// 3. Most expensive product per category
console.log("\n👑 Most Expensive Product per Category:");
Object.keys(groupedProducts).forEach(category => {
  const products = groupedProducts[category];
  const mostExpensive = products.reduce((max, p) => p.price > max.price ? p : max);
  console.log(`   ${category.padEnd(15)} - ${mostExpensive.name} (₹${mostExpensive.price})`);
});

// 4. Products below average price
console.log("\n💸 Products Below Average Price:");
const avgPrice = inventory.reduce((sum, p) => sum + p.price, 0) / inventory.length;
console.log(`\nAverage Price: ₹${avgPrice.toFixed(2)}`);
const belowAvg = inventory.filter(p => p.price < avgPrice);
console.log(`Products below average: ${belowAvg.length}/${inventory.length}`);
belowAvg.forEach(product => {
  console.log(`   • ${product.name} - ₹${product.price}`);
});

// ==================== SUMMARY REPORT ====================

console.log("\n\n📋 INVENTORY SUMMARY REPORT");
console.log("=".repeat(70));

console.log(`
Total Products:          ${inventory.length}
Total Categories:        ${Object.keys(groupedProducts).length}
Total Inventory Value:   ₹${totalValue.toLocaleString('en-IN')}
Low Stock Items:         ${lowStockProducts.length}
Average Product Price:   ₹${avgPrice.toFixed(2)}

Category Distribution:
${Object.keys(groupedProducts).map(cat => 
  `  • ${cat}: ${groupedProducts[cat].length} products`
).join('\n')}
`);

console.log("=".repeat(70));

/**
 * ARRAY METHODS EXPLAINED:
 * ========================
 * 
 * 1. filter() - Get Low Stock Products
 *    ──────────────────────────────────
 *    Returns new array with elements that pass the test
 *    
 *    products.filter(product => product.stock <= 5)
 *    
 *    Example: [5, 12, 3, 8, 2] → filter(n => n <= 5) → [5, 3, 2]
 * 
 * 
 * 2. sort() - Sort Products by Price
 *    ───────────────────────────────
 *    Sorts array in place (we use spread to avoid mutation)
 *    
 *    Ascending:  (a, b) => a.price - b.price
 *    Descending: (a, b) => b.price - a.price
 *    
 *    Example: [50, 10, 30] → sort ascending → [10, 30, 50]
 * 
 * 
 * 3. reduce() - Calculate Total Value
 *    ────────────────────────────────
 *    Reduces array to single value through accumulation
 *    
 *    reduce((total, product) => total + (product.price * product.stock), 0)
 *    
 *    Example:
 *    [{price: 100, stock: 5}, {price: 50, stock: 10}]
 *    Iteration 1: 0 + (100 * 5) = 500
 *    Iteration 2: 500 + (50 * 10) = 1000
 *    Result: 1000
 * 
 * 
 * 4. reduce() for Grouping - Group by Category
 *    ─────────────────────────────────────────
 *    Build an object with category as key and products as value
 *    
 *    reduce((grouped, product) => {
 *      if (!grouped[category]) grouped[category] = [];
 *      grouped[category].push(product);
 *      return grouped;
 *    }, {})
 *    
 *    Result: {
 *      Electronics: [...],
 *      Clothing: [...],
 *      Footwear: [...]
 *    }
 * 
 * 
 * REAL-WORLD USE CASES:
 * =====================
 * ✓ Inventory management dashboards
 * ✓ E-commerce product filtering
 * ✓ Warehouse stock alerts
 * ✓ Financial reporting
 * ✓ Category-wise analytics
 */
