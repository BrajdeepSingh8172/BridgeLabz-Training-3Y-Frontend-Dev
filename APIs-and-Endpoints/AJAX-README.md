# AJAX Assignments - HTTP Request Methods

A collection of 6 practical projects demonstrating different HTTP request techniques: **jQuery AJAX**, **XMLHttpRequest**, **Fetch API with Promise.all**, and **Axios**.

## 📋 Project Overview

Each project uses its own **JSON Server** instance running on a different port, with separate `db.json` files containing at least 5 sample records.

## 🚀 Quick Start

### Prerequisites

Install JSON Server globally:
```bash
npm install -g json-server
```

### Running a Project

1. Navigate to the project folder:
```bash
cd AJAX-Q1-Live-Search
```

2. Start JSON Server on the specified port:
```bash
json-server --watch db.json --port 3001
```

3. Open `index.html` in your browser

## 📁 Project Structure

```
BridgeLabz-Training-3Y-Frontend-Dev/
│
├── AJAX-Index.html                      # Main navigation page
├── AJAX-README.md                       # This file
│
├── AJAX-Q1-Live-Search/                 # Port 3001
│   ├── db.json                          # 10 product records
│   ├── index.html
│   └── script.js                        # jQuery AJAX
│
├── AJAX-Q2-Employee-Dashboard/          # Port 3002
│   ├── db.json                          # 10 employee records
│   ├── index.html
│   └── script.js                        # XMLHttpRequest + PATCH
│
├── AJAX-Q3-Task-Manager/                # Port 3003
│   ├── db.json                          # 10 task records
│   ├── index.html
│   └── script.js                        # jQuery AJAX + Query Params
│
├── AJAX-Q4-Multi-API-Dashboard/         # Port 3004
│   ├── db.json                          # Users, Orders, Products
│   ├── index.html
│   └── script.js                        # Fetch + Promise.all
│
├── AJAX-Q5-College-Timetable/           # Port 3005
│   ├── db.json                          # 17 timetable entries
│   ├── index.html
│   └── script.js                        # Fetch API
│
└── AJAX-Q6-User-Registration/           # Port 3006
    ├── db.json                          # 5 user records
    ├── index.html
    └── script.js                        # Axios
```

## 🎯 Projects

### Q1: Live Search (jQuery AJAX)
**Port:** 3001  
**Technology:** jQuery AJAX with query parameters

**Features:**
- Real-time product search with debouncing (300ms)
- Query parameter: `?q=searchTerm`
- Loading indicators and empty states
- Search term highlighting
- Product grid with images and prices

**API Endpoint:**
```javascript
GET http://localhost:3001/products?q=laptop
```

**Database:** 10 product records with name, price, category, image, description

---

### Q2: Employee Dashboard (XMLHttpRequest + PATCH)
**Port:** 3002  
**Technology:** Vanilla JavaScript with XMLHttpRequest

**Features:**
- Toggle employee active/inactive status
- Raw XMLHttpRequest for GET and PATCH
- Optimistic UI updates with revert on failure
- Toggle switches for status changes
- Real-time statistics

**API Endpoints:**
```javascript
GET http://localhost:3002/employees
PATCH http://localhost:3002/employees/:id
```

**Database:** 10 employee records with name, email, department, status

---

### Q3: Task Manager (jQuery AJAX + Query Params)
**Port:** 3003  
**Technology:** jQuery AJAX with filtering

**Features:**
- Filter by priority (high/medium/low)
- Filter by status (completed/pending)
- PATCH requests for task completion
- Dynamic statistics counters
- Query parameters: `?priority=high&completed=true`

**API Endpoints:**
```javascript
GET http://localhost:3003/tasks?priority=high
GET http://localhost:3003/tasks?completed=true
PATCH http://localhost:3003/tasks/:id
```

**Database:** 10 task records with priority, completed, assignee, dueDate

---

### Q4: Multi-API Dashboard (Fetch + Promise.all)
**Port:** 3004  
**Technology:** Fetch API with Promise.all

**Features:**
- Load 3 endpoints simultaneously (users, orders, products)
- Promise.all for parallel requests
- Skeleton loaders during fetch
- Partial failure handling
- Performance timing display

**API Endpoints:**
```javascript
Promise.all([
  fetch('http://localhost:3004/users'),
  fetch('http://localhost:3004/orders'),
  fetch('http://localhost:3004/products')
])
```

**Database:** 
- 6 user records
- 6 order records
- 6 product records

---

### Q5: College Timetable (Fetch API)
**Port:** 3005  
**Technology:** Fetch API with day filtering

**Features:**
- Day-based class schedule viewer
- Query parameter: `?day=Monday`
- Auto-select current day of week
- Color-coded class types (Lecture, Lab, Project)
- "No classes today" empty state

**API Endpoint:**
```javascript
GET http://localhost:3005/timetable?day=Monday
```

