/**
 * Q2 - Task Scheduler: Micro vs Macro Challenge
 * 
 * This program demonstrates how the JavaScript Event Loop prioritizes tasks:
 * - Synchronous code executes first
 * - Microtasks (Promises) execute before macrotasks (setTimeout)
 * - Macrotasks execute last
 */

console.log("Start"); // Synchronous - executes immediately

// Macrotask: setTimeout callback goes to the macrotask queue
setTimeout(() => {
  console.log("Timeout callback (Macrotask)");
}, 0);

// Microtask: Promise.then() callback goes to the microtask queue
Promise.resolve().then(() => {
  console.log("Promise callback (Microtask)");
});

// Synchronous code - executes immediately
console.log("Synchronous log");

console.log("End"); // Synchronous - executes immediately

/**
 * EXPLANATION: Why microtasks run before macrotasks
 * 
 * The JavaScript Event Loop works in the following order:
 * 
 * 1. CALL STACK (Synchronous Code):
 *    - All synchronous code executes first
 *    - Output: "Start", "Synchronous log", "End"
 * 
 * 2. MICROTASK QUEUE (Promises, MutationObserver, queueMicrotask):
 *    - After the call stack is empty, the event loop checks the microtask queue
 *    - ALL microtasks are executed before moving to macrotasks
 *    - Output: "Promise callback (Microtask)"
 * 
 * 3. MACROTASK QUEUE (setTimeout, setInterval, setImmediate, I/O operations):
 *    - Only after ALL microtasks are complete, macrotasks are executed
 *    - Output: "Timeout callback (Macrotask)"
 * 
 * EXPECTED OUTPUT ORDER:
 * Start
 * Synchronous log
 * End
 * Promise callback (Microtask)
 * Timeout callback (Macrotask)
 * 
 * WHY THIS MATTERS:
 * - Promises (microtasks) have higher priority than setTimeout (macrotasks)
 * - Even with setTimeout(..., 0), it still goes to the macrotask queue
 * - This is crucial for understanding async behavior in JavaScript
 * - Frontend lag can occur if too many microtasks block macrotasks
 */
