$(document).ready(function() {
    
    const API_URL = 'http://localhost:3003/tasks';
    let allTasks = [];
    let currentFilters = {
        priority: 'all',
        status: 'all'
    };

    // Function to update statistics
    function updateStats() {
        const total = allTasks.length;
        const completed = allTasks.filter(task => task.completed).length;
        const pending = total - completed;

        $('#totalTasks').text(total);
        $('#completedTasks').text(completed);
        $('#pendingTasks').text(pending);
    }

    // Function to render tasks
    function renderTasks(tasks) {
        const $tasksList = $('#tasksList');
        const $emptyState = $('#emptyState');
        const $loading = $('#loading');

        $loading.hide();
        $tasksList.empty();

        if (tasks.length === 0) {
            $tasksList.hide();
            $emptyState.show();
            return;
        }

        $emptyState.hide();
        $tasksList.show();

        tasks.forEach(task => {
            const taskHTML = `
                <div class="task-item ${task.completed ? 'completed' : ''}" id="task-${task.id}">
                    <div class="task-header">
                        <input type="checkbox" 
                               class="task-checkbox" 
                               data-task-id="${task.id}" 
                               ${task.completed ? 'checked' : ''}>
                        <div class="task-title ${task.completed ? 'completed' : ''}">
                            ${task.title}
                        </div>
                        <span class="priority-badge priority-${task.priority}">
                            ${task.priority}
                        </span>
                    </div>
                    <div class="task-details">
                        <div>${task.description}</div>
                        <div class="task-meta">
                            <div class="task-meta-item">
                                <span>👤</span>
                                <span>${task.assignee}</span>
                            </div>
                            <div class="task-meta-item">
                                <span>📅</span>
                                <span>${task.dueDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $tasksList.append(taskHTML);
        });
    }

    // Function to fetch tasks with filters using jQuery AJAX and query parameters
    function fetchTasks() {
        $('#loading').show();
        $('#tasksList').hide();
        $('#emptyState').hide();

        // Build query parameters based on current filters
        const queryParams = {};

        // Add priority filter if not "all"
        if (currentFilters.priority !== 'all') {
            queryParams.priority = currentFilters.priority;
        }

        // Add completed filter if not "all"
        if (currentFilters.status === 'completed') {
            queryParams.completed = true;
        } else if (currentFilters.status === 'pending') {
            queryParams.completed = false;
        }

        // Send GET request with query parameters using jQuery AJAX
        $.ajax({
            url: API_URL,
            method: 'GET',
            data: queryParams,  // jQuery automatically converts this to query string
            dataType: 'json',
            success: function(response) {
                allTasks = response;
                updateStats();
                renderTasks(response);
                
                console.log('Tasks fetched with filters:', queryParams);
                console.log('Results:', response.length, 'tasks');
            },
            error: function(xhr, status, error) {
                $('#loading').hide();
                alert('Error loading tasks. Make sure JSON Server is running on port 3003');
                console.error('Error:', error);
            }
        });
    }

    // Event handler for priority filter dropdown
    $('#priorityFilter').on('change', function() {
        currentFilters.priority = $(this).val();
        console.log('Priority filter changed to:', currentFilters.priority);
        
        // Reload the list using jQuery AJAX with query parameters
        fetchTasks();
    });

    // Event handler for status filter dropdown
    $('#statusFilter').on('change', function() {
        currentFilters.status = $(this).val();
        console.log('Status filter changed to:', currentFilters.status);
        
        // Reload the list using jQuery AJAX with query parameters
        fetchTasks();
    });

    // Event handler for task checkboxes (toggle completed status)
    $(document).on('change', '.task-checkbox', function() {
        const taskId = $(this).data('task-id');
        const isChecked = $(this).is(':checked');
        const $taskItem = $(`#task-${taskId}`);
        const $taskTitle = $taskItem.find('.task-title');
        
        // Add updating indicator
        $taskTitle.append('<span class="updating-indicator">Updating...</span>');
        
        // Disable checkbox while updating
        $(this).prop('disabled', true);

        // Send PATCH request to toggle completed status
        $.ajax({
            url: `${API_URL}/${taskId}`,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({
                completed: isChecked
            }),
            success: function(response) {
                // Update local task data
                const taskIndex = allTasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    allTasks[taskIndex] = response;
                }

                // Update UI
                if (isChecked) {
                    $taskItem.addClass('completed');
                    $taskTitle.addClass('completed');
                } else {
                    $taskItem.removeClass('completed');
                    $taskTitle.removeClass('completed');
                }

                // Remove updating indicator
                $('.updating-indicator').remove();
                
                // Re-enable checkbox
                $(`#task-${taskId} .task-checkbox`).prop('disabled', false);

                // Update stats
                updateStats();

                console.log('Task updated:', response);
            },
            error: function(xhr, status, error) {
                // Remove updating indicator
                $('.updating-indicator').remove();
                
                // Revert checkbox state
                $(`#task-${taskId} .task-checkbox`)
                    .prop('checked', !isChecked)
                    .prop('disabled', false);

                alert('Failed to update task. Please try again.');
                console.error('Error:', error);
            }
        });
    });

    // Initial load
    console.log('Task Manager initialized');
    console.log('API URL:', API_URL);
    console.log('Make sure to run: json-server --watch db.json --port 3003');
    
    fetchTasks();
});
