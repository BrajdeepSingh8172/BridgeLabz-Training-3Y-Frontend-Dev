# Student Result Management System

A React-based web application for managing student records with full CRUD (Create, Read, Update, Delete) operations using JSON Server as the backend.

## 📋 Features

- **Add Student**: Add new student records with name, section, marks, and grade
- **View Students**: Display all students in a table format
- **Edit Student**: Update existing student information
- **Delete Student**: Remove student records
- **View Details**: See detailed information for individual students
- **Manual Data Loading**: Load students using button clicks (beginner-friendly approach)

## 🛠️ Technologies Used

- **React 18.2.0**: Frontend framework
- **React Hooks (useState)**: State management
- **JSON Server**: Mock REST API backend
- **Fetch API**: HTTP requests for CRUD operations
- **CSS3**: Styling and responsive design

## 📁 Project Structure

```
student-result-app/
│
├── db.json                      → JSON Server database
│
├── src/
│   ├── components/
│   │   ├── StudentList.jsx      → Display all students
│   │   ├── StudentList.css
│   │   ├── StudentForm.jsx      → Add/Edit form
│   │   ├── StudentForm.css
│   │   ├── StudentDetails.jsx   → Student details view
│   │   └── StudentDetails.css
│   │
│   ├── services/
│   │   └── studentService.js    → API calls (CRUD)
│   │
│   ├── App.jsx                  → Main app logic
│   ├── App.css
│   ├── index.js                 → React entry point
│   └── index.css
│
├── public/
│   └── index.html               → HTML template
│
├── package.json                 → Dependencies
└── README.md                    → This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd student-result-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

You have two options to run the application:

#### Option 1: Run Both Servers Together (Recommended)
```bash
npm run dev
```
This command runs both JSON Server (port 3001) and React app (port 3000) simultaneously.

#### Option 2: Run Servers Separately

**Terminal 1 - Start JSON Server:**
```bash
npm run server
```
JSON Server will run on `http://localhost:3001`

**Terminal 2 - Start React App:**
```bash
npm start
```
React app will run on `http://localhost:3000`

The application will automatically open in your default browser.

## 📖 How to Use

### 1. Load Students
- Click the **"Load Students"** button to fetch all student records from the server
- This populates the table with student data

### 2. Add New Student
- Click **"Add New Student"** button
- Fill in the form:
  - Name
  - Section (A, B, C, etc.)
  - Marks (0-100)
  - Grade (A+, A, B+, B, C, D, F)
- Click **"Add Student"** to save
- Click **"Load Students"** again to see the new student in the list

### 3. Edit Student
- Click the **"Edit"** button next to any student
- Modify the information in the form
- Click **"Update Student"** to save changes
- Click **"Load Students"** to refresh the list

### 4. Delete Student
- Click the **"Delete"** button next to any student
- Confirm the deletion in the popup
- The student will be removed from the database
- The list updates automatically

### 5. View Student Details
- Click the **"View"** button next to any student
- See complete details including:
  - ID, Name, Section, Marks, Grade
  - Pass/Fail status
- Click **"Back to List"** to return

## 🎨 Component Details

### StudentList.jsx
- Displays all students in a table
- Contains action buttons: Load, Add, Edit, Delete, View
- Shows student count

### StudentForm.jsx
- Handles both Add and Edit operations
- Uses `useState` for each form field
- Includes form validation
- Separate state variables: `name`, `section`, `marks`, `grade`

### StudentDetails.jsx
- Read-only view of student information
- Color-coded grades
- Pass/Fail indicator

### App.jsx
- Main application logic
- State management using `useState`:
  - `students`: Array of all students
  - `currentView`: Current screen ('list', 'form', 'details')
  - `selectedStudent`: Student being edited/viewed
  - `isEditMode`: Boolean for form mode
- View switching logic

### studentService.js
- All API communication functions:
  - `getStudents()`: Fetch all students
  - `getStudentById(id)`: Fetch single student
  - `addStudent(data)`: Create new student
  - `updateStudent(id, data)`: Update student
  - `deleteStudent(id)`: Remove student

## 🔧 API Endpoints

JSON Server provides the following endpoints:

- `GET    /students`       - Get all students
- `GET    /students/:id`   - Get student by ID
- `POST   /students`       - Add new student
- `PUT    /students/:id`   - Update student
- `DELETE /students/:id`   - Delete student

## 💡 Key Learning Points

### useState Usage
Each form field has its own state:
```javascript
const [name, setName] = useState('');
const [section, setSection] = useState('');
const [marks, setMarks] = useState('');
const [grade, setGrade] = useState('');
```

### Manual Data Fetching
No `useEffect` - all data loading happens through button clicks:
```javascript
const handleLoadStudents = async () => {
  const data = await getStudents();
  setStudents(data);
};
```

### View Management
Simple view switching using state:
```javascript
const [currentView, setCurrentView] = useState('list');
// 'list', 'form', or 'details'
```

## 🎯 Grading Criteria

### Minimum Requirements (Must Complete):
✅ Add Student functionality  
✅ View Students list  
✅ Edit Student functionality  
✅ Delete Student functionality  
✅ View Student Details  
✅ React components  
✅ useState for state management  
✅ JSON Server integration  
✅ CRUD operations via Fetch API  

### Optional Enhancements (For Better Scores):
- Search/Filter functionality
- Sorting by name, marks, or grade
- Pagination
- Form validation (enhanced)
- Better UI/Styling
- Loading indicators
- Error handling improvements
- Responsive design enhancements

## 🐛 Troubleshooting

### JSON Server Not Running
- Error: `Failed to load students`
- Solution: Make sure JSON Server is running on port 3001
  ```bash
  npm run server
  ```

### Port Already in Use
- If port 3000 or 3001 is busy:
  - React: The browser will prompt to use a different port
  - JSON Server: Change port in `package.json`:
    ```json
    "server": "json-server --watch db.json --port 3002"
    ```
    Then update `studentService.js` API_URL accordingly

### Changes Not Showing
- Always click **"Load Students"** after Add/Edit/Delete operations
- This is by design - manual data fetching approach

## 📝 Sample Student Data

The `db.json` file comes with 5 sample students:
1. Rahul Sharma - Section A - 85 marks - Grade A
2. Priya Patel - Section B - 92 marks - Grade A+
3. Amit Kumar - Section A - 78 marks - Grade B+
4. Sneha Reddy - Section C - 88 marks - Grade A
5. Vikram Singh - Section B - 65 marks - Grade C

## 🤝 Contributing

This is a learning project. Students are encouraged to:
1. Complete all minimum requirements first
2. Add optional features for practice
3. Experiment with styling
4. Add new features like search, filter, etc.

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

BridgeLabs Training - Frontend Development

---

**Happy Coding! 🚀**
