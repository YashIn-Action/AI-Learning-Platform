import React, { useState } from "react";
import "../styles/dashboard.css";

function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="layout">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <div className="hamburger" onClick={() => setOpen(!open)}>☰</div>
          <span className="logo-text">LEARNEX</span>
        </div>

        <div className="nav-right">
          <div className="avatar">Y</div>
        </div>
      </div>

      {/* SIDEBAR OVERLAY */}
      <div className={`sidebar ${open ? "active" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul>
          <li>Chapters</li>
          <li>Tasks</li>
          <li>Progress</li>
          <li>Calendar</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* BACKDROP */}
      {open && <div className="backdrop" onClick={() => setOpen(false)}></div>}

      {/* MAIN */}
      <div className="main">

        {/* HERO */}
        <div className="hero">
          <div>
            <h1>Welcome Back 👋</h1>
            <p>Continue building your skills today.</p>
          </div>
          <button className="primary-btn">Resume Learning</button>
        </div>

        {/* CARDS */}
        <div className="cards">
          <div className="card">
            <h3>🔥 Recommended</h3>
            <p>Continue Spanish</p>
          </div>

          <div className="card">
            <h3>📘 Revision</h3>
            <p>English Basic</p>
          </div>

          <div className="card">
            <h3>⚡ Quick Test</h3>
            <p>Take 10-min test</p>
          </div>

          <div className="card">
            <h3>📊 Progress</h3>
            <p>78% Completed</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
