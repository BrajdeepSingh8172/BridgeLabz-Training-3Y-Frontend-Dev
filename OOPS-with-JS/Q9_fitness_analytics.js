/**
 * Q9 - Fitness App Analytics
 * 
 * This program demonstrates:
 * - filter() to get active users
 * - reduce() to calculate averages
 * - map() to format data
 * - Error handling for empty datasets
 * - Multiple array operations in one class
 */

class FitnessAnalytics {
  constructor(userData) {
    // Validate that userData is provided and is an array
    if (!userData) {
      throw new Error("User data is required");
    }

    if (!Array.isArray(userData)) {
      throw new Error("User data must be an array");
    }

    if (userData.length === 0) {
      throw new Error("Cannot perform analytics on empty dataset");
    }

    this.userData = userData;
  }

  /**
   * Get users with steps > 7000 (active users)
   * Uses filter() method
   * @returns {Array} Array of active users
   */
  getActiveUsers() {
    const ACTIVE_THRESHOLD = 7000;
    
    const activeUsers = this.userData.filter(user => user.steps > ACTIVE_THRESHOLD);
    
    return activeUsers;
  }

  /**
   * Calculate average calories burned across all users
   * Uses reduce() method
   * @returns {number} Average calories
   */
  getAverageCalories() {
    if (this.userData.length === 0) {
      throw new Error("Cannot calculate average for empty dataset");
    }

    const totalCalories = this.userData.reduce((sum, user) => {
      return sum + user.calories;
    }, 0);

    const average = totalCalories / this.userData.length;
    
    return average;
  }

  /**
   * Format user data as readable summary messages
   * Uses map() method
   * @returns {Array} Array of formatted messages
   */
  getUserSummary() {
    return this.userData.map(user => {
      const activityLevel = user.steps > 10000 ? "🔥 Excellent" 
                          : user.steps > 7000 ? "💪 Good" 
                          : "⚠️ Need Improvement";
      
      return `User ${user.user}: ${user.steps.toLocaleString()} steps | ${user.calories} calories | ${activityLevel}`;
    });
  }

  /**
   * Get comprehensive analytics report
   */
  getFullReport() {
    try {
      console.log("\n" + "=".repeat(70));
      console.log("💪 FITNESS ANALYTICS REPORT");
      console.log("=".repeat(70));

      // Total users
      console.log(`\n📊 Total Users Analyzed: ${this.userData.length}`);

      // Active users
      const activeUsers = this.getActiveUsers();
      console.log(`\n🏃 Active Users (Steps > 7000): ${activeUsers.length}/${this.userData.length}`);
      
      if (activeUsers.length > 0) {
        console.log("\nActive Users List:");
        activeUsers.forEach(user => {
          console.log(`   • User ${user.user}: ${user.steps.toLocaleString()} steps, ${user.calories} calories`);
        });
      }

      // Average calories
      const avgCalories = this.getAverageCalories();
      console.log(`\n🔥 Average Calories Burned: ${avgCalories.toFixed(2)} cal`);

      // User summaries
      console.log(`\n📋 Individual User Summary:`);
      console.log("-".repeat(70));
      const summaries = this.getUserSummary();
      summaries.forEach(summary => {
        console.log(summary);
      });

      // Additional statistics
      console.log(`\n📈 Additional Statistics:`);
      this.displayAdditionalStats();

      console.log("=".repeat(70));

    } catch (error) {
      console.log("\n❌ Error generating report:");
      console.log(`   ${error.message}`);
      throw error;
    }
  }

  /**
   * Display additional statistics
   */
  displayAdditionalStats() {
    // Total steps
    const totalSteps = this.userData.reduce((sum, user) => sum + user.steps, 0);
    console.log(`   Total Steps: ${totalSteps.toLocaleString()}`);

    // Total calories
    const totalCalories = this.userData.reduce((sum, user) => sum + user.calories, 0);
    console.log(`   Total Calories: ${totalCalories.toLocaleString()}`);

    // Average steps
    const avgSteps = totalSteps / this.userData.length;
    console.log(`   Average Steps: ${avgSteps.toFixed(2)}`);

    // Most active user
    const mostActive = this.userData.reduce((max, user) => 
      user.steps > max.steps ? user : max
    );
    console.log(`   Most Active: User ${mostActive.user} (${mostActive.steps.toLocaleString()} steps)`);

    // Least active user
    const leastActive = this.userData.reduce((min, user) => 
      user.steps < min.steps ? user : min
    );
    console.log(`   Least Active: User ${leastActive.user} (${leastActive.steps.toLocaleString()} steps)`);

    // Highest calories
    const maxCalories = this.userData.reduce((max, user) => 
      user.calories > max.calories ? user : max
    );
    console.log(`   Highest Calories: User ${maxCalories.user} (${maxCalories.calories} cal)`);
  }
}

// ==================== TEST DATA ====================

const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 }
];

console.log("🏋️ FITNESS APP ANALYTICS SYSTEM");
console.log("=".repeat(70));

console.log("\n📝 WORKOUT DATA:");
console.log("-".repeat(70));
console.table(workoutData);

// ==================== EXECUTE ALL METHODS ====================

