/**
 * Q6 - E-Commerce Dashboard: Product Card Fetcher
 * 
 * This program fetches product data from the Fake Store API and displays
 * product information including title, price, and image URL.
 * 
 * API: https://fakestoreapi.com/products
 * 
 * Note: This can be run in Node.js (v18+) or in a browser console.
 * For Node.js < 18, you may need to install node-fetch package.
 */

// Check if we're in a browser or Node.js environment
const isBrowser = typeof window !== 'undefined';

// Method 1: Using async/await (recommended)
async function fetchProductsAsync() {
  try {
    console.log("🛒 Fetching products from Fake Store API...\n");
    
    const response = await fetch('https://fakestoreapi.com/products');
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const products = await response.json();
    
    console.log("✅ Successfully fetched products!\n");
    console.log("=".repeat(80));
    
    // Display each product
    products.forEach((product, index) => {
      console.log(`\nProduct ${index + 1}:`);
      console.log(`Title: ${product.title}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log("-".repeat(80));
    });
    
    console.log(`\n📊 Total products loaded: ${products.length}\n`);
    
    // If in browser, create HTML cards (bonus feature)
    if (isBrowser) {
      createProductCards(products);
    }
    
  } catch (error) {
    console.error("❌ Failed to load products. Please try again.");
    console.error("Error details:", error.message);
  }
}

// Method 2: Using .then() chain
function fetchProductsWithThen() {
  console.log("🛒 Fetching products using .then() method...\n");
  
  fetch('https://fakestoreapi.com/products')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(products => {
      console.log("✅ Successfully fetched products!\n");
      console.log("=".repeat(80));
      
      products.forEach((product, index) => {
        console.log(`\nProduct ${index + 1}:`);
        console.log(`Title: ${product.title}`);
        console.log(`Price: $${product.price}`);
        console.log(`Image: ${product.image}`);
        console.log("-".repeat(80));
      });
      
      console.log(`\n📊 Total products loaded: ${products.length}\n`);
    })
    .catch(error => {
      console.error("❌ Failed to load products. Please try again.");
      console.error("Error details:", error.message);
    });
}

// BONUS: Create HTML product cards dynamically (for browser environment)
function createProductCards(products) {
  // Check if container already exists, if not create it
  let container = document.getElementById('product-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'product-container';
    container.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    `;
    document.body.appendChild(container);
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create a card for each product
  products.forEach(product => {
    const card = document.createElement('div');
    card.style.cssText = `
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    `;
    
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" 
           style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 10px;">
      <h3 style="font-size: 16px; margin: 10px 0; height: 48px; overflow: hidden;">
        ${product.title}
      </h3>
      <p style="font-size: 20px; font-weight: bold; color: #27ae60; margin: 10px 0;">
        $${product.price}
      </p>
      <p style="font-size: 14px; color: #666; margin: 5px 0;">
        Category: ${product.category}
      </p>
      <p style="font-size: 14px; color: #f39c12; margin: 5px 0;">
        Rating: ${product.rating.rate} ⭐ (${product.rating.count} reviews)
      </p>
    `;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
    
    container.appendChild(card);
  });
  
  console.log("🎨 Product cards created in the DOM!");
}

// Execute the async function
fetchProductsAsync();

// Uncomment below to test the .then() method instead
// fetchProductsWithThen();

/**
 * HOW TO RUN THIS FILE:
 * 
 * 1. IN NODE.JS (v18 or higher):
 *    node Q6_ecommerce_dashboard.js
 * 
 * 2. IN BROWSER:
 *    - Create an HTML file and include this script
 *    - Open the HTML file in a browser
 *    - Check the console for product data
 *    - Product cards will be displayed on the page
 * 
 * 3. IN OLDER NODE.JS VERSIONS:
 *    - Install node-fetch: npm install node-fetch
 *    - Add at top: const fetch = require('node-fetch');
 * 
 * ERROR HANDLING:
 * - Network errors are caught by the catch block
 * - HTTP errors (404, 500, etc.) are handled by checking response.ok
 * - User-friendly error messages are displayed
 */
