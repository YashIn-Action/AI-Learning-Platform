import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./chapters.css";

const CHAPTERS = [
    {
        id: 1,
        title: "Greetings & Introductions",
        icon: "👋",
        lessons: ["Hello & Goodbye", "My Name Is...", "Nice to Meet You", "How Are You?"],
        completed: 4,
        total: 4,
    },
    {
        id: 2,
        title: "Numbers & Colors",
        icon: "🔢",
        lessons: ["Numbers 1–10", "Numbers 11–100", "Basic Colors", "Shapes"],
        completed: 2,
        total: 4,
    },
    {
        id: 3,
        title: "Food & Drinks",
        icon: "🍕",
        lessons: ["At the Restaurant", "Ordering Food", "Describing Taste", "Recipes"],
        completed: 1,
        total: 4,
    },
    {
        id: 4,
        title: "Travel & Directions",
        icon: "✈️",
        lessons: ["Asking Directions", "At the Airport", "Booking a Hotel", "Transport"],
        completed: 0,
        total: 4,
    },
    {
        id: 5,
        title: "Work & Daily Life",
        icon: "💼",
        lessons: ["Jobs & Occupations", "Daily Routine", "At the Office", "Time & Schedule"],
        completed: 0,
        total: 4,
    },
    {
        id: 6,
        title: "Family & Relationships",
        icon: "👨‍👩‍👧",
        lessons: ["Family Members", "Describing People", "Relationships", "Emotions"],
        completed: 0,
        total: 4,
    },
];

function Chapters() {
    const [expanded, setExpanded] = useState(null);
    const language = localStorage.getItem("selectedLanguage") || "English";

    const toggle = (id) => setExpanded(expanded === id ? null : id);

    return (
        <DashboardLayout>
            <div className="inner-page">
                <div className="inner-header">
                    <h1>📚 Chapters</h1>
                    <span className="lang-badge">{language}</span>
                </div>

                <div className="chapters-grid">
                    {CHAPTERS.map((ch) => {
                        const pct = Math.round((ch.completed / ch.total) * 100);
                        const isOpen = expanded === ch.id;
                        return (
                            <div
                                key={ch.id}
                                className={`chapter-card ${ch.completed === ch.total ? "done" : ""}`}
                            >
                                <div className="chapter-top" onClick={() => toggle(ch.id)}>
                                    <span className="ch-icon">{ch.icon}</span>
                                    <div className="ch-info">
                                        <h3>{ch.title}</h3>
                                        <div className="ch-bar">
                                            <div className="ch-fill" style={{ width: `${pct}%` }} />
                                        </div>
                                        <small>{ch.completed}/{ch.total} lessons · {pct}%</small>
                                    </div>
                                    <span className="ch-arrow">{isOpen ? "▲" : "▼"}</span>
                                </div>

                                {isOpen && (
                                    <ul className="lesson-list">
                                        {ch.lessons.map((lesson, i) => (
                                            <li key={i} className={i < ch.completed ? "done-lesson" : ""}>
                                                {i < ch.completed ? "✅" : "⭕"} {lesson}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Chapters;
