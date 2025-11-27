import React from 'react';
import './StudentDetails.css';

function StudentDetails({ student, onBack }) {
  if (!student) {
    return (
      <div className="details-container">
        <div className="no-student">
          <span className="no-student-icon">❓</span>
          <p>No student selected</p>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to List
          </button>
        </div>
      </div>
    );
  }

  // Get grade class for styling
  const getGradeClass = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'grade-excellent';
    if (grade === 'B+' || grade === 'B') return 'grade-good';
    if (grade === 'C') return 'grade-average';
    if (grade === 'D') return 'grade-below';
    return 'grade-fail';
  };

  // Get performance message
  const getPerformanceMessage = (marks) => {
    if (marks >= 90) return { emoji: '🏆', text: 'Outstanding Performance!' };
    if (marks >= 80) return { emoji: '🌟', text: 'Excellent Work!' };
    if (marks >= 70) return { emoji: '👍', text: 'Good Performance!' };
    if (marks >= 60) return { emoji: '📚', text: 'Keep Working Hard!' };
    if (marks >= 50) return { emoji: '💪', text: 'Room for Improvement!' };
    if (marks >= 40) return { emoji: '📖', text: 'Need More Practice!' };
    return { emoji: '⚠️', text: 'Needs Immediate Attention!' };
  };

  const performance = getPerformanceMessage(student.marks);

  return (
    <div className="details-container">
      <h2>📋 Student Details</h2>
      
      <div className="details-card">
        <div className="student-header">
          <div className="student-avatar-large">
            {student.name.charAt(0)}
          </div>
          <div className="student-intro">
            <h3>{student.name}</h3>
            <span className="student-id">ID: #{student.id}</span>
          </div>
        </div>

        <div className="performance-banner">
          <span className="performance-emoji">{performance.emoji}</span>
          <span className="performance-text">{performance.text}</span>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div className="detail-content">
              <span className="detail-label">Section</span>
              <span className="detail-value section-value">{student.section}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">📊</span>
            <div className="detail-content">
              <span className="detail-label">Marks Obtained</span>
              <span className="detail-value marks-value">{student.marks}/100</span>
              <div className="marks-progress">
                <div 
                  className="marks-progress-fill" 
                  style={{ width: `${student.marks}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">🏅</span>
            <div className="detail-content">
              <span className="detail-label">Grade</span>
              <span className={`detail-value grade-value ${getGradeClass(student.grade)}`}>
                {student.grade}
              </span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">✅</span>
            <div className="detail-content">
              <span className="detail-label">Result</span>
              <span className={`detail-value result-value ${student.marks >= 40 ? 'result-pass' : 'result-fail'}`}>
                {student.marks >= 40 ? '✓ PASSED' : '✗ FAILED'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="details-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to List
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
