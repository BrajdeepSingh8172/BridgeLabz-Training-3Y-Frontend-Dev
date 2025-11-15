const bonus = 5000;
let isPermanent = false;

function calculateSalary() {
  let salary = 40000;
  let isPermanent = true;

  const totalSalary = isPermanent ? salary + bonus : salary;
  console.log(`Total salary (local isPermanent = ${isPermanent}):`, totalSalary);
}

console.log("Global isPermanent before:", isPermanent); // false
calculateSalary(); // Uses local isPermanent = true
console.log("Global isPermanent after calculateSalary():", isPermanent); // still false (unchanged)

isPermanent = true;
console.log("Global isPermanent changed to:", isPermanent); // true
calculateSalary(); // Still uses local isPermanent (true inside the function)
console.log("Global isPermanent remains:", isPermanent); // true
