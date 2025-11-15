const rawProductName = " wireless headphones PRO ";
const trimmed = rawProductName.trim().toLowerCase();
const titleCase = trimmed
  .split(" ")
  .filter(Boolean)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
const cleanedTitle = titleCase.replace(/\bPro\b/, "Pro Edition");
console.log("Cleaned Title:", cleanedTitle);
console.log("Title Length:", cleanedTitle.length);
