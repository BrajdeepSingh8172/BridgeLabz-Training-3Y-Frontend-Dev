"use strict";
// Q10 – Nested Hoisting and Closures
// Predict and explain output, then show behavior changes when converting inner to arrow function.

function outer() {
  console.log("outer - count (before var):", count); // hoisted var -> undefined
  var count = 5;
  function inner() {
    console.log("inner - count (before var):", count); // inner's var hoisted -> undefined
    var count = 10;
    console.log("inner - count (after var set):", count);
  }
  inner();
  console.log("outer - count (after inner):", count);
}
console.log("=== Q10 Nested Hoisting & Closures ===");
outer();

// Explanation printed
console.log("\nExplanation:");
console.log("1) In 'outer', var count is hoisted and initialized to undefined at function start; first console shows undefined.");
console.log("2) In 'inner', its own var count is hoisted within inner's scope, shadowing outer's count: first inner log -> undefined, then set to 10.");
console.log("3) After inner(), outer's count remains 5.");
console.log("\nNow converting inner to an arrow function that closes over outer's 'count':");

function outerArrow() {
  console.log("outerArrow - count (before var):", countArrow); // hoisted var -> undefined
  var countArrow = 5;
  const innerArrow = () => {
    // arrow does NOT create its own 'var countArrow' so it will see outerArrow's binding
    console.log("innerArrow sees outerArrow count ->", countArrow);
  };
  innerArrow();
  console.log("outerArrow - count (after innerArrow):", countArrow);
}
outerArrow();

console.log("=== End Q10 ===\n");
