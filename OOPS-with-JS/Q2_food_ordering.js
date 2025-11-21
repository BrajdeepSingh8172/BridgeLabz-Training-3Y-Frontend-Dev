/**
 * Q2 - Online Food Ordering (map + Error Handling)
 * 
 * This program demonstrates:
 * - map() to extract prices
 * - reduce() to calculate total
 * - Custom error handling with try-catch
 * - Meaningful error messages
 */

// Menu items database
const menu = [
  { id: 1, name: "Burger", price: 150 },
  { id: 2, name: "Pizza", price: 350 },
  { id: 3, name: "Pasta", price: 200 },
  { id: 4, name: "Fries", price: 80 },
  { id: 5, name: "Cold Coffee", price: 120 },
  { id: 6, name: "Sandwich", price: 100 },
  { id: 7, name: "Salad", price: 180 },
  { id: 8, name: "Ice Cream", price: 90 }
];

/**
 * Calculate bill for ordered items
 * @param {string[]} orderItems - Array of item names ordered
 * @returns {object} Bill details with items and total
 * @throws {Error} If invalid item is ordered
 */
function calculateBill(orderItems) {
  // Validate if orderItems is provided and is an array
  if (!orderItems || !Array.isArray(orderItems)) {
    throw new Error("Invalid order: Order items must be an array");
  }

  // Validate if order is not empty
  if (orderItems.length === 0) {
    throw new Error("Invalid order: Cannot place an empty order");
  }

  // Step 1: Use map() to get price list
  // For each ordered item, find it in menu and get its price
  const priceList = orderItems.map((itemName) => {
    // Find the item in menu (case-insensitive search)
    const menuItem = menu.find(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );

    // If item not found in menu, throw error
    if (!menuItem) {
      throw new Error(`Invalid item: "${itemName}" is not available in our menu`);
    }

    // Return price and item details
    return {
      name: menuItem.name,
      price: menuItem.price
    };
  });

  // Step 2: Use reduce() to calculate total
  const total = priceList.reduce((sum, item) => sum + item.price, 0);

  // Return bill details
  return {
    items: priceList,
    total: total,
    itemCount: orderItems.length
  };
}

/**
 * Display bill in formatted manner
 */
function displayBill(bill) {
  console.log("\n" + "=".repeat(50));
  console.log("🍽️  FOOD ORDER BILL");
  console.log("=".repeat(50));
  
  bill.items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name.padEnd(20)} ₹${item.price}`);
  });
  
  console.log("-".repeat(50));
  console.log(`Total Items: ${bill.itemCount}`);
  console.log(`Total Amount: ₹${bill.total}`);
  console.log("=".repeat(50));
}

// ==================== TEST CASES ====================

console.log("🍕 ONLINE FOOD ORDERING SYSTEM");
console.log("=".repeat(50));

// Display available menu
console.log("\n📋 AVAILABLE MENU:");
console.log("-".repeat(50));
menu.forEach(item => {
  console.log(`${item.id}. ${item.name.padEnd(20)} ₹${item.price}`);
});
console.log("-".repeat(50));

// Test Case 1: Valid order
console.log("\n\n✅ TEST CASE 1: Valid Order");
try {
  const order1 = ["Burger", "Pizza", "Cold Coffee", "Fries"];
  console.log(`Order: [${order1.join(", ")}]`);
  
  const bill1 = calculateBill(order1);
  displayBill(bill1);
  console.log("✅ Order placed successfully!");
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test Case 2: Invalid item in order
console.log("\n\n❌ TEST CASE 2: Invalid Item in Order");
try {
  const order2 = ["Burger", "Biryani", "Cold Coffee"];
  console.log(`Order: [${order2.join(", ")}]`);
  
  const bill2 = calculateBill(order2);
  displayBill(bill2);
  console.log("✅ Order placed successfully!");
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
  console.log("💡 Please check the menu and order valid items.");
}

// Test Case 3: Empty order
console.log("\n\n❌ TEST CASE 3: Empty Order");
try {
  const order3 = [];
  console.log(`Order: []`);
  
  const bill3 = calculateBill(order3);
  displayBill(bill3);
  console.log("✅ Order placed successfully!");
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
  console.log("💡 Please add items to your cart before checkout.");
}

// Test Case 4: Large valid order
console.log("\n\n✅ TEST CASE 4: Large Order");
try {
  const order4 = ["Pizza", "Pasta", "Salad", "Ice Cream", "Cold Coffee", "Fries"];
  console.log(`Order: [${order4.join(", ")}]`);
  
  const bill4 = calculateBill(order4);
  displayBill(bill4);
  console.log("✅ Order placed successfully!");
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test Case 5: Case-insensitive order (should work)
console.log("\n\n✅ TEST CASE 5: Case-Insensitive Order");
try {
  const order5 = ["BURGER", "pizza", "FrIeS"];
  console.log(`Order: [${order5.join(", ")}]`);
  
  const bill5 = calculateBill(order5);
  displayBill(bill5);
  console.log("✅ Order placed successfully!");
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

/**
 * HOW map() AND reduce() WORK TOGETHER:
 * ======================================
 * 
 * Example: orderItems = ["Burger", "Pizza", "Fries"]
 * 
 * STEP 1 - map() to get prices:
 * -----------------------------
 * "Burger" → find in menu → { name: "Burger", price: 150 }
 * "Pizza"  → find in menu → { name: "Pizza", price: 350 }
 * "Fries"  → find in menu → { name: "Fries", price: 80 }
 * 
 * Result: [{ name: "Burger", price: 150 }, 
 *          { name: "Pizza", price: 350 }, 
 *          { name: "Fries", price: 80 }]
 * 
 * STEP 2 - reduce() to calculate total:
 * -------------------------------------
 * Iteration 1: sum = 0,   item.price = 150  →  0 + 150 = 150
 * Iteration 2: sum = 150, item.price = 350  →  150 + 350 = 500
 * Iteration 3: sum = 500, item.price = 80   →  500 + 80 = 580
 * 
 * Final Total: ₹580
 * 
 * ERROR HANDLING STRATEGY:
 * ========================
 * 1. Validate input is an array
 * 2. Validate array is not empty
 * 3. Validate each item exists in menu
 * 4. Throw meaningful errors for each case
 * 5. Use try-catch to handle errors gracefully
 * 6. Display user-friendly error messages
 */
