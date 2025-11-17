"use strict";
// Q1 – Dynamic Data Parser
// Convert mixed API data to Number, Boolean, and String.
// Skip invalid numbers (NaN, " ", "100px") and log them separately.
// Build arrays for valid numeric data and invalid entries.
// All output via console.log.

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14",
null, undefined];

(function dynamicDataParser(data) {
  const validNumbers = [];
  const invalidNumbers = [];
  console.log("=== Dynamic Data Parser Report ===");
  data.forEach((value, idx) => {
    // Convert to String
    const asString = String(value);
    // Convert to Boolean (explicit)
    const asBoolean = Boolean(value);
    // Convert to Number (explicit)
    const asNumber = Number(value);

    // Detect invalid number: Number(...) is NaN OR string has non-numeric chars (like '100px') OR empty/space
    const raw = value;
    const isNumberValid = typeof asNumber === "number" && !Number.isNaN(asNumber) && /^\s*-?\d+(?:\.\d+)?\s*$/.test(asString);

    console.log(`Index ${idx}: original=`, raw, ", asString=", `"${asString}"`, ", asBoolean=", asBoolean, ", asNumber=", asNumber);

    if (isNumberValid) {
      validNumbers.push(asNumber);
    } else {
      // Treat null/undefined as invalid numeric entries as well
      invalidNumbers.push({ index: idx, value: raw, reason: "Invalid numeric conversion" });
      console.log(`  -> Invalid number detected at index ${idx}:`, raw);
    }
  });

  console.log("\nValid numeric array:", validNumbers);
  console.log("Invalid numeric entries (detailed):", invalidNumbers);
  console.log("=== End Q1 ===\n");
})(apiData);
