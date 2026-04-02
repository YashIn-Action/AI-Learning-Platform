import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import "./chapters.css";

function Settings() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [dailyGoal, setDailyGoal] = useState("15");
    const [sound, setSound] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure? This will log you out.")) {
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <DashboardLayout>
            <div className="inner-page">
                <div className="inner-header">
                    <h1>⚙️ Settings</h1>
                </div>

                <div className="settings-group">
                    <h2>🔔 Notifications</h2>
                    <div className="setting-row">
                        <div>
                            <p className="setting-title">Daily Reminders</p>
                            <p className="setting-sub">Get reminded to practice every day</p>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                            />
                            <span className="slider" />
                        </label>
                    </div>
                </div>

                <div className="settings-group">
                    <h2>🎨 Appearance</h2>
                    <div className="setting-row">
                        <div>
                            <p className="setting-title">Dark Mode</p>
                            <p className="setting-sub">Switch between light and dark theme</p>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <span className="slider" />
                        </label>
                    </div>
                </div>

                <div className="settings-group">
                    <h2>🎯 Learning Preferences</h2>
                    <div className="setting-row">
                        <div>
                            <p className="setting-title">Daily Goal</p>
                            <p className="setting-sub">Minutes of practice per day</p>
                        </div>
                        <select
                            className="setting-select"
                            value={dailyGoal}
                            onChange={(e) => setDailyGoal(e.target.value)}
                        >
                            <option value="5">5 min</option>
                            <option value="10">10 min</option>
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="60">60 min</option>
                        </select>
                    </div>
                    <div className="setting-row">
                        <div>
                            <p className="setting-title">Sound Effects</p>
                            <p className="setting-sub">Play sounds on correct answers</p>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={sound}
                                onChange={() => setSound(!sound)}
                            />
                            <span className="slider" />
                        </label>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
                    <button className="save-btn" onClick={handleSave}>
                        {saved ? "✅ Saved!" : "Save Settings"}
                    </button>
                    <button
                        className="save-btn"
                        style={{ background: "linear-gradient(135deg,#e53935,#c62828)" }}
                        onClick={handleDeleteAccount}
                    >
                        🗑 Reset & Logout
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Settings;
