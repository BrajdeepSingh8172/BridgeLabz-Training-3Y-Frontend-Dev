// Q1: Personalized Login Greeting
// Declares a userName and uses new Date().getHours() to provide time-based greetings.

// Sample input (change as needed)
const userName = 'Alex';

// Get current hour (0-23)
const currentHour = new Date().getHours();

let greeting;
if (currentHour < 12) {
  greeting = `Good Morning ${userName}!`;
} else if (currentHour >= 12 && currentHour < 17) {
  greeting = `Good Afternoon ${userName}!`;
} else {
  greeting = `Good Evening ${userName}!`;
}

console.log(greeting);

// Export for testing (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { userName, currentHour, greeting };
}
