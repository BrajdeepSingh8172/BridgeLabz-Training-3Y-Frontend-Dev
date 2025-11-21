/**
 * Q5 - Ride-Sharing Application
 * 
 * This program demonstrates:
 * - Class inheritance (Driver extends User)
 * - Composition (Trip uses User/Driver)
 * - Error handling with try-catch
 * - Input validation
 * - Real-world application design
 */

// Base class: User
class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }

  displayInfo() {
    console.log(`Name: ${this.name}`);
    console.log(`Rating: ${this.rating} ⭐`);
  }
}

// Derived class: Driver (inherits from User)
class Driver extends User {
  constructor(name, rating, vehicleType, vehicleNumber, licenseNumber) {
    super(name, rating); // Call parent constructor
    this.vehicleType = vehicleType;
    this.vehicleNumber = vehicleNumber;
    this.licenseNumber = licenseNumber;
  }

  displayInfo() {
    console.log(`Driver Name: ${this.name}`);
    console.log(`Rating: ${this.rating} ⭐`);
    console.log(`Vehicle: ${this.vehicleType} (${this.vehicleNumber})`);
    console.log(`License: ${this.licenseNumber}`);
  }
}

// Trip class
class Trip {
  constructor(fromLocation, toLocation, distance, rider, driver) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;
    this.rider = rider;
    this.driver = driver;
    this.baseRate = 10; // ₹10 per km
    this.minimumFare = 50; // Minimum fare ₹50
  }

  /**
   * Calculate fare based on distance
   * @returns {number} Total fare amount
   * @throws {Error} If distance is invalid
   */
  calculateFare() {
    // Validate distance
    if (this.distance === undefined || this.distance === null) {
      throw new Error("Distance not provided. Cannot calculate fare.");
    }

    if (typeof this.distance !== 'number') {
      throw new Error(`Invalid distance type. Expected number, got ${typeof this.distance}.`);
    }

    if (this.distance < 0) {
      throw new Error(`Invalid distance: ${this.distance}. Distance cannot be negative.`);
    }

    if (this.distance === 0) {
      throw new Error("Distance is zero. Cannot calculate fare for zero distance.");
    }

    // Calculate fare
    let fare = this.distance * this.baseRate;

    // Apply minimum fare
    if (fare < this.minimumFare) {
      fare = this.minimumFare;
    }

    // Add surge pricing for long distances (> 20km)
    if (this.distance > 20) {
      const surgeFee = (this.distance - 20) * 2; // Extra ₹2 per km after 20km
      fare += surgeFee;
    }

    return fare;
  }

  /**
   * Display trip details
   */
  displayTripDetails() {
    console.log(`\nFrom: ${this.fromLocation}`);
    console.log(`To: ${this.toLocation}`);
    console.log(`Distance: ${this.distance} km`);
  }

  /**
   * Complete trip booking
   */
  bookTrip() {
    try {
      console.log("\n" + "=".repeat(60));
      console.log("🚗 TRIP BOOKING DETAILS");
      console.log("=".repeat(60));

      // Display rider info
      console.log("\n👤 RIDER INFORMATION:");
      this.rider.displayInfo();

      // Display driver info
      console.log("\n🚕 DRIVER INFORMATION:");
      this.driver.displayInfo();

      // Display trip info
      console.log("\n📍 TRIP INFORMATION:");
      this.displayTripDetails();

      // Calculate fare
      const fare = this.calculateFare();
      
      console.log(`\n💰 FARE CALCULATION:`);
      console.log(`Base Rate: ₹${this.baseRate}/km`);
      console.log(`Minimum Fare: ₹${this.minimumFare}`);
      
      if (this.distance > 20) {
        console.log(`Surge Pricing: ₹2/km for distance > 20km`);
      }
      
      console.log(`\n🎯 TOTAL FARE: ₹${fare}`);
      console.log("=".repeat(60));
      console.log("✅ Trip booked successfully!\n");

      return fare;

    } catch (error) {
      console.log("\n" + "=".repeat(60));
      console.log("❌ TRIP BOOKING FAILED");
      console.log("=".repeat(60));
      console.log(`Error: ${error.message}`);
      console.log("💡 Please check trip details and try again.");
      console.log("=".repeat(60) + "\n");
      throw error; // Re-throw for outer catch if needed
    }
  }
}

// ==================== CREATE USERS AND DRIVERS ====================

console.log("🚖 RIDE-SHARING APPLICATION");
console.log("=".repeat(60));

// Create riders (users)
const rider1 = new User("Amit Sharma", 4.8);
const rider2 = new User("Priya Singh", 4.9);
const rider3 = new User("Rahul Verma", 4.5);

// Create drivers
const driver1 = new Driver("Rajesh Kumar", 4.7, "Sedan", "MH-02-AB-1234", "DL-12345");
const driver2 = new Driver("Vikram Patel", 4.9, "SUV", "DL-03-CD-5678", "DL-67890");
const driver3 = new Driver("Suresh Reddy", 4.6, "Hatchback", "KA-05-EF-9012", "DL-11223");

