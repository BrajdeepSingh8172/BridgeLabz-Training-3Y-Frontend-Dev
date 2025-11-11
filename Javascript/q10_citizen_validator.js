// Q10: Citizen Eligibility Validator
// Evaluate if a person can vote, drive, and apply for a passport based on age and citizenship.
// NOTE: The original prompt has a minor ambiguity about which ages map to "all services" vs "vote only".
// Assumption used here (documented):
//  - "Eligible for all services" is granted to citizens aged 21 and above (passport, driving, voting).
//  - Citizen aged 18-20 (inclusive) -> "Eligible to vote only." (per the prompt's second rule).
//  - Non-citizen but age >= 18 -> "Only age criteria met." (meets age but not citizenship requirement).
//  - Otherwise -> "Not eligible yet." for under 18.

const age = 19; // sample age; change to test
const isCitizen = true; // sample citizenship boolean

if (isCitizen && age >= 21) {
  console.log('Eligible for all services.');
} else if (isCitizen && age >= 18 && age <= 20) {
  console.log('Eligible to vote only.');
} else if (!isCitizen && age >= 18) {
  console.log('Only age criteria met.');
} else {
  console.log('Not eligible yet.');
}

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { age, isCitizen };
}
