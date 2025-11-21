/**
 * Q8 - Movie Ticket Booking System
 * 
 * This program demonstrates:
 * - Class inheritance
 * - Prototype methods
 * - Prototype chain
 * - Method addition to prototype
 * - Calling parent prototype methods from child
 */

// Base class: MovieTicket
class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
    this.bookingId = this.generateBookingId();
  }

  generateBookingId() {
    return 'TKT' + Date.now() + Math.floor(Math.random() * 1000);
  }

  getTicketInfo() {
    return {
      bookingId: this.bookingId,
      movie: this.movieName,
      seat: this.seatNo,
      price: this.price
    };
  }
}

// Add printTicket() method to MovieTicket prototype
// This will be available to all MovieTicket instances and inherited classes
MovieTicket.prototype.printTicket = function() {
  console.log("\n" + "=".repeat(50));
  console.log("🎬 MOVIE TICKET");
  console.log("=".repeat(50));
  console.log(`Booking ID: ${this.bookingId}`);
  console.log(`Movie: ${this.movieName}`);
  console.log(`Seat: ${this.seatNo}`);
  console.log(`Ticket Price: ₹${this.price}`);
  
  // If this is an OnlineTicket, it will have convenienceFee and getTotalAmount
  if (this.convenienceFee !== undefined) {
    console.log(`Convenience Fee: ₹${this.convenienceFee}`);
    console.log(`Total Amount: ₹${this.getTotalAmount()}`);
  }
  
  console.log("=".repeat(50));
  console.log("Enjoy your movie! 🍿");
  console.log("=".repeat(50));
};

// Derived class: OnlineTicket (inherits from MovieTicket)
class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee = 50) {
    super(movieName, seatNo, price); // Call parent constructor
    this.convenienceFee = convenienceFee;
    this.bookingType = "Online";
  }

  /**
   * Calculate total amount including convenience fee
   * @returns {number} Total amount
   */
  getTotalAmount() {
    return this.price + this.convenienceFee;
  }

  /**
   * Get complete booking details
   */
  getBookingDetails() {
    return {
      ...this.getTicketInfo(),
      convenienceFee: this.convenienceFee,
      totalAmount: this.getTotalAmount(),
      bookingType: this.bookingType
    };
  }
}

// ==================== CREATE TICKETS ====================

console.log("🎫 MOVIE TICKET BOOKING SYSTEM");
console.log("=".repeat(60));

// Create regular MovieTicket
const regularTicket1 = new MovieTicket("Avengers: Endgame", "A12", 250);
const regularTicket2 = new MovieTicket("Inception", "B5", 300);

// Create OnlineTickets
const onlineTicket1 = new OnlineTicket("The Dark Knight", "C7", 280, 60);
const onlineTicket2 = new OnlineTicket("Interstellar", "D15", 320, 70);
const onlineTicket3 = new OnlineTicket("Joker", "E3", 200, 50);

// ==================== DEMONSTRATE PROTOTYPE CHAIN ====================

console.log("\n\n🔗 PROTOTYPE CHAIN DEMONSTRATION");
console.log("=".repeat(60));

console.log("\n1. Regular MovieTicket using printTicket() from prototype:");
regularTicket1.printTicket();

console.log("\n2. OnlineTicket using printTicket() from parent's prototype:");
onlineTicket1.printTicket();

console.log("\n💡 Notice: OnlineTicket can use printTicket() even though it's");
console.log("   defined on MovieTicket.prototype!");
console.log("   This is the PROTOTYPE CHAIN in action! ✨");

// ==================== VERIFY PROTOTYPE CHAIN ====================

console.log("\n\n🔍 PROTOTYPE CHAIN VERIFICATION");
console.log("=".repeat(60));

console.log("\n1. Check where printTicket() is defined:");
console.log(`   MovieTicket.prototype.printTicket exists: ${typeof MovieTicket.prototype.printTicket === 'function'}`);
console.log(`   OnlineTicket.prototype.printTicket exists: ${typeof OnlineTicket.prototype.printTicket === 'function'}`);
console.log(`   (OnlineTicket gets it from MovieTicket.prototype)`);

console.log("\n2. Prototype chain inspection:");
console.log(`   onlineTicket1 instanceof OnlineTicket: ${onlineTicket1 instanceof OnlineTicket}`);
console.log(`   onlineTicket1 instanceof MovieTicket: ${onlineTicket1 instanceof MovieTicket}`);
console.log(`   regularTicket1 instanceof OnlineTicket: ${regularTicket1 instanceof OnlineTicket}`);

console.log("\n3. Method resolution:");
console.log(`   onlineTicket1.printTicket === regularTicket1.printTicket: ${onlineTicket1.printTicket === regularTicket1.printTicket}`);
console.log(`   (Both use the same prototype method)`);

// ==================== DEMONSTRATE getTotalAmount() ====================

console.log("\n\n💰 TOTAL AMOUNT CALCULATION");
console.log("=".repeat(60));

console.log("\nOnlineTicket 1:");
console.log(`  Movie: ${onlineTicket1.movieName}`);
console.log(`  Ticket Price: ₹${onlineTicket1.price}`);
console.log(`  Convenience Fee: ₹${onlineTicket1.convenienceFee}`);
console.log(`  Total Amount: ₹${onlineTicket1.getTotalAmount()}`);

console.log("\nOnlineTicket 2:");
console.log(`  Movie: ${onlineTicket2.movieName}`);
console.log(`  Ticket Price: ₹${onlineTicket2.price}`);
console.log(`  Convenience Fee: ₹${onlineTicket2.convenienceFee}`);
console.log(`  Total Amount: ₹${onlineTicket2.getTotalAmount()}`);

