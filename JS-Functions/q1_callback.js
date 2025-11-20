/**
 * Q1: Callback Function Demonstration
 * 
 * This program demonstrates how callbacks work in JavaScript.
 * A callback is a function passed as an argument to another function,
 * which is then executed inside that function.
 */

// Callback function that shows the end message
function showEndMessage() {
    console.log("Welcome to the course!");
}

// Main function that accepts a name and a callback
function greetUser(name, callback) {
    // First, print the greeting
    console.log(`Hello ${name}`);
    
    // Then execute the callback function
    callback();
}

// ============= DEMONSTRATION =============
console.log("=== Callback Flow Demonstration ===\n");

// Call greetUser with a name and the callback function
greetUser("Alice", showEndMessage);

console.log("\n--- Another Example ---\n");

// We can also use an anonymous function as callback
greetUser("Bob", function() {
    console.log("Enjoy learning JavaScript!");
});

console.log("\n--- Using Arrow Function as Callback ---\n");

// Using arrow function as callback
greetUser("Charlie", () => {
    console.log("Happy coding!");
});

/**
 * EXPLANATION:
 * 1. greetUser() takes two parameters: name (string) and callback (function)
 * 2. It first prints "Hello <name>"
 * 3. Then it executes the callback function by calling callback()
 * 4. This demonstrates the callback flow: main function -> callback execution
 * 
 * Callbacks are useful for:
 * - Asynchronous operations
 * - Event handling
 * - Reusable code patterns
 */
