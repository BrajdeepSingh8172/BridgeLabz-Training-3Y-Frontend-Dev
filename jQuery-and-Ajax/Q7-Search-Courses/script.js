$(document).ready(function() {
    
    // Initialize total courses count
    const totalCourses = $('.course-card').length;
    $('#totalCourses').text(totalCourses);
    $('#matchCount').text(totalCourses);

    // Function to remove previous highlights
    function removeHighlights() {
        $('.course-card').each(function() {
            const $card = $(this);
            // Remove highlight spans and restore original text
            $card.find('.course-title, .course-instructor, .course-description, .course-category').each(function() {
                const originalText = $(this).text();
                $(this).html(originalText);
            });
        });
    }

    // Function to highlight matched text
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        // Create a case-insensitive regex to find all matches
        const regex = new RegExp('(' + searchTerm + ')', 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Function to perform search
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        // Remove previous highlights
        removeHighlights();
        
        let matchCount = 0;
        
        if (searchTerm === '') {
            // Show all courses if search is empty
            $('.course-card').removeClass('hidden');
            matchCount = totalCourses;
            $('#noResults').addClass('hidden');
        } else {
            $('.course-card').each(function() {
                const $card = $(this);
                
                // Get text from all searchable fields
                const title = $card.find('.course-title').text().toLowerCase();
                const instructor = $card.find('.course-instructor').text().toLowerCase();
                const description = $card.find('.course-description').text().toLowerCase();
                const category = $card.find('.course-category').text().toLowerCase();
                const keywords = $card.data('keywords') || '';
                
                // Check if any field matches the search term
                const isMatch = title.includes(searchTerm) || 
                               instructor.includes(searchTerm) || 
                               description.includes(searchTerm) || 
                               category.includes(searchTerm) ||
                               keywords.includes(searchTerm);
                
                if (isMatch) {
                    // 2. Highlight matched text using .css()
                    // Show the card and highlight matching text
                    $card.removeClass('hidden');
                    
                    // Highlight in title
                    const titleHTML = highlightText($card.find('.course-title').text(), searchTerm);
                    $card.find('.course-title').html(titleHTML);
                    
                    // Highlight in instructor
                    const instructorHTML = highlightText($card.find('.course-instructor').text(), searchTerm);
                    $card.find('.course-instructor').html(instructorHTML);
                    
                    // Highlight in description
                    const descriptionHTML = highlightText($card.find('.course-description').text(), searchTerm);
                    $card.find('.course-description').html(descriptionHTML);
                    
                    // Highlight in category
                    const categoryHTML = highlightText($card.find('.course-category').text(), searchTerm);
                    $card.find('.course-category').html(categoryHTML);
                    
                    matchCount++;
                } else {
                    // 3. Toggle visibility of courses not matching search
                    $card.addClass('hidden');
                }
            });
            
            // Show no results message if no matches
            if (matchCount === 0) {
                $('#noResults').removeClass('hidden');
            } else {
                $('#noResults').addClass('hidden');
            }
        }
        
        // 4. Show count of matched courses dynamically
        $('#matchCount').text(matchCount);
        
        // Add visual feedback with color
        if (matchCount === 0) {
            $('#matchCount').css('color', '#e74c3c');
        } else if (matchCount < totalCourses / 2) {
            $('#matchCount').css('color', '#f39c12');
        } else {
            $('#matchCount').css('color', '#11998e');
        }
    }

    // 1. Search input filters courses in real-time using .keyup()
    $('#searchInput').keyup(function() {
        const searchTerm = $(this).val();
        performSearch(searchTerm);
    });

    // Also trigger search on button click
    $('#searchBtn').click(function() {
        const searchTerm = $('#searchInput').val();
        performSearch(searchTerm);
    });

    // 5. Clear search → reset list to show all courses
    $('#clearBtn').click(function() {
        // Clear the input field
        $('#searchInput').val('');
        
        // Remove all highlights
        removeHighlights();
        
        // Show all courses
        $('.course-card').removeClass('hidden');
        
        // Hide no results message
        $('#noResults').addClass('hidden');
        
        // Reset match count
        $('#matchCount').text(totalCourses).css('color', '#11998e');
        
        // Focus back on search input
        $('#searchInput').focus();
    });

    // Add enter key support for search
    $('#searchInput').keypress(function(e) {
        if (e.which === 13) { // Enter key
            performSearch($(this).val());
        }
    });

    // Add visual feedback when hovering over courses
    $('.course-card').hover(
        function() {
            $(this).css('border-color', '#38ef7d');
        },
        function() {
            if (!$(this).hasClass('hidden')) {
                $(this).css('border-color', '#e0e0e0');
            }
        }
    );
});
