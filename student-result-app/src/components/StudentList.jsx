import React, { useState } from 'react';
import './StudentList.css';

function StudentList({ students, onAddNew, onEdit, onDelete, onViewDetails, onLoadStudents, isLoading, userRole }) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // Check if user is a teacher
  const isTeacher = userRole === 'teacher';

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'marks') {
      comparison = a.marks - b.marks;
    } else if (sortBy === 'grade') {
      comparison = a.grade.localeCompare(b.grade);
    } else {
      comparison = a.id - b.id;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Get grade color class
  const getGradeClass = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'grade-excellent';
    if (grade === 'B+' || grade === 'B') return 'grade-good';
    if (grade === 'C') return 'grade-average';
    if (grade === 'D') return 'grade-below';
    return 'grade-fail';
  };

  // Toggle sort order
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="student-list-container">
      <h1>🎓 {isTeacher ? 'Student Result Management System' : 'My Academic Results'}</h1>
      
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={onLoadStudents} disabled={isLoading}>
          {isLoading ? '⏳ Loading...' : '🔄 Refresh Students'}
        </button>
        {isTeacher && (
          <button className="btn btn-success" onClick={onAddNew}>
            ➕ Add New Student
          </button>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, section, or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="grade">Grade</option>
          </select>
          <button 
            className="btn btn-sm btn-sort"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="no-data">
          <span className="no-data-icon">📚</span>
          <p>No students loaded yet.</p>
          <p className="hint">Click "Load Students" to fetch data from the server.</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="no-data">
          <span className="no-data-icon">🔍</span>
          <p>No students found matching "{searchTerm}"</p>
          <button className="btn btn-sm btn-secondary" onClick={() => setSearchTerm('')}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="sortable">
                  ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Section</th>
                <th onClick={() => handleSort('marks')} className="sortable">
                  Marks {sortBy === 'marks' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('grade')} className="sortable">
                  Grade {sortBy === 'grade' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td className="name-cell">
                    <span className="student-avatar">{student.name.charAt(0)}</span>
                    {student.name}
                  </td>
                  <td><span className="section-badge">{student.section}</span></td>
                  <td>
                    <div className="marks-cell">
                      <span>{student.marks}</span>
                      <div className="marks-bar">
                        <div 
                          className="marks-fill" 
                          style={{ width: `${student.marks}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`grade-badge ${getGradeClass(student.grade)}`}>{student.grade}</span></td>
                  <td>
                    <span className={`status-badge ${student.marks >= 40 ? 'status-pass' : 'status-fail'}`}>
                      {student.marks >= 40 ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => onViewDetails(student.id)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    {isTeacher && (
                      <>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDelete(student.id)}
                          title="Delete Student"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="footer-stats">
        <div className="stat-card">
          <span className="stat-number">{students.length}</span>
          <span className="stat-label">Total Students</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{students.filter(s => s.marks >= 40).length}</span>
          <span className="stat-label">Passed</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{students.filter(s => s.marks < 40).length}</span>
          <span className="stat-label">Failed</span>
        </div>
        {students.length > 0 && (
          <div className="stat-card">
            <span className="stat-number">
              {Math.round(students.reduce((a, b) => a + b.marks, 0) / students.length)}
            </span>
            <span className="stat-label">Avg Marks</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
