// Q9: Random Math Quiz Generator
// Generates two random numbers (1-20) and a random operator and calculates the correct answer.

const a = Math.floor(Math.random() * 20) + 1; // 1..20
let b = Math.floor(Math.random() * 20) + 1; // 1..20
const operators = ['+', '-', '*', '/'];
const op = operators[Math.floor(Math.random() * operators.length)];

// Ensure we don't divide by zero (b is 1..20 so safe) but keep defensive coding
if (op === '/' && b === 0) b = 1;

let correctAnswer;
switch (op) {
  case '+':
    correctAnswer = a + b;
    break;
  case '-':
    correctAnswer = a - b;
    break;
  case '*':
    correctAnswer = a * b;
    break;
  case '/':
    correctAnswer = (a / b).toFixed(2); // round division to 2 decimals
    break;
  default:
    correctAnswer = null;
}

console.log(`Question: What is ${a} ${op} ${b}?`);
console.log('Correct answer:', correctAnswer);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { a, b, op, correctAnswer };
}
