/**
 * Q6: Multi-Level Prototype Chain (Person → Faculty → Professor)
 * 
 * This program demonstrates a three-level prototype chain where
 * Professor inherits from Faculty, and Faculty inherits from Person.
 */

// Level 1: Base Constructor - Person
function Person(name) {
    this.name = name;
}

// Person method
Person.prototype.introduce = function() {
    console.log(`Hello, I am ${this.name}`);
};

Person.prototype.getRole = function() {
    console.log("Role: Person");
};

// Level 2: Faculty inherits from Person
function Faculty(name, department) {
    // Call Person constructor
    Person.call(this, name);
    this.department = department;
}

// Set up inheritance: Faculty → Person
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

// Faculty-specific method
Faculty.prototype.showDepartment = function() {
    console.log(`Department: ${this.department}`);
};

Faculty.prototype.getRole = function() {
    console.log("Role: Faculty Member");
};

// Level 3: Professor inherits from Faculty
function Professor(name, department, subject) {
    // Call Faculty constructor (which calls Person constructor)
    Faculty.call(this, name, department);
    this.subject = subject;
}

// Set up inheritance: Professor → Faculty
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

// Professor-specific method
Professor.prototype.teach = function() {
    console.log(`${this.name} is teaching ${this.subject}`);
};

Professor.prototype.getRole = function() {
    console.log("Role: Professor");
};

Professor.prototype.showFullDetails = function() {
    console.log(`Professor ${this.name}`);
    console.log(`  Department: ${this.department}`);
    console.log(`  Subject: ${this.subject}`);
};

// ============= DEMONSTRATION =============
console.log("=== Multi-Level Prototype Chain: Person → Faculty → Professor ===\n");

// Create instances at each level
console.log("--- Creating Instances ---\n");

const person = new Person("John Smith");
const faculty = new Faculty("Dr. Emily Brown", "Science");
const professor = new Professor("Dr. Robert Davis", "Computer Science", "Data Structures");

// Person instance
console.log("1. Person Instance:");
console.log(person);
person.introduce();
person.getRole();

console.log("\n2. Faculty Instance:");
console.log(faculty);
faculty.introduce();           // Inherited from Person
faculty.showDepartment();      // Own method
faculty.getRole();             // Overridden method

console.log("\n3. Professor Instance:");
console.log(professor);
professor.introduce();         // Inherited from Person (via Faculty)
professor.showDepartment();    // Inherited from Faculty
professor.teach();             // Own method
professor.getRole();           // Overridden method
professor.showFullDetails();   // Own method

console.log("\n--- Professor Accessing Methods Up the Chain ---\n");

console.log("Professor can access methods from all levels:");
console.log("• introduce() - from Person");
professor.introduce();

console.log("\n• showDepartment() - from Faculty");
professor.showDepartment();

console.log("\n• teach() - from Professor");
professor.teach();

console.log("\n--- Prototype Chain Verification ---\n");

console.log("Professor instanceof checks:");
console.log("professor instanceof Professor:", professor instanceof Professor);
console.log("professor instanceof Faculty:", professor instanceof Faculty);
console.log("professor instanceof Person:", professor instanceof Person);
console.log("professor instanceof Object:", professor instanceof Object);

console.log("\nFaculty instanceof checks:");
console.log("faculty instanceof Faculty:", faculty instanceof Faculty);
console.log("faculty instanceof Person:", faculty instanceof Person);
console.log("faculty instanceof Professor:", faculty instanceof Professor);

console.log("\n--- Prototype Chain Links ---\n");

// The complete chain: professor → Professor.prototype → Faculty.prototype → Person.prototype → Object.prototype → null
console.log("Prototype chain for professor:");
console.log("1. professor.__proto__ === Professor.prototype:", professor.__proto__ === Professor.prototype);
console.log("2. Professor.prototype.__proto__ === Faculty.prototype:", Professor.prototype.__proto__ === Faculty.prototype);
console.log("3. Faculty.prototype.__proto__ === Person.prototype:", Faculty.prototype.__proto__ === Person.prototype);
console.log("4. Person.prototype.__proto__ === Object.prototype:", Person.prototype.__proto__ === Object.prototype);
console.log("5. Object.prototype.__proto__ === null:", Object.prototype.__proto__ === null);

console.log("\n--- Method Lookup Process ---\n");

console.log("When professor.introduce() is called:");
console.log("1. Check professor object - Not found");
console.log("2. Check Professor.prototype - Not found");
console.log("3. Check Faculty.prototype - Not found");
console.log("4. Check Person.prototype - FOUND! ✓");

console.log("\nWhen professor.showDepartment() is called:");
console.log("1. Check professor object - Not found");
console.log("2. Check Professor.prototype - Not found");
console.log("3. Check Faculty.prototype - FOUND! ✓");

console.log("\nWhen professor.teach() is called:");
console.log("1. Check professor object - Not found");
console.log("2. Check Professor.prototype - FOUND! ✓");

console.log("\n--- Property Ownership vs Inheritance ---\n");

console.log("Own properties:");
console.log("professor.hasOwnProperty('name'):", professor.hasOwnProperty('name'));
console.log("professor.hasOwnProperty('department'):", professor.hasOwnProperty('department'));
console.log("professor.hasOwnProperty('subject'):", professor.hasOwnProperty('subject'));

console.log("\nInherited methods:");
console.log("'introduce' in professor:", 'introduce' in professor);
console.log("professor.hasOwnProperty('introduce'):", professor.hasOwnProperty('introduce'));

console.log("\n--- Dynamic Method Addition ---\n");

// Add a method to Person prototype
Person.prototype.sayHello = function() {
    console.log(`${this.name} says: Hello!`);
};

console.log("Added sayHello() to Person.prototype");
console.log("Now all instances can access it:");
person.sayHello();
faculty.sayHello();
professor.sayHello();

/**
 * EXPLANATION:
 * 
 * 1. Three-Level Inheritance Chain:
 *    Professor → Faculty → Person → Object
 * 
 * 2. Each level adds:
 *    - Person: Basic properties (name) and methods (introduce)
 *    - Faculty: Additional properties (department) and methods (showDepartment)
 *    - Professor: Additional properties (subject) and methods (teach)
 * 
 * 3. Method Resolution:
 *    - JavaScript searches up the chain from child to parent
 *    - Stops at first match (allows method overriding)
 *    - If not found anywhere, returns undefined
 * 
 * 4. Benefits:
 *    - Code reuse at multiple levels
 *    - Logical hierarchy (Professor IS-A Faculty IS-A Person)
 *    - Each level can add specialized behavior
 *    - Lower levels can override higher-level methods
 * 
 * 5. The Complete Chain:
 *    professor → Professor.prototype → Faculty.prototype → 
 *    Person.prototype → Object.prototype → null
 */
