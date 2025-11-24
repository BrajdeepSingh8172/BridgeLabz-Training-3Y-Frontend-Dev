// API Configuration
const BASE_URL = 'http://localhost:3004';
const ENDPOINTS = {
    users: `${BASE_URL}/users`,
    orders: `${BASE_URL}/orders`,
    products: `${BASE_URL}/products`
};

// DOM Elements
const usersContainer = document.getElementById('usersContainer');
const ordersContainer = document.getElementById('ordersContainer');
const productsContainer = document.getElementById('productsContainer');
const usersCount = document.getElementById('usersCount');
const ordersCount = document.getElementById('ordersCount');
const productsCount = document.getElementById('productsCount');
const refreshBtn = document.getElementById('refreshBtn');
const alertContainer = document.getElementById('alertContainer');

// Show skeleton loaders
function showSkeletonLoaders() {
    const skeletonHTML = Array(3).fill('<div class="skeleton skeleton-card"></div>').join('');
    
    usersContainer.innerHTML = skeletonHTML;
    ordersContainer.innerHTML = skeletonHTML;
    productsContainer.innerHTML = skeletonHTML;
    
    usersCount.textContent = '...';
    ordersCount.textContent = '...';
    productsCount.textContent = '...';
}

// Show alert message
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    alert.style.display = 'block';
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

// Render users
function renderUsers(users) {
    if (users.length === 0) {
        usersContainer.innerHTML = '<div class="empty-state">No users found</div>';
        return;
    }
    
    usersContainer.innerHTML = users.map(user => `
        <div class="user-card">
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>${user.role}</p>
                <p style="font-size: 0.85rem; color: #999;">${user.email}</p>
            </div>
            <span class="user-badge">${user.department}</span>
        </div>
    `).join('');
    
    usersCount.textContent = users.length;
}

// Render orders
function renderOrders(orders) {
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<div class="empty-state">No orders found</div>';
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-number">${order.orderNumber}</span>
                <span class="order-status status-${order.status}">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-details">
                <div>${order.product}</div>
                <div style="font-size: 0.85rem; color: #999; margin-top: 5px;">📅 ${order.date}</div>
            </div>
            <div class="order-amount">$${order.amount.toFixed(2)}</div>
        </div>
    `).join('');
    
    ordersCount.textContent = orders.length;
}

// Render products
function renderProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = '<div class="empty-state">No products found</div>';
        return;
    }
    
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-header">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="product-category">${product.category}</span>
                    <div class="product-rating">⭐ ${product.rating}/5</div>
                </div>
            </div>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <span class="product-stock">Stock: ${product.stock}</span>
            </div>
        </div>
    `).join('');
    
    productsCount.textContent = products.length;
}

// Load all data using Fetch + Promise.all
async function loadAllData() {
    console.log('Starting to load all data...');
    console.log('Endpoints:', ENDPOINTS);
    
    // Show loading state
    showSkeletonLoaders();
    refreshBtn.disabled = true;
    refreshBtn.textContent = '⏳ Loading...';
    
    try {
        // Use Promise.all to fetch all endpoints simultaneously
        const startTime = performance.now();
        
        const [usersResponse, ordersResponse, productsResponse] = await Promise.all([
            fetch(ENDPOINTS.users),
            fetch(ENDPOINTS.orders),
            fetch(ENDPOINTS.products)
        ]);
        
        const endTime = performance.now();
        const loadTime = ((endTime - startTime) / 1000).toFixed(2);
        
        console.log(`All requests completed in ${loadTime} seconds`);
        
        // Check if all responses are OK
        const failedRequests = [];
        
        if (!usersResponse.ok) failedRequests.push('Users');
        if (!ordersResponse.ok) failedRequests.push('Orders');
        if (!productsResponse.ok) failedRequests.push('Products');
        
        if (failedRequests.length > 0) {
            throw new Error(`Failed to load: ${failedRequests.join(', ')}`);
        }
        
        // Parse all responses to JSON
        const [users, orders, products] = await Promise.all([
            usersResponse.json(),
            ordersResponse.json(),
            productsResponse.json()
        ]);
        
        console.log('Data loaded:', { 
            users: users.length, 
            orders: orders.length, 
            products: products.length 
        });
        
        // Render all sections
        renderUsers(users);
        renderOrders(orders);
        renderProducts(products);
        
        // Show success message
        showAlert(`✅ Successfully loaded ${users.length} users, ${orders.length} orders, and ${products.length} products in ${loadTime}s`, 'success');
        
    } catch (error) {
        console.error('Error loading data:', error);
        
        // Show partial data warning or complete error
        if (error.message.includes('Failed to load:')) {
            showAlert(`⚠️ ${error.message}. Some data could not be loaded.`, 'warning');
            
            // Try to load whatever we can individually
            tryLoadPartialData();
        } else {
            showAlert('❌ Error loading data. Make sure JSON Server is running on port 3004.', 'error');
            
            // Show empty states
            usersContainer.innerHTML = '<div class="empty-state">Failed to load users</div>';
            ordersContainer.innerHTML = '<div class="empty-state">Failed to load orders</div>';
            productsContainer.innerHTML = '<div class="empty-state">Failed to load products</div>';
            
            usersCount.textContent = '0';
            ordersCount.textContent = '0';
            productsCount.textContent = '0';
        }
    } finally {
        // Re-enable refresh button
        refreshBtn.disabled = false;
        refreshBtn.textContent = '🔄 Refresh All Data';
    }
}

// Try to load partial data if Promise.all fails
async function tryLoadPartialData() {
    console.log('Attempting to load partial data...');
    
    // Try to load users
    try {
        const usersResponse = await fetch(ENDPOINTS.users);
        if (usersResponse.ok) {
            const users = await usersResponse.json();
            renderUsers(users);
        } else {
            usersContainer.innerHTML = '<div class="empty-state">Failed to load users</div>';
            usersCount.textContent = '0';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        usersContainer.innerHTML = '<div class="empty-state">Failed to load users</div>';
        usersCount.textContent = '0';
    }
    
    // Try to load orders
    try {
        const ordersResponse = await fetch(ENDPOINTS.orders);
        if (ordersResponse.ok) {
            const orders = await ordersResponse.json();
            renderOrders(orders);
        } else {
            ordersContainer.innerHTML = '<div class="empty-state">Failed to load orders</div>';
            ordersCount.textContent = '0';
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersContainer.innerHTML = '<div class="empty-state">Failed to load orders</div>';
        ordersCount.textContent = '0';
    }
    
    // Try to load products
    try {
        const productsResponse = await fetch(ENDPOINTS.products);
        if (productsResponse.ok) {
            const products = await productsResponse.json();
            renderProducts(products);
        } else {
            productsContainer.innerHTML = '<div class="empty-state">Failed to load products</div>';
            productsCount.textContent = '0';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<div class="empty-state">Failed to load products</div>';
        productsCount.textContent = '0';
    }
}

// Event listener for refresh button
refreshBtn.addEventListener('click', loadAllData);

// Initial load
console.log('Multi-API Dashboard initialized');
console.log('Make sure to run: json-server --watch db.json --port 3004');
loadAllData();
