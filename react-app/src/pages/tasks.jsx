import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./chapters.css";

const INITIAL_TASKS = [
    { id: 1, icon: "🎤", title: "Voice Challenge", desc: "Speak 3 sentences aloud", xp: 20, done: false },
    { id: 2, icon: "💬", title: "Chat with AI Tutor", desc: "Have a 5-message conversation", xp: 15, done: false },
    { id: 3, icon: "📖", title: "Read a Chapter", desc: "Complete 1 lesson from Chapters", xp: 25, done: false },
    { id: 4, icon: "✍️", title: "Vocabulary Quiz", desc: "Answer 10 vocabulary questions", xp: 30, done: false },
    { id: 5, icon: "🔊", title: "Listen & Repeat", desc: "Repeat 5 audio phrases correctly", xp: 15, done: false },
    { id: 6, icon: "🌟", title: "Daily Streak", desc: "Log in today to maintain your streak", xp: 10, done: true },
];

function Tasks() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const toggle = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    };

    const earned = tasks.filter((t) => t.done).reduce((s, t) => s + t.xp, 0);
    const total = tasks.reduce((s, t) => s + t.xp, 0);

    return (
        <DashboardLayout>
            <div className="inner-page">
                <div className="inner-header">
                    <h1>✅ Daily Tasks</h1>
                    <span className="lang-badge">⚡ {earned}/{total} XP</span>
                </div>

                <div className="xp-bar-wrap">
                    <div className="xp-bar">
                        <div className="xp-fill" style={{ width: `${(earned / total) * 100}%` }} />
                    </div>
                    <p>{tasks.filter((t) => t.done).length} of {tasks.length} tasks completed</p>
                </div>

                <div className="tasks-list">
                    {tasks.map((t) => (
                        <div
                            key={t.id}
                            className={`task-card ${t.done ? "task-done" : ""}`}
                            onClick={() => toggle(t.id)}
                        >
                            <span className="task-icon">{t.icon}</span>
                            <div className="task-info">
                                <h3>{t.title}</h3>
                                <p>{t.desc}</p>
                            </div>
                            <div className="task-right">
                                <span className="xp-badge">+{t.xp} XP</span>
                                <span className="task-check">{t.done ? "✅" : "⬜"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Tasks;
