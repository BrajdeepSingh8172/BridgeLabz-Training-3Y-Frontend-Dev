"use strict";
// Q5 – Hoisting Lab: The Sequence Trap
// Predict initial behavior then fix and rewrite with arrow functions.
// Original (problematic) code behavior explained in comments.

console.log("=== Q5 Hoisting Lab ===");

// Explanation of hoisting:
// - Function declarations are hoisted (announce, startGame available before declaration).
// - var-declared variables are hoisted but initialized to undefined at top of scope.
// - let/const are hoisted in TDZ (temporal dead zone) and not accessible before declaration (ReferenceError).

console.log("Prediction: console.log(score) -> undefined (var hoisted but uninitialized)");
function announce() { console.log("Game started"); }
console.log("Call announce() -> works because function declaration hoisted");
var score = 50;
announce();

let status = "ready";
// calling startGame before declaration of let status would produce ReferenceError if startGame accessed 'status' before its declaration.
// In original posted sequence startGame() was called before 'status' declaration, causing TDZ issues.
// We'll call startGame after status is declared.
function startGame() {
  console.log("Status inside startGame:", status);
}
startGame();

// Fixed/clean arrow function version to compare hoisting differences
const announceArrow = () => { console.log("Game started (arrow)"); };
// announceArrow can NOT be called before its definition (it's a const variable, TDZ applies)
announceArrow();

const startGameArrow = () => {
  console.log("Status inside startGameArrow:", status);
};
startGameArrow();

console.log("=== End Q5 ===\n");
