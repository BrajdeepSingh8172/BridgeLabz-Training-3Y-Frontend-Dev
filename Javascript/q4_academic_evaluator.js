// Q4: Academic Performance Evaluator
// Checks promotion based on 5 subject marks. If any subject < 35 -> Detained automatically.

// Sample marks (change to test different scenarios). Values assumed out of 100.
const marks = [88, 76, 91, 84, 79];

// Validation: any subject < 35 => detained
const hasFailedSubject = marks.some(m => m < 35);

const totalMarks = marks.reduce((s, m) => s + m, 0);
const average = totalMarks / marks.length; // average mark
const overallPercentage = (totalMarks / (marks.length * 100)) * 100; // percentage

let result;
if (hasFailedSubject) {
  result = 'Detained (failed a subject)';
} else if (overallPercentage >= 85) {
  result = 'Promoted with Distinction';
} else if (overallPercentage >= 50 && overallPercentage < 85) {
  result = 'Promoted';
} else {
  result = 'Detained';
}

console.log('Marks:', marks);
console.log(`Total: ${totalMarks}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Overall Percentage: ${overallPercentage.toFixed(2)}%`);
console.log('Result:', result);
 
// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { marks, totalMarks, average, overallPercentage, result };
}
