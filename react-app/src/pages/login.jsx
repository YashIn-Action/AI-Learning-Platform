import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


 const handleLogin = (e) => {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "true");

  navigate("/dashboard");
};

  const handleGoogleLogin = () => {
    setMessage("Google login clicked (demo)");
  };

  const handleFacebookLogin = () => {
    setMessage("Facebook login clicked (demo)");
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>

          {message && (
            <div className="auth-success">{message}</div>
          )}

          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <button
            type="button"
            className="facebook-btn"
            onClick={handleFacebookLogin}
          >
            Continue with Facebook
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
