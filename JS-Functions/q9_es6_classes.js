/**
 * Q9: ES6 Classes vs Prototype Inheritance
 * 
 * This program demonstrates inheritance using both:
 * 1. Traditional prototype-based inheritance (from Q5)
 * 2. Modern ES6 class syntax with extends and super()
 * 
 * Both approaches achieve the same result!
 */

console.log("=== PART 1: PROTOTYPE-BASED INHERITANCE ===\n");

// ============================================
// TRADITIONAL PROTOTYPE-BASED APPROACH
// ============================================

// Parent Constructor - Person
function Person(name) {
    this.name = name;
}

// Add methods to Person prototype
Person.prototype.introduce = function() {
    console.log(`Hello, I am ${this.name}`);
};

Person.prototype.getType = function() {
    return "Person";
};

// Child Constructor - Student
function Student(name, branch) {
    // Call parent constructor
    Person.call(this, name);
    this.branch = branch;
}

// Set up inheritance
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Add Student-specific methods
Student.prototype.study = function() {
    console.log(`${this.name} is studying ${this.branch}`);
};

Student.prototype.getType = function() {
    return "Student";
};

Student.prototype.showDetails = function() {
    console.log(`Student: ${this.name}, Branch: ${this.branch}`);
};

// Create instances using prototype approach
console.log("--- Prototype-Based Objects ---");
const prototypePerson = new Person("John");
const prototypeStudent = new Student("Alice", "Computer Science");

console.log("\nPerson:");
console.log(prototypePerson);
prototypePerson.introduce();
console.log("Type:", prototypePerson.getType());

console.log("\nStudent:");
console.log(prototypeStudent);
prototypeStudent.introduce();  // Inherited
prototypeStudent.study();      // Own method
prototypeStudent.showDetails();
console.log("Type:", prototypeStudent.getType());

// ============================================
// ES6 CLASS-BASED APPROACH
// ============================================

console.log("\n\n=== PART 2: ES6 CLASS-BASED INHERITANCE ===\n");

// Parent Class
class PersonClass {
    // Constructor method
    constructor(name) {
        this.name = name;
    }
    
    // Method (automatically added to prototype)
    introduce() {
        console.log(`Hello, I am ${this.name}`);
    }
    
    getType() {
        return "Person";
    }
}

// Child Class - extends creates the inheritance
class StudentClass extends PersonClass {
    constructor(name, branch) {
        // super() calls the parent constructor
        // MUST be called before using 'this'
        super(name);
        this.branch = branch;
    }
    
    // Student-specific method
    study() {
        console.log(`${this.name} is studying ${this.branch}`);
    }
    
    // Override parent method
    getType() {
        return "Student";
    }
    
    showDetails() {
        console.log(`Student: ${this.name}, Branch: ${this.branch}`);
    }
}

// Create instances using class approach
console.log("--- Class-Based Objects ---");
const classPerson = new PersonClass("John");
const classStudent = new StudentClass("Alice", "Computer Science");

console.log("\nPerson:");
console.log(classPerson);
classPerson.introduce();
console.log("Type:", classPerson.getType());

console.log("\nStudent:");
console.log(classStudent);
classStudent.introduce();  // Inherited
classStudent.study();      // Own method
classStudent.showDetails();
console.log("Type:", classStudent.getType());

// ============================================
// PROVING THEY BEHAVE THE SAME
// ============================================

console.log("\n\n=== PART 3: COMPARING BOTH APPROACHES ===\n");

console.log("--- Functionality Comparison ---");
console.log("\nPrototype-based Student:");
prototypeStudent.introduce();
prototypeStudent.study();
prototypeStudent.showDetails();

console.log("\nClass-based Student:");
classStudent.introduce();
classStudent.study();
classStudent.showDetails();

console.log("\n--- Instance Checks ---");
console.log("\nPrototype approach:");
console.log("prototypeStudent instanceof Student:", prototypeStudent instanceof Student);
console.log("prototypeStudent instanceof Person:", prototypeStudent instanceof Person);

console.log("\nClass approach:");
console.log("classStudent instanceof StudentClass:", classStudent instanceof StudentClass);
console.log("classStudent instanceof PersonClass:", classStudent instanceof PersonClass);

console.log("\n--- Prototype Chain (Both are the same!) ---");
console.log("\nPrototype-based:");
console.log("prototypeStudent.__proto__ === Student.prototype:", 
    prototypeStudent.__proto__ === Student.prototype);
console.log("Student.prototype.__proto__ === Person.prototype:", 
    Student.prototype.__proto__ === Person.prototype);

console.log("\nClass-based:");
console.log("classStudent.__proto__ === StudentClass.prototype:", 
    classStudent.__proto__ === StudentClass.prototype);
