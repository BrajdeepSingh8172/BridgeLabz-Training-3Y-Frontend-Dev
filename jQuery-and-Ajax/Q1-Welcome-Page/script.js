$(document).ready(function() {
    // Array of motivational quotes for the "Change Greeting" feature
    const motivationalQuotes = [
        "Believe you can and you're halfway there!",
        "Success is not final, failure is not fatal!",
        "The only way to do great work is to love what you do.",
        "Don't watch the clock; do what it does. Keep going!",
        "The future belongs to those who believe in their dreams."
    ];
    
    let quoteIndex = 0;

    // Function to get time-based greeting
    function getTimeBasedGreeting() {
        const hour = new Date().getHours();
        let greeting = "";
        
        if (hour >= 5 && hour < 12) {
            greeting = "Good Morning! ☀️";
        } else if (hour >= 12 && hour < 17) {
            greeting = "Good Afternoon! 🌤️";
        } else if (hour >= 17 && hour < 21) {
            greeting = "Good Evening! 🌆";
        } else {
            greeting = "Good Night! 🌙";
        }
        
        return greeting;
    }

    // 1. On page load → display personalized greeting based on time of day
    $('#greeting').text(getTimeBasedGreeting());

    // 2. Button "Change Greeting" → changes text to a motivational quote
    $('#changeGreetingBtn').click(function() {
        // Cycle through motivational quotes
        $('#greeting').text(motivationalQuotes[quoteIndex]);
        quoteIndex = (quoteIndex + 1) % motivationalQuotes.length;
    });

    // 3. Toggle visibility of welcome message using another button
    $('#toggleMessageBtn').click(function() {
        $('#welcomeMessage').slideToggle(300);
    });

    // 4. Show an alert when greeting is clicked
    $('#greeting').click(function() {
        const currentText = $(this).text();
        alert('You clicked on: "' + currentText + '"');
    });
});
