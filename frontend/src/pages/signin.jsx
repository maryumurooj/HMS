// Signin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { interceptor } from '../axiosInterceptor'; // Use the interceptor for API calls

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/login', { username, password });
      // Store JWT token in localStorage
      localStorage.setItem('jwtToken', response.data.token);
      // Update app state (assuming App.js has a setUser function)
      history.push('/profile'); // Redirect to profile page after login
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.message || 'Login failed. Please try again.');
    }
  };


  
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
