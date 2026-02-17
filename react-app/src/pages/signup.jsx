import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/auth.css";

function Signup() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setMessage("");
  };

  const sendOTP = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError(true);
      setMessage("Please enter name and email.");
      return;
    }

    setError(false);
    setMessage("OTP sent to your email (demo).");
    setStep(2);
  };

  const verifyOTP = (e) => {
    e.preventDefault();

    if (!formData.otp) {
      setError(true);
      setMessage("Please enter OTP.");
      return;
    }

    setError(false);
    setMessage("OTP verified successfully.");
    setStep(3);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    if (!formData.agree) {
      setError(true);
      setMessage("You must agree to Terms & Conditions.");
      return;
    }

    setError(false);
    setMessage("Account created successfully 🎉");
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <form className="auth-card">
          <h2>Create Account</h2>

          {message && (
            <div className={error ? "auth-error" : "auth-success"}>
              {message}
            </div>
          )}

          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />

              <button onClick={sendOTP}>Send OTP</button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
              />

              <button onClick={verifyOTP}>Verify OTP</button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                onChange={handleChange}
              />

              <label>
                <input
                  type="checkbox"
                  name="agree"
                  onChange={handleChange}
                />
                I agree to Terms & Conditions
              </label>

              <button onClick={handleSignup}>
                Create Account
              </button>
            </>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
