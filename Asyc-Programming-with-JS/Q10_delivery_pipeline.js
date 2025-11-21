/**
 * Q10 - The Final Delivery: Async Pipeline Debugger
 * 
 * This program simulates a food delivery app with an asynchronous pipeline.
 * Each step has random delays (1-2 seconds) and can succeed or fail.
 * 
 * Pipeline stages: takeOrder → prepare → pack → dispatch → deliver
 * 
 * Demonstrates: async/await, try/catch, error handling, event loop concepts
 */

// Generate random delay between 1-2 seconds
function randomDelay() {
  return Math.floor(Math.random() * 1000) + 1000; // 1000-2000ms
}

// Generate random success/failure (80% success rate)
function shouldSucceed() {
  return Math.random() > 0.2; // 80% success rate
}

// Step 1: Take Order
function takeOrder() {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    
    setTimeout(() => {
      if (shouldSucceed()) {
        resolve({ orderId: Math.floor(Math.random() * 10000), items: ["Pizza", "Coke"] });
      } else {
        reject(new Error("Order system is down"));
      }
    }, delay);
  });
}

// Step 2: Prepare Food
function prepare(orderData) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    
    setTimeout(() => {
      if (shouldSucceed()) {
        resolve({ ...orderData, status: "prepared" });
      } else {
        reject(new Error("Kitchen is too busy"));
      }
    }, delay);
  });
}

// Step 3: Pack the Order
function pack(orderData) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    
    setTimeout(() => {
      if (shouldSucceed()) {
        resolve({ ...orderData, status: "packed", packageId: "PKG" + Math.floor(Math.random() * 1000) });
      } else {
        reject(new Error("Ran out of packaging materials"));
      }
    }, delay);
  });
}

// Step 4: Dispatch for Delivery
function dispatch(orderData) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    
    setTimeout(() => {
      if (shouldSucceed()) {
        resolve({ ...orderData, status: "dispatched", driver: "Driver #" + Math.floor(Math.random() * 100) });
      } else {
        reject(new Error("No drivers available"));
      }
    }, delay);
  });
}

// Step 5: Deliver to Customer
function deliver(orderData) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    
    setTimeout(() => {
      if (shouldSucceed()) {
        resolve({ ...orderData, status: "delivered", deliveryTime: new Date().toLocaleTimeString() });
      } else {
        reject(new Error("Customer unavailable at delivery address"));
      }
    }, delay);
  });
}

/**
 * MAIN PIPELINE RUNNER
 * 
 * This function demonstrates async/await with proper error handling.
 * 
 * EVENT LOOP FLOW EXPLANATION:
 * ─────────────────────────────────────────────────────────────────
 * 
 * 1. ASYNC FUNCTION EXECUTION:
 *    - When runPipeline() is called, it starts executing synchronously
 *    - When it hits the first 'await', it pauses and returns a Promise
 *    - Control returns to the event loop
 * 
 * 2. AWAIT MECHANISM:
 *    - 'await' pauses the async function execution
 *    - The Promise (e.g., takeOrder()) starts its setTimeout
 *    - setTimeout callback goes to the MACROTASK QUEUE
 *    - Event loop continues with other tasks
 * 
 * 3. PROMISE RESOLUTION:
 *    - When setTimeout fires, callback executes
 *    - Promise resolves/rejects
 *    - Microtask is queued to resume the async function
 *    - Microtasks have priority over macrotasks
 * 
 * 4. ASYNC FUNCTION RESUME:
 *    - Async function resumes from the await point
 *    - If resolved: continues to next line
 *    - If rejected: jumps to catch block
 * 
 * 5. ERROR PROPAGATION:
 *    - Any rejected Promise in the chain throws an error
 *    - Error is caught by the try/catch block
 *    - Pipeline stops at the failed step
 * 
 * CALL STACK vs EVENT LOOP:
 * ─────────────────────────────────────────────────────────────────
 * 
 * Call Stack:
 * - Holds currently executing synchronous code
 * - async functions execute until first await
 * - Then pause and leave the stack
 * 
 * Event Loop:
 * - Monitors call stack and task queues
 * - When stack is empty, processes queues:
 *   1. Microtask queue (Promise callbacks)
 *   2. Macrotask queue (setTimeout, setInterval)
 * 
 * For each 'await':
 * 1. Promise created and added to microtask queue when resolved
 * 2. setTimeout (inside Promise) added to macrotask queue
 * 3. Microtask executes (resumes async function)
 * 4. Process repeats for next await
 */
