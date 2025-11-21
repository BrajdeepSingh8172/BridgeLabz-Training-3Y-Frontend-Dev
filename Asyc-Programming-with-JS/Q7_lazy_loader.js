/**
 * Q7 - The Lazy Loader: Promise Combinator Practice
 * 
 * This program demonstrates Promise.allSettled() to handle multiple
 * async operations that may succeed or fail independently.
 * 
 * Unlike Promise.all(), Promise.allSettled() waits for all promises
 * to settle (either resolve or reject) without short-circuiting.
 */

// Dashboard loading functions
function loadProfile() {
  return new Promise((resolve, reject) => {
    console.log("📱 Loading Profile...");
    
    setTimeout(() => {
      // Random 30% chance of failure
      if (Math.random() > 0.7) {
        reject("Profile loading failed");
      } else {
        resolve("Profile Loaded");
      }
    }, 2000);
  });
}

function loadPosts() {
  return new Promise((resolve, reject) => {
    console.log("📝 Loading Posts...");
    
    setTimeout(() => {
      // Random 30% chance of failure
      if (Math.random() > 0.7) {
        reject("Posts loading failed");
      } else {
        resolve("Posts Loaded");
      }
    }, 1500);
  });
}

function loadMessages() {
  return new Promise((resolve, reject) => {
    console.log("💬 Loading Messages...");
    
    setTimeout(() => {
      // Random 30% chance of failure
      if (Math.random() > 0.7) {
        reject("Messages loading failed");
      } else {
        resolve("Messages Loaded");
      }
    }, 1000);
  });
}

// Main function to load dashboard
async function loadDashboard() {
  console.log("🚀 Starting Dashboard Load...\n");
  
  // Record start time
  const startTime = Date.now();
  
  // Use Promise.allSettled to handle all promises regardless of success/failure
  const results = await Promise.allSettled([
    loadProfile(),
    loadPosts(),
    loadMessages()
  ]);
  
  // Record end time
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 DASHBOARD LOAD REPORT");
  console.log("=".repeat(60));
  
  // Analyze results
  let successCount = 0;
  let failureCount = 0;
  
  results.forEach((result, index) => {
    const moduleName = ['Profile', 'Posts', 'Messages'][index];
    
    if (result.status === 'fulfilled') {
      console.log(`✅ ${moduleName}: SUCCESS - ${result.value}`);
      successCount++;
    } else {
      console.log(`❌ ${moduleName}: FAILED - ${result.reason}`);
      failureCount++;
    }
  });
  
  console.log("=".repeat(60));
  console.log(`\n📈 Summary:`);
  console.log(`   Successful modules: ${successCount}/3`);
  console.log(`   Failed modules: ${failureCount}/3`);
  console.log(`   Total time taken: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);
  console.log(`\n⏱️  Expected time: ~2000ms (longest operation)`);
  console.log(`   Actual time: ${totalTime}ms`);
  
  if (successCount === 3) {
    console.log("\n🎉 Dashboard fully loaded!");
  } else if (successCount > 0) {
    console.log("\n⚠️  Dashboard partially loaded. Some features may be unavailable.");
  } else {
    console.log("\n❌ Dashboard failed to load. Please refresh the page.");
  }
}

// Execute the dashboard loader
loadDashboard();

/**
 * WHY USE Promise.allSettled()?
 * 
 * Promise.all() vs Promise.allSettled():
 * 
 * Promise.all():
 * - Rejects immediately if ANY promise rejects
 * - You lose information about successful promises
 * - All-or-nothing approach
 * - Use when: All operations must succeed
 * 
 * Promise.allSettled():
 * - Waits for ALL promises to settle (resolve OR reject)
 * - Returns status and value/reason for each promise
 * - Never rejects - always resolves with an array of results
 * - Use when: You need to know the outcome of each operation
 * 
 * RESULT FORMAT:
 * [
 *   { status: 'fulfilled', value: 'Profile Loaded' },
 *   { status: 'rejected', reason: 'Posts loading failed' },
 *   { status: 'fulfilled', value: 'Messages Loaded' }
 * ]
 * 
 * REAL-WORLD USE CASES:
 * - Loading multiple independent dashboard widgets
 * - Batch API calls where partial success is acceptable
 * - Resource loading where fallbacks exist
 * - Analytics tracking (don't let failures break the app)
 * 
 * TIME COMPLEXITY:
 * - All promises run concurrently (parallel execution)
 * - Total time = time of the slowest promise
 * - Much faster than sequential await calls
 */
