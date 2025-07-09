import React, { useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');

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
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage('Login request failed');
    }
  };

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
      setMessage(data.message || 'No message');
    } catch (err) {
      console.error("Fetch protected data error:", err);
      setMessage('Failed to fetch protected data');
    }
  };

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
        placeholder="Username"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

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