// ==================== PRINT ALL TICKETS ====================

console.log("\n\n🎟️  ALL BOOKED TICKETS");
console.log("=".repeat(60));

console.log("\n--- Regular Tickets (Theater Counter) ---");
regularTicket1.printTicket();
regularTicket2.printTicket();

console.log("\n--- Online Tickets (Booked Online) ---");
onlineTicket1.printTicket();
onlineTicket2.printTicket();
onlineTicket3.printTicket();

// ==================== BOOKING SUMMARY ====================

console.log("\n\n📊 BOOKING SUMMARY");
console.log("=".repeat(60));

const allTickets = [regularTicket1, regularTicket2, onlineTicket1, onlineTicket2, onlineTicket3];

console.log(`\nTotal Tickets Booked: ${allTickets.length}`);
console.log(`Regular Tickets: 2`);
console.log(`Online Tickets: 3`);

const totalRevenue = allTickets.reduce((total, ticket) => {
  if (ticket instanceof OnlineTicket) {
    return total + ticket.getTotalAmount();
  }
  return total + ticket.price;
}, 0);

console.log(`\nTotal Revenue: ₹${totalRevenue}`);

// Calculate online tickets revenue
const onlineRevenue = [onlineTicket1, onlineTicket2, onlineTicket3]
  .reduce((total, ticket) => total + ticket.getTotalAmount(), 0);

const regularRevenue = [regularTicket1, regularTicket2]
  .reduce((total, ticket) => total + ticket.price, 0);

console.log(`  - Regular Tickets: ₹${regularRevenue}`);
console.log(`  - Online Tickets: ₹${onlineRevenue}`);

// ==================== DEMONSTRATE PROTOTYPE METHOD ADDITION ====================

console.log("\n\n➕ ADDING ANOTHER PROTOTYPE METHOD");
console.log("=".repeat(60));

// Add a new method to MovieTicket prototype
MovieTicket.prototype.cancelTicket = function() {
  console.log(`\n🚫 Ticket Cancelled!`);
  console.log(`   Booking ID: ${this.bookingId}`);
  console.log(`   Movie: ${this.movieName}`);
  console.log(`   Refund Amount: ₹${this instanceof OnlineTicket ? this.getTotalAmount() : this.price}`);
  console.log(`   (Processing refund...)`);
};

console.log("\nNew method 'cancelTicket()' added to MovieTicket.prototype");
console.log("Testing on both regular and online tickets:\n");

regularTicket1.cancelTicket();
onlineTicket2.cancelTicket();

console.log("\n✨ Both ticket types can use the new prototype method!");

// ==================== PROTOTYPE CHAIN VISUALIZATION ====================

console.log("\n\n📚 PROTOTYPE CHAIN VISUALIZATION");
console.log("=".repeat(60));

console.log(`
Object: onlineTicket1
  ↓
OnlineTicket Instance
  - movieName: "${onlineTicket1.movieName}"
  - seatNo: "${onlineTicket1.seatNo}"
  - price: ${onlineTicket1.price}
  - convenienceFee: ${onlineTicket1.convenienceFee}
  - getTotalAmount() ✓
  ↓
OnlineTicket.prototype
  - constructor
  - getTotalAmount() ✓
  ↓
MovieTicket.prototype
  - printTicket() ✓
  - cancelTicket() ✓
  ↓
Object.prototype
  - toString()
  - valueOf()
  - etc.
`);

console.log("When calling onlineTicket1.printTicket():");
console.log("1. Look in onlineTicket1 instance → Not found");
console.log("2. Look in OnlineTicket.prototype → Not found");
console.log("3. Look in MovieTicket.prototype → Found! ✓");
console.log("4. Execute the method");

/**
 * KEY CONCEPTS DEMONSTRATED:
 * ==========================
 * 
 * 1. PROTOTYPE METHODS:
 *    - Added using: MovieTicket.prototype.methodName = function() {...}
 *    - Shared across all instances (memory efficient)
 *    - Can be added after class definition
 * 
 * 2. PROTOTYPE CHAIN:
 *    OnlineTicket → OnlineTicket.prototype 
 *                → MovieTicket.prototype 
 *                → Object.prototype
 *    
 *    - Child class inherits parent's prototype methods
 *    - Method lookup follows the chain
 *    - First match is used
 * 
 * 3. INHERITANCE:
 *    - OnlineTicket extends MovieTicket
 *    - Gets all parent properties and methods
 *    - Can add its own methods (getTotalAmount)
 *    - Can override parent methods
 * 
 * 4. PROTOTYPE METHOD BENEFITS:
 *    ✓ Shared across all instances
 *    ✓ Can be added dynamically
 *    ✓ Memory efficient
 *    ✓ Inherited by child classes
 *    ✓ Can be modified at runtime
 * 
 * 5. CALLING PROTOTYPE METHODS:
 *    - Just call them like regular methods
 *    - JavaScript automatically looks up the chain
 *    - Transparent to the user
 * 
 * REAL-WORLD ANALOGY:
 * ===================
 * Think of it like inheritance in a family:
 * - Grandparent (Object.prototype) has basic methods
 * - Parent (MovieTicket.prototype) has printTicket
 * - Child (OnlineTicket) inherits everything and adds more
 * 
 * WHY THIS MATTERS:
 * =================
 * - Understanding prototype chain is crucial for JavaScript
 * - Helps debug "method not found" errors
 * - Enables powerful patterns like mixins
 * - Core to how JavaScript objects work
 */
