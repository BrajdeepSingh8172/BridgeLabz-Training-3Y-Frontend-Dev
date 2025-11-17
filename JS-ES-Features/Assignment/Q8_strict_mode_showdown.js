"use strict";
// Q8 – Strict Mode Showdown
// Function with duplicate param names and illegal operations under strict mode.
// We'll show behavior and a correct ES6-compliant version.

function demoStrict(a, b) {
  // 'function demo(a, a)' is illegal in strict mode; browsers will throw a SyntaxError if duplicate params are present in strict mode.
  // Also 'total = 10;' without declaration throws ReferenceError under strict mode.
  // 'delete total;' is illegal because delete cannot remove local bindings.
  let total = 10; // correct declaration
  // delete total; // invalid: cannot delete local variable; will be ignored or throw in strict mode.
  return total + a + b;
}
console.log("demoStrict(5,10) ->", demoStrict(5, 10));

// Show non-strict behavior in comments (can't execute both strict and non-strict in same file easily).
console.log("\nQ8 Explanation:");
console.log("Duplicate parameter names are allowed in non-strict mode (legacy) but not in strict mode (SyntaxError).");
console.log("Assigning to undeclared variables creates globals in non-strict mode but throws ReferenceError in strict mode.");
console.log("Correct ES6 version uses unique parameter names and explicit declarations (let/const).");
console.log("=== End Q8 ===\n");
