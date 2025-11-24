$(document).ready(function() {
    
    const API_URL = 'http://localhost:3001/products';
    let searchTimeout = null;

    // Function to show loading indicator
    function showLoading() {
        $('#loadingIndicator').show();
        $('#resultsContainer').hide();
    }

    // Function to hide loading indicator
    function hideLoading() {
        $('#loadingIndicator').hide();
        $('#resultsContainer').show();
    }

    // Function to render products
    function renderProducts(products, searchQuery) {
        const $productsGrid = $('#productsGrid');
        const $initialState = $('#initialState');
        const $noResults = $('#noResults');
        const $resultsHeader = $('#resultsHeader');
        const $resultsCount = $('#resultsCount');

        // Clear previous results
        $productsGrid.empty();
        $initialState.hide();
        $noResults.hide();

        if (products.length === 0) {
            // Show no results state
            $noResults.show();
            $resultsHeader.hide();
            return;
        }

        // Show results header with count
        $resultsHeader.show();
        $resultsCount.text(`Found ${products.length} product${products.length !== 1 ? 's' : ''}`);

        // Render each product
        products.forEach(product => {
            // Highlight search term in product name
            let highlightedName = product.name;
            if (searchQuery) {
                const regex = new RegExp(`(${searchQuery})`, 'gi');
                highlightedName = product.name.replace(regex, '<span class="highlight">$1</span>');
            }

            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image" 
                         onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${highlightedName}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-description">${product.description}</div>
                </div>
            `;
            $productsGrid.append(productCard);
        });
    }

    // Function to perform search using jQuery AJAX
    function performSearch(query) {
        // Clear any existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // If query is empty, show initial state
        if (query.trim() === '') {
            $('#initialState').show();
            $('#resultsHeader').hide();
            $('#productsGrid').empty();
            $('#noResults').hide();
            $('#searchInfo').text('Type to search from our product catalog');
            return;
        }

        // Show loading indicator
        showLoading();
        $('#searchInfo').text(`Searching for "${query}"...`);

        // Debounce search - wait 300ms before making request
        searchTimeout = setTimeout(function() {
            // Send GET request with query parameter ?q=value using jQuery AJAX
            $.ajax({
                url: API_URL,
                method: 'GET',
                data: {
                    q: query  // This sends ?q=value to the server
                },
                dataType: 'json',
                success: function(response) {
                    // Hide loading indicator
                    hideLoading();

                    // Update search info
                    $('#searchInfo').text(`Showing results for "${query}"`);

                    // Render products instantly
                    renderProducts(response, query);
                },
                error: function(xhr, status, error) {
                    // Hide loading indicator
                    hideLoading();

                    // Show error message
                    $('#searchInfo').html(
                        '<span style="color: #e74c3c;">⚠️ Error connecting to server. ' +
                        'Make sure JSON Server is running on port 3001</span>'
                    );

                    // Show initial state
                    $('#initialState').show();
                    $('#resultsHeader').hide();
                    $('#productsGrid').empty();
                    $('#noResults').hide();

                    console.error('Search error:', error);
                }
            });
        }, 300); // 300ms debounce delay
    }

    // Event listener for search input
    // As the user types, send GET request and update results instantly
    $('#searchInput').on('input', function() {
        const searchQuery = $(this).val();
        performSearch(searchQuery);
    });

    // Handle Enter key
    $('#searchInput').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            const searchQuery = $(this).val();
            performSearch(searchQuery);
        }
    });

    // Initial focus on search input
    $('#searchInput').focus();

    // Log initialization
    console.log('Live Search initialized');
    console.log('API URL:', API_URL);
    console.log('Make sure to run: json-server --watch db.json --port 3001');
});
