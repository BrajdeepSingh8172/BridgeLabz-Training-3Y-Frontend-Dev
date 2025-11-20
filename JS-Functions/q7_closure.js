/**
 * Q7: Closures with makeMultiplier Function
 * 
 * This program demonstrates closures - how inner functions can access
 * variables from their outer function's scope even after the outer
 * function has returned.
 */

// Function that returns another function (closure)
function makeMultiplier(multiplier) {
    // This variable 'multiplier' is in the outer function's scope
    
    // Return an inner function that "closes over" the multiplier variable
    return function(number) {
        // This inner function has access to 'multiplier' from outer scope
        return number * multiplier;
    };
}

// ============= DEMONSTRATION =============
console.log("=== Closures: makeMultiplier Function ===\n");

// Create different multiplier functions
const triple = makeMultiplier(3);
const double = makeMultiplier(2);
const quintuple = makeMultiplier(5);
const multiplyByTen = makeMultiplier(10);

console.log("--- Using triple (multiplier: 3) ---");
console.log("triple(5):", triple(5));       // 15
console.log("triple(10):", triple(10));     // 30
console.log("triple(7):", triple(7));       // 21

console.log("\n--- Using double (multiplier: 2) ---");
console.log("double(5):", double(5));       // 10
console.log("double(10):", double(10));     // 20
console.log("double(7):", double(7));       // 14

console.log("\n--- Using quintuple (multiplier: 5) ---");
console.log("quintuple(5):", quintuple(5)); // 25
console.log("quintuple(4):", quintuple(4)); // 20

console.log("\n--- Using multiplyByTen (multiplier: 10) ---");
console.log("multiplyByTen(5):", multiplyByTen(5));   // 50
console.log("multiplyByTen(3):", multiplyByTen(3));   // 30

console.log("\n--- Each closure has its own independent multiplier ---");
console.log("triple(5) =", triple(5));           // 15
console.log("double(5) =", double(5));           // 10
console.log("quintuple(5) =", quintuple(5));     // 25
console.log("multiplyByTen(5) =", multiplyByTen(5)); // 50

/**
 * ========================================
 * HOW CLOSURES WORK - DETAILED EXPLANATION
 * ========================================
 * 
 * 1. What is a Closure?
 *    A closure is a function that has access to variables from its outer
 *    (enclosing) function's scope, even after the outer function has returned.
 * 
 * 2. Step-by-Step Breakdown:
 * 
 *    When we call: const triple = makeMultiplier(3);
 *    
 *    Step 1: makeMultiplier(3) is called
 *    Step 2: Parameter 'multiplier' is set to 3
 *    Step 3: An inner function is created that references 'multiplier'
 *    Step 4: makeMultiplier returns this inner function
 *    Step 5: makeMultiplier execution ends
 *    
 *    Normally, when a function ends, its local variables are destroyed.
 *    BUT the inner function still has a reference to 'multiplier'!
 *    
 *    Step 6: The returned function is stored in 'triple'
 *    Step 7: The 'multiplier' variable (with value 3) is preserved in memory
 *            because the inner function still references it
 * 
 * 3. When we call: triple(5)
 * 
 *    Step 1: The inner function is executed with number = 5
 *    Step 2: It accesses 'multiplier' from its closure (value is 3)
 *    Step 3: Returns number * multiplier = 5 * 3 = 15
 * 
 * 4. Why multiple closures are independent:
 * 
 *    - Each call to makeMultiplier creates a NEW execution context
 *    - Each execution context has its OWN 'multiplier' variable
 *    - Each returned function closes over its OWN 'multiplier'
 *    
 *    triple's closure: multiplier = 3
 *    double's closure: multiplier = 2
 *    quintuple's closure: multiplier = 5
 * 
 * 5. Memory Visualization:
 * 
 *    ┌─────────────────────┐
 *    │ triple (function)   │
 *    │ ├─ closure scope:   │
 *    │ │  └─ multiplier: 3 │
 *    └─────────────────────┘
 * 
 *    ┌─────────────────────┐
 *    │ double (function)   │
 *    │ ├─ closure scope:   │
 *    │ │  └─ multiplier: 2 │
 *    └─────────────────────┘
 */

console.log("\n=== More Closure Examples ===\n");

// Example 2: Counter using closure
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

console.log("--- Counter Example ---");
const counter1 = createCounter();
const counter2 = createCounter();

console.log("counter1.increment():", counter1.increment()); // 1
console.log("counter1.increment():", counter1.increment()); // 2
console.log("counter1.getCount():", counter1.getCount());   // 2

console.log("counter2.increment():", counter2.increment()); // 1
console.log("counter2.getCount():", counter2.getCount());   // 1

console.log("counter1 and counter2 have independent counts!");

// Example 3: Private variables
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable - cannot be accessed directly
    
    return {
        deposit: function(amount) {
            balance += amount;
            console.log(`Deposited $${amount}. New balance: $${balance}`);
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                console.log(`Withdrew $${amount}. New balance: $${balance}`);
            } else {
                console.log("Insufficient funds!");
            }
        },
        getBalance: function() {
            return balance;
        }
    };
}

console.log("\n--- Bank Account Example (Private Variables) ---");
const myAccount = createBankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);
console.log("Current balance:", myAccount.getBalance());
// myAccount.balance is not accessible directly - it's private!
console.log("myAccount.balance:", myAccount.balance); // undefined

/**
 * KEY BENEFITS OF CLOSURES:
 * 
 * 1. Data Privacy/Encapsulation:
 *    - Create private variables that can't be accessed from outside
 *    - Only exposed through specific methods
 * 
 * 2. Function Factories:
 *    - Create customized functions with preset parameters
 *    - Each function maintains its own state
 * 
 * 3. Maintaining State:
 *    - Functions can remember values between calls
 *    - Useful for counters, caching, event handlers
 * 
 * 4. Real-World Uses:
 *    - Event handlers in web development
 *    - Callback functions
 *    - Module pattern
 *    - React hooks (useState, useEffect)
 *    - Async operations
 */
