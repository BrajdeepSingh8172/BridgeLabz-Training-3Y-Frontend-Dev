"use strict";
// Q4 – Debugging Mystery
// Original code throws because 'greeting' is assigned without declaration under strict mode.

function showMessage() {
  // greeting = "Welcome"; // undeclared assignment -> ReferenceError in strict mode
  let greeting = "Welcome"; // fix: declare the variable
  console.log(greeting);
}
showMessage();

// Explanation (console summary)
console.log("\nQ4 Explanation:");
console.log("Under 'use strict', assigning to an undeclared variable throws ReferenceError because implicit globals are not allowed.");
console.log("Fix: declare with let/const/var to create a binding in current scope.");
console.log("When debugging in VS Code, add a watch on 'greeting' and step into the call to observe the call stack and scope chain.");
console.log("=== End Q4 ===\n");
