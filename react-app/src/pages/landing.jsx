import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/landing.css";
import Footer from "../components/Footer";


function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

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

      <Footer />

    </>
  );
}

export default Landing;
