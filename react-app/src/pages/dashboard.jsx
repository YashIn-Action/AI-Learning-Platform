import React from "react";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {
  const user = localStorage.getItem("userName") || "User";
  const language = localStorage.getItem("selectedLanguage") || "English";
  const progress = 78;
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="hero">
        <div>
          <h1>Welcome Back, {user} 👋</h1>
          <p>Continue building your {language} skills today.</p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/chapters")}>
          Resume Learning
        </button>
      </div>

      <div className="cards">
        <div className="card voice-card" onClick={() => navigate("/voice")}>
          <div className="voice-icon">🎤</div>
          <h3>Voice Practice</h3>
          <p>Improve pronunciation & fluency</p>
          <div className="pulse"></div>
        </div>

        <div className="card clickable" onClick={() => navigate("/chapters")}>
          <h3>🔥 Recommended</h3>
          <p>Continue {language}</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/chapters")}>
          <h3>📘 Revision</h3>
          <p>{language} Basics</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/tasks")}>
          <h3>⚡ Quick Test</h3>
          <p>Take 10-min test</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/chatbot")}>
          <h3>🤖 AI Tutor</h3>
          <p>Chat with your personal AI language tutor</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/progress")}>
          <h3>📊 Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{progress}% Completed</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
