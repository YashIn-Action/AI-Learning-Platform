import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./chapters.css";

const BADGES = [
  { icon: "🔥", label: "7-Day Streak" },
  { icon: "⭐", label: "First Lesson" },
  { icon: "🎤", label: "Voice Master" },
  { icon: "📖", label: "Bookworm" },
];

function Profile() {
  const user = localStorage.getItem("userName") || "User";
  const language = localStorage.getItem("selectedLanguage") || "English";

  return (
    <DashboardLayout>
      <div className="inner-page">
        <div className="inner-header">
          <h1>👤 Profile</h1>
        </div>

        <div className="profile-hero">
          <div className="profile-avatar">{user.charAt(0).toUpperCase()}</div>
          <h2 className="profile-name">{user}</h2>
          <p className="profile-sub">Learning {language} · Intermediate Level</p>
        </div>

        <div className="stats-row" style={{ marginTop: "24px" }}>
          <div className="stat-box">
            <span className="stat-num">🔥 12</span>
            <span className="stat-label">Streak</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">⚡ 840</span>
            <span className="stat-label">XP</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">🏆 3</span>
            <span className="stat-label">Badges</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">📅 30</span>
            <span className="stat-label">Days Active</span>
          </div>
        </div>

        <div className="progress-section">
          <h2>🏅 Badges Earned</h2>
          <div className="badges-row">
            {BADGES.map((b) => (
              <div key={b.label} className="badge-item">
                <span className="badge-icon">{b.icon}</span>
                <span className="badge-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-section">
          <h2>📋 Account Info</h2>
          <table className="info-table">
            <tbody>
              <tr><td>Username</td><td>{user}</td></tr>
              <tr><td>Language</td><td>{language}</td></tr>
              <tr><td>Level</td><td>Intermediate</td></tr>
              <tr><td>Member Since</td><td>March 2026</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;