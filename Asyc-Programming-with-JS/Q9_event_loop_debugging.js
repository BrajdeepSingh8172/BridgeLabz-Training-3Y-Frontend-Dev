/**
 * Q9 - Debugging the Event Loop
 * 
 * This program demonstrates the execution order of synchronous code,
 * microtasks (Promises), and macrotasks (setTimeout) in JavaScript.
 * 
 * TASK: Predict the output before running, then verify and explain.
 */

/**
 * ===================================================================
 * PREDICTED OUTPUT (write this BEFORE running):
 * ===================================================================
 * 
 * 1. "Script start"
 * 2. "Script end"
 * 3. "Promise callback"
 * 4. "Timeout callback"
 * 
 * ===================================================================
 */

console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

/**
 * ===================================================================
 * ACTUAL OUTPUT (verify by running the code):
 * ===================================================================
 * 
 * Script start
 * Script end
 * Promise callback
 * Timeout callback
 * 
 * ===================================================================
 */

/**
 * ===================================================================
 * DETAILED EXPLANATION: WHY THIS ORDER?
 * ===================================================================
 * 
 * JavaScript uses an Event Loop with multiple queues:
 * 
 * 1. CALL STACK (Main Thread - Synchronous)
 * 2. MICROTASK QUEUE (High Priority)
 * 3. MACROTASK QUEUE (Lower Priority)
 * 
 * 
 * EXECUTION BREAKDOWN:
 * ───────────────────────────────────────────────────────────────────
 * 
 * Step 1: Synchronous Code Execution
 * ───────────────────────────────────────────────────────────────────
 * 
 *   console.log("Script start")  → Executes immediately
 *   Output: "Script start" ✓
 * 
 *   setTimeout(..., 0)  → Callback sent to MACROTASK QUEUE
 *                         (not executed yet, even with 0ms delay)
 * 
 *   Promise.resolve().then(...)  → Callback sent to MICROTASK QUEUE
 *                                   (not executed yet)
 * 
 *   console.log("Script end")  → Executes immediately
 *   Output: "Script end" ✓
 * 
 * Call Stack is now EMPTY
 * 
 * 
 * Step 2: Microtask Queue Processing
 * ───────────────────────────────────────────────────────────────────
 * 
 * Event Loop checks: Is the call stack empty? YES
 * Event Loop checks: Are there microtasks? YES
 * 
 * Execute ALL microtasks before moving to macrotasks:
 * 
 *   Promise callback executes
 *   Output: "Promise callback" ✓
 * 
 * Microtask Queue is now EMPTY
 * 
 * 
 * Step 3: Macrotask Queue Processing
 * ───────────────────────────────────────────────────────────────────
 * 
 * Event Loop checks: Are there macrotasks? YES
 * 
 *   setTimeout callback executes
 *   Output: "Timeout callback" ✓
 * 
 * Macrotask Queue is now EMPTY
 * 
 * 
 * ===================================================================
 * KEY CONCEPTS:
 * ===================================================================
 * 
 * 1. PRIORITY ORDER:
 *    Call Stack (sync) → Microtasks → Macrotasks
 * 
 * 2. MICROTASKS (High Priority):
 *    - Promise.then(), Promise.catch(), Promise.finally()
 *    - MutationObserver callbacks
 *    - queueMicrotask()
 *    - async/await (Promise-based)
 * 
 * 3. MACROTASKS (Lower Priority):
 *    - setTimeout(), setInterval()
 *    - setImmediate() (Node.js)
 *    - I/O operations
 *    - UI rendering (browser)
 * 
 * 4. WHY setTimeout(..., 0) ISN'T IMMEDIATE:
 *    - Even with 0ms delay, it goes to the MACROTASK queue
 *    - Macrotasks only execute after ALL microtasks are done
 *    - There's a minimum delay (~4ms in browsers for nested timeouts)
 * 
 * 5. MICROTASKS HAVE PRIORITY:
 *    - ALL microtasks execute before ANY macrotask
 *    - This can cause "microtask starvation" if infinite microtasks
 *    - Important for promises to resolve quickly
 * 
 * ===================================================================
 * REAL-WORLD IMPLICATIONS:
 * ===================================================================
 * 
 * 1. ASYNC/AWAIT vs setTimeout:
 *    - async/await (microtask) executes before setTimeout (macrotask)
 *    - Use async/await for priority operations
 * 
 * 2. PROMISE CHAINS:
 *    - Promise chains complete before timer callbacks
 *    - Critical for data-dependent operations
 * 
 * 3. RENDER BLOCKING:
 *    - Too many microtasks can delay rendering (macrotask)
 *    - Break heavy work into chunks with setTimeout
 * 
 * 4. TESTING ASYNC CODE:
 *    - Understand execution order for proper test setup
 *    - Use tools like jest's await flushPromises()
 * 
 * ===================================================================
 * VISUALIZATION:
 * ===================================================================
 * 
 *  ┌─────────────┐
 *  │ Call Stack  │  "Script start", "Script end"
 *  └──────┬──────┘
 *         │ (when empty)
 *         ▼
 *  ┌─────────────────┐
 *  │ Microtask Queue │  "Promise callback"
 *  └──────┬──────────┘
 *         │ (when empty)
 *         ▼
 *  ┌─────────────────┐
 *  │ Macrotask Queue │  "Timeout callback"
 *  └─────────────────┘
 * 
 * ===================================================================
 */
