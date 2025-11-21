/**
 * Q5 - Frontend Rush: Avoiding Callback Hell
 * 
 * This program demonstrates the problem of "callback hell" and shows
 * how async/await provides a cleaner, more readable solution.
 * 
 * Build pipeline stages: design → build → test → deploy → celebrate
 */

// ==================== PART 1: CALLBACK HELL ====================

console.log("=== PART 1: CALLBACK HELL VERSION ===\n");

// Callback-based functions
function design(callback) {
  setTimeout(() => {
    console.log("✏️  Step 1: Design completed");
    callback();
  }, 1000);
}

function build(callback) {
  setTimeout(() => {
    console.log("🔨 Step 2: Build completed");
    callback();
  }, 1000);
}

function test(callback) {
  setTimeout(() => {
    console.log("🧪 Step 3: Test completed");
    callback();
  }, 1000);
}

function deploy(callback) {
  setTimeout(() => {
    console.log("🚀 Step 4: Deploy completed");
    callback();
  }, 1000);
}

function celebrate(callback) {
  setTimeout(() => {
    console.log("🎉 Step 5: Celebrate! All done!");
    callback();
  }, 1000);
}

// Nested callbacks - This is "Callback Hell"
design(() => {
  build(() => {
    test(() => {
      deploy(() => {
        celebrate(() => {
          console.log("\n✅ Pipeline completed (Callback version)\n");
        });
      });
    });
  });
});

/**
 * PROBLEMS WITH CALLBACK HELL:
 * 
 * 1. Pyramid of Doom: Code keeps indenting to the right
 * 2. Hard to Read: Flow is difficult to follow
 * 3. Error Handling: Must handle errors in each callback
 * 4. Maintenance: Adding/removing steps is error-prone
 * 5. Debugging: Stack traces are confusing
 */


// ==================== PART 2: ASYNC/AWAIT VERSION ====================

// Promise-based functions
function designAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✏️  Step 1: Design completed");
      resolve();
    }, 1000);
  });
}

function buildAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🔨 Step 2: Build completed");
      resolve();
    }, 1000);
  });
}

function testAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🧪 Step 3: Test completed");
      resolve();
    }, 1000);
  });
}

function deployAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🚀 Step 4: Deploy completed");
      resolve();
    }, 1000);
  });
}

function celebrateAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🎉 Step 5: Celebrate! All done!");
      resolve();
    }, 1000);
  });
}

// Async/await version - Clean and readable!
async function runPipeline() {
  console.log("\n=== PART 2: ASYNC/AWAIT VERSION ===\n");
  
  await designAsync();
  await buildAsync();
  await testAsync();
  await deployAsync();
  await celebrateAsync();
  
  console.log("\n✅ Pipeline completed (Async/await version)\n");
}

// Wait for callback version to complete, then run async version
setTimeout(() => {
  runPipeline();
}, 6000);

/**
 * WHY ASYNC/AWAIT IMPROVES READABILITY:
 * 
 * 1. LINEAR FLOW:
 *    - Code reads top-to-bottom like synchronous code
 *    - No nested indentation
 *    - Easy to understand the sequence
 * 
 * 2. ERROR HANDLING:
 *    - Use try/catch blocks (familiar pattern)
 *    - Single error handler for entire pipeline
 *    - Cleaner than error callbacks
 * 
 * 3. DEBUGGING:
 *    - Better stack traces
 *    - Easier to set breakpoints
 *    - Step through code naturally
 * 
 * 4. MAINTENANCE:
 *    - Add/remove steps easily
 *    - Conditional logic is straightforward
 *    - Code is self-documenting
 * 
 * 5. MODERN SYNTAX:
 *    - Built on Promises
 *    - Works with all Promise APIs
 *    - Industry standard for async code
 * 
 * COMPARISON:
 * - Callback Hell: 5 levels of nesting, hard to read
 * - Async/Await: 5 sequential lines, crystal clear
 * 
 * CONCLUSION:
 * Async/await is syntactic sugar over Promises that makes
 * asynchronous code look and behave like synchronous code,
 * dramatically improving readability and maintainability.
 */
