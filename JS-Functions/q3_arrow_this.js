/**
 * Q3: Arrow Functions and 'this' Binding
 * 
 * This program demonstrates the difference in 'this' binding between
 * arrow functions and regular functions.
 */

console.log("=== Arrow Function 'this' Binding Issue ===\n");

// PROBLEM: Arrow function in object method
console.log("--- Using Arrow Function (PROBLEM) ---");
const userWithArrow = {
    name: "Alice",
    // Arrow function does NOT have its own 'this'
    // It inherits 'this' from the surrounding lexical scope
    showName: () => {
        console.log("Name:", this.name);
    }
};

userWithArrow.showName(); // undefined

/**
 * EXPLANATION OF THE PROBLEM:
 * 
 * Arrow functions do NOT have their own 'this' context.
 * They inherit 'this' from the enclosing lexical scope (where they are defined).
 * 
 * In this case:
 * - The arrow function is defined in the global scope
 * - So 'this' refers to the global object (window in browser, global in Node.js)
 * - The global object doesn't have a 'name' property
 * - Therefore, this.name is undefined
 * 
 * Arrow functions are NOT suitable for object methods when you need
 * to access the object's properties using 'this'.
 */

console.log("\n--- Using Regular Function (SOLUTION) ---");

// SOLUTION: Regular function in object method
const userWithRegular = {
    name: "Bob",
    // Regular function has its own 'this'
    // 'this' refers to the object that calls the method
    showName: function() {
        console.log("Name:", this.name);
    }
};

userWithRegular.showName(); // Bob

console.log("\n--- Alternative: ES6 Method Syntax (RECOMMENDED) ---");

// RECOMMENDED: ES6 shorthand method syntax
const userWithES6 = {
    name: "Charlie",
    // ES6 method syntax (cleaner way to write regular functions)
    showName() {
        console.log("Name:", this.name);
    }
};

userWithES6.showName(); // Charlie

console.log("\n--- When Arrow Functions ARE Useful ---");

// Arrow functions are great for callbacks and when you DON'T want to bind 'this'
const userWithCallback = {
    name: "Diana",
    hobbies: ["reading", "coding", "gaming"],
    
    showHobbies() {
        console.log(`${this.name}'s hobbies:`);
        
        // Arrow function here is perfect!
        // It inherits 'this' from showHobbies(), so 'this' refers to the object
        this.hobbies.forEach(hobby => {
            console.log(`  - ${this.name} likes ${hobby}`);
        });
        
        // If we used a regular function in forEach:
        console.log("\nUsing regular function (would need .bind(this)):");
        this.hobbies.forEach(function(hobby) {
            // 'this' here would be undefined in strict mode
            // We'd need to use .bind(this) or save 'this' in a variable
            console.log(`  - ${hobby}`);
        });
    }
};

userWithCallback.showHobbies();

/**
 * KEY TAKEAWAYS:
 * 
 * 1. Arrow Functions:
 *    - Do NOT have their own 'this'
 *    - Inherit 'this' from the enclosing scope
 *    - Best for callbacks, array methods, and when you DON'T need 'this' to refer to the object
 * 
 * 2. Regular Functions:
 *    - Have their own 'this'
 *    - 'this' refers to the object that calls the method
 *    - Best for object methods when you need to access object properties
 * 
 * 3. When to use which:
 *    - Object methods: Use regular functions or ES6 method syntax
 *    - Callbacks: Use arrow functions (they preserve the outer 'this')
 */
