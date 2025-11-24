// Employee Status Dashboard using XMLHttpRequest

const API_URL = 'http://localhost:3002/employees';
let employees = [];

// Function to show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = '<span class="alert-icon">⚠️</span>' + message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Function to show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.innerHTML = '<span class="alert-icon">✓</span>' + message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

// Function to update statistics
function updateStats() {
    const total = employees.length;
    const active = employees.filter(emp => emp.status === 'active').length;
    const inactive = total - active;

    document.getElementById('totalEmployees').textContent = total;
    document.getElementById('activeCount').textContent = active;
    document.getElementById('inactiveCount').textContent = inactive;
}

// Function to render employees table
function renderEmployees() {
    const tbody = document.getElementById('employeesTableBody');
    tbody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.className = 'employee-row';
        row.id = `employee-${employee.id}`;

        const isActive = employee.status === 'active';

        row.innerHTML = `
            <td>
                <div class="employee-name">${employee.name}</div>
                <div class="employee-position">${employee.position}</div>
            </td>
            <td>
                <span class="department-badge">${employee.department}</span>
            </td>
            <td class="employee-email">${employee.email}</td>
            <td>
                <div class="toggle-container">
                    <span class="status-label ${isActive ? 'status-active' : 'status-inactive'}" 
                          id="status-label-${employee.id}">
                        ${isActive ? 'Active' : 'Inactive'}
                    </span>
                    <label class="toggle-switch">
                        <input type="checkbox" 
                               id="toggle-${employee.id}" 
                               ${isActive ? 'checked' : ''} 
                               onchange="toggleEmployeeStatus(${employee.id}, this)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById('employeesTable').style.display = 'table';
    updateStats();
}

// Function to fetch all employees using XMLHttpRequest
function fetchEmployees() {
    // Show loading overlay
    document.getElementById('loadingOverlay').style.display = 'block';
    document.getElementById('employeesTable').style.display = 'none';

    // Create XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('GET', API_URL, true);

    // Set up event handler for when request completes
    xhr.onload = function() {
        // Hide loading overlay
        document.getElementById('loadingOverlay').style.display = 'none';

        if (xhr.status === 200) {
            // Parse the JSON response
            employees = JSON.parse(xhr.responseText);
            
            // Render the employees
            renderEmployees();
            
            console.log('Employees loaded successfully:', employees.length);
        } else {
            showError('Failed to load employees. Status: ' + xhr.status);
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        document.getElementById('loadingOverlay').style.display = 'none';
        showError('Network error. Make sure JSON Server is running on port 3002');
    };

    // Send the request
    xhr.send();
}

// Function to toggle employee status using XMLHttpRequest PATCH
function toggleEmployeeStatus(employeeId, toggleElement) {
    // Find the employee
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    // Store the current status for potential revert
    const previousStatus = employee.status;
    const newStatus = previousStatus === 'active' ? 'inactive' : 'active';

    // Optimistically update UI immediately
    employee.status = newStatus;
    const statusLabel = document.getElementById(`status-label-${employeeId}`);
    statusLabel.textContent = newStatus === 'active' ? 'Active' : 'Inactive';
    statusLabel.className = `status-label ${newStatus === 'active' ? 'status-active' : 'status-inactive'}`;
    updateStats();

    // Disable the toggle while request is in progress
    toggleElement.disabled = true;
    const slider = toggleElement.nextElementSibling;
    slider.classList.add('disabled');

    // Create XMLHttpRequest for PATCH operation
    const xhr = new XMLHttpRequest();

    // Configure PATCH request
    xhr.open('PATCH', `${API_URL}/${employeeId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up event handler for request completion
    xhr.onload = function() {
        // Re-enable the toggle
        toggleElement.disabled = false;
        slider.classList.remove('disabled');

        if (xhr.status === 200) {
            // Success - parse updated employee data
            const updatedEmployee = JSON.parse(xhr.responseText);
            
            // Update local employee data
            const index = employees.findIndex(emp => emp.id === employeeId);
            if (index !== -1) {
                employees[index] = updatedEmployee;
            }

            // Show success message
            showSuccess(
                `${employee.name} is now ${newStatus === 'active' ? 'active' : 'inactive'}`
            );

            console.log('Status updated successfully:', updatedEmployee);
        } else {
            // Request failed - revert UI changes
            employee.status = previousStatus;
            statusLabel.textContent = previousStatus === 'active' ? 'Active' : 'Inactive';
            statusLabel.className = `status-label ${previousStatus === 'active' ? 'status-active' : 'status-inactive'}`;
            toggleElement.checked = previousStatus === 'active';
            updateStats();

            // Show error message
            showError('Failed to update status. Please try again.');
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        // Re-enable the toggle
        toggleElement.disabled = false;
        slider.classList.remove('disabled');

        // Revert UI changes
        employee.status = previousStatus;
        statusLabel.textContent = previousStatus === 'active' ? 'Active' : 'Inactive';
        statusLabel.className = `status-label ${previousStatus === 'active' ? 'status-active' : 'status-inactive'}`;
        toggleElement.checked = previousStatus === 'active';
        updateStats();

        // Show error message
        showError('Network error. Failed to update employee status.');
    };

    // Send PATCH request with new status
    const data = JSON.stringify({ status: newStatus });
    xhr.send(data);
}

// Initialize dashboard on page load
window.addEventListener('DOMContentLoaded', function() {
    console.log('Employee Status Dashboard initialized');
    console.log('API URL:', API_URL);
    console.log('Make sure to run: json-server --watch db.json --port 3002');
    
    // Fetch employees
    fetchEmployees();
});
