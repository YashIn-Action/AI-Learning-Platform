import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    const userName = email.split("@")[0];
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", userName);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>

          {message && (
            <div className="auth-error">{message}</div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#6c4df6", fontWeight: 500 }}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
