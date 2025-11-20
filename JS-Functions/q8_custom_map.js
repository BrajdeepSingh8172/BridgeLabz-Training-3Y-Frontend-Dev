/**
 * Q8: Custom Array Prototype Method - myMap()
 * 
 * This program adds a custom myMap() method to Array.prototype
 * that behaves like the built-in map() function.
 */

// Add custom myMap method to Array.prototype
// This makes it available to ALL arrays
Array.prototype.myMap = function(callback) {
    // 'this' refers to the array that called myMap()
    const result = [];
    
    // Iterate through each element of the array
    for (let i = 0; i < this.length; i++) {
        // Call the callback function with:
        // - current element
        // - current index
        // - the entire array
        const mappedValue = callback(this[i], i, this);
        
        // Add the returned value to the result array
        result.push(mappedValue);
    }
    
    return result;
};

// ============= DEMONSTRATION =============
console.log("=== Custom Array.prototype.myMap() ===\n");

// Example 1: Double each number
console.log("--- Example 1: Double Numbers ---");
const numbers = [1, 2, 3, 4, 5];
console.log("Original array:", numbers);

const doubled = numbers.myMap(num => num * 2);
console.log("Using myMap to double:", doubled);

// Compare with built-in map()
const doubledBuiltIn = numbers.map(num => num * 2);
console.log("Using built-in map:", doubledBuiltIn);
console.log("Results are equal:", JSON.stringify(doubled) === JSON.stringify(doubledBuiltIn));

// Example 2: Square each number
console.log("\n--- Example 2: Square Numbers ---");
const squared = [1, 2, 3, 4].myMap(num => num * num);
console.log("Squared:", squared);

// Example 3: Using all callback parameters (element, index, array)
console.log("\n--- Example 3: Using Index Parameter ---");
const withIndex = [10, 20, 30].myMap((num, index) => `Index ${index}: ${num}`);
console.log("With index:", withIndex);

// Example 4: Transform strings
console.log("\n--- Example 4: String Transformation ---");
const words = ["hello", "world", "javascript"];
console.log("Original:", words);

const uppercase = words.myMap(word => word.toUpperCase());
console.log("Uppercase:", uppercase);

const lengths = words.myMap(word => word.length);
console.log("Word lengths:", lengths);

// Example 5: Transform objects
console.log("\n--- Example 5: Object Transformation ---");
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

const names = users.myMap(user => user.name);
console.log("User names:", names);

const ages = users.myMap(user => user.age);
console.log("User ages:", ages);

const descriptions = users.myMap(user => `${user.name} is ${user.age} years old`);
console.log("Descriptions:", descriptions);

// Example 6: Complex transformation
console.log("\n--- Example 6: Complex Transformation ---");
const prices = [10, 20, 30, 40];
const withTax = prices.myMap((price, index) => {
    const tax = price * 0.1;
    const total = price + tax;
    return {
        item: `Item ${index + 1}`,
        price: price,
        tax: tax,
        total: total
    };
});
console.log("Prices with tax:", withTax);

// Example 7: Chaining (since myMap returns an array)
console.log("\n--- Example 7: Method Chaining ---");
const result = [1, 2, 3, 4, 5]
    .myMap(num => num * 2)      // Double: [2, 4, 6, 8, 10]
    .myMap(num => num + 1)      // Add 1: [3, 5, 7, 9, 11]
    .myMap(num => num * num);   // Square: [9, 25, 49, 81, 121]
console.log("Chained transformations:", result);

// Example 8: Using with arrow functions vs regular functions
console.log("\n--- Example 8: Different Function Types ---");

// Arrow function
const withArrow = [1, 2, 3].myMap(n => n * 3);
console.log("With arrow function:", withArrow);

// Regular function
const withRegular = [1, 2, 3].myMap(function(n) {
    return n * 3;
});
console.log("With regular function:", withRegular);

// Example 9: Demonstrating 'this' context
console.log("\n--- Example 9: Accessing the Original Array ---");
const original = [5, 10, 15];
const withContext = original.myMap(function(num, index, arr) {
    // 'arr' is the original array
    const sum = arr.reduce((a, b) => a + b, 0);
    return `${num} is ${((num / sum) * 100).toFixed(1)}% of total`;
});
console.log("Percentages:", withContext);

/**
 * ========================================
 * EXPLANATION
 * ========================================
 * 
 * 1. What is Array.prototype?
 *    - Array.prototype is the prototype object for all arrays
 *    - Any method added to Array.prototype is available to ALL arrays
 *    - Built-in methods like map(), filter(), reduce() are on Array.prototype
 * 
 * 2. How myMap() works:
 *    - Takes a callback function as parameter
 *    - Iterates through each element of the array (this)
 *    - Calls the callback for each element
 *    - Collects returned values into a new array
 *    - Returns the new array
 * 
 * 3. Callback Parameters:
 *    callback(element, index, array)
 *    - element: The current element being processed
 *    - index: The index of the current element
 *    - array: The original array (this)
 * 
 * 4. Key Features:
 *    - Does NOT modify the original array
 *    - Returns a NEW array with transformed values
 *    - Same length as original array
 *    - Can be chained with other array methods
 * 
 * 5. Comparison with Built-in map():
 *    - Our myMap() is a simplified version
 *    - Built-in map() has more features (thisArg parameter, sparse array handling)
 *    - Our version demonstrates the core concept
 * 
 * 6. Adding to Array.prototype:
 *    Pros:
 *    - Available to all arrays automatically
 *    - Can be chained naturally
 *    
 *    Cons:
 *    - Modifies global prototype (can cause conflicts)
 *    - In real projects, avoid modifying built-in prototypes
 *    - This is for learning purposes only!
 */

console.log("\n=== Comparison: myMap vs Built-in map ===\n");

const testArray = [1, 2, 3, 4, 5];
const callback = num => num * 10;

console.log("Original:", testArray);
console.log("myMap result:", testArray.myMap(callback));
console.log("map result:", testArray.map(callback));
console.log("Both produce same result:", 
    JSON.stringify(testArray.myMap(callback)) === 
    JSON.stringify(testArray.map(callback))
);

/**
 * IMPORTANT NOTE:
 * In production code, DO NOT modify built-in prototypes!
 * This example is for educational purposes to understand:
 * - How prototypes work
 * - How built-in methods might be implemented
 * - How to add methods to prototypes
 */