**Database:** 17 timetable entries covering Monday-Friday

---

### Q6: User Registration (Axios)
**Port:** 3006  
**Technology:** Axios

**Features:**
- User registration form with validation
- Duplicate email checking with GET request
- POST request for new user creation
- Real-time email availability checking
- Debounced validation (500ms)
- Live registered users list

**API Endpoints:**
```javascript
GET http://localhost:3006/users?email=test@example.com
POST http://localhost:3006/users
```

**Database:** 5 user records with name, email, username, phone, registeredDate

---

## 🔧 Port Configuration

| Port | Project | Technology |
|------|---------|-----------|
| 3001 | Live Search | jQuery AJAX |
| 3002 | Employee Dashboard | XMLHttpRequest |
| 3003 | Task Manager | jQuery AJAX |
| 3004 | Multi-API Dashboard | Fetch + Promise.all |
| 3005 | College Timetable | Fetch API |
| 3006 | User Registration | Axios |

## 💡 Key Features

### HTTP Request Methods Used
- **GET** - Retrieve data (all projects)
- **PATCH** - Update specific fields (Q2, Q3)
- **POST** - Create new records (Q6)

### Query Parameters
- **Q1:** `?q=searchTerm` - Search filtering
- **Q3:** `?priority=high&completed=true` - Multiple filters
- **Q5:** `?day=Monday` - Day filtering
- **Q6:** `?email=user@example.com` - Duplicate checking

### Advanced Techniques
- **Debouncing** - Prevent excessive API calls (Q1, Q6)
- **Optimistic Updates** - Update UI before server response (Q2)
- **Promise.all** - Parallel API requests (Q4)
- **Error Handling** - Graceful failure recovery (all projects)
- **Loading States** - Skeleton loaders and spinners (all projects)

## 🎨 UI Features

- **Modern Gradients** - Purple/violet color scheme
- **Responsive Design** - Mobile-friendly layouts
- **Animations** - Smooth transitions and hover effects
- **Empty States** - User-friendly "no data" messages
- **Real-time Feedback** - Immediate validation and updates

## 📝 Sample Commands

### Start All Servers (in separate terminals)

```bash
# Terminal 1
cd AJAX-Q1-Live-Search
json-server --watch db.json --port 3001

# Terminal 2
cd AJAX-Q2-Employee-Dashboard
json-server --watch db.json --port 3002

# Terminal 3
cd AJAX-Q3-Task-Manager
json-server --watch db.json --port 3003

# Terminal 4
cd AJAX-Q4-Multi-API-Dashboard
json-server --watch db.json --port 3004

# Terminal 5
cd AJAX-Q5-College-Timetable
json-server --watch db.json --port 3005

# Terminal 6
cd AJAX-Q6-User-Registration
json-server --watch db.json --port 3006
```

## 🐛 Troubleshooting

### "Cannot connect to server" error
- Make sure JSON Server is running on the correct port
- Check that no other application is using the port
- Verify the port number in the server info banner

### "Email already registered" (Q6)
- This is expected behavior if the email exists in `db.json`
- Try a different email address
- Check existing emails in the registered users list

### CORS errors
- JSON Server automatically handles CORS
- If issues persist, restart the JSON Server

### Data not loading
- Check browser console for error messages
- Verify JSON Server is running: look for `http://localhost:PORT` in terminal
- Ensure `db.json` file exists in the project folder

## 🌟 Learning Objectives

1. **jQuery AJAX** - Modern AJAX with jQuery helpers
2. **XMLHttpRequest** - Understanding raw HTTP requests
3. **Fetch API** - Native JavaScript promises
4. **Axios** - Third-party HTTP library
5. **Query Parameters** - API filtering and searching
6. **PATCH Requests** - Partial updates
7. **Promise.all** - Parallel request handling
8. **Error Handling** - Graceful failure recovery
9. **Debouncing** - Performance optimization
10. **RESTful APIs** - Standard API design patterns

## 📚 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Async/await, arrow functions
- **jQuery 3.6.0** - AJAX operations
- **Axios (CDN)** - HTTP client
- **JSON Server** - Mock REST API
- **Fetch API** - Native HTTP requests

## 🎓 Assignment Requirements Met

✅ Separate `db.json` file for each question  
✅ At least 5 valid sample records in every JSON file  
✅ Each JSON file runs on a different port  
✅ Specific JSON file used for all API operations per question  
✅ 6 different AJAX implementations as specified  
✅ Query parameters for filtering and searching  
✅ PATCH operations for updates  
✅ POST operations for creation  
✅ Error handling and loading states  
✅ Modern UI with responsive design  

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify JSON Server is running correctly
3. Ensure all dependencies are installed
4. Review the server info banner on each page

---

**Built with ❤️ for BridgeLabz Training**  
*Demonstrating mastery of AJAX, HTTP methods, and RESTful API interactions*
