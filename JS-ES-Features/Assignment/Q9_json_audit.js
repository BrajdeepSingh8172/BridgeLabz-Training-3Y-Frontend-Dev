"use strict";
// Q9 – JSON Audit
// Parse entries with try...catch, detect missing keys, log errors with line numbers, convert age to Number, filter under-18.

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];

(function jsonAudit(data) {
  console.log("=== JSON Audit ===");
  const clean = [];
  const errors = [];
  data.forEach((line, idx) => {
    try {
      const parsed = JSON.parse(line);
      // Validate keys
      if (!("user" in parsed)) throw new Error("Missing key: user");
      if (!("age" in parsed)) throw new Error("Missing key: age");
      // Convert age to Number
      parsed.age = Number(parsed.age);
      if (Number.isNaN(parsed.age)) throw new Error("Invalid age number");
      clean.push(parsed);
    } catch (err) {
      errors.push({ line: idx + 1, raw: line, message: err.message });
      console.log(`Line ${idx + 1} parse error:`, err.message);
    }
  });

  // Bonus: filter under 18
  const adults = clean.filter(u => u.age >= 18);
  console.log("\nClean entries:", clean);
  console.log("Adults (18+):", adults);
  console.log("Errors (detailed):", errors);
  console.log("=== End Q9 ===\n");
})(rawData);
