$(document).ready(function() {
    
    let rotationInterval = null;
    let currentBannerIndex = 0;
    const totalBanners = $('.rotating-banner').length;

    // 1. "Hide" button → hide specific banners
    $('#hideBanner1').click(function() {
        // Hide banner with fade out effect
        $('#banner1').fadeOut(500);
    });

    // 2. "Show" button → show hidden banners
    $('#showBanner1').click(function() {
        // Show banner with fade in effect
        $('#banner1').fadeIn(500);
    });

    // 3. "Slide Up/Down" buttons → toggle banners
    $('#slideToggleBanner2').click(function() {
        // Toggle banner with slide effect
        $('#banner2').slideToggle(500);
    });

    // 4. "Fade In/Fade Out" → show/hide banners gradually
    $('#fadeToggleBanner3').click(function() {
        // Toggle banner with fade effect
        $('#banner3').fadeToggle(500);
    });

    // 5. Automatically rotate through banners every 5 seconds using .fadeIn()/.fadeOut()
    function rotateBanners() {
        // Fade out current banner
        $('.rotating-banner').eq(currentBannerIndex).fadeOut(800, function() {
            // After fade out completes, move to next banner
            currentBannerIndex = (currentBannerIndex + 1) % totalBanners;
            
            // Fade in next banner
            $('.rotating-banner').eq(currentBannerIndex).fadeIn(800);
        });
    }

    // Start auto-rotation button handler
    $('#startRotation').click(function() {
        // Prevent multiple intervals from being created
        if (rotationInterval === null) {
            // Update status indicator
            $('#rotationStatus').text('Active - Rotating every 5 seconds').css('color', '#2ecc71');
            
            // Start the rotation interval
            rotationInterval = setInterval(rotateBanners, 5000);
            
            console.log('Banner rotation started');
        } else {
            alert('Rotation is already running!');
        }
    });

    // Stop auto-rotation button handler
    $('#stopRotation').click(function() {
        // Clear the interval if it exists
        if (rotationInterval !== null) {
            clearInterval(rotationInterval);
            rotationInterval = null;
            
            // Update status indicator
            $('#rotationStatus').text('Stopped').css('color', '#e74c3c');
            
            console.log('Banner rotation stopped');
        } else {
            alert('Rotation is not running!');
        }
    });

    // Initialize: Make sure only the first rotating banner is visible
    $('.rotating-banner').hide();
    $('.rotating-banner').eq(0).show();

    // Add hover effects to all banners for better UX
    $('.banner').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.02)',
                'transition': 'all 0.3s ease'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1)',
                'transition': 'all 0.3s ease'
            });
        }
    );
});
