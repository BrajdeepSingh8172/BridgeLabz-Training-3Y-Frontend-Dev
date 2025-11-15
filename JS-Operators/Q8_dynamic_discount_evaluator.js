const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

function categoryDiscount(cat) {
  if (cat === "electronics") return 0.10;
  if (cat === "fashion") return 0.05;
  return 0.0;
}

const discountedItems = cart.map(p => {
  const d = categoryDiscount(p.category);
  const discountedPrice = p.price * (1 - d);
  return { ...p, discountedPrice };
});

const subtotal = discountedItems.reduce((sum, p) => sum + p.discountedPrice, 0);

let finalTotal = subtotal;
if (subtotal > 50000) {
  finalTotal = subtotal * 0.95;
}

console.log("Items:");
for (const p of discountedItems) {
  console.log(`${p.item} (${p.category}) -> ${p.discountedPrice.toFixed(2)}`);
}
console.log(`Subtotal: ${subtotal.toFixed(2)}`);
console.log(`Final Total: ${finalTotal.toFixed(2)}`);
