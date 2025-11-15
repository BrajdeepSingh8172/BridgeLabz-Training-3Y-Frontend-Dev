const feedback = "Great product! Fast delivery and amazing sound quality!";

const words = feedback.trim().split(/\s+/);
const wordCount = words.length;

const lower = feedback.toLowerCase();
const hasNegative = lower.includes("bad") || lower.includes("poor");

console.log(`Word count: ${wordCount}`);
if (!hasNegative) {
  console.log("Positive Feedback");
} else {
  console.log("Needs Improvement");
}
