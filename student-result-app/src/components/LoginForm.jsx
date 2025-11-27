import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username.trim()) {
      setError('Please enter username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter password');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch users from JSON Server
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();

      // Find matching user
      const user = users.find(
        (u) =>
          u.username === username &&
          u.password === password &&
          u.role === role
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid username, password, or role. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure JSON Server is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🎓</div>
          <h1>Student Result System</h1>
          <p>Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Role Selection */}
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              <span className="role-icon">👨‍🎓</span>
              <span>Student</span>
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
              onClick={() => setRole('teacher')}
            >
              <span className="role-icon">👨‍🏫</span>
              <span>Teacher</span>
            </button>
          </div>

          {error && (
            <div className="error-alert">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              <span className="label-icon">👤</span> Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-small"></span> Logging in...
              </>
            ) : (
              <>🚀 Login as {role === 'student' ? 'Student' : 'Teacher'}</>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>📝 Demo Credentials</h4>
          <div className="credentials-grid">
            <div className="credential-box teacher">
              <strong>👨‍🏫 Teacher</strong>
              <p>Username: <code>teacher1</code></p>
              <p>Password: <code>teacher123</code></p>
            </div>
            <div className="credential-box student">
              <strong>👨‍🎓 Student</strong>
              <p>Username: <code>rahul</code></p>
              <p>Password: <code>student123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