console.log("StudentClass.prototype.__proto__ === PersonClass.prototype:", 
    StudentClass.prototype.__proto__ === PersonClass.prototype);

console.log("\n--- Method Sharing ---");
const prototypeStudent2 = new Student("Bob", "Electronics");
const classStudent2 = new StudentClass("Bob", "Electronics");

console.log("\nPrototype approach - methods are shared:");
console.log("prototypeStudent.introduce === prototypeStudent2.introduce:", 
    prototypeStudent.introduce === prototypeStudent2.introduce);

console.log("\nClass approach - methods are shared:");
console.log("classStudent.introduce === classStudent2.introduce:", 
    classStudent.introduce === classStudent2.introduce);

// ============================================
// ADDITIONAL ES6 CLASS FEATURES
// ============================================

console.log("\n\n=== PART 4: ADDITIONAL ES6 CLASS FEATURES ===\n");

class EnhancedStudent extends PersonClass {
    // Private field (ES2022 feature)
    #studentId; // Private field
    
    // Static property
    static totalStudents = 0;
    
    constructor(name, branch, studentId) {
        super(name); // Call parent constructor
        this.branch = branch;
        this.#studentId = studentId; // Set private field
        EnhancedStudent.totalStudents++; // Increment static counter
    }
    
    // Getter
    get id() {
        return this.#studentId;
    }
    
    // Setter
    set id(newId) {
        if (newId > 0) {
            this.#studentId = newId;
        } else {
            console.log("Invalid ID");
        }
    }
    
    // Static method
    static getTotalStudents() {
        return EnhancedStudent.totalStudents;
    }
    
    // Using super to call parent method
    introduce() {
        super.introduce(); // Call parent's introduce
        console.log(`I am a ${this.branch} student`);
    }
}

console.log("--- Enhanced Class Features ---\n");

const student1 = new EnhancedStudent("Emma", "Computer Science", 101);
const student2 = new EnhancedStudent("David", "Mechanical", 102);

console.log("Student 1:");
student1.introduce();
console.log("ID (using getter):", student1.id);

console.log("\nStudent 2:");
student2.introduce();
console.log("ID (using getter):", student2.id);

console.log("\nStatic method:");
console.log("Total students:", EnhancedStudent.getTotalStudents());

console.log("\nUsing setter:");
student1.id = 201;
console.log("Updated ID:", student1.id);

/**
 * ========================================
 * COMPREHENSIVE EXPLANATION
 * ========================================
 * 
 * 1. PROTOTYPE APPROACH:
 *    - Function constructors
 *    - Manual prototype chain setup
 *    - Person.call(this, name) to call parent constructor
 *    - Object.create() to set up inheritance
 *    - More verbose, harder to read
 * 
 * 2. CLASS APPROACH:
 *    - class keyword (syntactic sugar)
 *    - extends keyword for inheritance
 *    - super() to call parent constructor
 *    - Cleaner, more readable syntax
 *    - Familiar to developers from other languages
 * 
 * 3. KEY SIMILARITIES:
 *    - Both create the same prototype chain
 *    - Both share methods via prototype
 *    - Both support inheritance
 *    - Both use 'new' to create instances
 *    - instanceof works the same way
 * 
 * 4. ES6 CLASS ADVANTAGES:
 *    - More readable and intuitive
 *    - Less boilerplate code
 *    - Built-in inheritance with extends
 *    - Support for static methods
 *    - Support for getters/setters
 *    - Private fields (with #)
 *    - Clearer intent
 * 
 * 5. UNDER THE HOOD:
 *    - Classes are just "syntactic sugar"
 *    - They compile down to prototype-based code
 *    - No new inheritance model - same prototypes!
 *    - JavaScript is still prototype-based
 * 
 * 6. WHEN TO USE WHICH:
 *    - Modern code: Use ES6 classes (cleaner, standard)
 *    - Legacy code: May use prototype approach
 *    - Understanding both helps you read any codebase
 * 
 * 7. IMPORTANT DIFFERENCES:
 *    - Classes are not hoisted (can't use before declaration)
 *    - Class methods are non-enumerable by default
 *    - Classes always run in strict mode
 *    - Must use 'new' with classes (throws error otherwise)
 * 
 * 8. SUPER KEYWORD:
 *    - Calls parent class methods
 *    - Must call super() in child constructor before using 'this'
 *    - Can use super.methodName() to call parent methods
 */

console.log("\n=== CONCLUSION ===\n");
console.log("Both approaches achieve the same result!");
console.log("ES6 classes provide cleaner syntax for the same prototype-based inheritance.");
console.log("Modern JavaScript code prefers ES6 classes for readability and maintainability.");
