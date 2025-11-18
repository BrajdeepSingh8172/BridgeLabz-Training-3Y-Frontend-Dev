/**
 * Q6: Employee Management System
 * This program demonstrates employee management with classes and array methods
 */

// Employee class definition
class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  // Method to calculate annual salary
  getAnnualSalary() {
    return this.salary * 12;
  }

  // Method to apply bonus percentage
  applyBonus(percent) {
    const bonusAmount = (this.salary * percent) / 100;
    this.salary += bonusAmount;
    console.log(`✅ ${this.name} received a ${percent}% bonus. New monthly salary: ₹${this.salary.toFixed(2)}`);
  }

  // Method to display employee details
  displayDetails() {
    return `ID: ${this.id} | Name: ${this.name} | Department: ${this.department} | Monthly Salary: ₹${this.salary.toFixed(2)} | Annual Salary: ₹${this.getAnnualSalary().toFixed(2)}`;
  }
}

// Create 5 employee objects
const employees = [
  new Employee(101, "Rajesh Kumar", "Engineering", 75000),
  new Employee(102, "Priya Sharma", "Marketing", 60000),
  new Employee(103, "Amit Patel", "Sales", 55000),
  new Employee(104, "Sneha Reddy", "HR", 50000),
  new Employee(105, "Vikram Singh", "Finance", 70000)
];

console.log("=== EMPLOYEE MANAGEMENT SYSTEM ===\n");

// Display all employees
console.log("📋 All Employees:");
employees.forEach((employee, index) => {
  console.log(`${index + 1}. ${employee.displayDetails()}`);
});

// Calculate annual salary for each employee
console.log("\n💰 Annual Salaries:");
employees.forEach(employee => {
  console.log(`${employee.name}: ₹${employee.getAnnualSalary().toLocaleString('en-IN')}`);
});

// Apply bonuses to some employees
console.log("\n🎉 Applying Bonuses:");
employees[0].applyBonus(10); // Rajesh gets 10% bonus
employees[2].applyBonus(8);  // Amit gets 8% bonus
employees[4].applyBonus(12); // Vikram gets 12% bonus

// Calculate total annual payout using reduce()
console.log("\n📊 Company Annual Payout Calculation:");
const totalAnnualPayout = employees.reduce((total, employee) => {
  const annualSalary = employee.getAnnualSalary();
  console.log(`  ${employee.name}: ₹${annualSalary.toLocaleString('en-IN')}`);
  return total + annualSalary;
}, 0);

console.log("\n" + "=".repeat(50));
console.log(`💼 Total Annual Payout: ₹${totalAnnualPayout.toLocaleString('en-IN')}`);
console.log("=".repeat(50));

// Calculate average annual salary
const averageAnnualSalary = totalAnnualPayout / employees.length;
console.log(`\n📈 Average Annual Salary: ₹${averageAnnualSalary.toLocaleString('en-IN')}`);

// Find highest paid employee
const highestPaid = employees.reduce((max, employee) => {
  return employee.getAnnualSalary() > max.getAnnualSalary() ? employee : max;
});

console.log(`\n⭐ Highest Paid Employee: ${highestPaid.name} (₹${highestPaid.getAnnualSalary().toLocaleString('en-IN')}/year)`);

// Department-wise breakdown
console.log("\n🏢 Department-wise Annual Payout:");
const departmentPayout = employees.reduce((acc, employee) => {
  const dept = employee.department;
  const annualSalary = employee.getAnnualSalary();
  
  if (!acc[dept]) {
    acc[dept] = 0;
  }
  acc[dept] += annualSalary;
  
  return acc;
}, {});

Object.keys(departmentPayout).forEach(dept => {
  console.log(`  ${dept}: ₹${departmentPayout[dept].toLocaleString('en-IN')}`);
});
