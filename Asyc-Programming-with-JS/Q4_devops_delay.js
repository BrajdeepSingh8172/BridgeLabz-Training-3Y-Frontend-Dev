/**
 * Q4 - DevOps Delay: Async Timeout Race
 * 
 * This program simulates two deployment servers responding at different times.
 * It tracks both the first responder (Promise.race) and overall completion (Promise.all).
 */

// Server A - responds in 2 seconds
function deployServerA() {
  return new Promise((resolve, reject) => {
    console.log("🚀 Server A: Starting deployment...");
    
    setTimeout(() => {
      // Simulate random failure (15% chance)
      if (Math.random() > 0.85) {
        reject("Server A: Deployment failed!");
      } else {
        console.log("✅ Server A: Deployment completed");
        resolve("Server A: Deployment successful");
      }
    }, 2000);
  });
}

// Server B - responds in 3 seconds
function deployServerB() {
  return new Promise((resolve, reject) => {
    console.log("🚀 Server B: Starting deployment...");
    
    setTimeout(() => {
      // Simulate random failure (15% chance)
      if (Math.random() > 0.85) {
        reject("Server B: Deployment failed!");
      } else {
        console.log("✅ Server B: Deployment completed");
        resolve("Server B: Deployment successful");
      }
    }, 3000);
  });
}

console.log("📦 Starting deployment process...\n");

// Track the fastest response using Promise.race()
Promise.race([deployServerA(), deployServerB()])
  .then(result => {
    console.log("\n⚡ Fastest response:", result);
  })
  .catch(error => {
    console.log("\n⚡ First server to respond encountered an error:", error);
  });

// Track completion of all servers using Promise.all()
Promise.all([deployServerA(), deployServerB()])
  .then(results => {
    console.log("\n🎉 Deployment completed for all servers!");
    console.log("Results:");
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result}`);
    });
  })
  .catch(error => {
    console.log("\n❌ Deployment failed!");
    console.log("Error:", error);
    console.log("⚠️ Rolling back changes...");
  });

/**
 * KEY DIFFERENCES:
 * 
 * Promise.race():
 * - Resolves/rejects as soon as ANY promise settles (first to finish)
 * - Useful for timeout mechanisms or getting the fastest response
 * - Other promises continue running but their results are ignored
 * 
 * Promise.all():
 * - Waits for ALL promises to resolve
 * - Rejects immediately if ANY promise rejects
 * - Returns an array of all results in the same order
 * - Useful when you need all operations to succeed
 * 
 * REAL-WORLD USE CASES:
 * - Promise.race(): Timeout fallbacks, fastest data source selection
 * - Promise.all(): Batch operations, loading multiple resources simultaneously
 */
