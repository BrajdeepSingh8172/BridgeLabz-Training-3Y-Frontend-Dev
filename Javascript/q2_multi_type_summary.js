// Q2: Multi-Type Data Summary
// Declare variables of different types and print a formatted report using console.table()

const name = 'Sam'; // string
const age = 28; // number
const isActive = true; // boolean
const tags = ['javascript', 'html', 'css']; // array
const profile = { role: 'developer', level: 'intermediate' }; // object
const middleName = null; // null
let lastLogin; // undefined

// Prepare rows for console.table: label, value, type
const report = [
  { label: 'name', value: name, type: typeof name },
  { label: 'age', value: age, type: typeof age },
  { label: 'isActive', value: isActive, type: typeof isActive },
  { label: 'tags', value: tags, type: Array.isArray(tags) ? 'array' : typeof tags },
  { label: 'profile', value: profile, type: typeof profile },
  { label: 'middleName', value: middleName, type: middleName === null ? 'null' : typeof middleName },
  { label: 'lastLogin', value: lastLogin, type: typeof lastLogin }
];

console.table(report);

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { name, age, isActive, tags, profile, middleName, lastLogin, report };
}
