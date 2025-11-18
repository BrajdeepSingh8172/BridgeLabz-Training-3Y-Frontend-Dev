/**
 * Q1: E-Commerce Product Manager
 * This program demonstrates the use of classes and objects to manage products
 */

// Product class definition
class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  // Method to apply discount percentage
  applyDiscount(discountPercent) {
    const discountAmount = (this.price * discountPercent) / 100;
    this.price = this.price - discountAmount;
    console.log(`Discount of ${discountPercent}% applied. New price: ₹${this.price.toFixed(2)}`);
  }

  // Method to display product details in formatted string
  displayDetails() {
    return `ID: ${this.id} | Name: ${this.name} | Price: ₹${this.price.toFixed(2)} | Category: ${this.category}`;
  }
}

// Create multiple product objects
const products = [
  new Product(1, "Laptop", 45000, "Electronics"),
  new Product(2, "Smartphone", 25000, "Electronics"),
  new Product(3, "Headphones", 800, "Accessories"),
  new Product(4, "Tablet", 15000, "Electronics"),
  new Product(5, "Keyboard", 1500, "Accessories"),
  new Product(6, "Monitor", 12000, "Electronics"),
  new Product(7, "Mouse", 500, "Accessories"),
  new Product(8, "Smartwatch", 3500, "Wearables"),
  new Product(9, "Camera", 35000, "Electronics"),
  new Product(10, "Charger", 600, "Accessories")
];

console.log("=== All Products ===");
products.forEach(product => {
  console.log(product.displayDetails());
});

console.log("\n=== Products with price > ₹1000 ===");
// Filter products with price greater than 1000
const expensiveProducts = products.filter(product => product.price > 1000);
expensiveProducts.forEach(product => {
  console.log(product.displayDetails());
});

// Example: Applying discount to a product
console.log("\n=== Applying 10% Discount to Laptop ===");
products[0].applyDiscount(10);
console.log(products[0].displayDetails());
