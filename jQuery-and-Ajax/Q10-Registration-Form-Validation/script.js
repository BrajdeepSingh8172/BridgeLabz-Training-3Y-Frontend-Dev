$(document).ready(function() {
    
    // Store registered emails to check uniqueness
    const registeredEmails = ['test@example.com', 'admin@example.com', 'user@example.com'];
    
    let isNameValid = false;
    let isEmailValid = false;
    let isPhoneValid = false;
    let isPasswordValid = false;
    let isConfirmPasswordValid = false;

    // Function to show error
    function showError(fieldId, message) {
        $('#' + fieldId).addClass('invalid').removeClass('valid');
        $('#' + fieldId + 'Error').text(message).show();
        $('#' + fieldId + 'Success').hide();
    }

    // Function to show success
    function showSuccess(fieldId, message) {
        $('#' + fieldId).addClass('valid').removeClass('invalid');
        $('#' + fieldId + 'Success').text(message || '✓ Valid').show();
        $('#' + fieldId + 'Error').hide();
    }

    // Function to clear validation
    function clearValidation(fieldId) {
        $('#' + fieldId).removeClass('valid invalid');
        $('#' + fieldId + 'Error').hide();
        $('#' + fieldId + 'Success').hide();
    }

    // 1. Check Name field → not empty
    $('#name').on('input blur', function() {
        const nameValue = $(this).val().trim();
        
        if (nameValue === '') {
            showError('name', 'Name cannot be empty');
            isNameValid = false;
        } else if (nameValue.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isNameValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError('name', 'Name should only contain letters');
            isNameValid = false;
        } else {
            showSuccess('name', '✓ Valid name');
            isNameValid = true;
        }
    });

    // 2. Check Email field → valid format and uniqueness
    $('#email').on('input blur', function() {
        const emailValue = $(this).val().trim();
        
        // Email regex pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (emailValue === '') {
            showError('email', 'Email cannot be empty');
            isEmailValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError('email', 'Please enter a valid email format (e.g., user@example.com)');
            isEmailValid = false;
        } else if (registeredEmails.includes(emailValue.toLowerCase())) {
            showError('email', 'This email is already registered. Please use a different email.');
            isEmailValid = false;
        } else {
            showSuccess('email', '✓ Valid and available email');
            isEmailValid = true;
        }
    });

    // Email suggestions for common domains
    $('#email').on('input', function() {
        const emailValue = $(this).val().trim();
        const atIndex = emailValue.indexOf('@');
        
        if (atIndex > 0 && atIndex === emailValue.length - 1) {
            const suggestions = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
            const username = emailValue.substring(0, atIndex);
            
            let suggestionsHTML = '<strong>Suggestions:</strong><br>';
            suggestions.forEach(domain => {
                suggestionsHTML += '<div class="email-suggestion" data-email="' + username + '@' + domain + '">' + 
                                  username + '@' + domain + '</div>';
            });
            
            $('#emailSuggestions').html(suggestionsHTML).show();
        } else {
            $('#emailSuggestions').hide();
        }
    });

    // Handle email suggestion clicks
    $(document).on('click', '.email-suggestion', function() {
        const suggestedEmail = $(this).data('email');
        $('#email').val(suggestedEmail).trigger('input');
        $('#emailSuggestions').hide();
    });

    // Phone number validation
    $('#phone').on('input blur', function() {
        const phoneValue = $(this).val().trim();
        
        // Phone pattern: allows formats like 123-456-7890, (123) 456-7890, 1234567890
        const phonePattern = /^[\d\s()-]{10,}$/;
        
        if (phoneValue === '') {
            showError('phone', 'Phone number cannot be empty');
            isPhoneValid = false;
        } else if (!phonePattern.test(phoneValue)) {
            showError('phone', 'Please enter a valid phone number (at least 10 digits)');
            isPhoneValid = false;
        } else {
            showSuccess('phone', '✓ Valid phone number');
            isPhoneValid = true;
        }
    });

    // 3. Check Password → minimum 8 characters
    $('#password').on('input', function() {
        const passwordValue = $(this).val();
        const length = passwordValue.length;
        
        // Update character count
        $('#passwordCount').text(length + ' / 8 characters minimum');
        
        if (length === 0) {
            clearValidation('password');
            $('#strengthBar').removeClass('strength-weak strength-medium strength-strong');
            isPasswordValid = false;
            return;
        }
        
        // Check password strength
        let strength = 0;
        if (length >= 8) strength++;
        if (/[A-Z]/.test(passwordValue)) strength++;
        if (/[0-9]/.test(passwordValue)) strength++;
        if (/[^A-Za-z0-9]/.test(passwordValue)) strength++;
        
        // Update strength bar
        $('#strengthBar').removeClass('strength-weak strength-medium strength-strong');
        if (strength === 1) {
            $('#strengthBar').addClass('strength-weak');
        } else if (strength === 2 || strength === 3) {
            $('#strengthBar').addClass('strength-medium');
        } else if (strength >= 4) {
            $('#strengthBar').addClass('strength-strong');
        }
        
        // Validate minimum requirements
        if (length < 8) {
            showError('password', 'Password must be at least 8 characters long');
            isPasswordValid = false;
        } else {
            showSuccess('password', '✓ Strong password');
            isPasswordValid = true;
        }
        
        // Re-validate confirm password if it has value
        if ($('#confirmPassword').val().length > 0) {
            $('#confirmPassword').trigger('input');
        }
    });

    // Confirm password validation
    $('#confirmPassword').on('input blur', function() {
        const passwordValue = $('#password').val();
        const confirmPasswordValue = $(this).val();
        
        if (confirmPasswordValue === '') {
            showError('confirmPassword', 'Please confirm your password');
            isConfirmPasswordValid = false;
        } else if (passwordValue !== confirmPasswordValue) {
            showError('confirmPassword', 'Passwords do not match');
            isConfirmPasswordValid = false;
        } else {
            showSuccess('confirmPassword', '✓ Passwords match');
            isConfirmPasswordValid = true;
        }
    });

    // Form submission
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        
        // Trigger validation on all fields
        $('#name, #email, #phone, #password, #confirmPassword').trigger('blur');
        
        // Collect all validation errors
        const errors = [];
        
        if (!isNameValid) {
            errors.push('Valid name is required');
        }
        if (!isEmailValid) {
            errors.push('Valid and unique email is required');
        }
        if (!isPhoneValid) {
            errors.push('Valid phone number is required');
        }
        if (!isPasswordValid) {
            errors.push('Password must be at least 8 characters');
        }
        if (!isConfirmPasswordValid) {
            errors.push('Passwords must match');
        }
        
        // 5. Highlight invalid fields dynamically with red border using .css()
        if (errors.length > 0) {
            // Show validation summary
            $('#errorList').empty();
            errors.forEach(error => {
                $('#errorList').append('<li>' + error + '</li>');
            });
            $('#validationSummary').slideDown(300);
            
            // Apply red border to invalid fields using .css()
            $('.invalid').css({
                'border-color': '#e74c3c',
                'border-width': '2px',
                'box-shadow': '0 0 10px rgba(231, 76, 60, 0.3)'
            });
            
            // Scroll to first error
            $('html, body').animate({
                scrollTop: $('.invalid').first().offset().top - 100
            }, 500);
            
            return false;
        }
        
        // 4. Show success message if all fields valid
        $('#validationSummary').slideUp(300);
        $('#registrationForm').slideUp(400, function() {
            $('#successBanner').slideDown(400);
            
            // Log the successful registration
            console.log('Registration successful!');
            console.log('Name: ' + $('#name').val());
            console.log('Email: ' + $('#email').val());
            console.log('Phone: ' + $('#phone').val());
            
            // Add email to registered emails list
            registeredEmails.push($('#email').val().toLowerCase());
            
            // Reset form after 3 seconds
            setTimeout(function() {
                $('#successBanner').slideUp(400, function() {
                    $('#registrationForm')[0].reset();
                    $('.valid, .invalid').removeClass('valid invalid');
                    $('.error-message, .success-message').hide();
                    $('#strengthBar').removeClass('strength-weak strength-medium strength-strong');
                    $('#passwordCount').text('0 / 8 characters minimum');
                    isNameValid = false;
                    isEmailValid = false;
                    isPhoneValid = false;
                    isPasswordValid = false;
                    isConfirmPasswordValid = false;
                    $('#registrationForm').slideDown(400);
                });
            }, 3000);
        });
    });

    // Real-time visual feedback on focus
    $('input').focus(function() {
        $(this).css('border-color', '#6a11cb');
    });

    $('input').blur(function() {
        if (!$(this).hasClass('valid') && !$(this).hasClass('invalid')) {
            $(this).css('border-color', '#ddd');
        }
    });
});
