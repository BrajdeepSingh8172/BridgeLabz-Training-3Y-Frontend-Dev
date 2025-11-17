"use strict";
// Q2 – Employee Bonus Calculator
// Convert salary and years to numbers, calculate bonus with validation, use try...catch.

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

(function calculateBonuses(list) {
  console.log("=== Employee Bonus Calculator ===");
  list.forEach(emp => {
    try {
      if (!emp || !emp.name) throw new Error("Missing employee object or name");
      // explicit conversion
      const salary = Number(emp.salary);
      const years = Number(emp.years);
      if (Number.isNaN(salary) || Number.isNaN(years)) {
        throw new TypeError("Salary or years could not be converted to number");
      }
      const bonus = years > 3 ? (salary * 0.1) : (salary * 0.05);
      console.log(`Employee: ${emp.name} | Salary: ${salary} | Years: ${years} | Bonus: ${bonus.toFixed(2)}`);
    } catch (err) {
      console.log(`Error processing employee ${emp && emp.name ? emp.name : "[unknown]"}:`, err.message);
    }
  });
  console.log("=== End Q2 ===\n");
})(employees);