try {
  // Create analytics instance
  const analytics = new FitnessAnalytics(workoutData);

  // Execute all methods and display full report
  analytics.getFullReport();

} catch (error) {
  console.log("\n❌ ERROR:");
  console.log(`   ${error.message}`);
}

// ==================== TEST WITH EMPTY DATASET ====================

console.log("\n\n❌ TEST CASE: Empty Dataset");
console.log("=".repeat(70));

try {
  const emptyAnalytics = new FitnessAnalytics([]);
  emptyAnalytics.getFullReport();
} catch (error) {
  console.log(`✓ Error caught correctly: "${error.message}"`);
  console.log("   The system properly handles empty datasets!");
}

// ==================== TEST WITH LARGER DATASET ====================

console.log("\n\n✅ TEST CASE: Larger Dataset");
console.log("=".repeat(70));

const largerWorkoutData = [
  { user: "Alex", steps: 15000, calories: 650 },
  { user: "Beth", steps: 9500, calories: 420 },
  { user: "Carl", steps: 5200, calories: 230 },
  { user: "Diana", steps: 11000, calories: 480 },
  { user: "Eric", steps: 3500, calories: 180 },
  { user: "Fiona", steps: 8200, calories: 350 },
  { user: "George", steps: 13500, calories: 580 },
  { user: "Hannah", steps: 6800, calories: 290 }
];

console.log("\n📝 LARGER WORKOUT DATA:");
console.log("-".repeat(70));
console.table(largerWorkoutData);

try {
  const largeAnalytics = new FitnessAnalytics(largerWorkoutData);
  largeAnalytics.getFullReport();
} catch (error) {
  console.log("\n❌ ERROR:");
  console.log(`   ${error.message}`);
}

// ==================== DEMONSTRATE INDIVIDUAL METHODS ====================

console.log("\n\n🔍 INDIVIDUAL METHOD DEMONSTRATIONS");
console.log("=".repeat(70));

try {
  const demo = new FitnessAnalytics(workoutData);

  // Method 1: getActiveUsers()
  console.log("\n1️⃣ getActiveUsers() - Using filter():");
  console.log("-".repeat(70));
  const activeUsers = demo.getActiveUsers();
  console.log(`Active users (steps > 7000): ${activeUsers.length}`);
  console.table(activeUsers);

  // Method 2: getAverageCalories()
  console.log("\n2️⃣ getAverageCalories() - Using reduce():");
  console.log("-".repeat(70));
  const avgCal = demo.getAverageCalories();
  console.log(`Average calories: ${avgCal.toFixed(2)}`);
  console.log("\nCalculation:");
  workoutData.forEach(user => {
    console.log(`   User ${user.user}: ${user.calories} cal`);
  });
  const total = workoutData.reduce((sum, u) => sum + u.calories, 0);
  console.log(`   Total: ${total} cal`);
  console.log(`   Average: ${total} ÷ ${workoutData.length} = ${avgCal.toFixed(2)} cal`);

  // Method 3: getUserSummary()
  console.log("\n3️⃣ getUserSummary() - Using map():");
  console.log("-".repeat(70));
  const summaries = demo.getUserSummary();
  summaries.forEach((summary, index) => {
    console.log(`${index + 1}. ${summary}`);
  });

} catch (error) {
  console.log("\n❌ ERROR:");
  console.log(`   ${error.message}`);
}

/**
 * ARRAY METHODS BREAKDOWN:
 * ========================
 * 
 * 1. filter() - getActiveUsers()
 *    ---------------------------
 *    Returns new array with elements that pass the test
 *    
 *    userData.filter(user => user.steps > 7000)
 *    
 *    Input:  [A: 8000, B: 12000, C: 4000]
 *    Test:   steps > 7000
 *    Output: [A: 8000, B: 12000]
 * 
 * 
 * 2. reduce() - getAverageCalories()
 *    -------------------------------
 *    Reduces array to single value (sum)
 *    
 *    userData.reduce((sum, user) => sum + user.calories, 0)
 *    
 *    Iteration 1: 0 + 300 = 300
 *    Iteration 2: 300 + 500 = 800
 *    Iteration 3: 800 + 200 = 1000
 *    Average: 1000 / 3 = 333.33
 * 
 * 
 * 3. map() - getUserSummary()
 *    ------------------------
 *    Transforms each element into new format
 *    
 *    userData.map(user => `User ${user.user}: ...`)
 *    
 *    Input:  { user: "A", steps: 8000, calories: 300 }
 *    Output: "User A: 8,000 steps | 300 calories | 💪 Good"
 * 
 * 
 * ERROR HANDLING:
 * ===============
 * ✓ Validates data in constructor
 * ✓ Checks for null/undefined
 * ✓ Checks if array
 * ✓ Checks if empty
 * ✓ Throws meaningful errors
 * ✓ Caught with try-catch
 * 
 * 
 * FITNESS METRICS:
 * ================
 * Activity Levels:
 * - Excellent: > 10,000 steps 🔥
 * - Good: 7,000 - 10,000 steps 💪
 * - Need Improvement: < 7,000 steps ⚠️
 * 
 * WHO Recommendation: 10,000 steps/day
 */
