// Q5: Weather Activity Planner
// Decide activity based on temperature, isRaining, and windSpeed.

// Sample inputs (modify to test)
const temperature = 22; // degrees Celsius
const isRaining = false; // boolean
const windSpeed = 12; // km/h

let advice;
if (isRaining) {
  advice = 'Stay indoors with hot coffee.';
} else if (temperature > 35) {
  advice = 'Go swimming.';
} else if (temperature < 15 && windSpeed > 20) {
  advice = 'Too cold and windy — stay home.';
} else {
  advice = 'Perfect day for a walk.';
}

console.log(`Temperature: ${temperature}°C, Raining: ${isRaining}, Wind: ${windSpeed} km/h`);
console.log('Advice:', advice);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { temperature, isRaining, windSpeed, advice };
}
