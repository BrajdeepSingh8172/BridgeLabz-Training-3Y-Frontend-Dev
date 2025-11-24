// API Configuration
const API_URL = 'http://localhost:3006/users';

// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const alertContainer = document.getElementById('alertContainer');
const userList = document.getElementById('userList');
const userCount = document.getElementById('userCount');

// Input fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

// Error/Success message elements
const emailChecking = document.getElementById('emailChecking');
const emailError = document.getElementById('emailError');
const emailSuccess = document.getElementById('emailSuccess');
const nameError = document.getElementById('nameError');
const usernameError = document.getElementById('usernameError');
const phoneError = document.getElementById('phoneError');

// Email validation state
let isEmailValid = false;
let isCheckingEmail = false;

// Debounce timer
let emailCheckTimer = null;

// Show alert message
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert ${type} show`;
    alert.textContent = message;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Check if email already exists using Axios GET with query parameter
async function checkEmailExists(email) {
    try {
        console.log('Checking if email exists:', email);
        
        // Use Axios GET with query parameter
        const response = await axios.get(API_URL, {
            params: {
                email: email
            }
        });
        
        console.log('Email check response:', response.data);
        
        // If array has items, email already exists
        return response.data.length > 0;
        
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Email input handler with debouncing
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    
    // Clear previous timer
    clearTimeout(emailCheckTimer);
    
    // Reset states
    emailError.classList.remove('show');
    emailSuccess.classList.remove('show');
    emailChecking.classList.remove('show');
    emailInput.classList.remove('error', 'success');
    isEmailValid = false;
    
    // Validate email format first
    if (email.length === 0) {
        return;
    }
    
    if (!isValidEmail(email)) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        return;
    }
    
    // Show checking state
    emailChecking.classList.add('show');
    isCheckingEmail = true;
    
    // Debounce email check (wait 500ms after user stops typing)
    emailCheckTimer = setTimeout(async () => {
        try {
            const exists = await checkEmailExists(email);
            
            emailChecking.classList.remove('show');
            isCheckingEmail = false;
            
            if (exists) {
                // Email already registered
                emailInput.classList.add('error');
                emailError.textContent = '❌ Email already registered. Please use a different email.';
                emailError.classList.add('show');
                isEmailValid = false;
            } else {
                // Email is available
                emailInput.classList.add('success');
                emailSuccess.textContent = '✅ Email is available!';
                emailSuccess.classList.add('show');
                isEmailValid = true;
            }
        } catch (error) {
            emailChecking.classList.remove('show');
            isCheckingEmail = false;
            emailInput.classList.add('error');
            emailError.textContent = 'Error checking email. Make sure server is running on port 3006.';
            emailError.classList.add('show');
        }
    }, 500);
});

// Name validation
nameInput.addEventListener('blur', function() {
    const name = this.value.trim();
    nameError.classList.remove('show');
    nameInput.classList.remove('error');
    
    if (name.length < 2) {
        nameInput.classList.add('error');
        nameError.textContent = 'Name must be at least 2 characters long';
        nameError.classList.add('show');
    }
});

// Username validation
usernameInput.addEventListener('blur', function() {
    const username = this.value.trim();
    usernameError.classList.remove('show');
    usernameInput.classList.remove('error');
    
    if (username.length < 3) {
        usernameInput.classList.add('error');
        usernameError.textContent = 'Username must be at least 3 characters long';
        usernameError.classList.add('show');
    }
});

// Phone validation
phoneInput.addEventListener('blur', function() {
    const phone = this.value.trim();
    phoneError.classList.remove('show');
    phoneInput.classList.remove('error');
    
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    if (!phoneRegex.test(phone)) {
        phoneInput.classList.add('error');
        phoneError.textContent = 'Please enter a valid phone number';
        phoneError.classList.add('show');
    }
});

// Load and display registered users
async function loadRegisteredUsers() {
    try {
        // Use Axios GET to fetch all users
        const response = await axios.get(API_URL);
        const users = response.data;
        
        console.log('Loaded registered users:', users.length);
        
        userCount.textContent = users.length;
        
        if (users.length === 0) {
            userList.innerHTML = '<div class="user-item">No users registered yet</div>';
            return;
        }
        
        // Sort by registration date (newest first)
        users.sort((a, b) => new Date(b.registeredDate) - new Date(a.registeredDate));
        
        userList.innerHTML = users.map(user => `
            <div class="user-item">
                <strong>${user.name}</strong> - ${user.email}
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading users:', error);
        userList.innerHTML = '<div class="user-item" style="color: #e74c3c;">Error loading users</div>';
    }
}

// Form submission handler
registrationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('Form submitted');
    
    // Get form values
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        username: usernameInput.value.trim(),
        phone: phoneInput.value.trim(),
        registeredDate: new Date().toISOString().split('T')[0]
    };
    
    // Validate all fields
    if (!formData.name || formData.name.length < 2) {
        showAlert('Please enter a valid name (at least 2 characters)', 'error');
        nameInput.focus();
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showAlert('Please enter a valid email address', 'error');
        emailInput.focus();
        return;
    }
    
    if (!formData.username || formData.username.length < 3) {
        showAlert('Please enter a valid username (at least 3 characters)', 'error');
        usernameInput.focus();
        return;
    }
    
    if (!formData.phone) {
        showAlert('Please enter a valid phone number', 'error');
        phoneInput.focus();
        return;
    }
    
    // Check if email is still being validated
    if (isCheckingEmail) {
        showAlert('Please wait while we check email availability', 'error');
        return;
    }
    
    // Check if email is valid (not already registered)
    if (!isEmailValid) {
        showAlert('Please use a different email address', 'error');
        emailInput.focus();
        return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';
    
    try {
        console.log('Registering user:', formData);
        
        // Use Axios POST to register new user
        const response = await axios.post(API_URL, formData);
        
        console.log('User registered successfully:', response.data);
        
        // Show success message
        showAlert(`✅ Registration successful! Welcome, ${formData.name}!`, 'success');
        
        // Reset form
        registrationForm.reset();
        emailInput.classList.remove('success');
        emailSuccess.classList.remove('show');
        isEmailValid = false;
        
        // Reload registered users list
        loadRegisteredUsers();
        
    } catch (error) {
        console.error('Error registering user:', error);
        
        if (error.response) {
            // Server responded with error
            showAlert(`Registration failed: ${error.response.statusText}`, 'error');
        } else if (error.request) {
            // No response from server
            showAlert('Cannot connect to server. Make sure JSON Server is running on port 3006.', 'error');
        } else {
            // Other error
            showAlert('Registration failed. Please try again.', 'error');
        }
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Account';
    }
});

// Initialize
console.log('User Registration initialized');
console.log('API URL:', API_URL);
console.log('Make sure to run: json-server --watch db.json --port 3006');

// Load initial registered users
loadRegisteredUsers();
