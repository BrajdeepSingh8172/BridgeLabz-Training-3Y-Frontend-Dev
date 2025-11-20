/**
 * Q2: Array Operations with Callbacks
 * 
 * This program demonstrates using callback functions to perform
 * different operations on arrays.
 */

// Generic function that applies an operation to each element of an array
function applyOperation(numbers, operation) {
    const result = [];
    
    // Iterate through each number and apply the operation
    for (let i = 0; i < numbers.length; i++) {
        result.push(operation(numbers[i]));
    }
    
    return result;
}

// Operation function to double a number
function double(num) {
    return num * 2;
}

// Operation function to square a number
function square(num) {
    return num * num;
}

// ============= DEMONSTRATION =============
console.log("=== Array Operations with Callbacks ===\n");

const numbers = [1, 2, 3, 4];
console.log("Original array:", numbers);

// Double each number
console.log("\n--- Doubling Operation ---");
const doubled = applyOperation(numbers, double);
console.log("Doubled:", doubled);

// Square each number
console.log("\n--- Squaring Operation ---");
const squared = applyOperation(numbers, square);
console.log("Squared:", squared);

// Using anonymous function - Triple each number
console.log("\n--- Tripling Operation (Anonymous Function) ---");
const tripled = applyOperation(numbers, function(num) {
    return num * 3;
});
console.log("Tripled:", tripled);

// Using arrow function - Add 10 to each number
console.log("\n--- Add 10 (Arrow Function) ---");
const addedTen = applyOperation(numbers, num => num + 10);
console.log("Added 10:", addedTen);

/**
 * EXPLANATION:
 * - applyOperation() is a higher-order function (takes a function as parameter)
 * - The 'operation' parameter is a callback function
 * - We can pass different operations (double, square, etc.) to transform the array
 * - This demonstrates the power of callbacks for creating reusable, flexible code
 * - This pattern is similar to how built-in methods like map() work
 */
