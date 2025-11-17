"use strict";
// Q6 – Pyramid Pattern Generator
// Generate pyramid stars, allow outer loop limit via user input (environment var) default=5.
// Observe differences when using var vs let (var reuses function/global scope).

(function pyramid(limit) {
  console.log("=== Pyramid Pattern Generator ===");
  limit = Number(limit) || 5;
  for (let i = 1; i <= limit; i++) {
    let row = "";
    for (let j = 0; j < i; j++) {
      row += "* ";
    }
    console.log(row.trim());
  }

  console.log("\nNow demo with var (observe scope differences):");
  for (var a = 1; a <= 4; a++) {
    var row2 = "";
    for (var b = 0; b < a; b++) {
      row2 += "* ";
    }
    console.log(row2.trim());
  }
  // Because var variables are function-scoped, 'a' and 'b' exist after loops.
  console.log("After var-loops, a =", a, "b =", b);
  console.log("Use 'use strict' to catch accidental globals if any loop variables were undeclared.");
  console.log("=== End Q6 ===\n");
})(process.env.PYRAMID_LIMIT);