async function runPipeline() {
  try {
    console.log("🏁 Start Pipeline");
    console.log("─".repeat(60));
    
    // Step 1: Take Order
    // - Await pauses execution here
    // - takeOrder() Promise starts
    // - setTimeout queued to macrotask queue
    // - Event loop processes other tasks
    // - When setTimeout fires, Promise resolves
    // - Microtask queued to resume this function
    // - Function resumes with order data
    console.log("\n📋 Step 1: Taking order...");
    const order = await takeOrder();
    console.log(`✅ Order taken! Order #${order.orderId}`);
    console.log(`   Items: ${order.items.join(", ")}`);
    
    // Step 2: Prepare Food
    // - Same event loop flow as above
    // - Previous order data passed as parameter
    console.log("\n👨‍🍳 Step 2: Preparing food...");
    const prepared = await prepare(order);
    console.log(`✅ Food prepared!`);
    console.log(`   Status: ${prepared.status}`);
    
    // Step 3: Pack
    console.log("\n📦 Step 3: Packing order...");
    const packed = await pack(prepared);
    console.log(`✅ Package ready!`);
    console.log(`   Package ID: ${packed.packageId}`);
    
    // Step 4: Dispatch
    console.log("\n🚗 Step 4: Dispatching for delivery...");
    const dispatched = await dispatch(packed);
    console.log(`✅ Out for delivery!`);
    console.log(`   Driver: ${dispatched.driver}`);
    
    // Step 5: Deliver
    console.log("\n🏠 Step 5: Delivering to customer...");
    const delivered = await deliver(dispatched);
    console.log(`✅ Delivered successfully!`);
    console.log(`   Delivery Time: ${delivered.deliveryTime}`);
    
    // Success!
    console.log("\n" + "─".repeat(60));
    console.log("🎉 Delivery completed!");
    console.log(`📊 Order #${delivered.orderId} - Status: ${delivered.status}`);
    console.log("─".repeat(60));
    
  } catch (error) {
    // Error handling
    // - If any await Promise rejects, execution jumps here
    // - Event loop control flow: Promise rejection creates microtask
    // - Microtask resumes async function at catch block
    console.log("\n" + "─".repeat(60));
    console.log("❌ Pipeline failed!");
    console.log(`💥 Error: ${error.message}`);
    console.log("🔄 Please retry the order.");
    console.log("─".repeat(60));
  }
}

// Execute the pipeline
console.log("🍕 Food Delivery Simulation App");
console.log("═".repeat(60));
runPipeline();

/**
 * ASYNC/AWAIT AND EVENT LOOP - DETAILED BREAKDOWN:
 * ═══════════════════════════════════════════════════════════════════
 * 
 * WHAT HAPPENS WHEN YOU RUN THIS CODE:
 * ───────────────────────────────────────────────────────────────────
 * 
 * 1. Initial Execution (Synchronous):
 *    - console.log("Food Delivery...") executes
 *    - runPipeline() is called
 *    - First console.logs in runPipeline() execute
 *    - Reaches first 'await takeOrder()'
 * 
 * 2. First Await (takeOrder):
 *    - takeOrder() returns a Promise
 *    - Promise constructor runs synchronously
 *    - setTimeout schedules callback → MACROTASK QUEUE
 *    - runPipeline() pauses and exits call stack
 *    - Returns Promise to caller
 * 
 * 3. Event Loop Waiting:
 *    - Call stack is empty
 *    - Event loop processes microtasks (none yet)
 *    - Event loop processes next macrotask
 *    - setTimeout callback executes
 * 
 * 4. Promise Resolution:
 *    - resolve() or reject() is called
 *    - Microtask queued to resume runPipeline()
 *    - Event loop prioritizes microtasks
 *    - runPipeline() resumes after await
 * 
 * 5. Pipeline Continuation:
 *    - Next console.log executes
 *    - Process repeats for next await
 *    - Each await: pause → wait → resume cycle
 * 
 * 6. Error Scenario:
 *    - If any Promise rejects
 *    - Microtask queued to resume at catch block
 *    - Try block exits, catch block executes
 *    - Pipeline stops, error logged
 * 
 * KEY INSIGHTS:
 * ───────────────────────────────────────────────────────────────────
 * 
 * ✅ Async/await is just syntactic sugar over Promises
 * ✅ Each await creates a pause point in execution
 * ✅ Event loop manages when to resume
 * ✅ Microtasks (Promise resolution) have priority
 * ✅ Try/catch works naturally with async/await
 * ✅ Sequential await = sequential execution
 * ✅ For parallel execution, use Promise.all()
 * 
 * PERFORMANCE CONSIDERATION:
 * ───────────────────────────────────────────────────────────────────
 * 
 * Current approach (Sequential):
 * Total time = sum of all delays (~5-10 seconds)
 * 
 * Parallel approach (if steps are independent):
 * const [a, b, c] = await Promise.all([step1(), step2(), step3()]);
 * Total time = longest delay (~1-2 seconds)
 * 
 * BUT: Our pipeline MUST be sequential (can't pack before preparing!)
 * 
 * ═══════════════════════════════════════════════════════════════════
 */
