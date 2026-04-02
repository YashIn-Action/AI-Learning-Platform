import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./chapters.css";

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ACTIVITY = [40, 70, 55, 90, 30, 80, 65];

const SKILLS = [
    { name: "Speaking", pct: 72, icon: "🎤" },
    { name: "Listening", pct: 58, icon: "👂" },
    { name: "Reading", pct: 85, icon: "📖" },
    { name: "Writing", pct: 45, icon: "✍️" },
    { name: "Vocabulary", pct: 63, icon: "📝" },
];

function Progress() {
    const user = localStorage.getItem("userName") || "User";
    const language = localStorage.getItem("selectedLanguage") || "English";
    const maxActivity = Math.max(...ACTIVITY);

    return (
        <DashboardLayout>
            <div className="inner-page">
                <div className="inner-header">
                    <h1>📊 My Progress</h1>
                    <span className="lang-badge">{language}</span>
                </div>

                <div className="stats-row">
                    <div className="stat-box">
                        <span className="stat-num">🔥 12</span>
                        <span className="stat-label">Day Streak</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">⚡ 840</span>
                        <span className="stat-label">Total XP</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">📚 7</span>
                        <span className="stat-label">Lessons Done</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">⏱ 4.2h</span>
                        <span className="stat-label">Time Spent</span>
                    </div>
                </div>

                <div className="progress-section">
                    <h2>📅 Weekly Activity</h2>
                    <div className="bar-chart">
                        {WEEK.map((day, i) => (
                            <div key={day} className="bar-col">
                                <div
                                    className="bar-fill-v"
                                    style={{ height: `${(ACTIVITY[i] / maxActivity) * 120}px` }}
                                />
                                <span className="bar-label">{day}</span>
                                <span className="bar-min">{ACTIVITY[i]}m</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-section">
                    <h2>🧠 Skill Breakdown</h2>
                    {SKILLS.map((s) => (
                        <div key={s.name} className="skill-row">
                            <span className="skill-icon">{s.icon}</span>
                            <span className="skill-name">{s.name}</span>
                            <div className="skill-bar">
                                <div className="skill-fill" style={{ width: `${s.pct}%` }} />
                            </div>
                            <span className="skill-pct">{s.pct}%</span>
                        </div>
                    ))}
                </div>

                <div className="progress-section">
                    <h2>🏆 Overall Progress</h2>
                    <div style={{ textAlign: "center", padding: "12px 0" }}>
                        <div className="big-pct">78%</div>
                        <p style={{ color: "#888", marginTop: "6px" }}>
                            Keep it up, {user}! You're almost there.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Progress;
