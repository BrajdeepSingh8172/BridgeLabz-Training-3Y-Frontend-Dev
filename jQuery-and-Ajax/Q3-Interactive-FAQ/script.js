$(document).ready(function() {
    
    // 1. Click on a question → toggle answer visibility
    $('.question').click(function() {
        // Get the associated answer element
        const answer = $(this).next('.answer');
        
        // Toggle the answer visibility with slide effect
        answer.slideToggle(300);
        
        // Toggle active class for visual indicator (arrow rotation)
        $(this).toggleClass('active');
    });

    // 2. Hover → change question color
    // This is handled in CSS using :hover pseudo-class
    // But we can add additional jQuery hover effects if needed
    $('.question').hover(
        function() {
            // Mouse enter - additional hover effect
            $(this).css('font-size', '1.15rem');
        },
        function() {
            // Mouse leave - reset font size
            $(this).css('font-size', '1.1rem');
        }
    );

    // 3. Double-click question → collapse all answers
    $('.question').dblclick(function(e) {
        // Prevent single click event from firing
        e.preventDefault();
        
        // Collapse all answers with slide up effect
        $('.answer').slideUp(300);
        
        // Remove active class from all questions
        $('.question').removeClass('active');
        
        console.log('All answers collapsed via double-click');
    });

    // 4. Focus on answer input → highlight parent question
    $('.answer input').focus(function() {
        // Find the parent FAQ item and then the question within it
        $(this).closest('.faq-item').find('.question').addClass('highlighted-question');
    });

    // 5. Blur from input → reset background color
    $('.answer input').blur(function() {
        // Find the parent FAQ item and then the question within it
        $(this).closest('.faq-item').find('.question').removeClass('highlighted-question');
    });

    // Additional feature: Log input values when user types
    $('.answer input').on('input', function() {
        const inputValue = $(this).val();
        if (inputValue.length > 0) {
            console.log('User question: ' + inputValue);
        }
    });
});
