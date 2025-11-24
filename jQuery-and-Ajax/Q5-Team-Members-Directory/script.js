$(document).ready(function() {
    
    // 1. Click a manager → highlight all direct reports
    $('.manager').click(function(e) {
        // Remove previous highlights
        $('.employee').removeClass('highlighted');
        
        // Find all direct reports (employees) within this manager's reports container
        // Using .find() to search within the manager's descendants
        $(this).find('.employee').addClass('highlighted');
        
        const managerName = $(this).find('.manager-name').text();
        console.log('Highlighted all direct reports for: ' + managerName);
    });

    // 2. Hover on an employee → show contact info using .next()
    $('.employee').hover(
        function() {
            // Mouse enter - show the next element (contact info)
            // .next() gets the immediately following sibling element
            $(this).next('.contact-info').slideDown(200);
        },
        function() {
            // Mouse leave - hide the contact info
            $(this).next('.contact-info').slideUp(200);
        }
    );

    // 3. Click on a department → change background of all members in that department using .children()
    $('.department-header').click(function() {
        // Get the parent department
        const department = $(this).parent('.department');
        
        // Find the department-members container and get all its children
        // Using .children() to get direct child elements
        const membersContainer = department.find('.department-members');
        
        // Toggle highlight on all children (managers and their teams)
        membersContainer.children().toggleClass('highlighted');
        
        // Also toggle the members container visibility for expand/collapse
        membersContainer.slideToggle(300);
        
        const deptName = $(this).text();
        console.log('Toggled department: ' + deptName);
    });

    // 4. Select a random employee → highlight sibling employees
    $('#selectRandomEmployee').click(function() {
        // Clear previous highlights
        $('.employee').removeClass('highlighted sibling-highlight');
        
        // Get all employees
        const allEmployees = $('.employee');
        
        if (allEmployees.length > 0) {
            // Select a random employee
            const randomIndex = Math.floor(Math.random() * allEmployees.length);
            const randomEmployee = allEmployees.eq(randomIndex);
            
            // Highlight the selected employee
            randomEmployee.addClass('highlighted');
            
            // Highlight all sibling employees using .siblings()
            // .siblings() gets all sibling elements with the same parent
            randomEmployee.siblings('.employee').addClass('sibling-highlight');
            
            const employeeName = randomEmployee.find('.employee-name').text();
            console.log('Selected employee: ' + employeeName);
            console.log('Highlighted ' + randomEmployee.siblings('.employee').length + ' sibling employees');
        }
    });

    // 5. Collapse/expand team using .parent() and .find()
    $('.manager-name').dblclick(function() {
        // Get the manager element using .parent() - traverse up the DOM
        // We need to go up multiple levels: manager-name -> div -> manager-info -> manager
        const manager = $(this).parent().parent().parent('.manager');
        
        // Find the reports container within the manager using .find()
        // .find() searches through all descendants
        const reportsContainer = manager.find('.reports-container');
        
        // Toggle the visibility of the reports container
        reportsContainer.slideToggle(300);
        
        const managerName = $(this).text();
        console.log('Toggled team for manager: ' + managerName);
    });

    // Reset highlights button
    $('#resetHighlights').click(function() {
        $('.employee, .manager, .department-members').removeClass('highlighted sibling-highlight');
        $('.contact-info').slideUp(200);
        console.log('All highlights reset');
    });

    // Additional feature: Show all members count on page load
    const totalEmployees = $('.employee').length;
    const totalManagers = $('.manager').length;
    const totalDepartments = $('.department').length;
    
    console.log('Organization Structure:');
    console.log('- Departments: ' + totalDepartments);
    console.log('- Managers: ' + totalManagers);
    console.log('- Employees: ' + totalEmployees);
});
