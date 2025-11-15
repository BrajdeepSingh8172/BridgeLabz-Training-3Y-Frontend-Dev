const departments = [
  ["HR", 72],
  ["Finance", 88],
  ["Tech", 95],
  ["Support", 63]
];

for (const [name, score] of departments) {
  let label = "";
  if (score >= 90) {
    label = "Excellent";
  } else if (score >= 75) {
    label = "Good";
  } else if (score >= 60) {
    label = "Average";
  } else {
    label = "Needs Improvement";
  }
  console.log(`${name}: ${label}`);
}
