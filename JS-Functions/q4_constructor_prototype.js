/**
 * Q4: Constructor Functions and Prototypes
 * 
 * This program demonstrates how constructor functions work with prototypes
 * to share methods across multiple instances.
 */

// Constructor function for Car (convention: capitalize first letter)
function Car(brand, model) {
    // 'this' refers to the new object being created
    this.brand = brand;
    this.model = model;
}

// Add a method to the prototype
// All Car instances will share this method (memory efficient)
Car.prototype.getDetails = function() {
    console.log(`Car: ${this.brand} ${this.model}`);
};

// Add another method to demonstrate prototype sharing
Car.prototype.start = function() {
    console.log(`${this.brand} ${this.model} is starting... Vroom!`);
};

// ============= DEMONSTRATION =============
console.log("=== Constructor Functions and Prototypes ===\n");

// Create two car objects using the constructor
const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Honda", "Civic");

console.log("--- Car Objects Created ---");
console.log("Car 1:", car1);
console.log("Car 2:", car2);

console.log("\n--- Calling getDetails() Method ---");
car1.getDetails();
car2.getDetails();

console.log("\n--- Calling start() Method ---");
car1.start();
car2.start();

console.log("\n--- Verifying Method Sharing via Prototype ---");
// Both instances share the SAME method in memory (from prototype)
console.log("car1.getDetails === car2.getDetails:", car1.getDetails === car2.getDetails);

// But they have DIFFERENT property values (each instance has its own)
console.log("car1.brand === car2.brand:", car1.brand === car2.brand);

console.log("\n--- Prototype Chain Visualization ---");
console.log("car1.__proto__ === Car.prototype:", car1.__proto__ === Car.prototype);
console.log("car1 instanceof Car:", car1 instanceof Car);

console.log("\n--- Adding Properties vs Methods ---");
// Properties should be in constructor (each instance gets its own copy)
// Methods should be in prototype (all instances share the same copy)

const car3 = new Car("Tesla", "Model 3");
car3.year = 2024; // Adding a property to a specific instance
console.log("Car 3 with year:", car3);
console.log("Car 1 doesn't have year:", car1.year); // undefined

/**
 * EXPLANATION:
 * 
 * 1. Constructor Function:
 *    - Defines properties that each instance should have
 *    - Called with 'new' keyword to create objects
 *    - 'this' refers to the new object being created
 * 
 * 2. Prototype:
 *    - Shared object among all instances
 *    - Methods added to prototype are shared (memory efficient)
 *    - All instances can access prototype methods
 * 
 * 3. Why use Prototype for methods?
 *    - Memory efficiency: One copy of the method shared by all instances
 *    - If we put methods in the constructor, each instance would have its own copy
 * 
 * 4. Best Practice:
 *    - Properties: Define in constructor (each instance needs its own values)
 *    - Methods: Define on prototype (all instances share the same functions)
 */

console.log("\n--- Memory Comparison Example ---");

// Bad practice: Method in constructor (each instance gets its own copy)
function CarBad(brand, model) {
    this.brand = brand;
    this.model = model;
    // This creates a NEW function for EACH instance (wasteful)
    this.getDetails = function() {
        console.log(`Car: ${this.brand} ${this.model}`);
    };
}

const badCar1 = new CarBad("Ford", "F150");
const badCar2 = new CarBad("Chevy", "Silverado");

console.log("Bad practice - each instance has different function:");
console.log("badCar1.getDetails === badCar2.getDetails:", badCar1.getDetails === badCar2.getDetails);

console.log("\nGood practice - all instances share same function:");
console.log("car1.getDetails === car2.getDetails:", car1.getDetails === car2.getDetails);
