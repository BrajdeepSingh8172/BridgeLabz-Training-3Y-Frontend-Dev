import React, { useState } from 'react';
import './StudentForm.css';

// Function to auto-calculate grade based on marks
const calculateGrade = (marks) => {
  const numMarks = parseInt(marks);
  if (isNaN(numMarks)) return '';
  if (numMarks >= 90) return 'A+';
  if (numMarks >= 80) return 'A';
  if (numMarks >= 70) return 'B+';
  if (numMarks >= 60) return 'B';
  if (numMarks >= 50) return 'C';
  if (numMarks >= 40) return 'D';
  return 'F';
};

function StudentForm({ student, onSubmit, onCancel, isEditMode }) {
  // Using useState for form fields
  const [name, setName] = useState(student ? student.name : '');
  const [section, setSection] = useState(student ? student.section : '');
  const [marks, setMarks] = useState(student ? student.marks : '');
  const [grade, setGrade] = useState(student ? student.grade : '');
  const [errors, setErrors] = useState({});

  // Handle marks change and auto-calculate grade
  const handleMarksChange = (e) => {
    const newMarks = e.target.value;
    setMarks(newMarks);
    // Auto-calculate grade when marks change
    if (newMarks !== '') {
      setGrade(calculateGrade(newMarks));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Student name is required';
    }
    if (!section.trim()) {
      newErrors.section = 'Section is required';
    }
    if (marks === '' || marks < 0 || marks > 100) {
      newErrors.marks = 'Enter valid marks (0-100)';
    }
    if (!grade) {
      newErrors.grade = 'Grade is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare student data
    const studentData = {
      name: name.trim(),
      section: section.trim().toUpperCase(),
      marks: parseInt(marks),
      grade: grade,
    };

    // If editing, include the ID
    if (isEditMode && student) {
      studentData.id = student.id;
    }

    onSubmit(studentData);
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
      
      <form onSubmit={handleSubmit} className="student-form">
        <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className={`form-group ${errors.section ? 'has-error' : ''}`}>
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value.toUpperCase())}
            placeholder="Enter section (e.g., A, B, C)"
            maxLength="1"
            className={errors.section ? 'error-input' : ''}
          />
          {errors.section && <span className="error-message">{errors.section}</span>}
        </div>

        <div className={`form-group ${errors.marks ? 'has-error' : ''}`}>
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={handleMarksChange}
            placeholder="Enter marks (0-100)"
            min="0"
            max="100"
            className={errors.marks ? 'error-input' : ''}
          />
          {errors.marks && <span className="error-message">{errors.marks}</span>}
          <small className="hint">💡 Grade will be auto-calculated based on marks</small>
        </div>

        <div className={`form-group ${errors.grade ? 'has-error' : ''}`}>
          <label htmlFor="grade">Grade: {grade && <span className="auto-grade">(Auto: {grade})</span>}</label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={errors.grade ? 'error-input' : ''}
          >
            <option value="">Select Grade</option>
            <option value="A+">A+ (90-100)</option>
            <option value="A">A (80-89)</option>
            <option value="B+">B+ (70-79)</option>
            <option value="B">B (60-69)</option>
            <option value="C">C (50-59)</option>
            <option value="D">D (40-49)</option>
            <option value="F">F (Below 40)</option>
          </select>
          {errors.grade && <span className="error-message">{errors.grade}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? '💾 Update Student' : '➕ Add Student'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
