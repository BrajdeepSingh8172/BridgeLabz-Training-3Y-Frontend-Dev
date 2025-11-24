// Using jQuery.noConflict() to manage multiple jQuery versions
// $j1 = jQuery 1.12.4 (for carousel and widget highlights)
// $j2 = jQuery 3.6.0 (for modal popups and tooltips)

// ===== JQUERY 1.12.4 - CAROUSEL SLIDER ROTATION =====
$j1(document).ready(function() {
    let currentSlide = 0;
    const totalSlides = $j1('.carousel-slide').length;
    let autoRotateInterval = null;

    // Create carousel indicators
    for (let i = 0; i < totalSlides; i++) {
        $j1('#carouselIndicators').append('<div class="indicator" data-slide="' + i + '"></div>');
    }
    $j1('.indicator').first().addClass('active');

    // Function to show specific slide
    function showSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;

        // Move slides using jQuery 1.12.4
        const offset = -currentSlide * 100;
        $j1('#carouselSlides').css('transform', 'translateX(' + offset + '%)');

        // Update indicators
        $j1('.indicator').removeClass('active');
        $j1('.indicator[data-slide="' + currentSlide + '"]').addClass('active');
    }

    // 1. Version 1 → handles carousel slider rotation
    $j1('#prevBtn').click(function() {
        showSlide(currentSlide - 1);
    });

    $j1('#nextBtn').click(function() {
        showSlide(currentSlide + 1);
    });

    // Indicator click functionality
    $j1('.indicator').click(function() {
        const slideIndex = $j1(this).data('slide');
        showSlide(slideIndex);
    });

    // Auto-rotate functionality
    $j1('#autoRotateBtn').click(function() {
        if (autoRotateInterval === null) {
            autoRotateInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 3000);
            $j1(this).text('Stop Auto Rotate');
        } else {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
            $j1(this).text('Auto Rotate');
        }
    });

    // 3. Version 1 → highlights active widget
    $j1('.status-card').click(function() {
        // Remove active class from all cards
        $j1('.status-card').removeClass('active');
        // Add active class to clicked card
        $j1(this).addClass('active');
        
        const widgetType = $j1(this).data('widget');
        console.log('Highlighted widget: ' + widgetType);
    });

    // Highlight random widget button
    $j1('#highlightRandomWidget').click(function() {
        const cards = $j1('.status-card');
        const randomIndex = Math.floor(Math.random() * cards.length);
        
        // Remove active from all and add to random
        cards.removeClass('active');
        cards.eq(randomIndex).addClass('active');
    });

    // Reset highlights
    $j1('#resetHighlight').click(function() {
        $j1('.status-card').removeClass('active');
    });

    console.log('jQuery 1.12.4 initialized - Version: ' + $j1.fn.jquery);
});

// ===== JQUERY 3.6.0 - MODAL POPUPS AND TOOLTIPS =====
$j2(document).ready(function() {
    
    // 2. Version 2 → manages modal popups for notifications
    $j2('.notification-item').click(function() {
        const title = $j2(this).data('title');
        const content = $j2(this).data('content');
        
        // Set modal content
        $j2('#modalTitle').text(title);
        $j2('#modalBody').text(content);
        
        // Show modal with fade effect
        $j2('#notificationModal').fadeIn(300);
    });

    // Close modal functionality
    $j2('#closeModal').click(function() {
        $j2('#notificationModal').fadeOut(300);
    });

    // Close modal when clicking outside
    $j2(window).click(function(event) {
        if ($j2(event.target).is('#notificationModal')) {
            $j2('#notificationModal').fadeOut(300);
        }
    });

    // Close modal with ESC key
    $j2(document).keyup(function(e) {
        if (e.key === "Escape") {
            $j2('#notificationModal').fadeOut(300);
        }
    });

    // 4. Version 2 → attaches tooltips on hover
    $j2('.tooltip-trigger').hover(
        function() {
            // Mouse enter - show tooltip
            const tooltipText = $j2(this).data('tooltip');
            const $tooltip = $j2(this).find('.custom-tooltip');
            
            $tooltip.text(tooltipText);
            $tooltip.fadeIn(200);
        },
        function() {
            // Mouse leave - hide tooltip
            $j2(this).find('.custom-tooltip').fadeOut(200);
        }
    );

    // Add click feedback for tooltip triggers
    $j2('.tooltip-trigger').click(function() {
        const action = $j2(this).text().trim();
        alert('You clicked: ' + action);
    });

    console.log('jQuery 3.6.0 initialized - Version: ' + $j2.fn.jquery);
});

// 5. Use jQuery.noConflict() → ensure both versions operate simultaneously
// This has already been done in the HTML file where we load both versions
// and assign them to separate variables ($j1 and $j2)

// Log confirmation that both versions are working
console.log('=== Multi-jQuery Dashboard ===');
console.log('jQuery Version 1 ($j1): ' + (typeof $j1 !== 'undefined' ? $j1.fn.jquery : 'Not loaded'));
console.log('jQuery Version 2 ($j2): ' + (typeof $j2 !== 'undefined' ? $j2.fn.jquery : 'Not loaded'));
console.log('Both versions running simultaneously using noConflict()');
