import React, { useState } from "react";
import SeatGrid from "./SeatGrid";
import AdminDashboard from "./AdminDashboard";
import { loginUser, signupUser } from "./api";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Login existing user
  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      setUserId(res.user_id);
      // Simple admin check (example)
      setIsAdmin(email === "admin@example.com");
      alert("Logged in!");
    } catch (err) {
      alert(err.response?.data?.detail || err.message);
    }
  };

  // Signup new user
  const handleSignup = async () => {
    try {
      const res = await signupUser(email, password);
      setUserId(res.user_id);
      alert("Signed up!");
    } catch (err) {
      alert(err.response?.data?.detail || err.message);
    }
  };

  // Not logged in: show login/signup form
  if (!userId) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Theatre Ticket System Login / Signup</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup} style={{ marginLeft: 10 }}>
          Signup
        </button>
      </div>
    );
  }

  // Logged in: show admin dashboard or seat grid
  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Theatre Ticket System</h1>
      <SeatGrid showId={1} userId={userId} email={email} />
    </div>
  );
}
