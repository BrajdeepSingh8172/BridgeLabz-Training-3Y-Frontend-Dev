"use strict";
// Q3 – Transaction Validator
// Loop transactions, throw custom errors for negative amount, missing id/amount, or null entries.
// Categorize into valid and invalid arrays. Use try...catch.

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

class TransactionError extends Error {
  constructor(message, type, tx) {
    super(message);
    this.name = "TransactionError";
    this.type = type;
    this.transaction = tx;
  }
}

(function validate(transList) {
  const valid = [];
  const invalid = [];
  console.log("=== Transaction Validator ===");
  transList.forEach((tx, idx) => {
    try {
      if (tx === null) throw new TransactionError("Null transaction entry", "NullEntry", tx);
      if (typeof tx !== "object") throw new TransactionError("Invalid transaction type", "InvalidType", tx);
      if (!("id" in tx)) throw new TransactionError("Missing id", "MissingField", tx);
      if (!("amount" in tx)) throw new TransactionError("Missing amount", "MissingField", tx);
      if (typeof tx.amount !== "number") throw new TransactionError("Amount not a number", "TypeError", tx);
      if (tx.amount < 0) throw new TransactionError("Negative amount", "NegativeAmount", tx);
      // passed all checks
      valid.push(tx);
    } catch (err) {
      if (err instanceof TransactionError) {
        invalid.push({ index: idx, errorType: err.type, message: err.message, transaction: err.transaction });
        console.log(`Transaction idx ${idx} failed -> ${err.type}: ${err.message}`);
      } else {
        invalid.push({ index: idx, errorType: "Unknown", message: err.message, transaction: tx });
        console.log(`Transaction idx ${idx} failed -> Unknown: ${err.message}`);
      }
    }
  });

  console.log("\nValid transactions:", valid);
  console.log("Invalid transactions (detailed):", invalid);
  console.log(`Summary: successful=${valid.length}, failed=${invalid.length}`);
  console.log("=== End Q3 ===\n");
})(transactions);

// Note: add breakpoint here in a real debugger to watch 'valid' and 'invalid' arrays.
