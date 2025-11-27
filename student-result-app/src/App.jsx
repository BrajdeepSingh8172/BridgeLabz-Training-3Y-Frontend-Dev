import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getStudents, getStudentById, addStudent, updateStudent, deleteStudent } from './services/studentService';
import './App.css';

function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for storing all students
  const [students, setStudents] = useState([]);
  
  // State for tracking current view
  const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'details'
  
  // State for selected student (for editing or viewing)
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // State for tracking if form is in edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Handle Login
  const handleLogin = async (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
    // Auto-load students after login
    setIsLoading(true);
    try {
      const data = await getStudents();
      // If student role, filter to show only their own data
      if (loggedInUser.role === 'student') {
        const myData = data.filter(s => s.id === loggedInUser.studentId);
        setStudents(myData);
      } else {
        setStudents(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setStudents([]);
    setCurrentView('list');
    setSelectedStudent(null);
  };

  // Load all students from JSON Server
  const handleLoadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await getStudents();
      // If student role, filter to show only their own data
      if (user && user.role === 'student') {
        const myData = data.filter(s => s.id === user.studentId);
        setStudents(myData);
      } else {
        setStudents(data);
      }
    } catch (error) {
      alert('Failed to load students. Make sure JSON Server is running on port 3001.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Add New Student button click
  const handleAddNew = () => {
    setSelectedStudent(null);
    setIsEditMode(false);
    setCurrentView('form');
  };

  // Handle Edit button click
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditMode(true);
    setCurrentView('form');
  };

  // Handle View Details button click
  const handleViewDetails = async (studentId) => {
    setIsLoading(true);
    try {
      const student = await getStudentById(studentId);
      setSelectedStudent(student);
      setCurrentView('details');
    } catch (error) {
      alert('Failed to load student details');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete button click
  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      await deleteStudent(studentId);
      // Auto-refresh the list after deletion
      const data = await getStudents();
      setStudents(data);
      alert('Student deleted successfully!');
    } catch (error) {
      alert('Failed to delete student');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (Add or Edit)
  const handleFormSubmit = async (studentData) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        // Update existing student
        await updateStudent(selectedStudent.id, studentData);
        alert('Student updated successfully!');
      } else {
        // Add new student
        await addStudent(studentData);
        alert('Student added successfully!');
      }
      // Auto-refresh the list and go back
      const data = await getStudents();
      setStudents(data);
      setCurrentView('list');
      setSelectedStudent(null);
    } catch (error) {
      alert(`Failed to ${isEditMode ? 'update' : 'add'} student`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button in form
  const handleCancel = () => {
    setCurrentView('list');
    setSelectedStudent(null);
    setIsEditMode(false);
  };

  // Handle back button from details view
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  // If not logged in, show login form
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {/* User Header with Logout */}
      <div className="user-header">
        <div className="user-info">
          <span className="user-welcome">Welcome, <strong>{user.username}</strong></span>
          <span className={`user-role ${user.role}`}>
            {user.role === 'teacher' ? '👨‍🏫 Teacher' : '🎓 Student'}
          </span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {currentView === 'list' && (
        <StudentList
          students={students}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          onLoadStudents={handleLoadStudents}
          isLoading={isLoading}
          userRole={user.role}
        />
      )}

      {currentView === 'form' && (
        <StudentForm
          student={selectedStudent}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isEditMode={isEditMode}
        />
      )}

      {currentView === 'details' && (
        <StudentDetails
          student={selectedStudent}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}

export default App;
