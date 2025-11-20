/**
 * Q5: Prototype Inheritance (Person → Student)
 * 
 * This program demonstrates prototypal inheritance where Student inherits from Person.
 */

// Parent Constructor - Person
function Person(name) {
    this.name = name;
}

// Add method to Person prototype
Person.prototype.showName = function() {
    console.log(`Name: ${this.name}`);
};

Person.prototype.greet = function() {
    console.log(`Hello, I am ${this.name}`);
};

// Child Constructor - Student
function Student(name, branch) {
    // Call parent constructor to set 'name' property
    Person.call(this, name);
    
    // Add student-specific property
    this.branch = branch;
}

// Set up inheritance: Student inherits from Person
// Student.prototype should be an object that has Person.prototype in its chain
Student.prototype = Object.create(Person.prototype);

// Fix the constructor reference
Student.prototype.constructor = Student;

// Add Student-specific method
Student.prototype.showBranch = function() {
    console.log(`Branch: ${this.branch}`);
};

// Method that uses both inherited and own properties
Student.prototype.showDetails = function() {
    console.log(`Student: ${this.name}, Branch: ${this.branch}`);
};

// ============= DEMONSTRATION =============
console.log("=== Prototype Inheritance: Person → Student ===\n");

// Create a Person instance
const person1 = new Person("John Doe");
console.log("--- Person Instance ---");
console.log(person1);
person1.showName();
person1.greet();

console.log("\n--- Student Instance ---");
// Create a Student instance
const student1 = new Student("Alice Smith", "Computer Science");
console.log(student1);

console.log("\n--- Student can access Person methods (inherited) ---");
student1.showName();  // Inherited from Person
student1.greet();     // Inherited from Person

console.log("\n--- Student has its own methods ---");
student1.showBranch();
student1.showDetails();

console.log("\n--- Creating Another Student ---");
const student2 = new Student("Bob Johnson", "Electronics");
student2.showDetails();
student2.greet();

console.log("\n--- Demonstrating Prototype Chain ---");
console.log("student1 instanceof Student:", student1 instanceof Student);
console.log("student1 instanceof Person:", student1 instanceof Person);
console.log("student1 instanceof Object:", student1 instanceof Object);

console.log("\nperson1 instanceof Student:", person1 instanceof Student);
console.log("person1 instanceof Person:", person1 instanceof Person);

console.log("\n--- Prototype Chain Visualization ---");
// student1 → Student.prototype → Person.prototype → Object.prototype → null
console.log("student1.__proto__ === Student.prototype:", student1.__proto__ === Student.prototype);
console.log("Student.prototype.__proto__ === Person.prototype:", Student.prototype.__proto__ === Person.prototype);
console.log("Person.prototype.__proto__ === Object.prototype:", Person.prototype.__proto__ === Object.prototype);

console.log("\n--- Property Lookup in Prototype Chain ---");
// When we access student1.showName():
// 1. JavaScript looks for 'showName' in student1 object - NOT FOUND
// 2. Looks in Student.prototype - NOT FOUND
// 3. Looks in Person.prototype - FOUND! ✓
console.log("showName in student1:", "showName" in student1);
console.log("student1.hasOwnProperty('showName'):", student1.hasOwnProperty('showName'));
console.log("student1.hasOwnProperty('name'):", student1.hasOwnProperty('name'));
console.log("student1.hasOwnProperty('branch'):", student1.hasOwnProperty('branch'));

console.log("\n--- Adding a method to Person.prototype after creation ---");
Person.prototype.introduce = function() {
    console.log(`Hi! My name is ${this.name}.`);
};

// student1 can immediately access the new method!
student1.introduce();
person1.introduce();

/**
 * EXPLANATION:
 * 
 * 1. Inheritance Setup:
 *    - Person.call(this, name): Calls Person constructor in Student's context
 *    - Object.create(Person.prototype): Creates new object with Person.prototype as its prototype
 *    - Student.prototype.constructor = Student: Fixes constructor reference
 * 
 * 2. Prototype Chain:
 *    student1 → Student.prototype → Person.prototype → Object.prototype → null
 * 
 * 3. Method Lookup:
 *    - JavaScript searches up the prototype chain until it finds the property/method
 *    - If not found anywhere, returns undefined
 * 
 * 4. Why Object.create()?
 *    - Object.create(Person.prototype) creates a new object with Person.prototype as its __proto__
 *    - This establishes the inheritance link without calling Person constructor
 * 
 * 5. Benefits:
 *    - Code reuse (Student gets all Person methods)
 *    - Memory efficiency (methods are shared via prototype)
 *    - Logical hierarchy (Student IS-A Person)
 */
