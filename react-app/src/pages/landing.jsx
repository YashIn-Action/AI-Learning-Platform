import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="navbar">
          <div className="left">
            <img
              className="logo"
              src="/logo/Gemini_Generated_Image_g1j2w0g1j2w0g1j2-Photoroom.svg"
              alt="logo"
            />
            <p className="title">LEARNEX</p>
          </div>

          <div className="right">
            <button
              className="login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="signup"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <div className="herosection">
        <div className="text">
          <p className="heading">
            Master Any Language with{" "}
            <span className="highlight">AI Power</span>
          </p>

          <p className="subheading">
            Personalized lessons, AI tutoring, and voice practice designed
            for college students and beginners. Start your language learning
            journey today.
          </p>
        </div>

        <div className="button">
          <button
            className="getstarted"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="features">
        <div className="box">
          <h2>Personalized Lessons</h2>
          <p>
            Adaptive learning paths based on your level, goals, and available time
          </p>
        </div>

        <div className="box">
          <h2>AI Chatbot Tutor</h2>
          <p>Practice conversations with an intelligent AI tutor anytime</p>
        </div>

        <div className="box">
          <h2>Voice Practice</h2>
          <p>Get real-time pronunciation feedback to perfect your accent</p>
        </div>

        <div className="box">
          <h2>Track Progress</h2>
          <p>Visualize your growth with detailed charts and statistics</p>
        </div>

        <div className="box">
          <h2>Daily Streaks & XP</h2>
          <p>Stay motivated with gamification and achievement badges</p>
        </div>

        <div className="box">
          <h2>10+ Languages</h2>
          <p>
            Choose from English, Spanish, French, German, or Japanese
          </p>
        </div>
      </div>

      <div className="start">
        <div>
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Join thousands of learners mastering new languages with
            AI-powered tools.
          </p>
        </div>

        <div>
          <button
            className="accountbutton"
            onClick={() => navigate("/signup")}
          >
            Create Free Account
          </button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Learnex. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Landing;
