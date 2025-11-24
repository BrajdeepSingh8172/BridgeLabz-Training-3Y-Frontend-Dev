// API Configuration
const API_URL = 'http://localhost:3005/timetable';

// DOM Elements
const dayButtons = document.querySelectorAll('.day-btn');
const currentDayElement = document.getElementById('currentDay');
const classCountElement = document.getElementById('classCount');
const timetableContainer = document.getElementById('timetableContainer');

// Current selected day
let selectedDay = 'Monday';

// Show loading spinner
function showLoading() {
    timetableContainer.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading timetable...</p>
        </div>
    `;
}

// Show empty state
function showEmptyState(day) {
    timetableContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">😴</div>
            <h3>No classes today!</h3>
            <p>Enjoy your free day on ${day}</p>
        </div>
    `;
}

// Render timetable classes
function renderClasses(classes) {
    if (classes.length === 0) {
        showEmptyState(selectedDay);
        classCountElement.textContent = '0 classes';
        return;
    }

    // Sort classes by time
    classes.sort((a, b) => {
        const timeA = a.time.split(' - ')[0];
        const timeB = b.time.split(' - ')[0];
        return timeA.localeCompare(timeB);
    });

    timetableContainer.innerHTML = classes.map(classInfo => `
        <div class="class-card ${classInfo.type.toLowerCase()}">
            <span class="class-type-badge">${classInfo.type}</span>
            <div class="class-time">
                <span>🕒</span>
                <span>${classInfo.time}</span>
            </div>
            <div class="class-subject">${classInfo.subject}</div>
            <div class="class-details">
                <div class="detail-item">
                    <span>👨‍🏫</span>
                    <span>${classInfo.professor}</span>
                </div>
                <div class="detail-item">
                    <span>🏢</span>
                    <span>${classInfo.room}</span>
                </div>
            </div>
        </div>
    `).join('');

    classCountElement.textContent = `${classes.length} ${classes.length === 1 ? 'class' : 'classes'}`;
}

// Fetch timetable for a specific day using Fetch API with query parameters
async function fetchTimetable(day) {
    console.log(`Fetching timetable for ${day}...`);
    
    showLoading();
    
    // Disable all day buttons while loading
    dayButtons.forEach(btn => btn.disabled = true);
    
    try {
        // Use Fetch API with query parameter ?day=value
        const response = await fetch(`${API_URL}?day=${day}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const classes = await response.json();
        
        console.log(`Loaded ${classes.length} classes for ${day}`);
        console.log('Classes:', classes);
        
        // Render the classes
        renderClasses(classes);
        
    } catch (error) {
        console.error('Error fetching timetable:', error);
        timetableContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <h3>Error Loading Timetable</h3>
                <p>Make sure JSON Server is running on port 3005</p>
                <p style="font-size: 0.9rem; color: #999; margin-top: 10px;">
                    Run: json-server --watch db.json --port 3005
                </p>
            </div>
        `;
        classCountElement.textContent = '0 classes';
    } finally {
        // Re-enable all day buttons
        dayButtons.forEach(btn => btn.disabled = false);
    }
}

// Update active day button
function updateActiveDay(day) {
    dayButtons.forEach(btn => {
        if (btn.dataset.day === day) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Event listeners for day buttons
dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        const day = button.dataset.day;
        
        if (day === selectedDay) {
            return; // Already selected
        }
        
        selectedDay = day;
        currentDayElement.textContent = day;
        updateActiveDay(day);
        
        console.log(`Day changed to: ${day}`);
        
        // Fetch timetable for the selected day
        fetchTimetable(day);
    });
});

// Initialize - Load Monday's timetable by default
console.log('College Timetable initialized');
console.log('API URL:', API_URL);
console.log('Make sure to run: json-server --watch db.json --port 3005');

// Get current day and load it
const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const todayButton = Array.from(dayButtons).find(btn => btn.dataset.day === today);

if (todayButton) {
    selectedDay = today;
    currentDayElement.textContent = today;
    updateActiveDay(today);
    console.log(`Today is ${today}, loading current day's timetable`);
}

fetchTimetable(selectedDay);