// ==================== TEST CASE 1: VALID TRIP ====================

console.log("\n\n✅ TEST CASE 1: Valid Trip (Short Distance)");
try {
  const trip1 = new Trip("Connaught Place", "India Gate", 5, rider1, driver1);
  trip1.bookTrip();
} catch (error) {
  // Error already handled in bookTrip()
}

// ==================== TEST CASE 2: VALID LONG TRIP ====================

console.log("\n✅ TEST CASE 2: Valid Trip (Long Distance with Surge)");
try {
  const trip2 = new Trip("Delhi Airport", "Noida Sector 62", 25, rider2, driver2);
  trip2.bookTrip();
} catch (error) {
  // Error already handled in bookTrip()
}

// ==================== TEST CASE 3: NEGATIVE DISTANCE ====================

console.log("\n❌ TEST CASE 3: Invalid Trip (Negative Distance)");
try {
  const trip3 = new Trip("CP", "Karol Bagh", -5, rider3, driver3);
  trip3.bookTrip();
} catch (error) {
  // Error already handled in bookTrip()
}

// ==================== TEST CASE 4: ZERO DISTANCE ====================

console.log("\n❌ TEST CASE 4: Invalid Trip (Zero Distance)");
try {
  const trip4 = new Trip("Same Location", "Same Location", 0, rider1, driver1);
  trip4.bookTrip();
} catch (error) {
  // Error already handled in bookTrip()
}

// ==================== TEST CASE 5: NO DISTANCE PROVIDED ====================

console.log("\n❌ TEST CASE 5: Invalid Trip (Distance Not Provided)");
try {
  const trip5 = new Trip("Rajiv Chowk", "Chandni Chowk", undefined, rider2, driver2);
  trip5.bookTrip();
} catch (error) {
  // Error already handled in bookTrip()
}

// ==================== TEST CASE 6: MINIMUM FARE ====================

console.log("\n✅ TEST CASE 6: Valid Trip (Minimum Fare Applied)");
try {
  const trip6 = new Trip("Nearby Location A", "Nearby Location B", 2, rider3, driver3);
  trip6.bookTrip();
  console.log("💡 Note: Minimum fare of ₹50 was applied (2km × ₹10 = ₹20 < ₹50)\n");
} catch (error) {
  // Error already handled in bookTrip()
}

// ==================== SUMMARY ====================

console.log("\n📊 TRIP SUMMARY");
console.log("=".repeat(60));

const tripScenarios = [
  { distance: 5, description: "Short trip (5km)" },
  { distance: 25, description: "Long trip with surge (25km)" },
  { distance: 2, description: "Very short trip, minimum fare (2km)" },
  { distance: 50, description: "Very long trip, high surge (50km)" }
];

console.log("\nFare Calculation Examples:\n");

tripScenarios.forEach((scenario, index) => {
  try {
    const testTrip = new Trip("A", "B", scenario.distance, rider1, driver1);
    const fare = testTrip.calculateFare();
    console.log(`${index + 1}. ${scenario.description.padEnd(40)} → ₹${fare}`);
  } catch (error) {
    console.log(`${index + 1}. ${scenario.description.padEnd(40)} → Error: ${error.message}`);
  }
});

console.log("\n" + "=".repeat(60));

/**
 * ERROR HANDLING STRATEGY:
 * ========================
 * 
 * 1. VALIDATION CHECKS:
 *    ✓ Distance not provided (undefined/null)
 *    ✓ Invalid type (not a number)
 *    ✓ Negative distance
 *    ✓ Zero distance
 * 
 * 2. ERROR MESSAGES:
 *    - Clear and descriptive
 *    - Include actual value when relevant
 *    - Suggest next steps
 * 
 * 3. TRY-CATCH BLOCKS:
 *    - Used in bookTrip() method
 *    - Graceful error handling
 *    - User-friendly output
 * 
 * 4. ERROR PROPAGATION:
 *    - Throw errors from calculateFare()
 *    - Catch in bookTrip()
 *    - Can be caught again by caller if needed
 * 
 * FARE CALCULATION LOGIC:
 * =======================
 * 
 * Base Fare: ₹10 per km
 * Minimum Fare: ₹50 (for trips < 5km)
 * Surge Pricing: Extra ₹2/km for distance > 20km
 * 
 * Examples:
 * - 2km:  ₹10 × 2 = ₹20 → ₹50 (minimum)
 * - 5km:  ₹10 × 5 = ₹50
 * - 25km: ₹10 × 25 = ₹250 + (5km × ₹2) = ₹260
 * 
 * INHERITANCE HIERARCHY:
 * ======================
 * 
 * User (Base)
 *   ↓
 * Driver (extends User)
 *   - Inherits: name, rating
 *   - Adds: vehicleType, vehicleNumber, licenseNumber
 *   - Overrides: displayInfo()
 * 
 * Trip (Composition)
 *   - Uses: User (rider) and Driver
 *   - Has-a relationship, not Is-a
 */
