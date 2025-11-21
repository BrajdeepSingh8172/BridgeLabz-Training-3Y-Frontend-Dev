/**
 * Q4 - Employee Inheritance
 * 
 * This program demonstrates:
 * - Class inheritance using extends
 * - Method overriding
 * - Runtime polymorphism
 * - super keyword usage
 */

// Base class
class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  /**
   * Work method - will be overridden by Manager
   */
  work() {
    return `${this.name} is working in ${this.department} department`;
  }

  /**
   * Display employee details
   */
  displayInfo() {
    console.log(`\nName: ${this.name}`);
    console.log(`Department: ${this.department}`);
    console.log(`Role: Employee`);
  }
}

// Derived class - inherits from Employee
class Manager extends Employee {
  constructor(name, department, teamSize) {
    // Call parent constructor using super()
    super(name, department);
    this.teamSize = teamSize;
  }

  /**
   * Override work() method - Runtime Polymorphism
   */
  work() {
    return `${this.name} is managing the ${this.department} team of ${this.teamSize} members`;
  }

  /**
   * Additional method specific to Manager
   */
  conductMeeting() {
    return `${this.name} is conducting a team meeting with ${this.teamSize} team members`;
  }

  /**
   * Override displayInfo() to show manager-specific details
   */
  displayInfo() {
    console.log(`\nName: ${this.name}`);
    console.log(`Department: ${this.department}`);
    console.log(`Role: Manager`);
    console.log(`Team Size: ${this.teamSize} members`);
  }
}

// ==================== CREATE OBJECTS ====================

console.log("👥 EMPLOYEE INHERITANCE & POLYMORPHISM DEMO");
console.log("=".repeat(60));

// Create Employee objects
const emp1 = new Employee("Rajesh Kumar", "Development");
const emp2 = new Employee("Sneha Patel", "Testing");
const emp3 = new Employee("Arjun Singh", "Design");

// Create Manager objects
const mgr1 = new Manager("Priya Sharma", "Development", 10);
const mgr2 = new Manager("Vikram Mehta", "Marketing", 8);

// ==================== DEMONSTRATE POLYMORPHISM ====================

console.log("\n🔄 RUNTIME POLYMORPHISM DEMONSTRATION");
console.log("=".repeat(60));

// Array containing both Employee and Manager objects
const allStaff = [emp1, emp2, mgr1, emp3, mgr2];

console.log("\nCalling work() method on all staff members:\n");

allStaff.forEach((staff, index) => {
  // Same method name, but different behavior based on object type
  // This is RUNTIME POLYMORPHISM
  console.log(`${index + 1}. ${staff.work()}`);
});

console.log("\n💡 Notice: Same method name 'work()' but different behavior!");
console.log("   - Employee: describes individual work");
console.log("   - Manager: describes team management");
console.log("   This is POLYMORPHISM in action! ✨");

// ==================== DETAILED OBJECT INFORMATION ====================

console.log("\n\n📋 EMPLOYEE DETAILS");
console.log("=".repeat(60));

emp1.displayInfo();
console.log(`Activity: ${emp1.work()}`);

emp2.displayInfo();
console.log(`Activity: ${emp2.work()}`);

emp3.displayInfo();
console.log(`Activity: ${emp3.work()}`);

console.log("\n\n👔 MANAGER DETAILS");
console.log("=".repeat(60));

mgr1.displayInfo();
console.log(`Activity: ${mgr1.work()}`);
console.log(`Meeting: ${mgr1.conductMeeting()}`);

mgr2.displayInfo();
console.log(`Activity: ${mgr2.work()}`);
console.log(`Meeting: ${mgr2.conductMeeting()}`);

// ==================== INHERITANCE VERIFICATION ====================

console.log("\n\n🔍 INHERITANCE VERIFICATION");
console.log("=".repeat(60));

console.log("\n1. Instance checks:");
console.log(`   emp1 instanceof Employee: ${emp1 instanceof Employee}`);
console.log(`   emp1 instanceof Manager: ${emp1 instanceof Manager}`);
console.log(`   mgr1 instanceof Employee: ${mgr1 instanceof Employee}`);
console.log(`   mgr1 instanceof Manager: ${mgr1 instanceof Manager}`);

console.log("\n2. Manager inherits from Employee:");
console.log(`   Manager has access to Employee properties: ✓`);
console.log(`   Manager can override Employee methods: ✓`);
console.log(`   Manager can add its own methods: ✓`);

// ==================== POLYMORPHISM IN ACTION ====================

console.log("\n\n🎯 POLYMORPHISM SCENARIO: Company-wide Activity");
console.log("=".repeat(60));

function announceActivity(employee) {
  // This function works with both Employee and Manager
  // It calls work() method, but gets different behavior based on type
  console.log(`📢 ${employee.work()}`);
}

console.log("\nAnnouncing activities for all staff:\n");
announceActivity(emp1);
announceActivity(mgr1);
announceActivity(emp2);
announceActivity(mgr2);

console.log("\n💡 Same function, same method call, different outputs!");
console.log("   This is the power of polymorphism!");

// ==================== METHOD OVERRIDE DEMONSTRATION ====================

console.log("\n\n🔄 METHOD OVERRIDE DEMONSTRATION");
console.log("=".repeat(60));

console.log("\nEmployee.work() behavior:");
console.log(`   "${emp1.work()}"`);

console.log("\nManager.work() behavior (overridden):");
console.log(`   "${mgr1.work()}"`);

console.log("\nManager-specific method (not in Employee):");
console.log(`   "${mgr1.conductMeeting()}"`);

// This will cause an error if uncommented (Employee doesn't have conductMeeting)
// console.log(emp1.conductMeeting()); // ❌ TypeError

// ==================== ORGANIZATIONAL HIERARCHY ====================

console.log("\n\n🏢 ORGANIZATIONAL HIERARCHY");
console.log("=".repeat(60));

console.log(`
Company Structure:

👔 ${mgr1.name} (Manager)
   Department: ${mgr1.department}
   Team: ${mgr1.teamSize} members
   ├── ${emp1.name}
   ├── ${emp2.name}
   └── ${emp3.name}

👔 ${mgr2.name} (Manager)
   Department: ${mgr2.department}
   Team: ${mgr2.teamSize} members
`);

/**
 * KEY CONCEPTS DEMONSTRATED:
 * ==========================
 * 
 * 1. INHERITANCE:
 *    - Manager extends Employee
 *    - Manager inherits name and department from Employee
 *    - Manager adds teamSize property
 * 
 * 2. METHOD OVERRIDING:
 *    - Manager overrides work() method
 *    - Manager overrides displayInfo() method
 *    - New implementation replaces parent's implementation
 * 
 * 3. RUNTIME POLYMORPHISM:
 *    - Same method name (work())
 *    - Different behavior based on object type
 *    - Decided at runtime, not compile time
 *    - Makes code flexible and extensible
 * 
 * 4. SUPER KEYWORD:
 *    - super() calls parent constructor
 *    - Must be called before using 'this' in child constructor
 * 
 * 5. INSTANCEOF OPERATOR:
 *    - Check if object is instance of a class
 *    - Manager is instance of both Manager and Employee
 *    - Employee is only instance of Employee
 * 
 * POLYMORPHISM BENEFITS:
 * ======================
 * - Same interface, different implementations
 * - Code is more flexible and maintainable
 * - Easy to add new employee types later
 * - Functions can work with base class and all derived classes
 * 
 * REAL-WORLD ANALOGY:
 * ===================
 * Think of a company:
 * - All staff members "work"
 * - But an Employee works on tasks
 * - A Manager works by leading the team
 * - Same action word, different meanings!
 */
