/**
 * Q1 - Student Result Processing (reduce + Classes)
 * 
 * This program demonstrates:
 * - Class creation with properties
 * - reduce() method for calculating average
 * - Conditional logic for grading
 * - Object-oriented design
 */

class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  /**
   * Calculate average marks using reduce()
   * @returns {number} Average of all marks
   */
  calculateAverage() {
    // Use reduce to sum all marks, then divide by length
    const total = this.marks.reduce((sum, mark) => sum + mark, 0);
    const average = total / this.marks.length;
    return average;
  }

  /**
   * Get grade based on average marks
   * @returns {string} Grade (A/B/C/F)
   */
  getGrade() {
    const average = this.calculateAverage();
    
    if (average >= 90) {
      return 'A';
    } else if (average >= 75) {
      return 'B';
    } else if (average >= 50) {
      return 'C';
    } else {
      return 'F';
    }
  }

  /**
   * Display student result in formatted manner
   */
  displayResult() {
    const average = this.calculateAverage();
    const grade = this.getGrade();
    
    console.log(`\n${"=".repeat(50)}`);
    console.log(`Student Name: ${this.name}`);
    console.log(`Marks: [${this.marks.join(", ")}]`);
    console.log(`Average Marks: ${average.toFixed(2)}`);
    console.log(`Grade: ${grade}`);
    console.log(`Status: ${grade !== 'F' ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`${"=".repeat(50)}`);
  }
}

// ==================== TESTING WITH 3 STUDENTS ====================

console.log("📚 STUDENT RESULT PROCESSING SYSTEM");
console.log("=" .repeat(50));

// Student 1: Excellent performer
const student1 = new Student("Rahul Sharma", [95, 92, 88, 96, 90]);
student1.displayResult();

// Student 2: Average performer
const student2 = new Student("Priya Patel", [78, 82, 75, 80, 85]);
student2.displayResult();

// Student 3: Below average performer
const student3 = new Student("Amit Kumar", [45, 38, 52, 48, 40]);
student3.displayResult();

// ==================== SUMMARY ====================

console.log("\n📊 CLASS SUMMARY");
console.log("=" .repeat(50));

const students = [student1, student2, student3];

students.forEach((student, index) => {
  console.log(`${index + 1}. ${student.name.padEnd(20)} - Grade: ${student.getGrade()} (Avg: ${student.calculateAverage().toFixed(2)})`);
});

// Calculate class average
const classAverage = students
  .map(student => student.calculateAverage())
  .reduce((sum, avg) => sum + avg, 0) / students.length;

console.log("\n📈 Class Average: " + classAverage.toFixed(2));

/**
 * HOW reduce() WORKS IN calculateAverage():
 * ==========================================
 * 
 * Example: marks = [95, 92, 88, 96, 90]
 * 
 * reduce((sum, mark) => sum + mark, 0)
 * 
 * Iteration 1: sum = 0,   mark = 95  →  return 0 + 95 = 95
 * Iteration 2: sum = 95,  mark = 92  →  return 95 + 92 = 187
 * Iteration 3: sum = 187, mark = 88  →  return 187 + 88 = 275
 * Iteration 4: sum = 275, mark = 96  →  return 275 + 96 = 371
 * Iteration 5: sum = 371, mark = 90  →  return 371 + 90 = 461
 * 
 * Final result: 461
 * Average: 461 / 5 = 92.2
 * 
 * GRADING SYSTEM:
 * ===============
 * A: 90 and above  (Excellent)
 * B: 75 - 89       (Good)
 * C: 50 - 74       (Average)
 * F: Below 50      (Fail)
 */
