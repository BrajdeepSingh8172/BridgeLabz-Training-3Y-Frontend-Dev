"use strict";
// Q7 – Smart Calculator
// Use switch to handle operations, custom errors for divide-by-zero and root of negative numbers.

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

class CalcError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "CalcError";
    this.code = code;
  }
}

(function smartCalc(op, a, b) {
  console.log("=== Smart Calculator ===");
  try {
    let result;
    switch (op) {
      case "add":
        result = a + b;
        break;
      case "subtract":
        result = a - b;
        break;
      case "divide":
        if (b === 0) throw new CalcError("Divide by zero", "DIV_BY_ZERO");
        result = a / b;
        break;
      case "power":
        result = Math.pow(a, b);
        break;
      case "root":
        if (a < 0) throw new CalcError("Root of negative number", "NEG_ROOT");
        result = Math.pow(a, 1 / b);
        break;
      default:
        throw new CalcError("Invalid operation", "INVALID_OP");
    }
    console.log(`Operation: ${op} | num1=${a} | num2=${b} | result=${result}`);
  } catch (err) {
    if (err instanceof CalcError) {
      console.log("Calculator error:", err.code, "-", err.message);
    } else {
      console.log("Unexpected error:", err.message);
    }
  } finally {
    console.log("=== End Q7 ===\n");
  }
})("divide", num1, num2);
