$(document).ready(function() {
    
    let topicIdCounter = 6; // Start from 6 since we have 5 initial topics

    // Function to show success message dynamically
    function showMessage(message, type = 'success') {
        const messageClass = 'message-' + type;
        const messageHTML = '<div class="message ' + messageClass + '">' + message + '</div>';
        
        // Insert message into DOM
        $('#messagesContainer').prepend(messageHTML);
        
        // Auto-remove message after 5 seconds
        setTimeout(function() {
            $('#messagesContainer .message').first().fadeOut(500, function() {
                $(this).remove();
            });
        }, 5000);
    }

    // Function to toggle subscription status
    function toggleSubscription($topic, subscribe) {
        const topicName = $topic.find('.topic-name').text();
        const $status = $topic.find('.subscription-status');
        
        if (subscribe) {
            // Subscribe
            $topic.attr('data-subscribed', 'true');
            $status.removeClass('status-unsubscribed').addClass('status-subscribed');
            $status.text('Subscribed');
            return topicName + ' - Subscribed ✓';
        } else {
            // Unsubscribe
            $topic.attr('data-subscribed', 'false');
            $status.removeClass('status-subscribed').addClass('status-unsubscribed');
            $status.text('Unsubscribed');
            return topicName + ' - Unsubscribed ✗';
        }
    }

    // 1. Subscribe → enable notifications (using .on() for click events)
    // Using event delegation for dynamically added topics
    $('#topicsList').on('click', '.topic-item', function() {
        const isSubscribed = $(this).attr('data-subscribed') === 'true';
        const message = toggleSubscription($(this), !isSubscribed);
        
        // Show success message
        showMessage(message, isSubscribed ? 'warning' : 'success');
    });

    // 2. Unsubscribe → disable notifications
    $('#unsubscribeAll').click(function() {
        let count = 0;
        
        $('.topic-item[data-subscribed="true"]').each(function() {
            toggleSubscription($(this), false);
            count++;
        });
        
        if (count > 0) {
            showMessage('Unsubscribed from ' + count + ' topic(s)', 'warning');
        } else {
            showMessage('No active subscriptions to remove', 'info');
        }
    });

    // Subscribe to all topics
    $('#subscribeAll').click(function() {
        let count = 0;
        
        $('.topic-item[data-subscribed="false"]').each(function() {
            toggleSubscription($(this), true);
            count++;
        });
        
        if (count > 0) {
            showMessage('Successfully subscribed to ' + count + ' topic(s)', 'success');
        } else {
            showMessage('Already subscribed to all topics', 'info');
        }
    });

    // 3. Dynamically add new subscription topics → attach .on() click events
    $('#addTopicBtn').click(function() {
        const topicName = $('#newTopicName').val().trim();
        const topicDescription = $('#newTopicDescription').val().trim();
        
        if (topicName === '' || topicDescription === '') {
            showMessage('Please fill in both topic name and description', 'warning');
            return;
        }
        
        // Create new topic HTML
        const newTopicHTML = 
            '<div class="topic-item" data-topic-id="' + topicIdCounter + '" data-subscribed="false">' +
                '<div class="topic-info">' +
                    '<div class="topic-name">' + topicName + ' <span class="notification-badge">NEW</span></div>' +
                    '<div class="topic-description">' + topicDescription + '</div>' +
                '</div>' +
                '<div class="subscription-status status-unsubscribed">Unsubscribed</div>' +
            '</div>';
        
        // Append new topic to the list
        $('#topicsList').append(newTopicHTML);
        
        // The click event is automatically attached via event delegation (see line 35)
        
        // Show success message
        showMessage('New topic "' + topicName + '" added successfully!', 'success');
        
        // Clear input fields
        $('#newTopicName').val('');
        $('#newTopicDescription').val('');
        
        // Increment counter
        topicIdCounter++;
    });

    // 4. Remove specific subscription → detach .off() event
    // Add remove button functionality (double-click to remove)
    $('#topicsList').on('dblclick', '.topic-item', function(e) {
        e.stopPropagation(); // Prevent subscription toggle
        
        const topicName = $(this).find('.topic-name').text();
        const confirmation = confirm('Are you sure you want to remove "' + topicName + '"?');
        
        if (confirmation) {
            const $topic = $(this);
            
            // Detach event handlers using .off()
            $topic.off('click');
            
            // Remove with animation
            $topic.fadeOut(400, function() {
                $(this).remove();
                showMessage('Topic "' + topicName + '" has been removed', 'info');
            });
        }
    });

    // Show only subscribed topics
    $('#showSubscribed').click(function() {
        $('.topic-item[data-subscribed="false"]').slideUp(300);
        $('.topic-item[data-subscribed="true"]').slideDown(300);
        
        const subscribedCount = $('.topic-item[data-subscribed="true"]').length;
        showMessage('Showing ' + subscribedCount + ' subscribed topic(s)', 'info');
    });

    // Show all topics
    $('#showAll').click(function() {
        $('.topic-item').slideDown(300);
        showMessage('Showing all topics', 'info');
    });

    // 5. Success message is already handled by the showMessage function
    // which dynamically inserts messages into the DOM
    
    // Add info message on page load
    showMessage('Welcome! Click on any topic to subscribe or unsubscribe. Double-click to remove a topic.', 'info');
});
