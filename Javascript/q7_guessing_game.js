// Q7: Smart Guessing Game (Number Range)
// Generate secret between 1-50 and evaluate a test userGuess.

const secret = Math.floor(Math.random() * 50) + 1; // 1..50
// Test guess (change to test different branches)
const userGuess = secret + 2; // intentionally close in this sample

if (userGuess === secret) {
  console.log('Correct guess!');
} else if (Math.abs(userGuess - secret) <= 3) {
  console.log('Very close!');
} else if (userGuess > secret) {
  console.log('Too high');
} else {
  console.log('Too low');
}

// For visibility in console while testing
console.log(`secret: ${secret}, userGuess: ${userGuess}`);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { secret, userGuess };
}
