/**
 * Q8 - Order Processing Flow: Async Retry Mechanism
 * 
 * This program implements a retry system for order submission that
 * fails randomly. It attempts up to 3 times before giving up.
 * 
 * Demonstrates: async/await, try/catch, loops, error handling
 */

// Simulates an order submission API that fails 50% of the time
function submitOrder() {
  return new Promise((resolve, reject) => {
    // 50% chance of failure
    const isSuccess = Math.random() > 0.5;
    
    setTimeout(() => {
      if (isSuccess) {
        resolve({
          orderId: Math.floor(Math.random() * 100000),
          status: "confirmed",
          message: "Order submitted successfully"
        });
      } else {
        reject(new Error("Network error: Unable to reach server"));
      }
    }, 1000); // 1 second delay to simulate network request
  });
}

// Main function that processes order with retry logic
async function processOrder() {
  const MAX_ATTEMPTS = 3;
  let lastError;
  
  console.log("🛒 Starting order processing...\n");
  
  // Try up to 3 times
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(`📤 Attempt ${attempt}/${MAX_ATTEMPTS}: Submitting order...`);
      
      // Attempt to submit the order
      const result = await submitOrder();
      
      // If successful, log and return
      console.log(`✅ Attempt ${attempt}: Success!`);
      console.log(`\n🎉 Order Confirmed!`);
      console.log(`   Order ID: #${result.orderId}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Message: ${result.message}`);
      
      return result; // Exit function on success
      
    } catch (error) {
      // Log the failure
      console.log(`❌ Attempt ${attempt}: Failed - ${error.message}`);
      lastError = error;
      
      // If this wasn't the last attempt, wait a bit before retrying
      if (attempt < MAX_ATTEMPTS) {
        const retryDelay = 1000 * attempt; // Exponential backoff: 1s, 2s, 3s
        console.log(`   ⏳ Waiting ${retryDelay / 1000}s before retry...\n`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  // If we get here, all attempts failed
  console.log(`\n💥 All ${MAX_ATTEMPTS} attempts failed!`);
  throw new Error("Order could not be processed after multiple attempts");
}

// Execute the order processing with final error handling
async function main() {
  try {
    await processOrder();
  } catch (error) {
    console.log(`\n⚠️  Final Error: ${error.message}`);
    console.log("📞 Please contact customer support or try again later.");
    console.log("   Support: 1-800-HELP");
  }
}

// Run the program
main();

/**
 * RETRY MECHANISM EXPLAINED:
 * 
 * 1. LOOP-BASED RETRY:
 *    - Use a for loop to control the number of attempts
 *    - Each iteration is an independent attempt
 *    - Track the last error for final error handling
 * 
 * 2. TRY/CATCH IN LOOP:
 *    - Each attempt is wrapped in try/catch
 *    - Success: Log and return (exits the function)
 *    - Failure: Catch error, log, and continue to next iteration
 * 
 * 3. EXPONENTIAL BACKOFF:
 *    - Wait longer between each retry (1s, 2s, 3s)
 *    - Reduces load on failing servers
 *    - Gives temporary issues time to resolve
 * 
 * 4. GRACEFUL DEGRADATION:
 *    - Clear logging at each step
 *    - User knows what's happening
 *    - Helpful error messages
 * 
 * BEST PRACTICES:
 * 
 * ✅ DO:
 * - Limit retry attempts (avoid infinite loops)
 * - Use exponential backoff
 * - Log each attempt for debugging
 * - Provide clear error messages
 * - Return early on success
 * 
 * ❌ DON'T:
 * - Retry forever (can DoS your own server)
 * - Retry immediately (gives no time to recover)
 * - Hide errors from users
 * - Retry on client errors (400-level HTTP codes)
 * 
 * WHEN TO USE RETRY LOGIC:
 * - Network requests (temporary connection issues)
 * - Rate-limited APIs (with backoff)
 * - Database deadlocks (with exponential backoff)
 * - Microservice communication (temporary unavailability)
 * 
 * WHEN NOT TO USE:
 * - User authentication errors (wrong password)
 * - Validation errors (bad input data)
 * - Authorization errors (insufficient permissions)
 * - Resource not found (404 errors)
 */
