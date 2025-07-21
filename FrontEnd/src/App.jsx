import React, { useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');

  // ✅ Registration function
  const register = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token || data.message==="User was created successfully") {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setMessage('Registration successful!');
      } else  {
        
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage('Registration request failed');
    }
  };

  // ✅ Login function
  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setMessage('Login successful!');
      }
      //else if the response sends back invalid credentials
      else if(data.message==='Invalid credentials') {
        
        setMessage(data.message || 'Login failed');
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage('Login request failed');
    }
  };

  // ✅ Get protected data
  const getProtectedData = async () => {
    if (!token) {
      setMessage('You must login first');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setMessage(data.message || 'no message');
    } catch (err) {
      console.error("Fetch protected data error:", err);
      setMessage('Failed to fetch protected data');
    }
  };

  // ✅ Logout
  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setMessage('Logged out');
  };

  return (
    <div className="mainDiv">
      <h1>Authentication</h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={getProtectedData} disabled={!token}>Access Protected Route</button>
      <button onClick={logout}>Logout</button>

      <p>{message}</p>

      {token && (
        <>
          <h4>Your JWT Token:</h4>
          <code>{token.slice(0, 30)}... (truncated)</code>
        </>
      )}
    </div>
  );
}

export default App;
