$(document).ready(function() {
    
    // 1. Click on a product → highlight background
    $('.product').click(function(e) {
        // Prevent click event from triggering when clicking on favorite icon
        if (!$(e.target).hasClass('favorite-icon')) {
            // Remove highlight from all products
            $('.product').removeClass('highlighted');
            // Add highlight to clicked product
            $(this).addClass('highlighted');
        }
    });

    // 2. Hover over a product → show additional product details
    $('.product').hover(
        function() {
            // Mouse enter - show product details with slide down effect
            $(this).find('.product-details').slideDown(300);
        },
        function() {
            // Mouse leave - hide product details with slide up effect
            $(this).find('.product-details').slideUp(300);
        }
    );

    // 3. Clicking a "Favorite" icon → toggles a "selected" class
    $('.favorite-icon').click(function(e) {
        // Prevent event from bubbling to parent product div
        e.stopPropagation();
        
        // Toggle the selected class on the favorite icon
        $(this).toggleClass('selected');
        
        // Show feedback to user
        if ($(this).hasClass('selected')) {
            console.log('Product added to favorites');
        } else {
            console.log('Product removed from favorites');
        }
    });

    // 4. Apply different styles to products with discounts using attribute selector
    // Select all products that have the discount attribute
    $('[discount]').css({
        'border': '2px solid #e74c3c',
        'box-shadow': '0 4px 15px rgba(231, 76, 60, 0.3)'
    });

    // 5. Show an alert if a product is out of stock (using data attribute)
    $('.product').click(function(e) {
        // Check if the clicked product is out of stock using data attribute
        if ($(this).data('stock') === 'out-of-stock') {
            alert('Sorry, this product is currently out of stock!');
            // Add visual indication for out of stock items
            $(this).addClass('out-of-stock');
        }
    });

    // Initialize out-of-stock styling on page load
    $('[data-stock="out-of-stock"]').addClass('out-of-stock');
    
    // Add "Out of Stock" label to out-of-stock products
    $('[data-stock="out-of-stock"]').each(function() {
        $(this).find('.product-name').append(' <span style="color: #e74c3c;">(Out of Stock)</span>');
    });
});
