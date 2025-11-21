/**
 * Q1 - The Startup Morning: Async Coffee Maker
 * 
 * This program simulates an asynchronous coffee-making process with three steps:
 * 1. Boiling water
 * 2. Brewing coffee
 * 3. Pouring into a cup
 * 
 * Uses Promise chaining (.then()) and error handling (.catch())
 */

// Step 1: Boil water
function boilWater() {
  return new Promise((resolve, reject) => {
    console.log("☕ Starting to boil water...");
    
    setTimeout(() => {
      // Simulate random failure (10% chance)
      if (Math.random() > 0.9) {
        reject("❌ Error: Water boiler malfunctioned!");
      } else {
        console.log("✅ Water boiled successfully!");
        resolve("Hot water ready");
      }
    }, 1000);
  });
}

// Step 2: Brew coffee
function brewCoffee(water) {
  return new Promise((resolve, reject) => {
    console.log("☕ Brewing coffee with " + water + "...");
    
    setTimeout(() => {
      // Simulate random failure (10% chance)
      if (Math.random() > 0.9) {
        reject("❌ Error: Coffee machine jammed!");
      } else {
        console.log("✅ Coffee brewed perfectly!");
        resolve("Fresh brewed coffee");
      }
    }, 2000);
  });
}

// Step 3: Pour into cup
function pourIntoCup(coffee) {
  return new Promise((resolve, reject) => {
    console.log("☕ Pouring " + coffee + " into cup...");
    
    setTimeout(() => {
      // Simulate random failure (10% chance)
      if (Math.random() > 0.9) {
        reject("❌ Error: Cup fell and broke!");
      } else {
        console.log("✅ Coffee poured into cup!");
        resolve("Cup of coffee");
      }
    }, 1500);
  });
}

// Execute the coffee-making process using Promise chaining
console.log("🌅 Starting morning coffee routine...\n");

boilWater()
  .then(water => brewCoffee(water))
  .then(coffee => pourIntoCup(coffee))
  .then(result => {
    console.log("\n🎉 Coffee ready for the team! 🎉");
    console.log("✨ Enjoy your " + result + "!");
  })
  .catch(error => {
    console.log("\n" + error);
    console.log("⚠️ Coffee preparation failed. Please try again.");
  });
