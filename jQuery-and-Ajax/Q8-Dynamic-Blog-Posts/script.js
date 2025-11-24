$(document).ready(function() {
    
    // Function to update post count
    function updatePostCount() {
        const count = $('#postsList .blog-post').length;
        $('#postCount').text(count);
    }

    // Function to get current date string
    function getCurrentDate() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date();
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    // Function to clear input fields
    function clearInputs() {
        $('#postTitle').val('');
        $('#postAuthor').val('');
        $('#postContent').val('');
    }

    // 1. "Add New Post" → append a new post to the list
    $('#addNewPost').click(function() {
        const title = $('#postTitle').val().trim();
        const author = $('#postAuthor').val().trim() || 'Anonymous';
        const content = $('#postContent').val().trim();

        if (!title || !content) {
            alert('Please enter both title and content for the blog post!');
            return;
        }

        // Create new post HTML
        const newPost = 
            '<div class="blog-post">' +
                '<div class="post-title">' + title + '</div>' +
                '<div class="post-meta">By ' + author + ' • ' + getCurrentDate() + '</div>' +
                '<div class="post-content">' + content + '</div>' +
            '</div>';

        // Append the new post to the end of the list
        $('#postsList').append(newPost);

        // Update count and clear inputs
        updatePostCount();
        clearInputs();

        // Scroll to the new post
        $('#postsList').animate({
            scrollTop: $('#postsList')[0].scrollHeight
        }, 500);
    });

    // 2. "Prepend Featured Post" → add a post at the top
    $('#prependFeatured').click(function() {
        const title = $('#postTitle').val().trim();
        const author = $('#postAuthor').val().trim() || 'Anonymous';
        const content = $('#postContent').val().trim();

        if (!title || !content) {
            alert('Please enter both title and content for the featured post!');
            return;
        }

        // Create featured post HTML with special styling
        const featuredPost = 
            '<div class="blog-post featured">' +
                '<div class="featured-badge">⭐ FEATURED</div>' +
                '<div class="post-title">' + title + '</div>' +
                '<div class="post-meta">By ' + author + ' • ' + getCurrentDate() + '</div>' +
                '<div class="post-content">' + content + '</div>' +
            '</div>';

        // Prepend the featured post to the beginning of the list
        $('#postsList').prepend(featuredPost);

        // Update count and clear inputs
        updatePostCount();
        clearInputs();

        // Scroll to top to show the new featured post
        $('#postsList').animate({
            scrollTop: 0
        }, 500);
    });

    // 3. "Remove Last Post" → delete last element
    $('#removeLastPost').click(function() {
        const posts = $('#postsList .blog-post');
        
        if (posts.length === 0) {
            alert('No posts to remove!');
            return;
        }

        // Confirm before removing
        if (confirm('Are you sure you want to remove the last post?')) {
            // Remove the last post with animation
            posts.last().fadeOut(400, function() {
                $(this).remove();
                updatePostCount();
            });
        }
    });

    // 4. Add tags to posts → use .before()/.after() for placement
    $('#addTagsToLast').click(function() {
        const posts = $('#postsList .blog-post');
        
        if (posts.length === 0) {
            alert('No posts available to add tags!');
            return;
        }

        const lastPost = posts.last();
        
        // Check if tags already exist
        if (lastPost.find('.post-tags').length > 0) {
            alert('Tags already added to the last post!');
            return;
        }

        // Create tags HTML
        const tagsHTML = 
            '<div class="post-tags">' +
                '<span class="tag">JavaScript</span>' +
                '<span class="tag">Tutorial</span>' +
                '<span class="tag">Web Development</span>' +
            '</div>';

        // Add tags after the post content using .after()
        lastPost.find('.post-content').after(tagsHTML);

        // Alternatively, we can add a "Read More" link before the tags using .before()
        const readMoreHTML = '<div style="margin: 10px 0;"><a href="#" style="color: #0f3460;">Read More →</a></div>';
        lastPost.find('.post-tags').before(readMoreHTML);

        // Highlight the updated post temporarily
        lastPost.css('background', '#d4edda').delay(1000).queue(function(next) {
            $(this).css('background', '');
            next();
        });
    });

    // 5. Highlight posts with specific keywords dynamically
    $('#highlightKeyword').click(function() {
        const keyword = $('#keywordInput').val().trim();

        if (!keyword) {
            alert('Please enter a keyword to highlight!');
            return;
        }

        // Clear previous highlights
        $('.blog-post').each(function() {
            const $post = $(this);
            $post.find('.post-title, .post-content').each(function() {
                const originalText = $(this).text();
                $(this).html(originalText);
            });
        });

        let highlightCount = 0;

        // Search and highlight keyword in posts
        $('.blog-post').each(function() {
            const $post = $(this);
            let postHasKeyword = false;

            // Check title and content for keyword
            $post.find('.post-title, .post-content').each(function() {
                const text = $(this).text();
                const regex = new RegExp('(' + keyword + ')', 'gi');
                
                if (regex.test(text)) {
                    const highlightedText = text.replace(regex, '<span class="keyword-highlight">$1</span>');
                    $(this).html(highlightedText);
                    postHasKeyword = true;
                }
            });

            if (postHasKeyword) {
                highlightCount++;
                // Add visual indicator to the entire post
                $post.css('border-left-color', '#f39c12');
            }
        });

        if (highlightCount > 0) {
            alert('Highlighted "' + keyword + '" in ' + highlightCount + ' post(s)');
        } else {
            alert('No posts found containing "' + keyword + '"');
        }
    });

    // Clear all highlights
    $('#clearHighlight').click(function() {
        $('.blog-post').each(function() {
            const $post = $(this);
            $post.find('.post-title, .post-content').each(function() {
                const originalText = $(this).text();
                $(this).html(originalText);
            });
            $post.css('border-left-color', '');
        });
        
        $('#keywordInput').val('');
        alert('All highlights cleared!');
    });

    // Add hover effect to posts
    $('.blog-post').hover(
        function() {
            $(this).css('background', '#e9ecef');
        },
        function() {
            if (!$(this).hasClass('featured')) {
                $(this).css('background', '#f8f9fa');
            }
        }
    );

    // Handle enter key in keyword input
    $('#keywordInput').keypress(function(e) {
        if (e.which === 13) {
            $('#highlightKeyword').click();
        }
    });

    // Initialize
    updatePostCount();
});
