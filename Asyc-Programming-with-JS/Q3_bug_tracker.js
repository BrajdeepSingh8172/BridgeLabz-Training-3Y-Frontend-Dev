/**
 * Q3 - Bug Tracker: Callback to Promise Migration
 * 
 * This program demonstrates migrating from callback-based async code
 * to modern Promise-based code for better readability and error handling.
 */

// Original callback-based function (Legacy code)
function fetchBugs(callback) {
  setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
}

// Modernized Promise-based version
function getBugs() {
  return new Promise((resolve, reject) => {
    // Simulate random API failure (20% chance)
    const shouldFail = Math.random() > 0.8;
    
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("API Error: Failed to fetch bugs from the server"));
      } else {
        resolve([
          { id: 1, bug: "UI glitch", severity: "Medium" },
          { id: 2, bug: "API timeout", severity: "High" },
          { id: 3, bug: "Login failure", severity: "Critical" }
        ]);
      }
    }, 1000);
  });
}

// Execute the Promise-based bug tracker
console.log("🐛 Fetching bugs from the tracking system...\n");

getBugs()
  .then(bugs => {
    console.log("✅ Successfully fetched bugs!\n");
    console.log("Bug Report:");
    console.table(bugs);
    console.log(`\nTotal bugs found: ${bugs.length}`);
  })
  .catch(error => {
    console.log("❌ " + error.message);
    console.log("⚠️ Please check your connection and try again.");
  });

/**
 * BENEFITS OF PROMISE-BASED APPROACH:
 * 
 * 1. Better Error Handling:
 *    - Callbacks: Error handling must be done manually in each callback
 *    - Promises: Centralized error handling with .catch()
 * 
 * 2. Improved Readability:
 *    - Callbacks: Can lead to "callback hell" with nested functions
 *    - Promises: Clean chaining with .then()
 * 
 * 3. Easier Testing:
 *    - Promises return values that can be easily tested
 *    - Better integration with async/await
 * 
 * 4. Composition:
 *    - Promises can be easily combined with Promise.all(), Promise.race(), etc.
 */
